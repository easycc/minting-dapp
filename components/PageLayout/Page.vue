<template>
	<div id="start-page-anchor" class="root" :class="{ 'freezed-height-on-mobile': pageHeightFreezed }">
		<Fade>
			<div
				v-if="sidebarOpened && isMobile"
				class="sidebar-background-backdrop"
				tabindex="-1"
				focusable="false"
				@click="toggleSidebar"
			/>
		</Fade>

		<Fade>
			<Props
				:toggleSidebar="toggleSidebar"
				:sidebarOpened="sidebarOpened"
				class="sidebar"
				:class="{ opened: sidebarOpened }"
			>
				<slot v-if="sidebarOpened" name="sidebar" />
			</Props>
		</Fade>

		<Props
			:toggleSidebar="toggleSidebar"
			:sidebarOpened="sidebarOpened"
			class="header"
			@freeze-page-height="freezePageHeight"
		>
			<slot name="header" />
		</Props>

		<main
			:class="['main',
				{
					'main-with-header': $slots.header,
					'main-without-header': !$slots.header
				}, className]"
		>
			<slot />
		</main>

		<Props class="footer">
			<slot name="footer" />
		</Props>
	</div>
</template>

<script>
import '~/styles/fonts.css';

import { Fade } from '~/components/animation';
import { Props } from '~/components/ControlFlow';

export default {
	components: {
		Props,
		Fade
	},

	props: {
		className: {
			type: String,
			default: undefined
		}
	},

	data () {
		const MOBILE_QUERY = 560;
		const TABLET_QUERY = 1080;

		return {
			MOBILE_QUERY,
			TABLET_QUERY,

			sidebarOpened: false,

			pageHeightFreezed: false
		};
	},

	computed: {
		isMobile () {
			return window.innerWidth < this.MOBILE_QUERY;
		}
	},

	watch: {
		$route () {
			if (window.innerWidth < this.TABLET_QUERY && this.sidebarOpened) {
				this.toggleSidebar();
			}
		},

		sidebarOpened () {
			let state = this.sidebarOpened;

			this.freezePageHeight(state);
		}
	},

	mounted () {
		this.onResize();
	},

	destroyed () {
		window.removeEventListener('resize', this.onResize);
	},

	methods: {
		onResize () {
			if (window.innerWidth > this.TABLET_QUERY && this.$slots.sidebar) {
				this.sidebarOpened = true;
			}
		},

		freezePageHeight (state) {
			this.pageHeightFreezed = state;
		},

		toggleSidebar () {
			this.sidebarOpened = !this.sidebarOpened;
		}
	}
};
</script>

<style scoped>
.root {
  min-height: 100vh;
	display: grid;
	grid-template-columns: min-content minmax(0px, 1fr);
	grid-template-rows: auto 1fr;
    grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";

	--header-height: 3.75rem;
}

@media screen and (max-width: 560px) {
	.root.freezed-height-on-mobile {
		max-height: 100vh;
		overflow: hidden;
	}
}

.sidebar {
	grid-area: sidebar;
	width: 18rem;
	height: 100vh;
	position: sticky;
	z-index: 5;
	top: 0;
}

.header {
	grid-area: header;
  z-index: 4;
	position: sticky;
	top: 0;
	left: 0;
}

.main {
	grid-area: main;
}

.main-without-header {
	padding-top: 1rem;
}

.sidebar-background-backdrop {
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	position: fixed;
	z-index: 5;
	top: 0;
	left: 0;
	opacity: 0.85;
	background: var(--color-background-default);
}

.footer {
	grid-area: footer;
}

/*
.page-sidebar {
	z-index: 20;
	max-width: 0;
}

.page-sidebar.opened {
	max-width: var(--sidebar-width);
	width: 100%;
}

.page-sidebar.closed {
	max-width: 0;
	padding: 0;
	overflow: hidden;
}

.page-sidebar, .page-content {
	transition: max-width 0.4s cubic-bezier(0.29, 0.57, 0.54, 1.02), margin-left 0.4s cubic-bezier(0.29, 0.57, 0.54, 1.02);
	display: inline-block;
	vertical-align: top;
	width: 100%;
	font-size: var(--default-font-size);
}

.page-content {
	box-sizing: border-box;
  padding-top: 53px;
	width: 100%;
	position: relative;
	max-width: 100%;
}

.page-content.collapsed {
	max-width: calc(100% - var(--sidebar-width));
}

.sidebar-background-backdrop {
  display: block;
  position: fixed;
  z-index: 19;
  background-color: #c9c9c9;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
} */
</style>