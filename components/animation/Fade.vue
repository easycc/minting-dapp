<template>
	<component :is="type" :tag="tag" name="fade" mode="out-in">
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
.fade-enter-active {
  animation: fade .3s;
}

.fade-leave-active {
  animation: fade .3s reverse;
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

</style>