<template>
	<div class="modal-background-backdrop" tabindex="-1" focusable="false" @click="onClick" />
</template>

<script>
import noop from '~/utils/noop';

export default {
	props: {
		onClick: {
			type: Function,
			default: noop
		}
	},

	destroyed () {
		document.body.style.height = 'initial';
		document.body.style.overflow = 'initial';
		document.body.style.overflow = 'overlay';
	},

	mounted () {
		document.body.style.height = '100vh';
		document.body.style.overflow = 'hidden';
	}
};
</script>


<style scoped>
.modal-background-backdrop {
  display: block;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  background-color: transparent;
}
</style>