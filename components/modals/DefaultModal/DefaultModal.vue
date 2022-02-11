<template>
	<transition appear name="component-fade" :run="true">
		<div key="modal" class="modal-background-wrapper">
			<LockLayer :onClick="closeModal" class="lock-layer" />

			<section ref="modalContentWrapper" class="content-wrapper" :class="{ 'full-screen-mobile': fullScreenMobile }">
				<h3 v-if="title" class="modal-title">
					{{ title }}
				</h3>

				<slot />

				<Fade>
					<Button
						v-if="hideCloseButton === false"
						class="close-button"
						iconName="cross"
						title="Close window"
						collapsed
						@click="closeModal"
					/>
				</Fade>
			</section>
		</div>
	</transition>
</template>

<script>
import { Button } from '~/components/buttons';
import { Fade } from '~/components/animation';
import { LockLayer } from '~/components/Layer';

export default {
	components: {
		Button,
		LockLayer,
		Fade
	},

	props: {
		hideCloseButton: {
			type: Boolean,
			default: false
		},

		title: {
			type: String,
			default: null
		},

		fullScreenMobile: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		closeModal () {
			if (this.hideCloseButton === false) {
				this.$emit('close');
			}
		}
	}
};
</script>

<style scoped>
.modal-background-wrapper {
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100vh;

	--modal-width: 500px;
}

.lock-layer {
  background-color: rgba(0, 0, 0, 0.6);
}

.content-wrapper {
	position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  margin: 1em auto 0;
  max-width: 500px;
  max-width: var(--modal-width);
  width: 94%;
  padding: 5em calc(0.5em + 1vw) 2em;
  box-sizing: border-box;
  background-color: var(--color-background-default);
	box-shadow: var(--pixel-shadow);
}

@media screen and (max-width: 500px) { /* modal width */
	.full-screen-mobile {
		margin: 0 auto;
		width: 100%;
		border-radius: 0;
		min-height: 100vh;
	}
}

.close-button {
  position: absolute;
  z-index: 10;
  font-size: 1rem;
  right: 1em;
  top: 1em;
  width: 2.75em;
  height: 2.75em;
  box-shadow: none;

	box-shadow: var(--pixel-shadow);
  border: none;
  overflow: hidden;
	text-indent: 100px;
	color: var(--color-text-secondary);
}

.close-button:hover {
	opacity: 1;
	background-color: var(--color-background-secondary);
}


.modal-title {
  font-size: 1em;
  position: absolute;
  z-index: 10;
  font-weight: 600;
  line-height: 1.2;
  left: calc(0.5em + 1vw);
  top: 1em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  letter-spacing: -0.005em;

  display: block;
	max-width: calc(100% - 1em - 2vw);
	width: 100%;
  padding: 0.5em 3em 0 0;
  margin-bottom: 2em;
  text-align: left;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>