/* eslint-disable sonarjs/no-duplicate-string */
export default {
	ssr: false,

	env: {
		FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
		MAINTENANCE_MODE: process.env.MAINTENANCE_MODE
	},

	head: {
		title: 'Minting dapp',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5 shrink-to-fit=no' },
			{ hid: 'description', name: 'description', content: 'A Dashboard for your life. This framework will help you better understand yourself, set priorities, and make an action plan on how to achieve your goals.' },

			{ name: 'msapplication-TileColor', content: '#ffffff' },
			{ name: 'msapplication-TileImage', content: './favicon/ms-icon-144x144.png' },
			{ name: 'theme-color', content: '#ffffff' }
		],
		link: [
			{ rel: 'apple-touch-icon', sizes: '57x57', type: 'image/x-icon', href: './favicon/apple-icon-57x57.png' },
			{ rel: 'apple-touch-icon', sizes: '60x60', type: 'image/x-icon', href: './favicon/apple-icon-60x60.png' },
			{ rel: 'apple-touch-icon', sizes: '72x72', type: 'image/x-icon', href: './favicon/apple-icon-72x72.png' },
			{ rel: 'apple-touch-icon', sizes: '76x76', type: 'image/x-icon', href: './favicon/apple-icon-76x76.png' },
			{ rel: 'apple-touch-icon', sizes: '114x114', type: 'image/x-icon', href: './favicon/apple-icon-114x114.png' },
			{ rel: 'apple-touch-icon', sizes: '120x120', type: 'image/x-icon', href: './favicon/apple-icon-120x120.png' },
			{ rel: 'apple-touch-icon', sizes: '144x144', type: 'image/x-icon', href: './favicon/apple-icon-144x144.png' },
			{ rel: 'apple-touch-icon', sizes: '152x152', type: 'image/x-icon', href: './favicon/apple-icon-152x152.png' },
			{ rel: 'apple-touch-icon', sizes: '180x180', type: 'image/x-icon', href: './favicon/apple-icon-180x180.png' },
			{ rel: 'apple-touch-icon', sizes: '192x192', type: 'image/png', href: './favicon/android-icon-192x192.png' },
			{ rel: 'apple-touch-icon', sizes: '32x32', type: 'image/png', href: './favicon/android-icon-32x32.png' },
			{ rel: 'apple-touch-icon', sizes: '96x96', type: 'image/png', href: './favicon/android-icon-96x96.png' },
			{ rel: 'apple-touch-icon', sizes: '16x16', type: 'image/png', href: './favicon/android-icon-16x16.png' },
			{ rel: 'manifest', href: './favicon/manifest.json' },

			{ rel: 'icon', sizes: '16x16', type: 'image/x-icon', href: './favicon/apple-icon-16x16.png' },
			{ rel: 'icon', sizes: '24x24', type: 'image/x-icon', href: './favicon/apple-icon-24x24.png' },
			{ rel: 'icon', sizes: '32x32', type: 'image/x-icon', href: './favicon/apple-icon-32x32.png' },
			{ rel: 'icon', sizes: '64x64', type: 'image/x-icon', href: './favicon/apple-icon-64x64.png' },
			{ rel: 'icon', sizes: '128x128', type: 'image/x-icon', href: './favicon/apple-icon-128x128.png' }
		]
	},

	css: [
		'~/styles/variables.css',
		'normalize.css/normalize.css',
		'~/styles/typography.css'
	],

	loading: { color: '#007AFE' },

	plugins: [
		{ src: '~plugins/theme-context' },
		'~/plugins/moment',
		{ ssr: false, src: '~/plugins/notifications' }
	],

	buildModules: [
		'@nuxtjs/dotenv',
		'@nuxtjs/moment',
		'@nuxtjs/markdownit'
	],
	markdownit: {
		typographer: true,
		linkify: true
	},

	moment: {
		defaultLocale: 'en',
		locales: []
	},

	modules: [
		['nuxt-i18n', {
			vueI18nLoader: true
		}],
		'@nuxtjs/axios',
		'@nuxtjs/firebase',
		'@nuxtjs/google-analytics',
		['vue-scrollto/nuxt', { duration: 0 }]
	],

	firebase: {
		config: {
			apiKey: process.env.FIREBASE_API_KEY,
			authDomain: process.env.FIREBASE_AUTH_DOMAIN,
			projectId: process.env.FIREBASE_PROJECT_ID,
			storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
			messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
			appId: process.env.FIREBASE_APP_ID
		},
		services: {
			auth: {
				initialize: {
					// onAuthStateChangedAction: 'onAuthStateChangedAction',
					subscribeManually: true
				}
			},
		  firestore: {
				settings: {
					ignoreUndefinedProperties: true
				}
			},
			functions: {
				location: 'us-central1'
			},
			storage: true
		}
	},

	render: {
		bundleRenderer: {
			runInNewContext: false
		}
	},

	axios: {
		baseURL: 'https://mylife.tech',
		proxyHeaders: true,
		credentials: true
	},

	googleAnalytics: {
		// id: 'UA-193008827-1'
	},

	googleOptimize: {
		experimentsDir: '~/experiments',
		excludeBots: true
	},

	build: {
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

	i18n: {
		strategy: 'prefix',
		locales: [
			{
				code: 'en',
				iso: 'en',
				name: 'English',
				file: 'en.json'
			}
		],
		defaultLocale: 'en',
		seo: true,
		lazy: true,
		loadLanguagesAsync: true,
		langDir: 'locales/',
		detectBrowserLanguage: {
			useCookie: true
		},
		vuex: {
			syncLocale: true
		},
		vueI18n: {
			fallbackLocale: 'en'
		}
	},
	layoutTransition: 'layout'
};
/* eslint-enable sonarjs/no-duplicate-string */