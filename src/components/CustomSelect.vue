<template>
  <div class="custom-select">
    <div
      class="placeholder"
      @click="this.toggleDropdown = !this.toggleDropdown"
    >
      <p>Placeholder</p>
      <i class="fas fa-sort-down" v-if="this.toggleDropdown"></i>
      <i class="fas fa-sort-up" v-else></i>
    </div>
    <div class="dropdown" v-if="this.toggleDropdown">
      <div class="stackTypes" v-for="type in types" :key="type.index">
        <h4>{{ type }}</h4>
      </div>
      <div class="option" v-for="option in options" :key="option.id">
        <img :src="option.logo" :alt="option.name" />
        <p>{{ option.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleDropdown: false,
    };
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.placeholder {
  border: 1px solid blue;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
}

.dropdown {
  border: 1px solid green;
  max-height: 25vh;
  overflow-x: hidden;
  overflow-y: scroll;
}

.dropdown img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}

.dropdown.active {
  background-color: white;
  display: block;
}

.option {
  border: 1px solid cyan;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  color: white;
}
</style>
