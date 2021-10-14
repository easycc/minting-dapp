<template>
	<component :is="type" :tag="tag" name="fade-down" mode="out-in">
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
.fade-down-enter-active {
  animation: fade-down .5s;
}

.fade-down-leave-active {
  animation: fade-down .5s reverse;
}

@keyframes fade-down {
  from {
    opacity: 0.5;
    transform: translate3d(0, -8%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>