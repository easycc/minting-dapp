<template>
	<DarkTheme>
		<section class="about-us-section">
			<PageContent>
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
			<AvatarConstructor />
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
	padding-top: 4rem;
	padding-bottom: 4rem;
	background-color: var(--color-background-default);
}

.title {
	text-align: center;
	width: 100%;
	display: block;
}

.text-wrapper {
	padding-right: 4rem;
	display: inline-block;
	vertical-align: middle;
	max-width: 30rem;
}

p {
	font-size: calc(1.25em + 0.05vw);
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

.create-avatar-button {
	background-color: #FDDB33;
	color: #111;
}
</style>