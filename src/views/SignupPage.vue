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
            validation: {
              regex: {
                rule: /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$/,
                errorMessage: 'Merci de préciser un pseudonyme correct',
              },
              required: {
                rule: true,
                errorMessage: 'Le champ username est requis',
              },
            },
            iconClass: 'required-icon',
            placeholder: 'Username',
            value: '',
          },
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
            placeholder: 'Email',
            value: '',
          },
          {
            name: 'password',
            type: 'password',
            label: 'Mot de passe',
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
            required: true,
            value: '',
          },
          {
            name: 'avatar',
            type: 'file',
            label: 'Avatar',
            validation: {
              types: {
                rule: [
                  'image/jpg',
                  'image/jpeg',
                  'image/png',
                  'image/bmp',
                  'image/svg+xml',
                  'image/gif',
                ],
                errorMessage: 'Merci d\'ajouter un avatar correct',
              },
              size: {
                rule: 52428800,
                errorMessage: 'La taille de l\'avatar est trop grande',
              },
            },
            iconClass: 'hidden',
            placeholder: 'Avatar',
            value: '',
          },
          {
            name: 'question',
            type: 'text',
            label: 'Question',
            validation: {
              regex: {
                rule: /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ',.?/-]{4,15}$/,
                errorMessage:
                  'Merci de préciser une question de sécurité correcte',
              },
              required: {
                rule: true,
                errorMessage: 'Le champ question est requis',
              },
            },
            iconClass: 'required-icon',
            placeholder: 'Question de sécurité',
            value: '',
          },
          {
            name: 'awswer',
            type: 'text',
            label: 'Réponse',
            validation: {
              regex: {
                rule: /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ',.?/-]{4,15}$/,
                errorMessage: 'Merci de préciser une réponse correcte',
              },
              required: {
                rule: true,
                errorMessage: 'Le champ réponse est requis',
              },
            },
            iconClass: 'required-icon',
            placeholder: 'Réponse',
            value: '',
          },
        ]"
        display="grid"
        submitText="Créer un compte"
        @submitForm="submit"
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
  methods: {
    submit(dataForm) {
      console.log('tapîs', dataForm); // eslint-disable-next-line operator-linebreak
      if (dataForm.avatar) {
        const formData = new FormData();
        formData.append('username', dataForm.username);
        formData.append('email', dataForm.email);
        formData.append('password', dataForm.password);
        formData.append('question', dataForm.question);
        formData.append('awswer', dataForm.awswer);
        formData.append('avatar', dataForm.avatar);

        return fetch('http://localhost:3000/api/user/signup', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then(() => {
            // setTimeout(() => this.$router.push({ name: 'Login' }), 4000);
            return this.$toast.success(
              `Successfully Created an User with an Avatar`,
            );
          });
      }
      return fetch('http://localhost:3000/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: dataForm.username,
          email: dataForm.email,
          password: dataForm.password,
          question: dataForm.question,
          awswer: dataForm.awswer,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          // setTimeout(() => this.$router.push({ name: 'Accueil' }), 4000);
          return this.$toast.success(
            `Successfully Created an User with an Username`,
          );
        });
    },
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
}
</style>
