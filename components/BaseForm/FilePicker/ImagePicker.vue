<template>
	<FileValidation :sizeMb="sizeMb" type="image">
		<FilePickerWithNativeValidation
			v-bind="$attrs"
			accept=".jpg, .jpeg, .png, .gif, .webp, .bmp, .svg"
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
	name: 'ImagePicker',
	inheritAttrs: false,
	components: {
		FilePickerWithNativeValidation,
		FileValidation
	},
	props: {
		sizeMb: {
			type: [Number, String],
			default: 2.5
		}
	}
};
</script>