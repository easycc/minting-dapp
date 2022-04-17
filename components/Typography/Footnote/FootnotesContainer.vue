<template>
	<FootnotesContextProvider :value="{ footnoteContext }">
		<Props
			class="footnotes-list"
			v-bind="$attrs"
			v-on="$listeners"
		>
			<slot />
		</Props>
	</FootnotesContextProvider>
</template>

<script>
import FootnotesContext from './FootnotesContext';

import { Props } from '~/components/ControlFlow';

export default {
	inheritAttrs: false,

	components: {
		Props,
		FootnotesContextProvider: FootnotesContext.Provider
	},

	data () {
		return {
			footnotes: []
		};
	},

	methods: {
		footnoteContext (footnoteElem) {
			let footnote = footnoteElem[0].text;
			let { footnotes } = this;

			let existFootnoteIndex = footnotes.findIndex(existFootnote => existFootnote === footnote);

			if (existFootnoteIndex >= 0) {
				return {
					index: existFootnoteIndex,
					duplicate: true
				};
			}

			this.footnotes.push(footnote);

			return {
				duplicate: false,
				index: footnotes.length - 1
			};
		}
	}
};
</script>

<style scoped>
.footnotes-list {
	counter-reset: footnotes;
}
</style>