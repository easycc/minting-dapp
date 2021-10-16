<template>
	<ClientOnly>
		<notifications
			group="all"
			position="top center"
			class="notification"
			:duration="5000"
		/>
	</ClientOnly>
</template>

<style scoped>
.notification ::v-deep .vue-notification {
	border: 0;
	margin-top: 1em;
	border-radius: 0.5em;
	font-size: 1em;
	padding: 0.75em 1em;
	background-color: transparent;
	position: relative;
}

.notification ::v-deep .vue-notification:after {
	content: '';
	display: block;
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 0;
	top: 0;
	left: 0;
	border-radius: inherit;
	opacity: 0.85;
}

.notification ::v-deep .vue-notification.success:after {
	background-color: var(--color-positive);
}

.notification ::v-deep .vue-notification.warning:after {
	background-color: var(--color-neutral);
}

.notification ::v-deep .vue-notification.error:after {
	background-color: var(--color-negative);
}

.notification ::v-deep .notification-title {
	margin-bottom: 0;
	position: relative;
	z-index: 1;
}

.notification ::v-deep .notification-content {
	font-size: 1em;
	padding-top: 0.25em;
	position: relative;
	z-index: 1;
}
</style>