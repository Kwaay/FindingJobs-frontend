<template>
  <div class="custom-select">
    <div
      class="placeholder"
      @click="this.toggleDropdown = !this.toggleDropdown"
    >
      <p>Liste des stacks</p>
      <div class="triangle" v-if="this.toggleDropdown"></div>
      <div class="triangle2" v-else></div>
    </div>
    <div class="dropdown" v-if="this.toggleDropdown">
      <div
        class="list-types"
        v-for="(group, key) in stacks"
        :key="group"
        v-show="group.find((s) => !s.tagged)"
      >
        <h4>{{ key }}</h4>
        <transition-group>
          <div
            class="option"
            v-for="stack in group"
            :key="stack.id"
            @click="addTag(stack)"
            v-show="!stack.tagged"
          >
            <img :src="stack.logo" :alt="stack.name" />
            <p>{{ stack.name }}</p>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleDropdown: false,
      tags: [],
    };
  },
  props: {
    stacks: {
      type: Object,
      required: true,
    },
  },
  methods: {
    addTag(stack) {
      // eslint-disable-next-line no-param-reassign
      stack.tagged = true;
      this.$emit('refreshStacks', this.stacks);
    },
  },
};
</script>

<style scoped lang="scss">
.triangle {
  height: 0;
  width: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 8px solid #2b2b46;
}

.triangle2 {
  height: 0;
  width: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 8px solid #2b2b46;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.placeholder {
  background: white;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  font-size: large;
  color: #2b2b46;
  width: 100%;
}

.dropdown {
  background: #2b2b46;
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
  border: 1px solid white;
  border-radius: 20px;
  margin: 8px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 8px;
  color: white;
}

.list-types {
  text-align: left;
  color: white;
  padding: 16px;
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 2px;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
  }
}
</style>
