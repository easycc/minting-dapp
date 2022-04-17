export default {
	'ssr': true,

	'env': {
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
		MAINTENANCE_MODE: process.env.MAINTENANCE_MODE,

		INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID
	},

	'head': {
		title: 'Circus Escape',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5 shrink-to-fit=no' },
			{ hid: 'description', name: 'description', content: 'They made their dreams come true' },

			{ name: 'msapplication-TileColor', content: '#da532c' },
			{ name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
			{ name: 'theme-color', content: '#ffffff' },


			{ property: 'og:title', content: 'Circus Escape' },
			{ property: 'og:site_name', content: 'Circus Escape' },
			{ property: 'og:image', content: 'https://circus-escape.com/thumbnail.png' },
			{ property: 'og:description', content: 'They made their dreams come true' },
			{ property: 'og:url', content: 'https://circus-escape.com/' },
			{ property: 'og:image:width', content: '1200' },
			{ property: 'og:image:height', content: '627' },
			{ property: 'og:type', content: 'website' },


			{ name: 'twitter:image:alt', content: 'Burning Circus and animals that are escaping' },
			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:site', content: '@CircusEscape' },
			{ property: 'twitter:creator', content: '@CircusEscape' }
		],
		link: [
			{ rel: 'apple-touch-icon', sizes: '180x180', href: '/site.webmanifest' },
			{ rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
			{ rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
			{ rel: 'manifest', href: '/site.webmanifest' },

			{ rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' }
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
				test: /\.(ogg|mp3|wav|mpe?g)$/i,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]'
				}
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