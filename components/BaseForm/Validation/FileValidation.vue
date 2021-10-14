<template>
	<FormValidation :validation="validation" @change="onChange">
		<slot />
	</FormValidation>
</template>

<script>
import { extend } from 'vee-validate';
import { size, image, ext } from 'vee-validate/dist/rules';

import { FormValidation } from '../FormContext';

// File size
extend('size', {
	...size,
	validate (value, params) {
		if (!value) return true;
		return size.validate(value, params);
	},
	message: 'Validation_Size_Invalid'
});

// File with MIME type image/*
extend('image', {
	...image,
	validate (value, params) {
		if (!value) return true;
		return image.validate(value, params);
	},
	message: 'Validation_Image_Invalid'
});

// File must have one of the extensions
extend('ext', {
	...ext,
	validate (value, params) {
		if (!value) return true;
		return ext.validate(value, params);
	},
	message: 'Validation_FileExtension_Invalid'
});

export const FILE_TYPE = Object.freeze({
	IMAGE: 'image',
	DOCUMENT: 'document',
	ANY: undefined
});

export default {
	name: 'FileValidation',
	components: { FormValidation },
	props: {
		type: {
			type: String,
			default: undefined,
			validator: name => Object.values(FILE_TYPE).includes(name)
		},
		sizeMb: {
			type: [Number, String],
			default: undefined
		}
	},
	data () {
		return {
			validation: {}
		};
	},
	computed: {
		sizeRule () {
			let sizeMb = parseFloat(this.sizeMb);
			let sizeKb = sizeMb * 1024;
			let rule = sizeKb && `size:${sizeKb}`;

			return rule;
		},
		typeRule () {
			let { type } = this;

			switch (type) {
				case FILE_TYPE.IMAGE:
					return 'image';
				case FILE_TYPE.DOCUMENT:
					return 'ext:jpg,png,pdf';
				default:
			}
		},
		rules () {
			let { sizeRule, typeRule } = this;

			return [typeRule, sizeRule].filter(Boolean).join('|');
		}
	},
	methods: {
		onChange (changes) {
			let { rules } = this;

			this.validation = Object.keys(changes)
				.map(function (name) {
					return { [name]: rules };
				})
				.reduce(function (state, validation) {
					return Object.assign(state, validation);
				}, {});
		}
	}
};
</script>