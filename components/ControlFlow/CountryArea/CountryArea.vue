<template>
	<Fade>
		<Fragment v-if="countryIsAllowed === true">
			<slot />
		</Fragment>
		<Fragment v-else-if="countryIsAllowed === false && $slots.fallback">
			<slot name="fallback" />
		</Fragment>
	</Fade>
</template>

<script>
import countries from './countries';
import Fragment from '../Fragment';

import { Fade } from '~/components/animation';

export default {
	components: {
		Fade,
		Fragment
	},

	props: {
		code: {
			type: String,
			required: true,
			validator: name => Object.values(countries).includes(name)
		}
	},

	data () {
		return {
			countries
		};
	},

	computed: {
		userCountry () {
			return this.$store.getters.userCountryCode;
		},

		countryIsAllowed () {
			if (this.userCountry) {
				return this.code === this.userCountry;
			}
			return null;
		}
	}
};
</script>