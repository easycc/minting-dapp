import Vue from 'vue';

import VueGtag from 'vue-gtag';

Vue.use(VueGtag, {
	enable: process.env.NODE_ENV === 'production',
	config: {
		enable: process.env.NODE_ENV === 'production',
		id: 'G-CKB51MMP1N'
	}
});