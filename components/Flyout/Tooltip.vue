<template>
	<ToggleFlyout>
		<Props :class="$vnode.data.staticClass">
			<FlyoutBox
				v-bind="$attrs"
				role="tooltip"
				v-on="$listeners"
			>
				<slot />
			</FlyoutBox>
		</Props>

		<template v-slot:trigger>
			<slot name="trigger" />
		</template>
	</ToggleFlyout>
</template>


<script>
import ToggleFlyout from './ToggleFlyout';
import FlyoutBox from './FlyoutBox';

import { Props } from '~/components/ControlFlow';

export default {
	inheritAttrs: false,

	components: {
		Props,
		ToggleFlyout,
		FlyoutBox
	}
};
</script>