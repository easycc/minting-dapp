<template>
	<div class="overflow-container">
		<component :is="type" :tag="tag" name="slide-up" mode="out-in">
			<slot />
		</component>
	</div>
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
.overflow-container {
	display: block;
	width: 100%;
	overflow: hidden;
}

.slide-up-enter-active {
	transition: all .8s cubic-bezier(.075,.82,.165,1);
}

.slide-up-leave-active {
  transition: all .3s cubic-bezier(.075,.22,.65,1);
}

.slide-up-enter, .slide-up-leave-to {
  opacity: 0;
}

.slide-up-enter {
	transform: translate(0, 100%);
}

.slide-up-leave-to {
	transform: translate(0, -100%);
}
</style>