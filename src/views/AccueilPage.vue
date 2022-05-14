<template>
  <main>
    <Header
      :buttons="[
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

<style scoped lang="scss"></style>
