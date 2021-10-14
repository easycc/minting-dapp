<template>
	<footer class="page-footer">
		<PageContent class="footer-navigation" tag="nav">
			<ul class="links-list">
				<li class="link-item">
					<nuxt-link :to="localePath('/')" :prefetch="false">
						Home
					</nuxt-link>
				</li>

				<li class="link-item">
					<nuxt-link :to="localePath('/legal')" :prefetch="false">
						Terms and conditions
					</nuxt-link>
				</li>
			</ul>

			<ul class="social-links">
				<li class="social-link-item facebook-link">
					<a
						href="https://www.facebook.com/MyLife-109119884750373/"
						rel="noopener noreferrer nofollow"
						target="_blank"
					>
						Facebook
					</a>
				</li>
				<li class="social-link-item twitter-link">
					<a
						href="https://twitter.com/mylife_tech"
						rel="noopener noreferrer nofollow"
						target="_blank"
					>
						Twitter
					</a>
				</li>
				<li class="social-link-item instagram-link">
					<a
						href="https://www.instagram.com/mylife.tech/"
						rel="noopener noreferrer nofollow"
						target="_blank"
					>
						Instagram
					</a>
				</li>
				<li class="social-link-item youtube-link">
					<a
						href="https://www.youtube.com/channel/UCX0n84LkNbublTCgSNfETIQ"
						rel="noopener noreferrer nofollow"
						target="_blank"
					>
						YouTube
					</a>
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

.social-links {
	text-align: right;
  padding-top: 0.75em;
  margin: 0 0 0 1.5em;
}

.social-link-item {
	display: inline-block;
	vertical-align: top;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  overflow: hidden;
  border-radius: 0.188em;
  margin: 0 0.25em;
  background: center / 100% none no-repeat;
}

.social-link-item a {
  color: transparent;
  display: block;
  padding: 0;
  height: 100%;
  width: 100%;
}

.link-item:hover {
  opacity: 0.6;
  transition: opacity var(--smooth-animation);
}

.instagram-link {
  background-image: url("./images/instagram.svg");
}

.twitter-link {
  background-image: url("./images/twitter.svg");
}

.facebook-link {
  background-image: url("./images/facebook.svg");
}

.youtube-link {
  background-image: url("./images/youtube.svg");
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

	.social-links {
		text-align: center;
		margin-left: 0;
		display: block;
		width: 100%;
		padding-top: 0.5em;
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