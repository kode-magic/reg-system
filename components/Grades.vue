<template>
  <div class="mb-10">
    <div class="flex justify-between items-center">
      <p class="text-gray-500 text-base font-medium">Grades</p>
      <el-button
        size="mini"
        icon="el-icon-plus"
        class="focus:outline-none"
        @click="add"
        >Add</el-button
      >
    </div>
    <div class="border p-2 mt-2">
      <el-table
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(f, f, f, 0.8)"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column fixed prop="module.code" label="Code"></el-table-column>
        <el-table-column prop="module.name" label="Name" show-overflow-tooltip></el-table-column>
        <el-table-column prop="module.creditHour" label="Credit Hour" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      isLoading: true,
      page: 1,
      sId: this.$route.params.id
    };
  },
  methods: {
    add() {
      this.$store.commit("students/setAddModule", true);
    },
    showing(pagernate) {
      return pagernate.pager.endIndex < pagernate.pager.totalItems
        ? pagernate.pager.endIndex
        : pagernate.pager.totalItems;
    },
  },
  computed: {
    modules() {
      return this.$store.getters["students/modules"];
    },
  },
  mounted() {
    this.$store.dispatch("students/findStudentModules", this.sId);
  },
  watch: {
    modules(val) {
      if (val) {
        this.tableData = val;
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
</style>