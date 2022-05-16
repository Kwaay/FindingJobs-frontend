<template>
  <section class="base">
    <div class="search">
      <form class="search-form">
        <label for="title">
          <input type="text" id="title" placeholder="Titre" />
        </label>
        <label for="region">
          <input type="search" id="region" placeholder="Région" />
        </label>
      </form>
    </div>
    <div class="filters">
      <h2>Filtres</h2>
      <form class="filters-form">
        <fieldset>
          <legend>
            <h3>Contrats</h3>
          </legend>
          <label for="CDD">
            <input type="checkbox" id="CDD" />
            <span> CDD</span>
          </label>
          <label for="CDI">
            <input type="checkbox" id="CDI" />
            <span> CDI</span>
          </label>
          <label for="Alternance">
            <input type="checkbox" id="Alternance" />
            <span> Alternance</span>
          </label>
          <label for="Stage">
            <input type="checkbox" id="Stage" />
            <span> Stage</span>
          </label>
          <label for="Freelance">
            <input type="checkbox" id="Freelance" />
            <span> Freelance</span>
          </label>
        </fieldset>
        <fieldset>
          <legend>
            <h3>Salaire</h3>
          </legend>
          <label for="salaryType" class="salary">
            <p>Mensuel</p>
            <div class="colors">
              <input type="checkbox" id="mod" class="colors" /><label
                for="mod"
                class="colors"
                >Toggle</label
              >
            </div>
            <p>Annuel</p>
          </label>
          <div class="range">
            <label for="min">
              <input type="number" id="min" />
            </label>
            <label for="value">
              <input type="range" id="value" />
            </label>
            <label for="max"> <input type="number" id="max" /> </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h3>Stacks</h3>
          </legend>
          <CustomSelect
            :options="this.stacks"
            :types="this.types"
          ></CustomSelect>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
import CustomSelect from './CustomSelect.vue';

export default {
  components: {
    CustomSelect,
  },
  data() {
    return {
      jobs: {},
      stacks: {},
      types: [],
    };
  },
  created() {
    this.getStacks();
    // this.getJobs();
  },
  methods: {
    getJobs() {
      const { token } = this.$store.state.token;
      fetch('http://localhost:3000/api/job/last7days', {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((jobs) => {
          console.table(jobs);
          this.jobs = jobs;
        })
        .catch(() => {
          return this.$toast.error('Failed to get jobs');
        });
    },
    getStacks() {
      const { token } = this.$store.state.token;
      fetch('http://localhost:3000/api/stack', {
        method: 'GET',
        headers: {
          Authorization: `Bearer: ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((stacks) => {
          console.log(stacks);
          this.stacks = stacks;
          this.getTypes(this.stacks);
        })
        .catch((error) => {
          return this.$toast.error(error);
        });
    },
    getTypes(data) {
      data.forEach((e) => {
        console.log(e.type);
        if (this.types.includes(e.type)) {
          return;
        }
        this.types.push(e.type);
      });
      return true;
    },
  },
};
</script>

<style scoped>
.base {
  background-color: #2b2b46;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.search {
  background-color: #3c365d;
  text-align: right;
  position: relative;
}

.params input {
  height: 0;
  width: 0;
  visibility: hidden;
}

.colors input {
  height: 0;
  width: 0;
  display: none;
}

.search-form label input {
  width: 40%;
  height: 45px;
  border-radius: 5px;
  outline: transparent;
  border: 1px solid black;
  margin: 10px 0;
  padding-left: 2vh;
  color: black;
}

.search-form label {
  padding: 0 2vh;
}

.search-form ::placeholder {
  padding-left: 0.5vh;
  font-size: large;
  font-family: Imprima, sans-serif;
  color: black;
}

.filters {
  background-color: #3c365d;
  text-align: center;
  max-width: 320px;
  height: 100vh;
  width: 100%;
  position: absolute;
  padding: 0 15px;
}

.filters h2 {
  padding: 2vh;
  color: white;
}

.filters-form {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.filters-form legend {
  border: 1px solid black;
  background-color: #544c83;
  padding: 1vh;
}

.filters-form fieldset {
  margin-top: 1.5vh;
}

.filters-form h3 {
  text-align: left;
  color: white;
  text-decoration: underline;
  margin: 0;
}

.filters-form label {
  display: flex;
  align-items: center;
  color: white;
}

.filters-form label input {
  width: 32px;
  height: 32px;
}

.filters-form label span {
  padding-left: 5px;
}

.filters-form label p {
  padding: 1vh;
}

.params label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 40px;
  background: #e61919;
  display: block;
  border-radius: 100px;
  position: relative;
}

.params label::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 30px;
  height: 30px;
  background: yellow;
  border-radius: 90px;
  transition: 0.3s;
}

.colors label {
  cursor: pointer;
  text-indent: -9999px;
  width: 70px;
  height: 30px;
  background: white;
  display: block;
  border-radius: 100px;
  position: relative;
}

.params input:checked + label {
  background: green;
}

.colors label::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background: #2b2b46;
  border-radius: 90px;
  transition: 0.3s;
}

.params input:checked + label::after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

.colors input:checked + label::after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

.salary {
  justify-content: center;
}

.range {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.range #value {
  width: 100%;
}
</style>
