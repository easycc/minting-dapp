<template>
	<Fade>
		<DefaultModal
			v-if="showLanguageModal"
			class="language-modal"
			:title="$t('components.toggleLanguageModal.title')"
			@close="onClose"
		>
			<FadeUp tag="ul" class="locales-list" group>
				<li
					v-for="locale in locales"
					:key="locale.code || locale"
					class="locale-item"
				>
					<Button
						v-if="link"
						class="locale-link"
						:class="{ active: isActiveLocale(locale.code || locale) }"
						:title="locale.name || locale"
						:iconName="isActiveLocale(locale.code || locale) ? 'check-mark' : null"
						iconPosition="after"

						:link="link(locale.code || locale)"
						@click.native="onLocaleSelect"
					/>

					<Button
						v-if="!link"
						class="locale-button"
						:class="{ active: isActiveLocale(locale.code || locale) }"
						:title="locale.name || locale"
						:iconName="isActiveLocale(locale.code || locale) ? 'check-mark' : null"
						iconPosition="after"

						@click="onLocaleSelect(locale.code || locale)"
					/>
				</li>
			</FadeUp>

			<section v-if="showAddButton && notUsedLocales.length" class="new-locales-section">
				<h3 class="new-locale-title">
					Add language
				</h3>
				<ul class="new-locales-list">
					<li
						v-for="locale in notUsedLocales"
						:key="locale.code"
						class="new-locale-item"
						:value="locale.code"
					>
						<Button
							:title="locale.code"
							class="new-locale-button"
							@click="addLocale(locale.code)"
						/>
					</li>
				</ul>
			</section>
		</DefaultModal>
	</Fade>
</template>

<script>
import DefaultModal from '../DefaultModal/DefaultModal';

import { Button } from '~/components/buttons';
import { FadeUp, Fade } from '~/components/animation';
import { deleteRouteQuery } from '~/utils/route';

export default {
	components: {
		DefaultModal,
		FadeUp,
		Fade,
		Button
	},

	props: {
		locales: {
			type: Array,
			required: true
		},

		activeLocale: {
			type: String,
			default: null
		},

		link: {
			type: [Object, String, Function],
			default: null
		},

		showAddButton: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		showLanguageModal () {
			return this.$route.query.showLanguageModal;
		},

		notUsedLocales () {
			return this.$i18n.locales.filter(locale => this.locales.includes(locale.code) === false);
		}
	},

	methods: {
		onClose () {
			deleteRouteQuery(['showLanguageModal']);
		},

		onLocaleSelect (locale) {
			if (locale) {
				this.$emit('set-locale', locale);
			}
			this.onClose();
		},

		emit (eventName, value) {
			return new Promise(resolve => {
				this.$emit(eventName, value);
				this.$nextTick(resolve);
			});
		},

		isActiveLocale (localeCode) {
			return localeCode === this.activeLocale;
		},

		async addLocale (newLocale) {
			const isLocaleExist = this.locales.some(locale => locale === newLocale);

			if (isLocaleExist === false) {
				await this.emit('add-locale', newLocale);
				this.onLocaleSelect(newLocale);
			}
		}
	}
};
</script>

<style scoped>
.language-modal {
	--modal-width: 320px;
}

.locales-list {
	list-style: none;
	display: block;
	width: 100%;
}

.locale-item {
	margin-bottom: 0.5em;
	display: block;
	width: 100%;
}

.new-locales-section {
	padding-top: 1.5em;
	border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.locale-link, .locale-button {
	display: block;
	width: 100%;
	position: relative;
}

.locale-link ::v-deep .icon,
.locale-button ::v-deep .icon {
	position: absolute;
	right: 0.666em;
	top: 50%;
	transform: translate(0, -50%);
	color: #fff;
	background-color: var(--color-positive);
	padding: 0.33em;
	border-radius: 50%;
	width: 1.5em;
	height: 1.5em;
}

.new-locale-item {
	display: inline-block;
	margin-right: 0.5em;
	margin-bottom: 0.5em;
}

.new-locale-title {
	font-size: 1em;
	font-weight: 400;
	margin: 0 0 0.33em;
}

.new-locale-button {
	display: inline-block;
	padding: 0.5em 0.75em;
}
</style>