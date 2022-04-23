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
          />
        </label>
        <label for="password"
          >Mot de passe<span> *</span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Mot de passe"
          />
        </label>
        <input type="submit" class="login-btn" value="Se connecter" />
      </form>
      <p>
        Vous n'avez pas encore de compte ?
        <!--<router-link :to="{ name: 'Signup' }">S'inscrire</router-link>-->
      </p>
      <!--<router-link :to="{ name: 'Forgot' }">Mot de passe oublié ?</router-link>-->
      <p><span> *</span> = obligatoire</p>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
main {
  width: 100%;
  height: 100vh;
  background-color: #232439;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  height: 100vh;
}

.container img {
  max-width: 400px;
  width: 100%;
}

.container h1 {
  color: white;
}

.container span {
  color: #a89df7;
}

.login-form {
  display: inline-flex;
  justify-content: center;
  flex-flow: column wrap;
  width: 100%;
  max-width: 350px;
}

.login-form label input {
  max-width: 400px;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  outline: transparent;
  border: 1px solid black;
  padding-left: 1vh;
  margin: 1vh 0;
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
</style>
