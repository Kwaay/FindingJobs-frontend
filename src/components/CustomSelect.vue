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
      <div class="list-types" v-for="group in Object.keys(stacks)" :key="group">
        <h4>{{ group }}</h4>
        <div class="option" v-for="stack in stacks[group]" :key="stack.id">
          <img :src="stack.logo" :alt="stack.name" />
          <p>{{ stack.name }}</p>
        </div>
      </div>
      <!-- 
        TODO:
        Rajouter une classe hidden quand sélectionné, et le push dans un tableau
        dès que je push dans un tableau, je emit piur dire qu ça a été mis à jour
      -->
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
    stacks: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
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

.list-types {
  text-align: left;
  color: white;
  padding: 8px;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 2px;
    position: absolute;
    bottom: -2px;
    left: 0;
    transition: width 0.2s ease-in-out;
    width: 100%;
  }
}
</style>
