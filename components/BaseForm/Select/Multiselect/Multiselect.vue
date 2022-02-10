<template>
	<Select
		v-bind="$attrs"
		:multiple="true"
		:hideOnSelect="false"
		v-on="$listeners"
	/>
</template>

<script>
import Select from '../Select/SelectWithNativeValidation';

export default {
	inheritAttrs: false,

	components: {
		Select
	}
};
</script>