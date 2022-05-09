<template>
  <header>
    <img
      src="../assets/img/colored_logo_white.svg"
      alt="Logo de FindingJobs"
      class="logo-img"
    />
    <nav>
      <router-link
        v-for="button in buttons"
        :key="button.name"
        :to="{ name: `${button.name}` }"
      >
        {{ button.content }}</router-link
      >
    </nav>
    <div class="infos">
      <img
        src="https://via.placeholder.com/50"
        alt="Image de profil de l'utilisateur connecté"
      />
    </div>
  </header>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2vh;
  height: 100%;
  max-height: 150px;
}

.logo-img {
  width: 330px;
}

nav a {
  width: 100%;
  max-width: 145px;
  height: 55px;
  margin: 1vh;
  background-color: #3c365d;
  color: white;
  padding: 0.8vh 2.5vh;
  border-radius: 10px;
}

.infos img {
  border-radius: 50%;
}
</style>
