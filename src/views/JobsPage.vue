<template>
  <main>
    <Header
      :buttons="[
        {
          name: 'Jobs',
          content: 'Jobs',
        },
        {
          name: 'Contact',
          content: 'Contact',
        },
      ]"
    ></Header>
    <section class="title">
      <h1>Jobs</h1>
      <p>Retrouvez tous les derniers jobs ci-dessous</p>
    </section>
    <JobDataTable></JobDataTable>
  </main>
</template>

<script>
import Header from '../components/Header.vue';
import JobDataTable from '../components/JobDataTable.vue';

export default {
  components: {
    Header,
    JobDataTable,
  },
};
</script>

<style>
.title {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2.5vh;
  font-size: x-large;
}

.title p {
  font-weight: lighter;
}
</style>
