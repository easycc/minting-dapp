<template>
	<component
		:is="tag"
		:class="['button', `button-${kind}`, { 'collapsed': collapsed }]"
		:href="href"
		:type="computedType"

		:to="link"
		:disabled="disabled || showSpinner"
		:prefetch="prefetch"
		@click="onClick"
	>
		<div class="button-content" :class="{ 'hidden': showSpinner }">
			<template v-if="iconPosition === 'before'">
				<Icon v-if="iconName" :name="iconName" class="icon" />
				<EmojiIcon v-if="emojiIconName" :name="emojiIconName" class="emoji" />
			</template>

			<template v-if="beforeText">
				<slot name="beforeText" />
			</template>

			<span class="title" :class="{ 'single': titleIsSingle }">
				{{ title }}
				<slot />
			</span>

			<template v-if="afterText">
				<slot name="afterText" />
			</template>

			<template v-if="iconPosition === 'after'">
				<Icon v-if="iconName" :name="iconName" class="icon" />
				<EmojiIcon v-if="emojiIconName" :name="emojiIconName" class="emoji" />
			</template>
		</div>
		<Spinner v-if="showSpinner" class="loading-spinner" />
	</component>
</template>

<script>
import { Spinner } from '~/components/Loading';
import { Icon, EmojiIcon } from '~/components/Icon';

export default {
	components: {
		Spinner,
		Icon,
		EmojiIcon
	},

	props: {
		// default
		title: {
			type: [String, Number],
			default: ''
		},
		iconName: {
			type: String,
			default: null
		},
		emojiIconName: {
			type: String,
			default: null
		},
		iconPosition: {
			type: String,
			default: 'after',
			validator: name => ['before', 'after'].includes(name)
		},
		kind: {
			type: String,
			default: 'default',
			validator: name => ['primary', 'complimentary', 'default'].includes(name)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		showSpinner: {
			type: Boolean,
			default: false
		},

		// <nuxt-link>
		link: {
			type: [Object, String],
			default: undefined
		},
		prefetch: {
			type: Boolean,
			default: undefined
		},

		// <a>
		href: {
			type: String,
			default: null
		},

		// <button>
		collapsed: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'button'
		}
	},

	computed: {
		tag () {
			if (this.link) {
				return 'nuxt-link';
			}
			if (this.href) {
				return 'a';
			}

			return 'button';
		},

		computedType () {
			if (this.link || this.href) {
				return;
			}

			return this.type;
		},

		beforeText () {
			return this.$slots.beforeText;
		},

		afterText () {
			return this.$slots.afterText;
		},

		titleIsSingle () {
			const { emojiIconName, beforeText, afterText, iconName } = this;

			return !beforeText && !afterText && !iconName && !emojiIconName;
		}
	},

	methods: {
		onClick (event) {
			this.$emit('click', event);
		}
	}
};
</script>

<style scoped>
.button {
	font-size: 1em;
	display: inline-block;
	vertical-align: baseline;
  padding: 0.5em 1em;
	text-align: center;
	box-sizing: border-box;
	background: var(--color-background-primary);
	color: var(--color-text-primary);
	border-radius: 0;
	border: none;
	font-weight: 400;
	position: relative;
	transition:
		opacity var(--smooth-animation),
		background-color var(--smooth-animation),
		transform var(--smooth-animation),
		background-image var(--smooth-animation);
	box-shadow: var(--pixel-shadow);
}

.button-primary.button-primary {
	background-color: var(--color-accent-primary);
	color: #fff;
}

.button-complimentary.button-complimentary {
	background-color: var(--color-compliment-primary);
	color: #fff;
}

.button:hover {
	background-color: var(--color-background-secondary);
}

.button:active {
	box-shadow: var(--pixel-shadow-active);
}

.button-primary:hover {
	background-color: var(--color-accent-secondary);
}

.button-complimentary:hover {
	background-color: var(--color-compliment-secondary);
}

.button:focus:hover {
	outline: none;
}

.button-content {
	white-space: nowrap;
}

.button-content.hidden {
	opacity: 0;
}

.title {
	line-height: 1.45;
	white-space: initial;
}

.title.single {
	display: block;
}

a[disabled="disabled"] {
	pointer-events: none;
	cursor: not-allowed;
	opacity: 0.8;
}

button:disabled {
	opacity: 0.8;
	cursor: not-allowed;
	background-image:
		repeating-linear-gradient(45deg,
			rgb(255, 255, 255, 0.2) 0%,
			rgb(255, 255, 255, 0.2) 10%,
			rgb(255, 255, 255, 0) 10%,
			rgb(255, 255, 255, 0) 20%
		);
}

.emoji {
	font-size: 1.333em;
	line-height: 1;
}

.icon {
	font-size: 1em;
	line-height: 1;
	color: inherit;
}

.title + .icon {
	margin-left: 0.25em;
}

.icon + .title {
	margin-left: 0.25em;
}

.button-content > * {
	display: inline-block;
	vertical-align: middle;
}

.loading-spinner {
	display: inline-block;
	vertical-align: middle;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	font-size: 1.5em;
}


.collapsed {
	width: 2.75em;
	height: 2.75em;
	padding: 0;
	position: relative;
	text-align: center;
	overflow: hidden;
}

.collapsed .emoji, .collapsed .icon {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	margin: 0;
}

.collapsed .emoji {
	font-size: 1.5em;
}

.collapsed .icon {
	font-size: 1.2em;
}

.collapsed .title {
	opacity: 0;
	text-indent: 20em;
	overflow: hidden;
}
</style>