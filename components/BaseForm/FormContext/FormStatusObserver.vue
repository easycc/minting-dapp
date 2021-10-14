<template>
	<StatusContextConsumer v-slot="statusContext">
		<Fragment>
			<slot v-bind="toFormStatus(statusContext)" />
		</Fragment>
	</StatusContextConsumer>
</template>

<script>
import StatusContext from './StatusContext';

import { Fragment } from '~/components/ControlFlow';

const DEFAULT_STATUS = Object.freeze({});

export default {
	name: 'FormStatusObserver',
	components: {
		StatusContextConsumer: StatusContext.Consumer,
		Fragment
	},
	methods: {
		toFormStatus (context) {
			let { status, STATUS } = context;
			let formStatus = DEFAULT_STATUS;

			if (status && STATUS) {
				formStatus = Object.freeze({
					pending: status === STATUS.PENDING,
					submitted: status === STATUS.SUBMITTED,
					failed: status === STATUS.FAILED
				});
			}
			return formStatus;
		}
	}
};
</script>