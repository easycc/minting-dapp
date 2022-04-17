<template>
	<Element
		:node="document"
		:handlers="handlers"
		:capture="capture"
		:passive="passive"
	/>
</template>

<script>
import Element from './Element';

import noop from '~/utils/noop';

export default {
	components: {
		Element
	},

	props: {
		onClick: {
			type: Function,
			default: noop
		},
		onScroll: {
			type: Function,
			default: noop
		},
		onResize: {
			type: Function,
			default: noop
		},

		onMouseDown: {
			type: Function,
			default: noop
		},
		onMouseUp: {
			type: Function,
			default: noop
		},
		onMouseMove: {
			type: Function,
			default: noop
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

	computed: {
		document () {
			return document;
		},

		handlers () {
			const {
				onMouseDown, onMouseUp, onMouseMove, onClick, onScroll, onResize
			} = this;

			return {
				mousedown: onMouseDown,
				mouseup: onMouseUp,
				mousemove: onMouseMove,
				click: onClick,
				scroll: onScroll,
				resize: onResize
			};
		}
	}
};
</script>