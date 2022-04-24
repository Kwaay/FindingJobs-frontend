<template>
  <main>
    <div class="container">
      <img
        src="../../public/img/colored_logo_white.svg"
        alt="Logo de FindingJobs avec texte blanc"
      />
      <h1>Connexion</h1>
      <form class="login-form">
        <label for="identifiant"
          >Identifiant<span> *</span>
          <input
            type="text"
            id="identifiant"
            name="identifiant"
            placeholder="Username ou Email"
            v-model="identifiant"
          />
        </label>
        <label for="password"
          >Mot de passe<span> *</span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
            v-model="password"
          />
        </label>
        <input type="submit" class="login-btn" value="Se connecter" />
      </form>
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
export default {
  data() {
    return {
      identifiant: '',
      password: '',
    };
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

.login-form {
  display: inline-flex;
  justify-content: center;
  flex-flow: column wrap;
  width: 100%;
  padding: 0 2vh;
}

.login-form label {
  width: 100%;
  margin: 0 auto;
  max-width: 350px;
  font-size: 20px;
}

.login-form label input {
  max-width: 345px;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  outline: transparent;
  border: 1px solid black;
  margin: 10px 0;
}

.login-form ::placeholder {
  text-align: center;
  font-size: large;
  font-family: Imprima, sans-serif;
}

.login-form label,
p {
  color: white;
}

.login-btn {
  background-color: #3c365d;
  max-width: 115px;
  width: 100%;
  height: 45px;
  color: white;
  border: 1px solid transparent;
  margin: 0 auto;
  border-radius: 5px;
  font-size: medium;
  font-family: Imprima, sans-serif;
}

@media screen and (max-width: 1000px) {
  .container h1 {
    font-size: xx-large;
  }
}
</style>
