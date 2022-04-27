<template>
  <form class="form" @submit.prevent="submit">
    <label v-for="input in inputs" :key="input.name" :for="input.name">
      {{ input.placeholder }}
      <span v-if="input.required" :class="input.iconClass"> *</span>
      <input
        :type="input.type"
        :id="input.name"
        :name="input.name"
        :placeholder="input.placeholder"
        v-model="identifiant"
      />
    </label>
    <input type="submit" class="btn" :value="submitText" />
  </form>
</template>

<script>
export default {
  props: {
    inputs: {
      type: Array,
      required: true,
      validator(value) {
        if (!Array.isArray(value)) return false;
        const validationErrors = value.some((input) => {
          if (typeof input !== 'object') return false;
          const {
            name,
            type,
            label,
            regex,
            errorMessage,
            iconClass,
            placeholder,
            required,
          } = input;
          if (typeof name !== 'string' || name.length === 0) return true;
          if (typeof type !== 'string' || type.length === 0) return true;
          if (typeof label !== 'string' || label.length === 0) return true;
          if (typeof iconClass !== 'string' || iconClass.length === 0)
            return true;
          if (typeof placeholder !== 'string' || placeholder.length === 0)
            return true;
          if (typeof required !== 'boolean') return true;
          if (typeof regex === typeof new RegExp(regex)) return false;
          if (typeof errorMessage !== 'string' || label.length === 0)
            return false;

          return false;
        });
        return !validationErrors;
      },
    },
    submitText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      identifiant: '',
      password: '',
    };
  },
  methods: {
    submit() {
      console.log('Tapis');
      if (this.identifiant.length < 1) {
        this.$toast.error(`Identifiant input is empty`);
      }
      if (this.password.length < 1) {
        this.$toast.error(`Password input is empty`);
      }
      // eslint-disable-next-line operator-linebreak
      const regexEmail =
        /((?:[\w-]+(?:\.[\w-]+)*)@(?:[\w-]+(?:\.[\w-]+)*)\.(?:[a-z.]{2,}))/gi;
      const regexUsername =
        /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ_-]{4,20}$/;
      const regexPassword =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
      if (!regexPassword.test(this.password) && this.password.length > 1) {
        return this.$toast.error(`Password format is incorrect`);
      }
      if (this.identifiant.match(regexEmail)) {
        if (!regexEmail.test(this.identifiant) && this.identifiant.length > 1) {
          return this.$toast.error(`Email format is incorrect`);
        }
        return fetch('http://localhost:3000/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.identifiant,
            password: this.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            this.user = data;
            setTimeout(() => this.$router.push({ name: 'Accueil' }), 4000);
            return this.$toast.success(`Successfully Logged with an Email`);
          });
      }
      if (
        !regexUsername.test(this.identifiant) &&
        this.identifiant.length > 1
      ) {
        return this.$toast.error(`Username format is incorrect`);
      }
      return fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.identifiant,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
          setTimeout(() => this.$router.push({ name: 'Accueil' }), 4000);
          return this.$toast.success(`Successfully Logged with an Username`);
        });
    },
  },
};
</script>

<style scoped>
.required-icon {
  color: #a89df7;
}

.form {
  display: inline-flex;
  justify-content: center;
  flex-flow: column wrap;
  width: 100%;
  padding: 0 2vh;
}

.form label {
  width: 100%;
  margin: 0 auto;
  max-width: 350px;
  font-size: 20px;
  color: white;
}

.form label input {
  max-width: 345px;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  outline: transparent;
  border: 1px solid black;
  margin: 10px 0;
  padding-left: 2vh;
}

.form ::placeholder {
  padding-left: 0.5vh;
  font-size: large;
  font-family: Imprima, sans-serif;
}

.btn {
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
