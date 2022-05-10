<template>
  <main>
    <Header
      :buttons="[
        {
          name: 'Accueil',
          content: 'Home',
        },
        {
          name: 'Jobs',
          content: 'Jobs',
        },
        {
          name: 'Contact',
          content: 'Contact',
        },
      ]"
    ></Header>
  </main>
</template>

<script>
import Header from '../components/Header.vue';

export default {
  components: {
    Header,
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100vh;
  background-color: #232439;
}
</style>
