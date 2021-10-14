<template>
	<div class="bottom-sticky-box">
		<div class="content-wrapper">
			<slot />
		</div>
	</div>
</template>

<style scoped>
.bottom-sticky-box {
  z-index: 10;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
	min-width: 100%;
  display: block;
  text-align: center;
  width: 100%;
  padding: 0 0 1.25em;
}

.bottom-sticky-box:after {
	content: '';
	box-shadow: 0 0px 50px 50px var(--color-background-default);
	z-index: -1;
	position: absolute;
	left: 0;
	display: block;
	width: 100%;
	height: 0;
	bottom: 0;
	transform: translate(0, 100%);
}

.content-wrapper {
	max-width: inherit;
	width: inherit;
	margin: 0 auto;
}
</style>