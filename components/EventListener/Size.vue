<template>
	<Props>
		<slot />
	</Props>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill';
import debounce from 'lodash/debounce';

import { Props } from '~/components/ControlFlow';
import noop from '~/utils/noop';

export default {
	components: {
		Props
	},

	props: {
		onResize: {
			type: Function,
			default: noop
		},
		onResizeEnd: {
			type: Function,
			default: noop
		},
		onResizeStart: {
			type: Function,
			default: noop
		}
	},

	data () {
		const RESIZE_DELAY = 200;

		let handleResizeEnd = debounce(
			details => {
				const { onResizeEnd } = this;

				onResizeEnd(details);
			},
			RESIZE_DELAY,
			{ leading: false, trailing: true }
		);

		let handleResizeStart = debounce(
			details => {
				const { onResizeStart } = this;

				onResizeStart(details);
			},
			RESIZE_DELAY,
			{ leading: true, trailing: false }
		);

		return {
			target: undefined,
			resizeObserver: undefined,

			handleResizeStart,
			handleResizeEnd
		};
	},

	computed: {
		elementRef () {
			return this.$el;
		}
	},

	updated () {
		this.init();
	},

	mounted () {
		this.init();
	},

	beforeDestroy () {
		this.removeListener();
		this.handleResizeStart.cancel();
		this.handleResizeEnd.cancel();
	},

	methods: {
		init () {
			const { onResize, onResizeEnd, onResizeStart } = this;
			const handleResize
				= onResize || onResizeEnd || onResizeStart ? this.handleResize : undefined;
			const targetDidChange = this.target !== this.elementRef;

			if (handleResize) {
				this.addListener(handleResize);
			}
			else {
				this.removeListener();
			}

			if (targetDidChange) {
				this.unobserve(this.target);
				this.observe(this.elementRef);
			}
		},

		handleResize (entries) {
			const { onResize, onResizeStart, onResizeEnd } = this;
			const entry = entries[0];
			const { contentRect, borderBoxSize } = entry;
			const target = entry.target || this.elementRef;
			const contentBox = {
				width: contentRect.width,
				height: contentRect.height
			};
			let borderBox;

			if (borderBoxSize) {
				borderBox = {
					width: borderBoxSize[0] ?
						borderBoxSize[0].inlineSize :
						borderBoxSize.inlineSize,
					height: borderBoxSize[0] ?
						borderBoxSize[0].blockSize :
						borderBoxSize.blockSize
				};
			}

			const details = { target, contentBox, borderBox };

			if (!borderBox) {
				// Polyfill `borderBoxSize`
				Object.defineProperty(details, 'borderBox', {
					enumerable: true,
					get () {
						const clientRect = target.getBoundingClientRect();

						return Object.freeze({
							width: clientRect.width,
							height: clientRect.height
						});
					},
					set (value) {
						details.borderBox = value;
					}
				});
			}

			if (onResize) {
				onResize(details);
			}
			if (onResizeStart) {
				this.handleResizeStart(details);
			}
			if (onResizeEnd) {
				this.handleResizeEnd(details);
			}
		},

		addListener (handler) {
			if (
				!this.resizeObserver
				&& handler
				&& typeof ResizeObserver !== 'undefined'
			) {
				this.resizeObserver = new ResizeObserver(handler);
			}
		},

		removeListener () {
			if (this.resizeObserver) {
				this.resizeObserver.disconnect();
				this.resizeObserver = undefined;
			}
		},

		observe (element) {
			if (element && this.resizeObserver) {
				this.resizeObserver.observe(element);
				this.target = element;
			}
		},

		unobserve (element) {
			if (element && this.resizeObserver) {
				this.resizeObserver.unobserve(element);
				this.target = undefined;
			}
		}
	}
};
</script>