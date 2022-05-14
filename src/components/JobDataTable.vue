<template>
  <section class="jobs">
    <div class="jobs-list">
      <div class="jobs-item" v-for="job in jobs" :key="job.id">
        <div class="jobs-infos">
          <h1>{{ job.name }}</h1>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      jobs: {},
    };
  },
  created() {
    this.getJobs();
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
  },
};
</script>

<style scoped></style>
