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
  width: 120rem;
  height: 100%;
  overflow: auto;
}

html,body{
  font-size: 16px;
}

</style>


