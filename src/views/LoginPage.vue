<template>
  <main>
    <div class="container">
      <img
        src="../../public/img/colored_logo_white.svg"
        alt="Logo de FindingJobs avec texte blanc"
      />
      <h1>Connexion</h1>
      <Login></Login>
      <p>
        Vous n'avez pas encore de compte ?<br />
        <router-link :to="{ name: 'Signup' }">S'inscrire</router-link>
      </p>
      <router-link :to="{ name: 'Forgot' }">Mot de passe oublié ?</router-link>
      <p><span> *</span> = obligatoire</p>
    </div>
  </main>
</template>

<script>
import Login from '../components/LoginForm.vue';

export default {
  components: {
    Login,
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100vh;
  background-color: #232439;
}

a {
  color: #a89df7;
}

p {
  text-align: center;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  height: 100vh;
}

.container img {
  max-width: 500px;
  width: 100%;
  padding: 2vh;
}

.container h1 {
  color: white;
  font-weight: lighter;
  font-size: 42px;
}

.container span {
  color: #a89df7;
}
@media screen and (max-width: 1000px) {
  .container h1 {
    font-size: xx-large;
  }
}
</style>
