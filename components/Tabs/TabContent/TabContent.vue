<template>
	<TabsContextConsumer v-slot="{ activeTabName }">
		<keep-alive>
			<div v-if="activeTabName === name">
				<slot />
			</div>
		</keep-alive>
	</TabsContextConsumer>
</template>

<script>
import TabsContext from '../context/TabsContext';

export default {
	components: {
		TabsContextConsumer: TabsContext.Consumer
	},

	props: {
		name: {
			type: String,
			required: true
		}
	}
};
</script>