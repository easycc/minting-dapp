<template>
	<DropdownButton :title="activeLocale" class="switch-language-button" @click="onClick" />
</template>

<script>
import { DropdownButton } from '~/components/buttons';
import { addRouteQuery } from '~/utils/route';

export default {
	components: {
		DropdownButton
	},

	props: {
		activeLocale: {
			type: String,
			required: true
		}
	},

	methods: {
		onClick () {
			this.$emit('click');

			addRouteQuery({ showLanguageModal: true });
		}
	}
};
</script>


<style scoped>
.switch-language-button {
	text-transform: uppercase;
}
</style>