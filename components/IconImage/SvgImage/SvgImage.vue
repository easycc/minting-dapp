<template>
	<svg
		ref="svgElem"
		v-bind="svgProps"
		aria-hidden="true"
		focusable="false"
		class="svg-image"
		:width="sizeWidth"
		:height="sizeHeight"
		:viewBox="viewBox"
		:preserveAspectRatio="preserveAspectRatio"
		@click="onClick"
	/>
</template>

<script>
import {
	getProps,
	getInnerSvgDom,
	toSvgDom,
	half
} from './utils';

export default {
	inheritAttrs: false,
	props: {
		src: {
			type: String,
			required: true
		},
		width: {
			type: [String, Number],
			default: ''
		},
		height: {
			type: [String, Number],
			default: ''
		},
		scale: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		svgDom () {
			const DATA_URI_REGEXP = /^data:image\/svg\+xml,/;
			const HASH_TAG_CODE_REGEXP = /%23/g;
			const { src } = this;
			const svgXml = decodeURI(src.replace(DATA_URI_REGEXP, '')).replace(HASH_TAG_CODE_REGEXP, '#');
			const svgDom = toSvgDom(svgXml);

			return svgDom;
		},
		svgInnerDom () {
			const { svgDom } = this;

			return getInnerSvgDom(svgDom);
		},
		svgProps () {
			const { svgDom } = this;

			return getProps(svgDom);
		},
		sizeWidth () {
			const { width, svgProps } = this;
			const { width: originWidth } = svgProps;

			return parseFloat(width || originWidth) || '';
		},
		sizeHeight () {
			const { height, svgProps } = this;
			const { height: originHeight } = svgProps;

			return parseFloat(height || originHeight) || '';
		},
		viewBox () {
			const {
				sizeWidth: width,
				sizeHeight: height,
				scale,
				svgProps
			} = this;
			let { viewBox } = svgProps;

			if (!scale) {
				const offsetLeft = -half(width - parseFloat(svgProps.width)) || 0;
				const offsetTop = -half(height - parseFloat(svgProps.height)) || 0;

				viewBox = `${offsetLeft} ${offsetTop} ${width} ${height}`;
			}
			return viewBox;
		},
		preserveAspectRatio () {
			const { scale } = this;
			const preserveAspectRatio = scale ? 'xMidYMid meet' : 'xMidYMid slice';

			return preserveAspectRatio;
		}
	},
	watch: {
		svgInnerDom (value) {
			const { svgElem } = this.$refs;

			if (svgElem.replaceChildren) { // Modern
				svgElem.replaceChildren(value);
			}
			else { // Older
				svgElem.innerHTML = '';
				svgElem.appendChild(value);
			}
		}
	},
	mounted () {
		const { svgElem } = this.$refs;
		const { svgInnerDom } = this;

		svgElem.appendChild(svgInnerDom);
	},
	methods: {
		onClick () {
			this.$emit('click');
		}
	}
};
</script>