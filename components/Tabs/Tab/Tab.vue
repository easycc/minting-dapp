<template>
	<TabsContextConsumer v-slot="{ setTabName, activeTabName }">
		<li
			class="tab-item"
			:class="{ active: activeTabName === name }"
			:style="`--current-tab-color: ${activeColor}`"
		>
			<button type="button" class="tab-button" @click="setTabName(name)">
				<EmojiIcon v-if="emojiIconName" :name="emojiIconName" class="tab-icon" />
				<Icon v-if="iconName" :name="iconName" class="tab-icon" />
				<span class="tab-title">{{ title }}</span>
				<slot />
			</button>
		</li>
	</TabsContextConsumer>
</template>

<script>
import TabsContext from '../context/TabsContext';

import { Icon, EmojiIcon } from '~/components/Icon';

export default {
	components: {
		EmojiIcon,
		Icon,
		TabsContextConsumer: TabsContext.Consumer
	},

	props: {
		name: {
			type: String,
			required: true
		},

		title: {
			type: String,
			required: true
		},

		emojiIconName: {
			type: String,
			default: null
		},

		iconName: {
			type: String,
			default: null
		},

		activeColor: {
			type: String,
			default: 'var(--color-compliment-primary)'
		}
	}
};
</script>


<style scoped>
.tab-item {
  display: inline-block;
  vertical-align: bottom;
	background-color: transparent;
  margin: 0 0.5em 0 0;
  font-size: 1em;
}

.tab-button {
  font-size: 1em;
  display: block;
  white-space: nowrap;
  background: transparent;
  box-shadow: none;
  border-radius: 2px 2px 0 0;
  cursor: default;
  transition:
		background-color var(--lazy-animation),
		width var(--lazy-animation),
		border var(--lazy-animation),
		transform var(--lazy-animation);

  border-bottom: var(--current-tab-line-size) solid transparent;
  border-top: 1px solid transparent;

  line-height: 1em;
  font-weight: 400;
  height: 100%;
  padding: 0.5em 0.5em 0.5em 0;
  color: var(--color-text-default);
	opacity: 0.7;
}

.tab-item .tab-button:focus {
	outline: none;
	border-bottom: calc(var(--current-tab-line-size) / 1.5) solid var(--current-tab-color);
}

.tab-item:not(.active):hover .tab-button {
  opacity: 1;
  transform: translateY(1px);
}

.tab-item.active .tab-button {
  color: var(--color-text-primary);
	opacity: 1;
  border-left: none;
  border-right: none;
  border-bottom: var(--current-tab-line-size) solid var(--current-tab-color);
  border-top: 1px solid transparent;
  background-color: transparent;
}

.tab-icon {
	font-size: 1.25em;
	display: inline-block;
	vertical-align: middle;
}

.tab-title {
	display: inline-block;
	vertical-align: middle;
}
</style>