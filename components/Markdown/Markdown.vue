<template>
	<div v-html="$md.render(text)" />
</template>

<script>

export default {
	props: {
		text: {
			type: String,
			default: null
		}
	}
};
</script>


<style scoped>
::v-deep p {
	margin-bottom: 1.5em;
	font-size: 1em;
}

::v-deep h3 {
	font-size: 1em;
	font-weight: 400;
	margin-bottom: 0.25em;
}

::v-deep ul {
	list-style: none;
	padding: 1.25em 1.5em 1.25em 1.25em;
	max-width: 22em;
	margin: 0 auto;
	text-align: left;
	border-radius: 0.5em;
	position: relative;
}

::v-deep ul * {
	position: relative;
	z-index: 2;
}

::v-deep ul:after {
	content: '';
	display: block;
	z-index: 1;
	border-radius: inherit;
	width: 100%;
	height: 100%;
	opacity: 0.5;
	left: 0;
	top: 0;
	position: absolute;
	background-color: var(--color-background-secondary);
}

::v-deep li {
	color: var(--color-text-primary);
	font-size: 1.125rem;
	font-weight: 400;
	margin: 0 0 0.5em;
	position: relative;
	padding: 0 0 0 1.5em;
	line-height: 1.25;
}

::v-deep li:last-child {
	margin-bottom: 0;
}

::v-deep li:before {
	font-size: 1em;
	position: absolute;
	left: 0;
	top: 0.066em;
	content: '';
	background-image: url('./images/check-mark.svg');
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	width: 1em;
	height: 1em;
	margin-right: 0.125em;
}
</style>