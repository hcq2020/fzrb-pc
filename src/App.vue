<template>
  <div id="app">
 <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  }
}
</script>

<style lang="scss">
@import './src/assets/style/base';

#app {
  position: relative;
  width: 100%;
  height: 100%;
}
html,body{
  font-size: 16px;
}
</style>


