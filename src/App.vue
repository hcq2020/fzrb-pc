<template>
  <div id="app">
    <hander  v-show="$route.path!=='/login'"></hander>
 <router-view></router-view>
  </div>
</template>

<script>
import Hander from '@/components/layout/hander'
export default {
  name: 'App',
  components: {
    Hander
  }
}
</script>

<style lang="scss">
@import './src/assets/style/base';
@import 'public/static/style';

#app {
  position: relative;
//  min-width: 120rem;
  width: 100%;
  height: 100%;
  overflow: auto;
}

@media screen and (max-width: 1536px) {
  html,body{
    font-size: 12px;
  }
}

@media screen and (min-width: 1537px) {
  html,body{
    font-size: 16px;
  }
}


</style>


