<template>
  <main>
    <div class="container">
      <img
        src="../assets/img/colored_logo_white.svg"
        alt="Logo de FindingJobs avec texte blanc"
      />
      <h1>Connexion</h1>
      <Form
        :inputs="[
          {
            name: 'identifiant',
            type: 'text',
            label: 'Identifiant',
            validation: {
              regex: {
                rule: /((?:[\w-]+(?:\.[\w-]+)*)@(?:[\w-]+(?:\.[\w-]+)*)\.(?:[a-z.]{2,})|^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$)/gm,
                errorMessage:
                  'Merci de préciser un pseudonyme ou un email correct',
              },
              required: {
                rule: true,
                errorMessage: 'Le champ identifiant est requis',
              },
            },
            iconClass: 'required-icon',
            placeholder: 'Pseudonyme ou Email',
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
            value: '',
          },
        ]"
        display="flex"
        submitText="Se connecter"
        @submitForm="submit"
      ></Form>
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
import Form from '../components/CustomForm.vue';

export default {
  components: {
    Form,
  },
  methods: {
    submit(dataForm) {
      console.log('tapîs', dataForm);
      // eslint-disable-next-line operator-linebreak
      const regexEmail =
        /((?:[\w-]+(?:\.[\w-]+)*)@(?:[\w-]+(?:\.[\w-]+)*)\.(?:[a-z.]{2,}))/gi;
      if (dataForm.identifiant.match(regexEmail)) {
        return fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: dataForm.identifiant,
            password: dataForm.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.user = data;
            const tokenData = {
              token: data.token,
              date: Date.now(),
            };
            this.$store.dispatch('saveToken', tokenData);
            setTimeout(() => this.$router.push({ name: 'Accueil' }), 4000);
            return this.$toast.success(`Successfully Logged with an Email`);
          });
      }
      return fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: dataForm.identifiant,
          password: dataForm.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
          const tokenData = {
            token: data.token,
            date: Date.now(),
          };
          this.$store.dispatch('saveToken', tokenData);
          setTimeout(() => this.$router.push({ name: 'Accueil' }), 4000);
          return this.$toast.success(`Successfully Logged with an Username`);
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
  text-align: center;
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
@media screen and (max-width: 1000px) {
  .container h1 {
    font-size: xx-large;
  }
}
</style>
