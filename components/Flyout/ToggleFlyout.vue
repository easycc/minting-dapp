<template>
	<div :class="['toggle-flyout']">
		<Props @click="toggle">
			<slot name="trigger" />
		</Props>

		<ClientOnly>
			<Window :onResize="handleResize" />
			<Document :onScroll="handleScroll" />
		</ClientOnly>

		<Portal to="flyout">
			<Fade>
				<LockLayer v-if="placement" :onClick="hide" />
			</Fade>

			<Fade>
				<Size v-if="placement" :onResize="handleResize">
					<Props
						:triggerStyle="placement"
						class="flyout"
						:onHide="hide"
						v-bind="$attrs"
						v-on="$listeners"
					>
						<slot />
					</Props>
				</Size>
			</Fade>
		</Portal>
	</div>
</template>

<script>
import { Portal } from 'portal-vue';


import { Document, Window, Size } from '~/components/EventListener';
import { getVisibleClientRectInParent } from '~/helpers/dom';
import { Props } from '~/components/ControlFlow';
import { Fade } from '~/components/animation';
import { LockLayer } from '~/components/Layer';
import noop from '~/utils/noop';

export default {
	inheritAttrs: false,
	components: {
		Fade,
		Document,
		Window,
		Size,
		LockLayer,
		Portal,
		Props
	},

	props: {
		onHide: {
			type: Function,
			default: noop
		},
		onShow: {
			type: Function,
			default: noop
		}
	},

	data () {
		return {
			placement: undefined,
			triggerElem: undefined,
			offsetParent: undefined,
			triggerBox: { top: 0, left: 0, width: 0, height: 0 }
		};
	},

	computed: {
		position () {
			const { triggerBox } = this;
			const { width, height, left, bottom } = triggerBox;

			return {
				left,
				top: bottom, // render flyout under the trigger element
				width,
				height
			};
		}
	},

	mounted () {
		this.handleFlyoutMount();
	},

	componentWillUnmount () {
		this.triggerElem = undefined;
	},

	methods: {
		handleFlyoutMount (mountElem) {
			this.offsetParent = document.body; // может быть не document.body, а другой контейнер. Need fix
		},

		setTriggerBox (offsetParent) {
			if (!offsetParent) return;

			this.triggerBox = getVisibleClientRectInParent(
				this.triggerElem,
				offsetParent
			);
		},

		handleResize () {
			if (!this.placement) return;

			this.setPlacement();
		},

		handleScroll (event) {
			if (!this.placement) return;

			const element = event.target;

			const scrollIsOnRoot
				= element === document
					|| element === document.documentElement
					|| element === document.body;

			if (scrollIsOnRoot) return;

			const scrollIsInFlyout
				= this.$refs.flyout instanceof HTMLElement
					&& this.$refs.flyout.contains(element);

			if (scrollIsInFlyout) return;

			this.hide();
		},

		toggle (event) {
			let { placement } = this;

			if (placement) {
				this.hide();
				return;
			}

			this.triggerElem = event.currentTarget;
			this.setPlacement();

			this.onShow();
		},

		setPlacement () {
			this.setTriggerBox(this.offsetParent);
			this.placement = this.position;
		},

		hide () {
			this.placement = undefined;
			this.onHide();
		}
	}
};
</script>

<style scoped>
.toggle-flyout {
	max-width: 100% !important;
	/* width: 100% !important; */
}

.flyout {
	display: block;
	box-sizing: border-box;
	position: absolute;
	z-index: 20;
	left: 0;
	top: 0;
	max-height: 100%;
	max-width: 100%;
	text-align: left;
	text-align: initial;
	text-align: start;
	font-weight: normal;
	font-style: normal;
}
</style>