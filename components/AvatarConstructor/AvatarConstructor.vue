<template>
	<DefaultModal
		v-if="showAvatarConstructor"
		class="modal"
		:title="title"
		:onResizeEnd="setViewportSize"
		@close="hideAvatarConstructor"
	>
		<BaseForm>
			<Button
				v-if="status === STATUS.READY_TO_DOWNLOAD"
				iconName="check"
				kind="complimentary"
				class="download-button"
				@click="downloadImage"
			>
				Download
			</Button>

			<ClientOnly
				v-if="image"
			>
				<div class="canvas">
					<Button
						v-if="selectedShapeName"
						collapsed
						title="Delete layer"
						iconName="bucket"
						class="delete-layer-button"
						@click="deleteLayer(selectedShapeName)"
					/>

					<v-stage
						ref="stage"
						class="stage"
						:config="stageSize"
						@dragend="status = STATUS.READY_TO_DOWNLOAD"
						@mousedown="handleStageMouseDown"
						@touchstart="handleStageMouseDown"
					>
						<v-layer
							v-if="image"
							ref="layer"
						>
							<v-image
								:config="{
									x: 0,
									y: 0,
									width: stageSize.width,
									height: stageSize.height,
									image,
									draggable: false,
									rotation: 0
								}"
							/>
						</v-layer>
						<v-layer>
							<template v-if="pickedLayersExist">
								<v-image
									v-for="pickedLayer in pickedLayers"
									:key="pickedLayer.name"
									:config="pickedLayer"
									@transformend="handleTransformEnd"
								/>
							</template>
							<v-transformer ref="transformer" />
						</v-layer>
					</v-stage>
				</div>
			</ClientOnly>

			<div v-if="!image">
				<div>
					<Icon name="arrow-bottom" class="tip-icon" />
				</div>

				<FilePicker
					name="avatarImagePicker"
					kind="primary"
					title="Choose a photo"
					class="choose-photo-filepicker"

					accept=".jpg, .jpeg, .png, .gif, .webp, .bmp, .svg, .heic"
					outputFormat="dom-image"
					@output="setImage"
				/>
			</div>

			<div class="slider-wrapper">
				<Swiper
					:options="swiperOptions"
					class="layers-list"
					:class="{ 'layers-list-disabled': !image }"
				>
					<SwiperSlide
						v-for="layer in layers"
						:key="layer"
						class="slide"
					>
						<Button
							class="layer-pick-button"
							:class="{ 'layer-pick-button-active': pickedLayers.some(pickedLayer => pickedLayer.name === layer) }"
							@click="pickLayer(layer)"
						>
							<img :src="layer" :alt="`${layer} layer`" class="layer-image" />
						</Button>
					</SwiperSlide>

					<template v-slot:button-prev>
						<ButtonPrev class="slide-button-prev" />
					</template>

					<template v-slot:button-next>
						<ButtonNext class="slide-button-next" />
					</template>
				</Swiper>
			</div>


			<FilePicker
				v-if="status !== STATUS.CHOOSE_PHOTO"
				name="avatarImagePicker"
				title="Change a photo"
				class="change-photo-filepicker"

				accept=".jpg, .jpeg, .png, .gif, .webp, .bmp, .svg, .heic"
				outputFormat="dom-image"
				@output="setImage"
			/>
		</BaseForm>
	</DefaultModal>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';

import 'swiper/css/swiper.css';

// import Konva from 'konva';

import layers from './layers';
import { downloadURI } from './utils';

import { ButtonPrev, ButtonNext } from '~/components/Slider';
import { DefaultModal } from '~/components/modals';
import { Button } from '~/components/buttons';
import { Icon } from '~/components/Icon';
import { deleteRouteQuery } from '~/utils/route';
import {
	BaseForm,
	FilePicker
} from '~/components/BaseForm';


export const STATUS = Object.freeze({
	CHOOSE_PHOTO: 'CHOOSE_PHOTO',
	CHOOSE_LAYER: 'CHOOSE_LAYER',
	DRAG_LAYER: 'DRAG_LAYER',
	READY_TO_DOWNLOAD: 'READY_TO_DOWNLOAD'
});

