import Vue from 'vue';

import Notifications from 'vue-notification';

Vue.use(Notifications);

function notifications (context, inject) {
	inject('notify', Vue.notify);
}

export default notifications;