<template>
  <div id="app">
    <!-- Componente per il background -->
    <BackgroundAnimation />

    <!-- Componente per la conversione numeri/lettere -->
    <NumberToEnglish msg="Convert a number to an English string" />
  </div>
</template>

<script>
import NumberToEnglish from "./components/NumberToEnglish.vue";
import BackgroundAnimation from "./components/BackgroundAnimation.vue";

export default {
  name: "app",
  components: {
    NumberToEnglish,
    BackgroundAnimation
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
