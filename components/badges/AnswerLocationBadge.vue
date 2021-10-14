<template>
	<ClickableBadge
		className="answer-badge"
		class="answer-badge"
		iconName="cross"
		@click="onClick"
	>
		<div class="text-wrapper">
			<span class="answer-title">{{ title }}</span>
			<span class="question-title">{{ answerIndex + 1 }}. {{ subtitle }}</span>
		</div>
	</ClickableBadge>
</template>

<script>
import ClickableBadge from './ClickableBadge';

export default {
	components: {
		ClickableBadge
	},

	props: {
		title: {
			type: String,
			default: null
		},

		subtitle: {
			type: String,
			default: null
		},

		answerIndex: {
			type: Number,
			default: 0
		}
	},

	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>

<style scoped>
.answer-badge {
	display: block;
	width: 100%;
}

::v-deep .answer-badge {
	padding: 0.5em 1em 0.5em 0.5em;
	display: block;
	font-weight: 500;
}

::v-deep .answer-badge .icon {
	font-size: 1em;
	opacity: 0.5;
}

.text-wrapper {
	display: inline-block;
	max-width: calc(100% - 2em);
	vertical-align: top;
}


.answer-title {
	display: block;
	width: 100%;
	margin-bottom: 0.25em;
	opacity: 0.7;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.question-title {
	display: block;
}
</style>