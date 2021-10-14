<template>
	<DefaultBadge
		class="answer-badge"
		:emojiIconName="answer.emojiIconName"
	>
		<slot>{{ answer.title }}</slot>
	</DefaultBadge>
</template>

<script>
import DefaultBadge from './DefaultBadge';

import ANSWER_TYPE from '~/constants/answer-type';

export default {
	components: {
		DefaultBadge
	},

	props: {
		type: {
			type: String,
			required: true
		}
	},

	data () {
		return {
			ANSWER_TYPE
		};
	},

	computed: {
		answer () {
			const { type } = this;

			return Object.values(ANSWER_TYPE).find(answer => answer.name === type);
		}
	}
};
</script>

<style scoped>
.answer-badge {
	padding: 0;
	background-color: transparent;
}
</style>