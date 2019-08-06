import './plugins/vuetify'
import './plugins/veeValidate'
import './utils/bus'
import Vue from 'vue'
import axios from './utils/http'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)


const VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo)

//google map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB_YFV0_EDruQW_3kBrMRPv6qk0d5BvMTc',
    libraries: 'places'},
  installComponents: true
})

//socket.io
const SocketInstance = socketio.connect('http://35.221.163.65:4040', {
});

Vue.use(new VueSocketio({
    debug: true,
    connection: SocketInstance
}));

//設置cookie,增加到vue實例方便全局調用
//vue全局调用的理由是，有些元件所用到的接口可能需要session驗證，session從cookie獲取
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//獲取cookie
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  // = >> == 有更動過
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie = (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  }
  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
