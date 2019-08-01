<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style lang="scss">
@import url("./styles/reset.css");
body {
  width: 100vw;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
