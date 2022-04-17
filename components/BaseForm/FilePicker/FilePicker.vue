<template>
	<div class="file-picker">
		<Fade>
			<Label
				v-if="invalid || !imagePreview"
				class="label"
				:valid="valid"
				:errors="errors"
				:labelText="labelText"
				:smallLabelText="smallLabelText"
				labelTextPosition="after"
			>
				<input
					type="file"
					class="file-input"
					:accept="accept"
					:disabled="disabled"
					:name="name"
					:capture="capture"
					@change="uploadFile"
				/>

				<Button
					type="button"
					class="button"
					:kind="kind"
					aria-hidden="true"
					focusable="false"
					iconName="image"
					:title="title"
					iconPosition="after"
					:showSpinner="pendingImageUpload"
				/>
			</Label>

			<div v-else>
				<BaseImage
					v-if="showPreview && imagePreview"
					:src="imagePreview"
					alt="Preview image"
					class="preview-image"
				/>

				<Button
					type="button"
					class="button"
					iconName="trash"
					title="Delete image"
					iconPosition="after"
					@click="clear"
				/>
			</div>
		</Fade>
	</div>
</template>

<script>
import { Label } from '../Label';
import EXIF from './exif';

import { BaseImage } from '~/components/BaseImage';
import { Fade } from '~/components/animation';
import { Button } from '~/components/buttons';

let getOrientedImage = require('exif-orientation-image');

export default {
	name: 'FilePicker',
	inheritAttrs: false,
	components: {
		Button,
		BaseImage,
		Fade,
		Label
	},
	props: {
		name: {
			type: String,
			required: true
		},
		labelText: {
			type: String,
			default: undefined
		},
		kind: {
			type: String,
			default: undefined
		},
		smallLabelText: {
			default: '',
			type: String
		},
		title: {
			type: String,
			default: 'Choose image'
		},
		showPreview: {
			type: Boolean,
			default: false
		},
		capture: {
			type: [String, Boolean],
			default: false
		},
		accept: {
			type: String,
			default: undefined
		},
		autoRotate: {
			type: Boolean,
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		valid: {
			type: Boolean,
			default: undefined
		},
		doNotResize: {
			type: [String, Array],

			// default: () => ['gif', 'svg', 'svg+xml']
			default: () => []
		},
		errors: {
			type: Array,
			default: () => []
		},
		maxWidth: {
			type: Number,
			default: 1024
		},

		maxHeight: {
			type: Number,
			default: 1024
		},

		maxSize: {
			type: Number,
			default: null
		},

		quality: {
			type: Number,
			default: 0.8
		},

		scaleRatio: {
			type: Number,
			default: null
		},

		outputFormat: {
			type: String,
			default: 'base64'
		},

		storagePath: {
			type: String,
			default: null
		}
	},
	data () {
		return {
			imagePreview: null,
			currentFile: {},
			dimensions: {},
			exifData: {},
			pendingImageUpload: false
		};
	},
	computed: {
		invalid () {
			return this.valid === false;
		}
	},

	methods: {
		uploadFile (event_) {
			let URL = window.webkitURL || window.URL;
			let url = URL.createObjectURL(event_.target.files[0]);
			let img = new Image();

			img.src = url;


			img.onload = () => {
				this.$emit('output', img);
			};
		}
	}
};
</script>

<style scoped>
.file-picker {
	display: inline-block;
	vertical-align: middle;
}

.label {
  display: block;
	position: relative;
  width: auto;
  z-index: 0;
	margin: 0;
  font-size: 1em;
	padding: 4px; /* outline size + outline-offset */
  overflow: hidden;
}

.file-input {
  background: none;
  border: none;
  box-shadow: none;
  padding: 0;
  border-radius: 0;
}

.file-input {
  position: absolute;
  left: 0;
  top: 0;
  font-size: 1000px;
	height: 100%;
	width: 100%;
  padding: 0;
  opacity: 0;
  margin: 0;
  z-index: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.preview-image {
	width: 26em;
	height: 14em;
}

.file-input:hover ~ .button {
  opacity: 0.7;
}

.file-input:active ~ .button {
  translate: translateY(1px);
}

.file-input:focus ~ .button {
  outline: 1px solid rgba(131,192,253,.5);
  outline-offset: 1px;
}
</style>