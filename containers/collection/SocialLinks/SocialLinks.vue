<template>
	<ul v-if="socialLinksExists" class="social-links-list">
		<li v-if="socialLinks.facebook" class="social-link-item facebook-link">
			<a
				:href="socialLinks.facebook"
				rel="noopener noreferrer nofollow"
				target="_blank"
			>
				Facebook
			</a>
		</li>
		<li v-if="socialLinks.twitter" class="social-link-item twitter-link">
			<a
				:href="socialLinks.facebook"
				rel="noopener noreferrer nofollow"
				target="_blank"
			>
				Twitter
			</a>
		</li>
		<li v-if="socialLinks.instagram" class="social-link-item instagram-link">
			<a
				:href="socialLinks.instagram"
				rel="noopener noreferrer nofollow"
				target="_blank"
			>
				Instagram
			</a>
		</li>
		<li v-if="socialLinks.youtube" class="social-link-item youtube-link">
			<a
				:href="socialLinks.youtube"
				rel="noopener noreferrer nofollow"
				target="_blank"
			>
				YouTube
			</a>
		</li>
		<li v-if="socialLinks.discord" class="social-link-item discord-link">
			<a
				:href="socialLinks.discord"
				rel="noopener noreferrer nofollow"
				target="_blank"
			>
				Discord
			</a>
		</li>
		<li v-if="socialLinks.openSea" class="social-link-item open-sea-link">
			<a
				:href="socialLinks.openSea"
				rel="noopener noreferrer nofollow"
				target="_blank"
			>
				OpenSea
			</a>
		</li>
	</ul>
</template>

<script>
export default {
	computed: {
		collection () {
			return this.$store.getters['ethereum/collection'];
		},
		socialLinks () {
			return this.collection.socialLinks;
		},
		socialLinksExists () {
			return this.socialLinks && Object.values(this.socialLinks).length;
		}
	}
};
</script>

<style scoped>
.social-links-list {
	list-style: none;
	margin: 0;
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

.instagram-link {
  background-image: url("./icons/instagram.svg");
}

.twitter-link {
  background-image: url("./icons/twitter.svg");
}

.facebook-link {
  background-image: url("./icons/facebook.svg");
}

.youtube-link {
  background-image: url("./icons/youtube.svg");
}

.discord-link {
  background-image: url("./icons/discord.svg");
}

.open-sea-link {
  background-image: url("./icons/open-sea.svg");
}
</style>