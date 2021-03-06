import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home',
        name: 'Home',
        meta: { menu1: '/home' },
        component: () => import('../components/home.vue'),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/login.vue'),
        meta: {
            keepAlive: false
        }
    }
    ]

const router = new VueRouter({
    routes
})


/*router.beforeEach((to,from,next)=>{
    // to要跳转到的路径
    // from从哪个路径来
    // next往下执行的回调
    // 在localStorage中获取token
    let token=localStorage.getItem('userInfo')
    // 如果token存在直接跳转
    if(token || to.path=='/login'){
        next()
    }else{
        // 否则跳转到login登录页面
        next({
            path:'/login',
            // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
            query:{
                redirect:to.fullPath
            }
        })
    }
    /!*  // 判断该页面是否需要登录
      if(to.meta.auth){

      }else{
        // 如果不需要登录，则直接跳转到对应页面
        next()
      }*!/
})*/

export default router
