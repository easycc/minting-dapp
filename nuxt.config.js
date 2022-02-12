export default {
	'ssr': true,

	'env': {
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
		MAINTENANCE_MODE: process.env.MAINTENANCE_MODE
	},

	'head': {
		title: 'Minting dapp',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5 shrink-to-fit=no' },
			{ hid: 'description', name: 'description', content: 'Minting dapp.' },

			{ name: 'msapplication-TileColor', content: '#ffffff' },
			{ name: 'msapplication-TileImage', content: './favicon/ms-icon-144x144.png' },
			{ name: 'theme-color', content: '#ffffff' }
		],
		link: [
			// { rel: 'apple-touch-icon', sizes: '57x57', type: 'image/x-icon', href: './favicon/apple-icon-57x57.png' },
			// { rel: 'apple-touch-icon', sizes: '60x60', type: 'image/x-icon', href: './favicon/apple-icon-60x60.png' },
			// { rel: 'apple-touch-icon', sizes: '72x72', type: 'image/x-icon', href: './favicon/apple-icon-72x72.png' },
			// { rel: 'apple-touch-icon', sizes: '76x76', type: 'image/x-icon', href: './favicon/apple-icon-76x76.png' },
			// { rel: 'apple-touch-icon', sizes: '114x114', type: 'image/x-icon', href: './favicon/apple-icon-114x114.png' },
			// { rel: 'apple-touch-icon', sizes: '120x120', type: 'image/x-icon', href: './favicon/apple-icon-120x120.png' },
			// { rel: 'apple-touch-icon', sizes: '144x144', type: 'image/x-icon', href: './favicon/apple-icon-144x144.png' },
			// { rel: 'apple-touch-icon', sizes: '152x152', type: 'image/x-icon', href: './favicon/apple-icon-152x152.png' },
			// { rel: 'apple-touch-icon', sizes: '180x180', type: 'image/x-icon', href: './favicon/apple-icon-180x180.png' },
			// { rel: 'apple-touch-icon', sizes: '192x192', type: 'image/png', href: './favicon/android-icon-192x192.png' },
			// { rel: 'apple-touch-icon', sizes: '32x32', type: 'image/png', href: './favicon/android-icon-32x32.png' },
			// { rel: 'apple-touch-icon', sizes: '96x96', type: 'image/png', href: './favicon/android-icon-96x96.png' },
			// { rel: 'apple-touch-icon', sizes: '16x16', type: 'image/png', href: './favicon/android-icon-16x16.png' },
			// { rel: 'manifest', href: './favicon/manifest.json' },

			// { rel: 'icon', sizes: '16x16', type: 'image/x-icon', href: './favicon/apple-icon-16x16.png' },
			// { rel: 'icon', sizes: '24x24', type: 'image/x-icon', href: './favicon/apple-icon-24x24.png' },
			// { rel: 'icon', sizes: '32x32', type: 'image/x-icon', href: './favicon/apple-icon-32x32.png' },
			// { rel: 'icon', sizes: '64x64', type: 'image/x-icon', href: './favicon/apple-icon-64x64.png' },
			// { rel: 'icon', sizes: '128x128', type: 'image/x-icon', href: './favicon/apple-icon-128x128.png' }
		]
	},

	'css': [
		'~/styles/variables.css',
		'normalize.css/normalize.css',
		'~/styles/typography.css'
	],

	'loading': { color: '#007AFE' },

	'plugins': [
		{ src: '~/plugins/theme-context' },
		{ src: '~/plugins/konva', mode: 'client' },
		{ ssr: false, src: '~/plugins/notifications' }
	],

	'buildModules': [
		'@nuxtjs/dotenv',
		'@nuxtjs/moment',
		'@nuxtjs/markdownit'
	],
	'markdownit': {
		typographer: true,
		linkify: true
	},

	'moment': {
		defaultLocale: 'en',
		locales: []
	},

	'modules': [
		'@nuxtjs/axios',
		['vue-scrollto/nuxt', { duration: 0 }],
		'@nuxtjs/google-gtag'
	],

	'google-gtag': {
		id: 'G-CKB51MMP1N'
	},

	'render': {
		bundleRenderer: {
			runInNewContext: false
		}
	},

	'axios': {
		baseURL: 'https://mylife.tech',
		proxyHeaders: true,
		credentials: true
	},

	'googleOptimize': {
		experimentsDir: '~/experiments',
		excludeBots: true
	},

	'build': {
		extractCSS: process.env.NODE_ENV === 'production',
		transpile: ['vee-validate'],
		extend (config) {
			const SVG_EXTENTION_EXP = /\.svg$/i;
			const IMAGES_EXTENTION_EXP = /\.(png|jpe?g|gif|webp|avif)$/i;

			config.module.rules
				.filter(function isRuleForSvg (rule) {
					return String(rule.test).includes('|svg|');
				})
				.forEach(function (rule) {
					rule.test = IMAGES_EXTENTION_EXP;
				});

			config.module.rules.push({
				test: SVG_EXTENTION_EXP,
				use: [
					'svg-url-loader', {
						loader: 'svg-transform-loader',
						options: {
							raw: true
						}
					}
				]
			});
		}
	},
	'layoutTransition': 'layout'
};