<template>
	<DarkTheme>
		<section class="about-us-section">
			<PageContent class="content">
				<h2 class="title">
					About the authors
				</h2>
				<div class="text-wrapper">
					<p>
						Hi!<br />
						Our names are Danya and Nastya.
					</p>

					<p>
						We are 21 years old.
					</p>

					<p>
						We study computer science at the Ukrainian University.
					</p>
					<p>
						We love animals and don't really like circuses, as you understand...
					</p>

					<Button class="create-avatar-button" @click="toggleAvatarConstructor">
						Want an avatar with a hat?
					</Button>
				</div>

				<img
					src="/static/authors.png"
					width="850"
					height="1020"
					alt="Authors in hats"
					class="authors-image"
				/>
			</PageContent>
			<ClientOnly>
				<AvatarConstructor />
			</ClientOnly>
		</section>
	</DarkTheme>
</template>

<script>
import { DarkTheme } from '~/components/Themes';
import { PageContent } from '~/components/PageLayout';
import { Button } from '~/components/buttons';
import { AvatarConstructor } from '~/components/AvatarConstructor';
import { addRouteQuery } from '~/utils/route';

export default {
	components: {
		PageContent,
		AvatarConstructor,
		DarkTheme,
		Button
	},

	methods: {
		toggleAvatarConstructor () {
			addRouteQuery({ showAvatarConstructor: true });
		}
	}
};
</script>

<style scoped>
.about-us-section {
	background-color: #252525;
}

.title {
	text-align: center;
	width: 100%;
	display: block;
}

.text-wrapper {
	padding-right: 1.5rem;
	padding-left: 2rem;
	display: inline-block;
	vertical-align: middle;
	max-width: 30rem;
	margin-right: 5vw;
}

p {
	font-size: calc(1em + 0.5vw);
}

.authors-image {
	display: inline-block;
	vertical-align: middle;
	max-width: 28rem;
	width: 100%;
	height: auto;
	box-shadow:
		12px 0px 0px #111111,
		-12px 0px 0px #111111,
		0px -12px 0px #111111,
		0px 12px 0px #111111,
		inset 0px -12px 0px rgba(17, 17, 17, 0.3);
}

@media screen and (max-width: 1100px) {
	.text-wrapper {
		margin-right: 2vw;
	}

	.authors-image {
		max-width: 20rem;
	}
}

@media screen and (max-width: 900px) {
	p {
		font-size: 1em;
	}
}

.create-avatar-button {
	background-color: #FDDB33;
	color: #111;
	margin-bottom: 2em;
}


@media screen and (max-width: 900px) {
	.content {
		display: flex;
		flex-direction: column;
	}

	.authors-image {
		order: 1;
		margin: 0 auto 2rem;
	}

	.text-wrapper {
		order: 2;
		margin: 0 auto;
	}

	.create-avatar-button {
		margin-top: 1rem;
		margin-bottom: 0;
	}
}


@media screen and (max-width: 900px) {
	.text-wrapper {
		max-width: 100%;
	}
}

</style>