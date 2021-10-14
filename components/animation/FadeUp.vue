<template>
	<component :is="type" :tag="tag" name="fade-up" mode="out-in">
		<slot />
	</component>
</template>

<script>
export default {
	props: {
		group: {
			type: Boolean,
			default: false
		},
		tag: {
			type: String,
			default: 'div'
		}
	},
	computed: {
		type () {
			return this.group ? 'transition-group' : 'transition';
		}
	}
};
</script>


<style scoped>
.fade-up-enter-active {
  animation: fade-up .5s;
}

.fade-up-leave-active {
  animation: fade-up .5s reverse;
}

@keyframes fade-up {
  from {
    opacity: 0.5;
    transform: translate3d(0, 8%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>