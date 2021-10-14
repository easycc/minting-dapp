<template>
	<div class="buttons-row">
		<slot />
	</div>
</template>

<style scoped>
.buttons-row {
	font-size: 1rem;
	display: block;
	width: 100%;
	padding-top: 0.66em;

	white-space: nowrap;
	overflow-x: auto;
  overflow-y: hidden;
}

::v-deep .button,
::v-deep .select {
	font-size: 1em;
	padding: 0.375em 0.75em 0.375em 0.75em;
	margin-right: 0.33em;
	display: inline-block;
	vertical-align: middle;
	font-weight: 400;
	background-color: var(--color-background-primary);
	border-radius: 0.429em;
	line-height: 1.5;
}

::v-deep .button.collapsed {
	width: 2.375em;
	height: 2.375em;
}

::v-deep .select {
	padding-right: 1.66em;
	line-height: 1.66;
}

::v-deep .button:not(.collapsed) .icon, ::v-deep:not(.collapsed) .button .emoji {
	font-size: 1.5em;
	margin-left: 0.2em;
	margin-right: -0.125em;
	line-height: 1;
}
</style>