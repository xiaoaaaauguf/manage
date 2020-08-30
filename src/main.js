import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/icon.css'
// ele对话框可拖拽插件
import './components/common/directives'
//国际化
import {messages} from "./components/common/i18n";
import VueI18n from "vue-i18n";
Vue.use(VueI18n)
const i18n=new VueI18n({
  locale: 'zh',
  messages
})
//使用钩子函数对路由进行权限跳转
router.beforeEach((to,from,next)=>{
  document.title=`${to.meta.title} | xiao`
  const role= localStorage.getItem('username')
  if(!role && to.path!=='/login'){
    next('/login')
  }else if(to.path=='/permission'){
    role==='admin'?next():next('/403')
  }else {
    if(navigator.userAgent.indexOf('MSIE')!=-1){
      Vue.prototype.$alert('本网站暂不支持IE10及以下浏览器，请使用更高版本的浏览器查看','浏览器不兼容通知',{
        confirmButtonText: '确定'
      })
    }else {
      next()
    }
  }
})

Vue.prototype.$bus=new Vue()
Vue.use(ElementUI,{
  size: 'small'
})
Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
