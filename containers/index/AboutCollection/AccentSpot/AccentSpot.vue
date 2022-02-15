<template>
	<div class="accent-spot">
		<div class="accent-spot-content">
			<slot />
		</div>
	</div>
</template>

<script>
export default {

};
</script>

<style scoped>
.accent-spot {
	display: inline-block;
	vertical-align: top;
	position: relative;
	padding: 0 calc(var(--pixel-size) * 6) calc(var(--pixel-size) * 2);
}

.accent-spot:before, .accent-spot:after {
	content: '';
	display: inline-block;
	position: absolute;
	z-index: 1;
	top: calc(var(--pixel-size) * 2);

	height: calc(100% - var(--pixel-size) * 2);
	width: calc(var(--pixel-size) * 9);

	background-image:
		url('./images/left-top-corner.svg'),
		url('./images/left-bottom-corner.svg'),
		linear-gradient(90deg,
			rgba(17, 17, 17, 0) 0%,
			rgba(17, 17, 17, 0) calc(100% - var(--pixel-size) * 5),
			#111 calc(100% - var(--pixel-size) * 5),
			#111 calc(100% - var(--pixel-size) * 4),
			var(--color-accent-primary) calc(100% - var(--pixel-size) * 4),
			var(--color-accent-primary) 100%
		);
	background-size:
		calc(6 * var(--pixel-size)) calc(5 * var(--pixel-size)),
		calc(9 * var(--pixel-size)) calc(5 * var(--pixel-size)),
		100%;
	background-position:
		0 0,
		0 100%,
		0 0;

	background-repeat: no-repeat;
}

.accent-spot:before {
	transform: translate(-100%, 0);
	left: calc(9 * var(--pixel-size)); /* 9 - width of element */
}

.accent-spot:after {
	transform: translate(100%, 0) scale(-1, 1);
	right: calc(9 * var(--pixel-size)); /* 9 - width of element */
}

.accent-spot-content {
	position: relative;
	z-index: 2;
	background-color: var(--color-accent-primary);
	border: var(--pixel-size) solid #111;
	box-shadow: inset 0px -4px 0px rgba(17, 17, 17, 0.3);
	padding: 0.5em;
}
</style>