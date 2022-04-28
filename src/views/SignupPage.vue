<template>
  <main>
    <div class="container">
      <img
        src="../../public/img/colored_logo_white.svg"
        alt="Logo de FindingJobs avec texte blanc"
      />
      <h1>Inscription</h1>
      <Form
        :inputs="[
          {
            name: 'username',
            type: 'text',
            label: 'Username',
            regex:
              /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$/,
            errorMessage: 'Merci de préciser un pseudonyme correct',
            iconClass: 'required-icon',
            placeholder: 'Username',
            required: true,
          },
          {
            name: 'email',
            type: 'text',
            label: 'Email',
            regex:
              /((?:[\w-]+(?:\.[\w-]+)*)@(?:[\w-]+(?:\.[\w-]+)*)\.(?:[a-z.]{2,}))/gi,
            errorMessage: 'Merci de préciser un email correct',
            iconClass: 'required-icon',
            placeholder: 'Email',
            required: true,
          },
          {
            name: 'password',
            type: 'password',
            label: 'Mot de passe',
            regex:
              /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
            errorMessage: 'Merci de préciser un mot de passe correct',
            iconClass: 'required-icon',
            placeholder: 'Mot de passe',
            required: true,
          },
          {
            name: 'avatar',
            type: 'file',
            label: 'Avatar',
            regex:
              /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$/,
            errorMessage: 'Merci d\'ajouter un avatar correct',
            iconClass: 'hidden',
            placeholder: 'Avatar',
            required: false,
          },
          {
            name: 'question',
            type: 'text',
            label: 'Question',
            regex:
              /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ',.?/-]{4,15}$/,
            errorMessage: 'Merci de préciser une question de sécurité correcte',
            iconClass: 'required-icon',
            placeholder: 'Question de sécurité',
            required: true,
          },
          {
            name: 'awswer',
            type: 'text',
            label: 'Question',
            regex:
              /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ',.?/-]{4,15}$/,
            errorMessage: 'Merci de préciser une réponse correcte',
            iconClass: 'required-icon',
            placeholder: 'Réponse',
            required: true,
          },
        ]"
        display="grid"
        submitText="Se connecter"
      ></Form>
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
import Form from '../components/CustomForm.vue';

export default {
  components: { Form },
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
  color: white;
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
  .container {
    height: auto;
  }

  .container h1 {
    font-size: xx-large;
  }

  .btn {
    grid-column: 1/1;
  }
}
</style>
