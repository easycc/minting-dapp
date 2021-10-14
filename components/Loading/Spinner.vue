<template>
	<div class="box">
		<div class="spinner">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
</template>

<style scoped>
.box {
	width: 1em;
	height: 1em;
	display: inline-block;
	vertical-align: middle;
}

.box .spinner {
	border: 0.125em solid rgba(0, 0, 0, 0.3);
	border-top-color: #fff;
	animation: spinner 600ms linear infinite;
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

@keyframes spinner {
	to {
		transform: rotate(360deg);
	}
}
</style>