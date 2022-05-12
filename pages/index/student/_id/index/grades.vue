<template>
  <div>
    <div class="mb-6">
      <Grades />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  mounted() {
    const sId = this.$route.params.id;
    this.$store.dispatch("students/findAddress", sId);
    this.$store.dispatch("students/findFamily", sId);
    this.$store.dispatch("students/findBank", sId);
  },
};
</script>

<style>
</style>