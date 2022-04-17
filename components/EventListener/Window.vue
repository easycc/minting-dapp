<template>
	<Element
		:node="window"
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
		onResize: {
			type: Function,
			default: noop
		},

		onResizeEnd: { // todo
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
		window () {
			return window ? window : undefined;
		},

		handlers () {
			const { onResize } = this;

			return {
				resize: onResize
			};
		}
	}
};
</script>