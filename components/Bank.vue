<template>
    <div class="mb-10">
      <div class="flex justify-between items-center">
        <p class="text-gray-500 text-base font-medium">Bank</p>
        <el-button
          size="mini"
          icon="el-icon-plus"
          class="focus:outline-none"
          @click="add"
          >Add</el-button
        >
      </div>
      <div class="border p-2 mt-2">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="accountName" label="Account Name"> </el-table-column>
          <el-table-column prop="accountNumber" label="Account No"> </el-table-column>
          <el-table-column prop="name" label="Bank Name"> </el-table-column>
          <el-table-column prop="address" label="Bank Address"> </el-table-column>
          <el-table-column prop="bban" label="BBAN">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: 1
    };
  },
  methods: {
    add() {
      this.$store.commit("employee/setBank", true);
    },
    showing(pagernate) {
      return pagernate.pager.endIndex < pagernate.pager.totalItems
        ? pagernate.pager.endIndex
        : pagernate.pager.totalItems;
    },
  },
  computed: {
    banks() {
      return this.$store.getters["employee/banks"];
    },
  },
  mounted() {
    this.$store.dispatch("employee/proplateBanks", this.page);
  },
  watch: {
    banks(val) {
      if (val) {
        this.tableData = val.pageOfItems;
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
</style>