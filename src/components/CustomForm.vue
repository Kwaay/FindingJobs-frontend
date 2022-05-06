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
const isRegexValidationRuleValid = ({ rule, errorMessage }) => {
  if (rule !== new RegExp(rule)) {
    return false;
  }

  if (typeof errorMessage !== 'string' || errorMessage.length === 0) {
    return false;
  }
  return true;
};
const isTypesValidationRuleValid = ({ rule, errorMessage }) => {
  if (Array.isArray(rule) || rule.length === 0) return false;
  if (typeof errorMessage !== 'string' || errorMessage.length === 0) {
    return false;
  }
  return true;
};
const isSizeValidationRuleValid = ({ rule, errorMessage }) => {
  if (Number.isNaN(Number(rule))) return false;
  if (typeof errorMessage !== 'string' || errorMessage.length === 0) {
    return false;
  }
  return true;
};
const isMinValidationRuleValid = ({ rule, errorMessage }) => {
  if (Number.isNaN(Number(rule))) return false;
  if (typeof errorMessage !== 'string' || errorMessage.length === 0) {
    return false;
  }
  return true;
};
const isMaxValidationRuleValid = ({ rule, errorMessage }) => {
  if (Number.isNaN(Number(rule))) return false;
  if (typeof errorMessage !== 'string' || errorMessage.length === 0) {
    return false;
  }
  return true;
};
const isRequiredValidationRuleValid = ({ rule, errorMessage }) => {
  if (typeof rule !== 'boolean') return false;
  if (rule && (typeof errorMessage !== 'string' || errorMessage.length === 0)) {
    return false;
  }
  return true;
};
export default {
  props: {
    inputs: {
      type: Array,
      required: true,
      validator(value) {
        if (!Array.isArray(value)) return false;
        const validationErrors = value.some((input) => {
          if (typeof input !== 'object') return true;
          const { name, type, label, validation, iconClass, placeholder } =
            input;
          if (typeof name !== 'string' || name.length === 0) return true;
          if (typeof type !== 'string' || type.length === 0) return true;
          if (typeof label !== 'string' || label.length === 0) return true;
          if (typeof iconClass !== 'string' || iconClass.length === 0)
            return true;
          if (typeof placeholder !== 'string' || placeholder.length === 0)
            return true;
          if (
            typeof validation === 'object' &&
            Object.keys(validation).length > 0
          ) {
            const { regex, types, size, min, max, required } = validation;
            if (
              typeof regex === 'object' &&
              !isRegexValidationRuleValid(regex)
            ) {
              return true;
            }
            if (
              typeof types === 'object' &&
              !isTypesValidationRuleValid(types)
            ) {
              return true;
            }
            if (typeof size === 'object' && !isSizeValidationRuleValid(size)) {
              return true;
            }
            if (typeof min === 'object' && !isMinValidationRuleValid(min)) {
              return true;
            }
            if (typeof max === 'object' && !isMaxValidationRuleValid(max)) {
              return true;
            }
            if (
              typeof required === 'object' &&
              !isRequiredValidationRuleValid(required)
            )
              return true;
          }
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
      for (const { name, type, validation } of this.inputs) {
        // eslint-disable-next-line no-continue
        if (!(validation?.required?.rule || this.values[name])) continue;
        if (
          validation?.required?.rule &&
          typeof this.values[name] === 'undefined'
        ) {
          this.$toast.error(validation.required.errorMessage);
          hasError = true;
        }
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
          if (!new RegExp(validation.regex.rule).test(this.values[name])) {
            this.$toast.error(validation.regex.errorMessage);
            hasError = true;
          }
        }
        if (type === 'checkbox' && typeof validation?.status === 'boolean') {
          if (this.values[name] !== validation.status) {
            this.$toast.error(validation.status.errorMessage);
            hasError = true;
          }
        }
        if (
          type === 'date' ||
          type === 'datetime-local' ||
          type === 'month' ||
          type === 'time'
        ) {
          if (typeof !validation?.minValue === 'object') {
            if (
              typeof !validation.minValue.rule === 'string' ||
              validation.minValue.rule < this.values[name]
            )
              this.$toast.error(validation.minValue.errorMessage);
            hasError = true;
          }
          if (typeof !validation?.maxValue === 'object') {
            if (
              typeof !validation.maxValue.rule === 'string' ||
              validation.maxValue.rule > this.values[name]
            )
              this.$toast.error(validation.maxValue.errorMessage);
            hasError = true;
          }
        }
        if (type === 'file') {
          if (typeof this.values[name] === 'undefined') {
            this.$toast.error(validation.types.errorMessage);
            hasError = true;
          }
          for (const file of Array.from(this.values[name])) {
            if (typeof validation?.types === 'object') {
              if (
                !Array.isArray(validation.types.rule) ||
                !validation.types.rule.includes(file.type)
              ) {
                this.$toast.error(validation.types.errorMessage);
                hasError = true;
              }
            }
            if (typeof validation?.size === 'object') {
              if (
                !Number.isNaN(Number(validation.size.rule)) &&
                validation.size.rule < file.size
              ) {
                this.$toast.error(validation.size.errorMessage);
                hasError = true;
              }
            }
          }
        }
        if (
          (type === 'number' || type === 'range') &&
          !Number.isNaN(Number(this.values[name]))
        ) {
          if (
            validation?.minValue === 'object' &&
            validation?.maxValue === 'object'
          ) {
            if (this.values[name] < validation.minValue.rule) {
              this.$toast.error(validation.minValue.errorMessage);
              hasError = true;
            }
            if (this.values[name] > validation.maxValue.rule) {
              this.$toast.error(validation.maxValue.errorMessage);
              hasError = true;
            }
          }
        }
        if (type === 'radio') {
          if (Array.isArray(validation?.values))
            if (
              typeof !validation?.values.rule === 'object' ||
              !validation.values.rule.includes(this.values[name])
            ) {
              this.$toast.error(validation.values.errorMessage);
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
      this.values[inputName] = e.target.multiple ? files : files[0];
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
  color: black;
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
