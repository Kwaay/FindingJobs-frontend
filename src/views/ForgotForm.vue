<template>
  <main>
    <div class="container">
      <img
        src="../../public/img/colored_logo_white.svg"
        alt="Logo de FindingJobs avec texte blanc"
      />
      <h1>Mot de passe oublié</h1>
      <Form
        :inputs="[
          {
            name: 'email',
            type: 'text',
            label: 'Email',
            regex:
              /((?:[\w-]+(?:\.[\w-]+)*)@(?:[\w-]+(?:\.[\w-]+)*)\.(?:[a-z.]{2,}))/gi,
            errorMessage: 'Merci de préciser un email correct',
            iconClass: 'required-icon',
            placeholder: 'Email lié à votre compte',
            required: true,
          },
        ]"
        display="flex"
        submitText="Envoyer"
      ></Form>

      <p>
        Vous avez retrouvé votre mot de passe ?<br />
        <router-link :to="{ name: 'Login' }">Se connecter</router-link>
      </p>
      <p><span> *</span> = obligatoire</p>
    </div>
  </main>
</template>

<script>
import Form from '../components/CustomForm.vue';

export default {
  components: {
    Form,
  },
  data() {
    return {
      email: '',
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
  color: white;
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
