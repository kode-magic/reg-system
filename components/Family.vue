<template>
  <div class="mb-10">
    <div class="flex justify-between items-center">
      <p class="text-gray-500 text-base font-medium">Family</p>
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
        v-loading="isLoading"
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column prop="name" label="Name" width="150">
        </el-table-column>
        <el-table-column prop="birthDate" label="Birth Date" width="150">
        </el-table-column>
        <el-table-column prop="gender" label="Gender" width="80">
        </el-table-column>
        <el-table-column prop="contact" label="Contact" width="150">
        </el-table-column>
        <el-table-column prop="address" label="Address" width="150">
        </el-table-column>
        <el-table-column prop="relation" label="Relationship" width="150">
        </el-table-column>
        <el-table-column
          prop="emergencyContact"
          label="Emergency Contact"
          width="150"
        >
        </el-table-column>
        <el-table-column prop="isKin" label="Next of Kin" width="150">
        </el-table-column>
      </el-table>
    </div>
    <div
      class="mt-1 flex justify-between items-center"
      v-if="families && families.pager.totalItems > 0"
    >
      <div>
        <span>Showing</span>
        {{ showing(families) }}
        <span>of</span>
        {{ families.pager.totalItems }}
      </div>
      <div>
        <pagination
          :currentPage="families.pager.currentPage"
          :pages="families.pager.pages"
          :totalPages="families.pager.totalPages"
        />
      </div>
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
    };
  },
  methods: {
    add() {
      this.$store.commit("employee/setFamily", true);
    },
    showing(pagernate) {
      return pagernate.pager.endIndex < pagernate.pager.totalItems
        ? pagernate.pager.endIndex
        : pagernate.pager.totalItems;
    },
  },
  computed: {
    families() {
      return this.$store.getters["employee/families"];
    },
  },
  mounted() {
    this.$store.dispatch("employee/proplateFamily", this.page);
  },
  watch: {
    families(val) {
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