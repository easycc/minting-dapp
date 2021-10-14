<template>
	<TabsContextProvider :value="{ setTabName, activeTabName }">
		<div class="tabs">
			<div class="tabs-list-wrapper">
				<ul class="tabs-list">
					<slot name="tabs" />
				</ul>
			</div>

			<div class="tabs-content">
				<slot />
			</div>
		</div>
	</TabsContextProvider>
</template>

<script>
import TabsContext from '../context/TabsContext';

import { addRouteQuery } from '~/utils/route';

export default {
	components: {
		TabsContextProvider: TabsContext.Provider
	},

	props: {
		tabsName: {
			type: String,
			required: true
		},

		defaultTabName: {
			type: String,
			required: true
		},

		mode: {
			type: String,
			default: 'local',
			validator: name => ['hash', 'local'].includes(name)
		}
	},

	data () {
		return {
			activeTabName: null
		};
	},

	computed: {
		queryTab () {
			return this.$route.query[this.tabsName];
		}
	},

	watch: {
		queryTab () {
			const { queryTab, mode, defaultTabName, setTabName } = this;

			if (queryTab) {
				if (mode === 'hash' && queryTab) {
					setTabName(queryTab);
				}
				else {
					setTabName(defaultTabName);
				}
			}
		}
	},

	mounted () {
		const { queryTab, mode, defaultTabName, setTabName } = this;

		if (mode === 'hash' && queryTab) {
			setTabName(queryTab);
		}
		else {
			setTabName(defaultTabName);
		}
	},

	methods: {
		setTabName (tabName) {
			let { mode, tabsName } = this;
			let newQuery = {};

			switch (mode) {
				case 'hash':
					newQuery[tabsName] = tabName;
					addRouteQuery(newQuery);
					this.activeTabName = tabName;
					break;

				case 'local':
					this.activeTabName = tabName;
					break;
			}
		}
	}
};
</script>

<style scoped>
.tabs-list-wrapper {
  display: block;
  width: 100%;
	max-width: 100%;
	padding-bottom: 1px;
}

.tabs-list-wrapper:after {
  content: '';
  background-color: currentColor;
	opacity: 0.1;
  width: 100%;
  display: block;
  height: 1px;
  overflow-x: scroll;
}

.tabs-list {
  --current-tab-color: var(--color-compliment-primary);
  --current-tab-line-size: 3px;

	display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
	overflow-x: scroll;
  overflow-y: hidden;

  white-space: nowrap;
  background: transparent;
	width: 0;
	min-width: 100%;
}

.tabs.underline-view .tabs-list {
  padding-left: 0;
}

.tabs-content {
	padding-top: 1.25em;
}

@media screen and (max-width: 768px) {
  .tabs-component.underline-view .tabs-list {
    padding-left: 0;
  }
}

@media screen and (max-width: 576px) {
  .tabs-list-wrapper {
    padding-top: 1em;
  }
}
</style>