<template>
	<Fragment>
		<FootnotesContextConsumer v-slot="{ footnoteContext: getFootnoteOptions }">
			<sup class="footnote-symbol"><a
				:id="`footnote-symbol-${counter}`"
				v-scroll-to="{
					el: `#footnote-${counter}`,
					duration: 1000
				}"
				:href="`#footnote-${counter}`"
				aria-describedby="footnote-label"
			>{{ counter }}</a>
			</sup>

			<Portal to="footnote">
				<ClientOnly>
					<Element @mounted="setFootnote(getFootnoteOptions)" />
				</ClientOnly>
				<li
					v-if="!duplicate"
					:id="`footnote-${counter}`"
					class="footnote-item"
				>
					<slot />
					<a
						aria-label="Back to content"
						:href="`#footnote-symbol-${counter}`"
						v-scroll-to="{
							el: `#footnote-symbol-${counter}`,
							duration: 1000,
							offset: -160
						}"
					>↩</a>
				</li>
			</Portal>
		</FootnotesContextConsumer>
	</Fragment>
</template>

<script>
import { Portal } from 'portal-vue';

import FootnotesContext from './FootnotesContext';

import { Element } from '~/components/EventListener';
import { Fragment } from '~/components/ControlFlow';

export default {
	components: {
		Portal,
		Fragment,
		Element,
		FootnotesContextConsumer: FootnotesContext.Consumer
	},

	data () {
		return {
			index: 0,
			duplicate: false
		};
	},

	computed: {
		counter () {
			return this.index + 1;
		}
	},

	methods: {
		setFootnote (getFootnoteOptions) {
			let footnoteContext = getFootnoteOptions(this.$slots.default);

			this.index = footnoteContext.index;
			this.duplicate = footnoteContext.duplicate;
		}
	}
};
</script>

<style scoped>
.footnote-symbol {
	color: inherit;
}

.footnote-item {
	width: 100%;
	margin-bottom: 0.5em;
	font-size: 0.75rem;
	color: var(--color-text-default);
	list-style: decimal inside;
}

.footnote-item:first-child {
	padding-top: 2em;
}

.footnote-item:last-child {
	padding-bottom: 2em;
	border-bottom: 1px solid var(--color-background-primary);
	margin-bottom: 1em;
}

a {
	color: inherit;
}

.footnote-item a {
	display: none;
}

.footnote-item:hover a {
	display: inline;
}
</style>