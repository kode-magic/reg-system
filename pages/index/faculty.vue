<template>
  <div>
    <div class="container mx-auto px-2 pt-2 pb-10">
      <div class="bg-white p-5 shadow rounded-sm">
        <h1 class="text-xl mb-3">Faculty List</h1>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          element-loading-text="Loading..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(f, f, f, 0.8)"
          v-loading="isLoading"
        >
          <el-table-column resizable property="name" label="Name" show-overflow-tooltip>
          </el-table-column>
          <el-table-column property="description" label="Description" show-overflow-tooltip>
          </el-table-column>
          <el-table-column property="description" label="Telephone" show-overflow-tooltip>
          </el-table-column>
          <el-table-column width="125" property="totalCourses" label="Address">
          </el-table-column>
          <el-table-column width="125" property="totalStudents" label="Total Staffs">
          </el-table-column>
          <el-table-column width="170" property="updatedAt" label="Last Modified Date">
          </el-table-column>
          <el-table-column label="Action" width="100">
            <template>
              <div class="flex items-center">
                <button class="focus:outline-none mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    class="w-4 h-4 fill-current text-green-500"
                  >
                    <path
                      class="heroicon-ui"
                      d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zm-9.9-1.42a6 6 0 0 0 8.48 0L20.38 12l-4.24-4.24a6 6 0 0 0-8.48 0L3.4 12l4.25 4.24zM11.9 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                    />
                  </svg>
                </button>
                <button class="focus:outline-none mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    class="w-4 h-4 fill-current text-yellow-500"
                  >
                    <path
                      class="heroicon-ui"
                      d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"
                    />
                  </svg>
                </button>
                <button class="focus:outline-none mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    class="w-4 h-4 fill-current text-red-500"
                  >
                    <path
                      class="heroicon-ui"
                      d="M8 6V4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2h5a1 1 0 0 1 0 2h-1v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H3a1 1 0 1 1 0-2h5zM6 8v12h12V8H6zm8-2V4h-4v2h4zm-4 4a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0v-6a1 1 0 0 1 1-1z"
                    />
                  </svg>
                </button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div
          class="mt-5 flex justify-between items-center"
          v-if="faculties && faculties.pager.totalItems > 0"
        >
          <div>
            <span>Showing</span>
            {{
              faculties.pager.endIndex < faculties.pager.totalItems
                ? faculties.pager.endIndex
                : faculties.pager.totalItems
            }}
            <span>of</span>
            {{ faculties.pager.totalItems }}
          </div>
          <div>
            <pagination
              @change="changePage"
              :currentPage="faculties.pager.currentPage"
              :pages="faculties.pager.pages"
              :totalPages="faculties.pager.totalPages"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-0 right-0 mr-16 mb-10 fixed z-50">
      <div class="flex flex-col items-center">
        <div>
          <button
            @click="addNew"
            class="p-3 rounded-full shadow-xl border-2 border-white bg-orange-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="fill-current w-6 h-6 text-white"
            >
              <path
                class="heroicon-ui"
                d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
              />
            </svg>
          </button>
        </div>
        <div>
          <p
            class="bg-gray-700 text-center text-xs w-10 rounded-full mt-2 text-white"
          >
            New
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "~/components/Pagination.vue";

export default {
  data() {
    return {
      tableData: [],
      isLoading: true,
      page: 1,
      search: "",
      tableBorder: true,
    };
  },
  computed: {
    faculties() {
      return this.$store.getters["faculty/faculties"];
    },
  },
  methods: {
    changePage(page) {
      this.page = page;

      this.$store.dispatch("faculty/proplateFaculties", {
        page,
        search: this.search,
      });
    },
    addNew() {
      this.$store.commit("faculty/setAdd", true);
    },
    proplateStore() {
      this.$store.dispatch("faculty/find");
    },
  },
  mounted() {
    this.proplateStore();
  },
  watch: {
    faculties(val) {
      if (val) {
        this.isLoading = false;
        this.tableData = val.pageOfItems;
      }
    },
  },
  components: {
    Pagination,
  },
};
</script>
