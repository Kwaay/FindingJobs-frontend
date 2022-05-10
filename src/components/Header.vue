<template>
  <header>
    <img
      src="../assets/img/colored_logo_white.svg"
      alt="Logo de FindingJobs"
      class="logo-img"
    />
    <nav>
      <router-link
        v-for="button in buttons"
        :key="button.name"
        :to="{ name: `${button.name}` }"
      >
        {{ button.content }}</router-link
      >
    </nav>
    <div class="infos">
      <img
        :src="$store.state.connectedUser.avatar"
        alt="Image de profil de l'utilisateur connecté"
      />
      <i
        @click="this.menuDisplayed = !menuDisplayed"
        v-if="!this.menuDisplayed"
        class="fas fa-sort-down"
      ></i>
      <i
        @click="this.menuDisplayed = !menuDisplayed"
        v-else
        class="fas fa-sort-up"
      ></i>
      <div
        class="logout"
        v-show="this.menuDisplayed"
        :class="{ on: this.menuDisplayed }"
      >
        <p><i class="fas fa-user"></i>Profil</p>
        <p><i class="fas fa-cog"></i>Settings</p>
        <p><i class="fas fa-sign-out-alt"></i>Logout</p>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      menuDisplayed: false,
    };
  },
};
</script>

<style scoped lang="scss">
@keyframes progressive-colors {
  0% {
    background-color: #fff;
  }

  100% {
    background-color: #a89df7;
  }
}

header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2vh 0;
  height: 100%;
  max-height: 100px;
  background-color: #2b2b46;
  position: relative;
}

.logo-img {
  width: 330px;
}

nav {
  display: flex;
  gap: 2vh;

  a {
    width: 100%;
    max-width: 145px;
    color: white;
    padding: 1vh;
    border-radius: 10px;
    font-size: large;
    position: relative;

    &::after {
      content: '';
      display: block;
      height: 2px;
      width: 0;
      position: absolute;
      bottom: -2px;
      left: 0;
      transition: width 0.2s ease-in-out;
    }

    &:hover {
      &::after {
        animation: 0.2s linear forwards progressive-colors;
        width: 100%;
      }
    }
  }
}

.infos {
  display: flex;
  align-items: center;
  padding: 0 2vh;
}

.infos i {
  color: white;
  padding: 0 1.2vh;
}

.infos img {
  border-radius: 50%;
  width: 48px;
}

.logout {
  display: flex;
  flex-flow: column wrap;
  position: absolute;
  background-color: #a89df7;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 110px;
  justify-content: center;
  top: 100px;
}

@keyframes slide-out {
  0% {
    opacity: 0;
    z-index: -999;
  }

  50% {
    display: block;
  }

  100% {
    opacity: 1;
  }
}

.on {
  animation: 0.2s linear forwards slide-out;
}
</style>
