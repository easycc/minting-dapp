<template>
	<component :is="type" :tag="tag" name="fade-right" mode="out-in">
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
.fade-right-enter-active {
  animation: fade-right .5s;
}

.fade-right-leave-active {
  animation: fade-right .5s reverse;
}

@keyframes fade-right {
  from {
    opacity: 0.5;
    transform: translate3d(-8%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>