export default {
	components: {
		DefaultModal,
		BaseForm,
		Swiper,
		SwiperSlide,
		FilePicker,
		ButtonPrev,
		ButtonNext,
		Button,
		Icon
	},

	directives: {
		swiper: directive
	},

	data () {
		return {
			STATUS,
			status: STATUS.CHOOSE_PHOTO,

			image: undefined,
			layers,
			pickedLayers: [],
			selectedShapeName: '',
			windowHeight: 0,
			windowWidth: 0,

			swiperOptions: {
				slidesPerView: 4,
				spaceBetween: 0,
				direction: 'horizontal',
				speed: 800,
				allowTouchMove: true,

				breakpoints: {
					560: {
						allowTouchMove: false
					}
				},

				navigation: {
					prevEl: '.slide-button.prev',
					nextEl: '.slide-button.next'
				}
			}
		};
	},

	computed: {
		showAvatarConstructor () {
			return this.$route.query.showAvatarConstructor;
		},

		pickedLayersExist () {
			return Boolean(this.pickedLayers.length);
		},


		stageSize () {
			if (!this.image) return;

			let { height, width } = this.image;
			let { windowHeight, windowWidth } = this;

			let maxWidth = windowWidth;
			let maxHeight = windowHeight * 0.7;
			let ratio = 0;

			if (width > maxWidth) {
				ratio = maxWidth / width;
				height *= ratio;
				width = maxWidth;
			}

			if (height > maxHeight) {
				ratio = maxHeight / height;
				width *= ratio;
				height = maxHeight;
			}

			return {
				width,
				height
			};
		},

		title () {
			let { status } = this;

			let title;

			switch (status) {
				case STATUS.CHOOSE_PHOTO:
					title = 'Choose your photo';
					break;

				case STATUS.CHOOSE_LAYER:
					title = 'Pick your hat below';
					break;

				case STATUS.DRAG_LAYER:
					title = 'Tap and Drag the layer';
					break;
			}

			return title;
		}
	},

	methods: {
		setViewportSize (event) {
			if (!this.windowWidth || !this.windowHeight) {
				this.windowWidth = event.contentBox.width;
				this.windowHeight = window.innerHeight;
			}
		},

		hideAvatarConstructor () {
			deleteRouteQuery(['showAvatarConstructor']);
		},

		pickLayer (path) {
			let { pickedLayersExist } = this;
			let layerExist = Boolean(this.pickedLayers.find(layer => layer.name === path));

			if (layerExist) {
				let theLastLayer = this.pickedLayers.length === 1;

				if (theLastLayer) {
					this.status = this.STATUS.CHOOSE_LAYER;
				}

				this.deleteLayer(path);
			}

			else {
				let image = new Image();

				image.src = path;

				if (!pickedLayersExist) {
					this.status = this.STATUS.DRAG_LAYER;
				}

				let pickedLayer = {
					image,
					name: path,
					x: 100,
					y: 100,
					scaleX: 1,
					scaleY: 1,
					width: 120,
					height: 120,
					draggable: true
				};

				this.pickedLayers.push(pickedLayer);
			}
		},

		setImage (image) {
			this.image = image;


			this.status = this.STATUS.CHOOSE_LAYER;
		},

		deleteLayer (path) {
			this.pickedLayers = this.pickedLayers.filter(layer => layer.name !== path);
			this.resetTransformer();
			this.selectedShapeName = undefined;
		},


		handleTransformEnd (event_) {
			const rect = this.pickedLayers.find(
				r => r.name === this.selectedShapeName
			);

			rect.x = event_.target.x();
			rect.y = event_.target.y();
			rect.rotation = event_.target.rotation();
			rect.scaleX = event_.target.scaleX();
			rect.scaleY = event_.target.scaleY();
		},

		handleStageMouseDown (event_) {
			if (event_.target === event_.target.getStage()) {
				this.selectedShapeName = '';
				this.updateTransformer();
				return;
			}

			const clickedOnTransformer
				= event_.target.getParent().className === 'Transformer';

			if (clickedOnTransformer) {
				return;
			}

			const name = event_.target.name();
			const rect = this.pickedLayers.find(r => r.name === name);

			if (rect) {
				this.selectedShapeName = name;
			}
			else {
				this.selectedShapeName = '';
			}
			this.updateTransformer();
		},

		updateTransformer () {
			const transformerNode = this.$refs.transformer.getNode();
			const stage = transformerNode.getStage();
			const { selectedShapeName } = this;

			const selectedNode = stage.findOne(`.${selectedShapeName}`);

			if (selectedNode === transformerNode.node()) {
				return;
			}

			if (selectedNode) {
				transformerNode.nodes([selectedNode]);
			}
			else {
				transformerNode.nodes([]);
			}
		},

		resetTransformer () {
			const transformerNode = this.$refs.transformer.getNode();

			transformerNode.nodes([]);
		},

		downloadImage () {
			this.resetTransformer();

			let stage = this.$refs.stage.getNode();
			let dataURL = stage.toDataURL({ pixelRatio: 2 });

			downloadURI(dataURL, 'stage.png');
		}
	}
};
</script>

