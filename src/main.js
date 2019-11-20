import Vue from 'vue'
import VueLogger from 'vuejs-logger'
import App from './App.vue'

Vue.config.productionTip = false

const options = {
    isEnabled: true,
    logLevel : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);

new Vue({
    render: h => h(App),
}).$mount('#app')