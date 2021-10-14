<template>
	<div class="message-group">
		<slot />
	</div>
</template>

<style scoped>
::v-deep .message:first-child {
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}

::v-deep .message + .message:not(:last-child) {
	border-radius: 0;
}

::v-deep .message:last-child {
	border-top-right-radius: 0;
	border-top-left-radius: 0;
}

::v-deep .message:not(:last-child) {
	margin-bottom: 0;
}
</style>