<template>
	<FileValidation :sizeMb="sizeMb" type="document">
		<FilePickerWithNativeValidation
			v-bind="$attrs"
			accept=".jpg, .png, .pdf"
			v-on="$listeners"
		>
			<slot />
		</FilePickerWithNativeValidation>
	</FileValidation>
</template>

<script>
import { FileValidation } from '../Validation';
import FilePickerWithNativeValidation from './FilePickerWithNativeValidation';

export default {
	name: 'DocumentPicker',
	inheritAttrs: false,
	components: {
		FilePickerWithNativeValidation,
		FileValidation
	},
	props: {
		sizeMb: {
			type: [Number, String],
			default: 1
		}
	}
};
</script>