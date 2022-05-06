<template>
  <main>
    <div class="container">
      <img
        src="../../public/img/colored_logo_white.svg"
        alt="Logo de FindingJobs avec texte blanc"
      />
      <h1>Modification de mot de passe</h1>
      <Form
        :inputs="[
          {
            name: 'email',
            type: 'text',
            label: 'Email',
            validation: {
              regex: {
                rule: /((?:[\w-]+(?:\.[\w-]+)*)@(?:[\w-]+(?:\.[\w-]+)*)\.(?:[a-z.]{2,}))/gi,
                errorMessage: 'Merci de préciser un email correct',
              },
              required: {
                rule: true,
                errorMessage: 'Le champ email est requis',
              },
            },
            iconClass: 'required-icon',
            placeholder: 'Email lié à votre compte',
            value: '',
          },
          {
            name: 'awswer',
            type: 'text',
            label: 'Réponse',
            validation: {
              regex: {
                rule: /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ,.'/_-]{4,15}$/,
                errorMessage: 'Merci de préciser une réponse correcte',
              },
              required: {
                rule: true,
                errorMessage: 'Le champ awswer est requis',
              },
            },
            iconClass: 'required-icon',
            placeholder: 'Réponse à la question de sécurité',
            value: '',
          },
          {
            name: 'password',
            type: 'text',
            label: 'Nouveau mot de passe',
            validation: {
              regex: {
                rule: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                errorMessage: 'Merci de préciser un mot de passe correct',
              },
              required: {
                rule: true,
                errorMessage: 'Le champ password est requis',
              },
            },
            iconClass: 'required-icon',
            placeholder: 'Mot de passe',
            value: '',
          },
        ]"
        display="flex"
        submitText="Envoyer"
        @submitForm="submit"
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
  methods: {
    submit(dataForm) {
      return fetch('http://localhost:3000/api/user/forgot/modify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: dataForm.username,
          awswer: dataForm.awswer,
          password: dataForm.password,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          // setTimeout(() => this.$router.push({ name: 'Accueil' }), 4000);
          return this.$toast.success(`Successfully Modified your Password`);
        });
    },
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
