<template>
	<Draggable
		v-bind="$attrs"
		class="draggable-list"
		tag="div"
		:animation="200"
		:group="group"
		delay="250"
		:delayOnTouchOnly="true"
		v-on="$listeners"
		@start="drag = true"
		@end="onDragEnd"
	>
		<TransitionGroup
			:name="!drag ? 'flip-list' : ''"
			:tag="tag"
		>
			<slot />
		</TransitionGroup>

		<template v-slot:footer>
			<slot name="footer" />
		</template>
	</Draggable>
</template>

<script>
import Draggable from 'vuedraggable';

export default {
	inheritAttrs: false,
	components: {
		Draggable
	},

	props: {
		tag: {
			type: String,
			default: 'div'
		},
		group: {
			type: String,
			default: null
		}
	},

	data () {
		return {
			drag: false
		};
	},

	methods: {
		onDragEnd () {
			this.drag = false;
		}
	}
};
</script>

<style scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>