<template>
  <div>
    <div class="mb-6">
      <Modules />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    const sId = this.$route.params.id;
    this.$store.dispatch("students/findStudentModules", sId);
  },
};
</script>

<style>
</style>