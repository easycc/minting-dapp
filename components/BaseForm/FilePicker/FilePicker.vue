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
		clear () {
			this.imagePreview = undefined;
		},

		uploadFile (event) {
			const file = event.target.files && event.target.files.length ? event.target.files[0] : null;

			if (file) {
				this.emitLoad();
				this.handleFile(file);
			}
		},

		handleFile (file) {
			this.currentFile = file;

			const mimetype = file.type.split('/'); // NB: Not supprted by Safari on iOS !??! @todo: TEST!
			const isImage = mimetype[0] === 'image';
			const doNotResize = typeof this.doNotResize === 'string' ? [this.doNotResize] : this.doNotResize; // cast to array

			// Don't resize if not image or doNotResize is set
			if (!isImage || doNotResize.includes('*') || doNotResize.includes(mimetype[1])) {
				this.emitEvent(file);
			}
			else {
				const that = this;
				const img = document.createElement('img');

				if (!process.client) return;
				const reader = new window.FileReader();

				reader.onload = function (event_) {
					img.src = event_.target.result;
					img.onload = function () {
						// this extracts exifdata if available. Returns an empty object if not
						EXIF.getData(img, function () {
							that.exifData = this.exifdata;
						});

						that.scaleImage(img, that.exifData.Orientation);
					};
				};
				reader.readAsDataURL(file);
			}
		},

		onChange (event_) {
			const file = event_.target.files && event_.target.files.length ? event_.target.files[0] : null;

			if (file) {
				this.handleFile(file);
			}
		},

		emitEvent (rawImage, output) {
			this.$emit('input', rawImage);
			this.$emit('formatted-input', output);
		},

		emitLoad () {
			this.$emit('on-upload');
		},

		scaleImage (img, orientation = 1) {
			let canvas = document.createElement('canvas');

			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');

			ctx.save();

			// Good explanation of EXIF orientation is here http://www.daveperrett.com/articles/2012/07/28/exif-orientation-handling-is-a-ghetto/
			if (this.autoRotate && orientation > 1) {
				const { width } = canvas;
				const styleWidth = canvas.style.width;
				const { height } = canvas;
				const styleHeight = canvas.style.height;

				if (orientation > 4) {
					canvas.width = height;
					canvas.style.width = styleHeight;
					canvas.height = width;
					canvas.style.height = styleWidth;
				}
				switch (orientation) {
					case 2:
						ctx.translate(width, 0);
						ctx.scale(-1, 1);
						break;
					case 3:
						ctx.translate(width, height);
						ctx.rotate(Math.PI);
						break;
					case 4:
						ctx.translate(0, height);
						ctx.scale(1, -1);
						break;
					case 5:
						ctx.rotate(0.5 * Math.PI);
						ctx.scale(1, -1);
						break;
					case 6:
						ctx.rotate(0.5 * Math.PI);
						ctx.translate(0, -height);
						break;
					case 7:
						ctx.rotate(0.5 * Math.PI);
						ctx.translate(width, -height);
						ctx.scale(-1, 1);
						break;
					case 8:
						ctx.rotate(-0.5 * Math.PI);
						ctx.translate(-width, 0);
						break;
				}
			}
			ctx.drawImage(img, 0, 0);
			ctx.restore();

			// Let's find the max available width for scaled image
			const ratio = canvas.width / canvas.height;
			let mWidth = Math.min(this.maxWidth, ratio * this.maxHeight);

			// suggested re-write by https://github.com/ryancramerdesign
			// https://github.com/rossturner/HTML5-ImageUploader/issues/13
			if (this.maxSize > 0 && this.maxSize < (canvas.width * canvas.height) / 1000000) {
				const mSize = Math.floor(Math.sqrt(this.maxSize * ratio) * 1000);

				mWidth = mWidth > 0 ? Math.min(mWidth, mSize) : mSize;
			}

			if (this.scaleRatio) {
				mWidth = Math.min(mWidth, Math.floor(this.scaleRatio * canvas.width));
			}

			// store dimensions
			this.dimensions.orgWidth = canvas.width;
			this.dimensions.orgHeight = canvas.height;
			this.dimensions.width = mWidth;
			this.dimensions.height = Math.floor(mWidth / ratio);

			if (mWidth <= 0) {
				mWidth = 1;
				console.warning('ImageUploader: image size is too small');
			}

			// simple resize with a 2:1 ratio
			while (canvas.width >= 2 * mWidth) {
				canvas = this.getHalfScaleCanvas(canvas);
			}

			if (canvas.width > mWidth) {
				canvas = this.scaleCanvasWithAlgorithm(canvas, mWidth);
			}

			const quality = this.currentFile.type === 'image/jpeg' ? this.quality : 1;
			const imageData = canvas.toDataURL(this.currentFile.type, quality);

			if (typeof this.onScale === 'function') {
				this.onScale(imageData);
			}

			if (this.storagePath && this.outputFormat === 'storage-link') {
				this.uploadImageToStorage(this.currentFile);
			}
			else {
				this.emitEvent(this.currentFile, this.formatOutput(imageData));
			}
		},

		scaleCanvasWithAlgorithm (canvas, maxWidth) {
			const scaledCanvas = document.createElement('canvas');
			const scale = maxWidth / canvas.width;

			scaledCanvas.width = canvas.width * scale;
			scaledCanvas.height = canvas.height * scale;

			const srcImgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
			const destImgData = scaledCanvas.getContext('2d').createImageData(scaledCanvas.width, scaledCanvas.height);

			this.applyBilinearInterpolation(srcImgData, destImgData, scale);

			scaledCanvas.getContext('2d').putImageData(destImgData, 0, 0);

			return scaledCanvas;
		},

		applyBilinearInterpolation (srcCanvasData, destCanvasData, scale) {
			function inner (f00, f10, f01, f11, x, y) {
				const un_x = 1 - x;
				const un_y = 1 - y;

				return f00 * un_x * un_y + f10 * x * un_y + f01 * un_x * y + f11 * x * y;
			}

			let i, j;
			let iyv, iy0, iy1, ixv, ix0, ix1;
			let idxD, idxS00, idxS10, idxS01, idxS11;
			let dx, dy;
			let r, g, b, a;

			for (i = 0; i < destCanvasData.height; ++i) {
				iyv = i / scale;
				iy0 = Math.floor(iyv);

				// Math.ceil can go over bounds
				iy1 = Math.ceil(iyv) > srcCanvasData.height - 1 ? srcCanvasData.height - 1 : Math.ceil(iyv);
				for (j = 0; j < destCanvasData.width; ++j) {
					ixv = j / scale;
					ix0 = Math.floor(ixv);

					// Math.ceil can go over bounds
					ix1 = Math.ceil(ixv) > srcCanvasData.width - 1 ? srcCanvasData.width - 1 : Math.ceil(ixv);
					idxD = (j + destCanvasData.width * i) * 4;

					// matrix to vector indices
					idxS00 = (ix0 + srcCanvasData.width * iy0) * 4;
					idxS10 = (ix1 + srcCanvasData.width * iy0) * 4;
					idxS01 = (ix0 + srcCanvasData.width * iy1) * 4;
					idxS11 = (ix1 + srcCanvasData.width * iy1) * 4;

					// overall coordinates to unit square
					dx = ixv - ix0;
					dy = iyv - iy0;

					// I let the r, g, b, a on purpose for debugging
					r = inner(srcCanvasData.data[idxS00], srcCanvasData.data[idxS10], srcCanvasData.data[idxS01], srcCanvasData.data[idxS11], dx, dy);
					destCanvasData.data[idxD] = r;

					g = inner(srcCanvasData.data[idxS00 + 1], srcCanvasData.data[idxS10 + 1], srcCanvasData.data[idxS01 + 1], srcCanvasData.data[idxS11 + 1], dx, dy);
					destCanvasData.data[idxD + 1] = g;

					b = inner(srcCanvasData.data[idxS00 + 2], srcCanvasData.data[idxS10 + 2], srcCanvasData.data[idxS01 + 2], srcCanvasData.data[idxS11 + 2], dx, dy);
					destCanvasData.data[idxD + 2] = b;

					a = inner(srcCanvasData.data[idxS00 + 3], srcCanvasData.data[idxS10 + 3], srcCanvasData.data[idxS01 + 3], srcCanvasData.data[idxS11 + 3], dx, dy);
					destCanvasData.data[idxD + 3] = a;
				}
			}
		},

		getHalfScaleCanvas (canvas) {
			const halfCanvas = document.createElement('canvas');

			halfCanvas.width = canvas.width / 2;
			halfCanvas.height = canvas.height / 2;

			halfCanvas.getContext('2d').drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);

			return halfCanvas;
		},

		async uploadImageToStorage (imageData) {
			const storageFile
				= this.$fire.storage.ref(`${this.storagePath.toLowerCase()}`).put(imageData, { ...this.currentFile, contentType: this.currentFile.type });

			this.pendingImageUpload = true;

			storageFile.on('state_changed',
				snapshot => {
					let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

					console.log(`Upload is ${progress}% done`);
				},
				error => {
					console.error(error);
				},
				async () => {
					const DOWNLOAD_URL = await storageFile.snapshot.ref.getDownloadURL();

					this.pendingImageUpload = false;

					this.emitEvent(this.currentFile, DOWNLOAD_URL);
				});
		},

		formatOutput (imageData) {
			if (this.showPreview) {
				this.imagePreview = imageData;
			}

			if (this.outputFormat === 'base64') {
				return imageData;
			}

			if (this.outputFormat === 'file') {
				return this.currentFile;
			}

			// if (this.outputFormat === 'blob') {
			// 	if (typeof canvasToBlob === 'undefined') {
			// 		console.warn('Missing library! blueimp-canvas-to-blob.js must be loaded to output as "blob"');
			// 		console.warn('Falling back to default base64 dataUrl');
			// 		return imageData;
			// 	}
			// 	return canvasToBlob(imageData);
			// }

			const info = {
				name: this.currentFile.name,
				type: this.currentFile.type,

				// size: this.currentFile.size,
				newWidth: this.dimensions.width,
				newHeight: this.dimensions.height,
				orgWidth: this.dimensions.orgWidth,
				orgHeight: this.dimensions.orgHeight,
				aspectRatio: Math.round((this.dimensions.width / this.dimensions.height) * 100) / 100, // as Float
				modifiedTimestamp: this.currentFile.lastModified,
				modifiedDate: this.currentFile.lastModifiedDate
			};

			// return just info
			if (this.outputFormat === 'info') {
				return info;
			}

			if (this.outputFormat === 'verbose') {
				const data = {
					dataUrl: imageData,
					info,
					exif: Object.keys(this.exifData).length > 0 ? this.exifData : null
				};

				return data;
			}

			return imageData;
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
	padding: 2px; /* outline size + outline-offset */
  overflow: hidden;
}

.button {
	font-size: 1rem;
	padding: 0.375em 0.75em 0.375em 0.75em;
	font-weight: 400;
	border-radius: 0.429em;
	line-height: 1.5;
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