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
  created() {
    const { token } = this.$store.state.token;
    fetch('http://localhost:3000/api/user/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.$store.dispatch('saveConnectedUser', data.user);
      })
      .catch(() => {
        return this.$toast.error('Impossible to find connectedUser');
      });
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
