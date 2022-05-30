<template>
  <section class="search">
    <form class="search-form">
      <label for="title" class="title-label">
        <input type="text" id="title" placeholder="Titre" class="title-input" />
      </label>
      <label for="region" class="region-label">
        <input
          type="search"
          id="region"
          placeholder="Région"
          class="region-input"
        />
      </label>
    </form>
  </section>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.search {
  margin-bottom: 2vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-form {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2vh;
  width: 50%;
}

.search-form label input {
  width: 100%;
  height: 45px;
  outline: transparent;
  border: 1px solid black;
  margin: 10px 0;
  padding-left: 2vh;
  color: black;
}

.search-form label {
  width: 100%;
}

.search-form ::placeholder {
  padding-left: 0.5vh;
  font-size: large;
  font-family: Imprima, sans-serif;
  color: black;
}

.title-input {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.region-input {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
</style>
