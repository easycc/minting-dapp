<template>
	<DefaultModal v-if="showAvatarConstructor" class="modal" @close="hideAvatarConstructor">
		<BaseForm>
			<h3>
				<template v-if="status === STATUS.CHOOSE_PHOTO">
					Choose your photo
				</template>

				<template v-else-if="status === STATUS.CHOOSE_LAYER">
					Pick your hat below
				</template>

				<template v-else-if="status === STATUS.DRAG_LAYER">
					Tap and Drag the layer
				</template>

				<template v-else-if="status === STATUS.READY_TO_DOWNLOAD">
					Download the photo below
				</template>
			</h3>

			<ClientOnly
				v-if="image"
			>
				<v-stage
					ref="stage"
					class="stage"
					:config="stageSize"
					@dragend="status = STATUS.READY_TO_DOWNLOAD"
					@mousedown="handleStageMouseDown"
					@touchstart="handleStageMouseDown"
				>
					<v-layer>
						<v-image
							:config="{
								image: image,
								width: stageSize.width,
								height: stageSize.height
							}"
						/>
					</v-layer>
					<v-layer ref="layer">
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
			</ClientOnly>

			<Button
				v-if="status === STATUS.READY_TO_DOWNLOAD"
				iconName="check"
				kind="complimentary"
				class="download-button"
				@click="downloadImage"
			>
				Download the photo
			</Button>

			<div v-if="!image">
				<div>
					<Icon name="arrow-bottom" class="tip-icon" />
				</div>

				<FilePicker
					name="avatarImagePicker"
					kind="primary"
					title="Choose a photo"
					class="choose-photo-filepicker"
					output="base64"
					accept=".jpg, .jpeg, .png, .gif, .webp, .bmp, .svg"
					@load="setImage"
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
				output="base64"
				accept=".jpg, .jpeg, .png, .gif, .webp, .bmp, .svg"
				@load="setImage"
			/>
		</BaseForm>
	</DefaultModal>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

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

			image: null,
			layers,
			pickedLayers: [],
			selectedShapeName: '',

			swiperOptions: {
				slidesPerView: 4,
				spaceBetween: 8,
				direction: 'horizontal',
				speed: 800,
				allowTouchMove: true,

				breakpoints: {
					560: {
						spaceBetween: 4,
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

			const verticalPadding = 24;
			let maxWidth = window.innerWidth - verticalPadding;
			let maxHeight = window.innerHeight * 0.7 - verticalPadding;
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
		}
	},

	methods: {
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
				this.pickedLayers = this.pickedLayers.filter(layer => layer.name !== path);
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

			console.log(selectedShapeName);
			console.log(selectedNode);

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

		downloadImage () {
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
	padding-left: 0;
	padding-right: 0;
	max-width: 100%;
	width: 100%;
	min-height: calc(100% - 2rem);
}

.tip-icon {
	opacity: 0.4;
	display: inline-block;
	margin-bottom: 1em;
}

.choose-photo-filepicker {
	margin-bottom: 2rem;
}

.change-photo-filepicker {
	margin-top: 3rem;
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

.layer-pick-button-active:hover {
	box-shadow:
		4px 0px 0px #639BFF,
		-4px 0px 0px #639BFF,
		0px -4px 0px #639BFF,
		0px 4px 0px #639BFF;
}

.download-button {
	margin-bottom: 2rem;
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