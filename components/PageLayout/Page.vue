<template>
	<FootnotesContainer>
		<div id="start-page-anchor" class="root">
			<ClientOnly>
				<Window :onResize="handleResize" />
			</ClientOnly>
			<Fade>
				<LockLayer
					v-if="sidebarOpened && isMobile"
					:onClick="toggleSidebar"
					class="lock-layer"
				/>
			</Fade>

			<Fade>
				<LockLayer
					v-if="headerOpened && isMobile"
					:onClick="toggleHeader"
					class="lock-layer"
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
				:toggleHeader="toggleHeader"
				:headerOpened="headerOpened"
				:toggleSidebar="toggleSidebar"
				:sidebarOpened="sidebarOpened"
				class="header"
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
	</FootnotesContainer>
</template>

<script>
import '~/styles/fonts.css';

import { Fade } from '~/components/animation';
import { Props } from '~/components/ControlFlow';
import { LockLayer } from '~/components/Layer';
import { Window } from '~/components/EventListener';
import { FootnotesContainer } from '~/components/Typography';

export default {
	components: {
		FootnotesContainer,
		Props,
		Fade,
		Window,
		LockLayer
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
			headerOpened: false
		};
	},

	computed: {
		isMobile () {
			if (!process.client) return false;
			return window.innerWidth < this.MOBILE_QUERY;
		}
	},

	watch: {
		$route () {
			if (!process.client) return;
			if (window.innerWidth < this.TABLET_QUERY && this.sidebarOpened) {
				this.toggleSidebar();
			}
		}
	},

	mounted () {
		this.handleResize();
	},

	methods: {
		handleResize () {
			if (!process.client) return;

			if (window.innerWidth > this.TABLET_QUERY && this.$slots.sidebar) {
				this.sidebarOpened = true;
			}

			if (process.client && window.innerWidth > this.MOBILE_QUERY) {
				this.toggleHeader(true);
			}
			else {
				this.toggleHeader(false);
			}
		},

		toggleSidebar () {
			this.sidebarOpened = !this.sidebarOpened;
		},

		toggleHeader (state) {
			if (!process.client) return;

			if (typeof state === 'boolean') {
				this.headerOpened = state;
			}
			else if (process.client && window.innerWidth < this.MOBILE_QUERY) {
				this.headerOpened = !this.headerOpened;
			}
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

	--header-height: 3.5rem;
}

.sidebar {
	grid-area: sidebar;
	width: 18rem;
	height: 100vh;
	position: sticky;
	z-index: 10;
	top: 0;
}

.header {
	grid-area: header;
  z-index: 10;
	position: sticky;
	top: 0;
	left: 0;
}

.main {
	grid-area: main;
}

.main-without-header {
	/* padding-top: 1rem; */
}

.footer {
	grid-area: footer;
}

.lock-layer:after {
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	background-color: #111;
	z-index: 0;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0.05;
	border-radius: inherit;
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