<style scoped>
.modal {
	text-align: center;
}

.modal >>> .content-wrapper {
	padding-top: 5rem;
	margin-top: 0.5em;
	max-width: 40rem;
	width: 100%;
}

@media screen and (max-width: 576px) {
	.modal >>> .content-wrapper {
		max-width: 100%;
		width: 100%;
		min-height: calc(100% - 2rem);
		padding-left: 0;
		padding-right: 0;
	}
}

.tip-icon {
	opacity: 0.4;
	display: inline-block;
	margin-bottom: 1em;
	animation: bounce 0.75s infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-40%);
  }
  100% {
    transform: translateY(0);
  }
}

.choose-photo-filepicker {
	margin-bottom: 2rem;
}

.canvas {
	position: relative;
}

.delete-layer-button {
	position: absolute;
	width: 2em;
	height: 2em;
	left: 50%;
	transform: translate(-50%, 0);
	z-index: 1;
	bottom: 1em;
}

.stage {
	margin-bottom: 1em;
}

.stage >>> .konvajs-content {
	margin-left: auto;
	margin-right: auto;
}


.slider-wrapper {
	position: relative;
	background-color: var(--color-background-default);
	padding-bottom: 2rem;
}

@media screen and (max-width: 576px) {
	.slider-wrapper {
		position: sticky;
		bottom: 0;
	}
}

.layers-list {
	padding: 4px 0;
}

.layers-list-disabled {
	pointer-events: none;
	opacity: 0.4;
}

.slide {
	width: 6rem;
	height: 6rem;
	max-width: 6rem;
}

.layer-image {
	width: 100%;
	display: block;
	height: auto;
}

.layer-pick-button {
	padding: 0;
	width: 100%;
	height: inherit;
	box-shadow: none;
	background: none;
	transition: initial;
}

.layer-pick-button:hover {
	box-shadow:
		4px 0px 0px var(--color-background-primary),
		-4px 0px 0px var(--color-background-primary),
		0px -4px 0px var(--color-background-primary),
		0px 4px 0px var(--color-background-primary);
}

.layer-pick-button-active {
	box-shadow:
		4px 0px 0px #639BFF,
		-4px 0px 0px #639BFF,
		0px -4px 0px #639BFF,
		0px 4px 0px #639BFF;
}

.layer-pick-button-active:hover, .layer-pick-button-active:focus:hover {
	box-shadow:
		4px 0px 0px #639BFF,
		-4px 0px 0px #639BFF,
		0px -4px 0px #639BFF,
		0px 4px 0px #639BFF;
}

.download-button {
	margin-bottom: 2rem;
	position: absolute;
	left: 0.75em;
	top: 1em;
	padding-top: 0.25em;
	padding-bottom: 0.25em;
}

.slide-button-prev {
	left: 4px;
}
.slide-button-next {
	right: 4px;
}


@media screen and (max-width: 576px) {
	.slide-button-prev {
		left: 0.5em;
	}
	.slide-button-next {
		right: 0.5em;
	}
}
</style>