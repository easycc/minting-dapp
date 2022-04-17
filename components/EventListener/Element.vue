<template>
	<Fragment>
		<slot />
	</Fragment>
</template>

<script>
import { Fragment } from '~/components/ControlFlow';
import noop from '~/utils/noop';

export default {
	components: {
		Fragment
	},

	props: {
		node: {
			type: null,
			default: null
		},
		onMount: {
			type: Function,
			default: noop
		},

		handlers: {
			type: Object,
			default: undefined
		},

		capture: {
			type: Boolean,
			default: false
		},
		passive: {
			type: Boolean,
			default: false
		}
	},

	data () {
		return {
			passiveEventSupported: false
		};
	},

	computed: {
		element () {
			return this.node ? this.node : this.$el;
		},

		listenersArguments () {
			const { handlers } = this;

			if (!handlers) return;

			return Object.entries(handlers).map(([eventType, callback]) => ({
				eventType,
				callback
			}));
		},


		listenerOptions () {
			const { passive, capture } = this;

			if (passive && this.passiveEventSupported) {
				return { passive, capture };
			}
			return capture;
		}
	},

	watch: {
		'_props' (props, prevProps) {
			const { handlers, element } = this;

			if (!handlers) return;
			const { handlers: prevHandlers, element: prevNode } = prevProps;

			Object.entries(handlers)
				.map(([eventType, callback]) => {
					const { [eventType]: prevCallback } = prevHandlers;

					return { eventType, callback, prevCallback };
				})
				.filter(({ callback, prevCallback }) => {
					const callbackHasChanged = callback !== prevCallback;
					const elementHasChanged = element !== prevNode;

					return callbackHasChanged || elementHasChanged;
				})
				.forEach(({ eventType, callback, prevCallback }) => {
					this.removeListener(prevNode, eventType, prevCallback);
					this.addListener(element, eventType, callback);
				});
		}
	},

	beforeMount () {
		this.checkPassiveEventSupported();
	},

	mounted () {
		const { listenersArguments } = this;
		const { element } = this;

		this.$emit('mounted');
		if (!listenersArguments) return;

		listenersArguments.forEach(({ eventType, callback }) => {
			this.addListener(element, eventType, callback);
		});

		this.onMount();
	},

	beforeDestroy () {
		const { listenersArguments } = this;
		const { element } = this;

		if (!listenersArguments) return;

		listenersArguments.forEach(({ eventType, callback }) => {
			this.removeListener(element, eventType, callback);
		});
	},

	methods: {
		checkPassiveEventSupported () {
			let supported = false;
			const options = Object.defineProperty({}, 'passive', {
				get () {
					supported = true;
					return supported;
				}
			});

			try {
				if (process.client) window.addEventListener('testpassive', null, options);
			}
			finally {
				if (process.client) window.removeEventListener('testpassive', null, options);
			}
			this.passiveEventSupported = supported;
		},

		addListener (element, eventType, callback) {
			const { listenerOptions } = this;

			if (element && callback) {
				element.addEventListener(eventType, callback, listenerOptions);
			}
		},

		removeListener (element, eventType, callback) {
			const { listenerOptions } = this;

			if (element && callback) {
				element.removeEventListener(eventType, callback, listenerOptions);
			}
		}
	}
};
</script>