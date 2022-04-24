<template>
  <main>
    <div class="container">
      <img
        src="../../public/img/colored_logo_white.svg"
        alt="Logo de FindingJobs avec texte blanc"
      />
      <h1>Inscription</h1>
      <form class="signup-form">
        <label for="username"
          >Pseudonyme<span> *</span>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Pseudonyme"
            v-model="username"
          />
        </label>
        <label for="email"
          >Email<span> *</span>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            v-model="email"
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
        <label for="avatar" class="avatar-label"
          >Avatar
          <div class="file-uploader">
            <i class="fas fa-upload"></i> Uploader un avatar
          </div>
          <input
            type="file"
            id="avatar"
            name="avatar"
            value="Avatar"
            class="hidden"
          />
        </label>
        <label for="question"
          >Question<span> *</span>
          <input
            type="question"
            id="question"
            name="question"
            placeholder="Question de sécurité"
            v-model="question"
          />
        </label>
        <label for="awswer"
          >Réponse<span> *</span>
          <input
            type="awswer"
            id="awswer"
            name="awswer"
            placeholder="Réponse"
            v-model="awswer"
          />
        </label>
        <input type="submit" class="login-btn" value="Se connecter" />
      </form>
      <p>
        Vous avez déjà un compte ?<br />
        <router-link :to="{ name: 'Login' }">Se connecter</router-link>
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
      username: '',
      email: '',
      password: '',
      question: '',
      awswer: '',
    };
  },
};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  background-color: #232439;
  min-height: 100vh;
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

.signup-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(345px, 1fr));
  padding: 0 2vh;
  grid-gap: 2vh;
}

.signup-form label {
  width: 100%;
  margin: 0 auto;
  max-width: 350px;
  font-size: 20px;
}

.signup-form label input {
  width: 100%;
  height: 45px;
  border-radius: 5px;
  outline: transparent;
  border: 1px solid black;
  margin-top: 10px;
}

.signup-form ::placeholder {
  text-align: center;
  font-size: large;
  font-family: Imprima, sans-serif;
}

.signup-form label,
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
  grid-column: 1/3;
}

.hidden {
  display: none;
}

.file-uploader {
  height: 45px;
  border-radius: 5px;
  outline: transparent;
  border: 1px solid black;
  margin: 10px 0;
  background-color: white;
  color: black !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.file-uploader i {
  padding-right: 1vh;
}

@media screen and (max-width: 950px) {
  .container h1 {
    font-size: xx-large;
  }

  .signup-form {
    grid-template-columns: 1fr;
  }

  .login-btn {
    grid-column: 1/1;
  }
}
</style>
