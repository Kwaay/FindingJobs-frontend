<template>
  <form
    class="form"
    :class="{ flex: display === 'flex', grid: display === 'grid' }"
    @submit.prevent.stop="submit"
  >
    <label v-for="input in inputs" :key="input.name" :for="input.name">
      {{ input.placeholder }}
      <span v-if="input.required" :class="input.iconClass"> *</span>
      <div class="file-uploader" v-if="input.type === 'file'">
        <i class="fas fa-upload"></i>
        Uploader un avatar
      </div>
      <input
        :type="input.type"
        :id="input.name"
        :name="input.name"
        :placeholder="input.placeholder"
        :class="input.iconClass"
        v-model="values[input.name]"
        v-if="input.type !== 'file'"
      />
      <input
        v-else
        :type="input.type"
        :id="input.name"
        :name="input.name"
        :class="input.iconClass"
        @change="fileHandler"
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
            validation,
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
          if (
            typeof validation !== 'object' ||
            Object.keys(validation).length === 0
          )
            return true;
          if (typeof validation.regex === typeof new RegExp(validation.regex))
            return false;
          if (typeof errorMessage !== 'string' || label.length === 0)
            return false;

          return false;
        });
        return !validationErrors;
      },
    },
    display: {
      type: String,
      required: false,
      default: 'flex',
    },
    submitText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      values: {},
    };
  },
  methods: {
    submit() {
      /* eslint-disable no-restricted-syntax */
      let hasError = false;
      for (const { name, type, validation, errorMessage } of this.inputs) {
        if (
          (type === 'text' ||
            type === 'email' ||
            type === 'password' ||
            type === 'tel' ||
            type === 'url' ||
            type === 'search' ||
            type === 'color') &&
          validation?.regex
        ) {
          if (!new RegExp(validation.regex).test(this.values[name])) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
        }
        if (type === 'checkbox' && typeof validation?.status !== 'boolean') {
          if (this.values[name] !== validation.status) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
        }
        if (
          type === 'date' ||
          type === 'datetime-local' ||
          type === 'month' ||
          type === 'time'
        ) {
          if (
            typeof !validation?.minValue === 'string' &&
            !validation.minValue < this.values[name]
          ) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
          if (
            typeof !validation?.maxValue === 'string' &&
            !validation.maxValue > this.values[name]
          ) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
        }
        if (type === 'file') {
          for (const file of this.values[name]) {
            if (validation?.types && !validation.types.includes(file.type)) {
              this.$toast.error(errorMessage);
              hasError = true;
            }
            if (validation?.size && validation.size < file.size) {
              this.$toast.error(errorMessage);
              hasError = true;
            }
          }
        }
        if (
          (type === 'number' || type === 'range') &&
          typeof this.values[name] === 'number' &&
          validation?.minValue === 'string' &&
          validation?.maxValue === 'string'
        ) {
          if (!Number.isNaN(this.values[name])) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
          if (this.values[name] < validation?.minValue) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
          if (this.values[name] > validation?.maxValue) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
        }
        if (type === 'radio' && validation?.values) {
          if (!validation.values.includes(this.values[name])) {
            this.$toast.error(errorMessage);
            hasError = true;
          }
        }
        //
      }
      if (hasError) return false;
      this.$emit('submitForm', this.values);
      return true;
    },
    fileHandler(e) {
      const { files } = e.target;
      const inputName = e.target.name;
      this.values[inputName] = files;
    },
  },
};
</script>

<style scoped>
.flex {
  display: inline-flex;
  justify-content: center;
  flex-flow: column wrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(375px, 1fr));
  padding: 0 2vh;
  width: 100%;
  max-width: 800px;
}

.hidden {
  display: none;
}

.required-icon {
  color: #a89df7;
}

.form label {
  width: 100%;
  margin: 0 auto;
  max-width: 350px;
  font-size: 20px;
  color: white;
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
  align-items: center;
  padding-left: 2vh;
}

.file-uploader i {
  padding-right: 1vh;
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
  color: black;
}

.btn {
  background-color: #3c365d;
  max-width: 150px;
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
@media screen and (max-width: 950px) {
  .form {
    grid-template-columns: 1fr;
  }

  .btn {
    grid-column: 1/1;
  }
}
</style>
