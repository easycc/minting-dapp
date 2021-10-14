<template>
	<Fade>
		<Fragment v-if="visible">
			<slot />
		</Fragment>
	</Fade>
</template>

<script>
import { Fragment } from '~/components/ControlFlow';
import { Fade } from '~/components/animation';

export default {
	components: {
		Fragment,
		Fade
	},

	props: {
		scrollPosition: {
			type: Number,
			required: true
		}
	},

	data () {
		return {
			visible: false,
			lastScrollPosition: 0
		};
	},

	mounted () {
		if (process.client) {
			window.addEventListener('scroll', this.onScroll);
		}
	},

	beforeDestroy () {
		if (process.client) {
			window.removeEventListener('scroll', this.onScroll);
		}
	},

	methods: {
		onScroll () {
			const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

			if (currentScrollPosition > this.scrollPosition) {
				this.visible = true;
			}
			else {
				this.visible = false;
			}
		}
	}
};
</script>