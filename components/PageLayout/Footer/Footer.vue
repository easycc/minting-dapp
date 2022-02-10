<template>
	<footer class="page-footer">
		<PageContent class="footer-navigation" tag="nav">
			<ul class="links-list">
				<li class="link-item">
					<nuxt-link to="/" :prefetch="false">
						link
					</nuxt-link>
				</li>

				<li class="link-item">
					<nuxt-link to="/legal" :prefetch="false">
						link
					</nuxt-link>
				</li>
			</ul>
		</PageContent>
	</footer>
</template>

<script>
import PageContent from '../PageContent';

export default {
	components: {
		PageContent
	}
};
</script>


<style scoped>
.page-footer {
  width: 100%;
  padding: 0.875em 1rem 1.375em;
  touch-action: manipulation;
  box-sizing: border-box;
  background-color: var(--color-background-default);

  --border-color: #f3f3f3;
}

.footer-navigation {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	align-content: center;
	align-items: flex-start;
	margin-bottom: 0;
}

.social-links {
	text-align: right;
  padding-top: 0.75em;
  margin: 0 0 0 1.5em;
}

@media screen and (max-width: 1080px) {
	.social-links {
		text-align: center;
		margin-left: 0;
		display: block;
		width: 100%;
		padding-top: 0.5em;
	}
}

.links-list {
  margin: 0;
  padding: 0;
  display: inline-block;
  vertical-align: top;
}

.link-item {
  margin: 0;
  padding: 0;
  display: inline-block;
  vertical-align: baseline;
	font-size: 0.875em;
}

.link-item a {
  display: block;
  padding: 1.25em 0.75em;
	padding-left: 0.75em;
  box-sizing: border-box;
	font-weight: 500;
  color: var(--color-text-primary);
	font-size: inherit;
}


/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
.link-item a.nuxt-link-exact-active {
	color: var(--color-text-secondary);
	position: relative;
}

/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
.link-item a.nuxt-link-exact-active:after {
	display: block;
	width: 100%;
	content: '';
	position: absolute;
	width: calc(100% - 1.25em);
	bottom: 0.5em;
	left: 50%;
	transform: translate(-50%, 0);
	height: 1px;
	background-color: currentColor;
	opacity: 0.3;
	border-radius: 1em;
}

@media screen and (max-width: 576px) {
/* eslint-disable-next-line vue-scoped-css/no-unused-selector */
	.link-item a.nuxt-link-exact-active:after {
		display: none;
	}
}

.link-item:last-child a {
	padding-right: 0.25em;
}

.link-item:hover {
  opacity: 0.6;
  transition: opacity var(--smooth-animation);
}


@media screen and (max-width: 1080px) {
  .page-footer {
    padding-top: 1.75em;
  }

	.footer-navigation {
		flex-direction: column;
		text-align: center;
		align-items: center;
		padding: 0;
	}

	.links-list {
		padding-top: 0;
		padding-bottom: 1em;
	}
}

@media screen and (max-width: 576px) {
	.page-footer {
		padding: 1rem 3rem;
	}

	.footer-navigation {
		text-align: left;
	}

	.links-list {
		padding-top: 1rem;
	}

	.footer-navigation {
		align-items: flex-start;
		align-content: flex-start;
	}

	.link-item {
		display: block;
		width: 100%;
		font-size: 1em;
	}

	.link-item a {
		padding-left: 0;
		padding-right: 0;
	}
}

</style>