let eslint = require('@atomspace/eslint');

module.exports = {
	use: [
		eslint({
			eslint: {
				globals: {
					"window": true,
					"document": true
				},

				rules: {
					"vue/require-name-property": "off",
					"vue/no-unregistered-components": "off",
					"vue/no-reserved-component-names": "off",
					"@getify/proper-arrows/where": "off",
					"func-style": "off",
					"vuejs-accessibility/label-has-for": "off",
					"no-shadow": "off",
					"no-alert": "off",
					"no-console": "off"
				},

				settings: {
					'import/core-modules': [
						'vue'
					],
					'import/resolver': {
						'nuxt-import': {
							'extensions': [".mjs", ".js", ".vue", ".graphql", ".json"]
						}
					}
				},
			}
		})
		// put your rest of presets here
	]
};