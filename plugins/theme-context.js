import Vue from 'vue';

import ThemeContext from '~/components/context/ThemeContext';

Vue.component('ThemeContextConsumer', ThemeContext.Consumer);
Vue.component('ThemeContextProvider', ThemeContext.Provider);