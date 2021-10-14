<template>
	<Fragment v-if="maintenanceDisabled">
		<slot />
	</Fragment>

	<Maintenance v-else />
</template>

<script>
import { Maintenance } from '~/containers';
import { Fragment } from '~/components/ControlFlow';

export default {
	components: {
		Fragment,
		Maintenance
	},

	computed: {
		maintenanceDisabled () {
			return process.env.MAINTENANCE_MODE === 'false';
		}
	}
};
</script>