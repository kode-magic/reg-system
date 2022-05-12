<template>
  <div class="h-screen flex flex-col overflow-hidden">
    <div class="container mx-auto px-3 flex-1 overflow-y-auto">
      <div class="pt-3">
        <div class="bg-white p-2 shadow rounded-sm">
          <h1 class="text-xl mb-3">Student List</h1>
          <el-table
            :data="tableData"
            style="width: 100%"
            border
            stripe
            @row-click="handelClick"
            element-loading-text="Loading..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(f, f, f, 0.8)"
            v-loading="isLoading"
          >
            <el-table-column
              fixed
              property="studentId"
              label="Student ID"
              width="120"
            >
            </el-table-column>
            <el-table-column label="Name" width="200">
              <template slot-scope="scope">
                <p>{{ scope.row.givenNames }} {{ scope.row.familyName }}</p>
              </template>
            </el-table-column>
            <el-table-column property="gender" label="Gender" width="100">
            </el-table-column>
            <el-table-column label="Age" property="age" width="100">
            </el-table-column>
            <el-table-column
              label="Birth Date"
              property="birthDate"
              width="120"
            >
            </el-table-column>
            <el-table-column
              label="Birth Country"
              property="birthCountry"
              width="130"
            >
            </el-table-column>
            <el-table-column
              label="Birth Place"
              property="birthPlace"
              width="130"
            >
            </el-table-column>
            <el-table-column
              property="civilStatus"
              label="Civil Status"
              width="100"
            >
            </el-table-column>
            <el-table-column property="religion" label="Religion" width="100">
            </el-table-column>
            <el-table-column property="phone" label="Phone" width="150">
            </el-table-column>
            <el-table-column property="email" label="Email" width="200">
            </el-table-column>
            <el-table-column
              label="Nationality"
              property="nationality"
              width="100"
            >
            </el-table-column>
            <el-table-column
              property="faculty"
              label="Faculty"
              width="150"
            >
            </el-table-column>
            <el-table-column property="course" label="Course" width="150">
            </el-table-column>
            <el-table-column
              property="semester"
              label="Semester"
              width="120"
            >
            </el-table-column>
            <el-table-column property="studentType" label="Student Type" width="150">
            </el-table-column>
          </el-table>
          <div
            class="mt-3 px-3 flex justify-between items-center"
            v-if="students && students.pager.totalItems > 0"
          >
            <div>
              <span>Showing</span>
              {{
                students.pager.endIndex < students.pager.totalItems
                  ? students.pager.endIndex
                  : students.pager.totalItems
              }}
              <span>of</span>
              {{ students.pager.totalItems }}
            </div>
            <div>
              <pagination
                @change="changePage"
                :currentPage="students.pager.currentPage"
                :pages="students.pager.pages"
                :totalPages="students.pager.totalPages"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-0 right-0 mr-16 mb-10 fixed z-50">
      <div class="flex flex-col items-center">
        <div>
          <button
            @click="addNew"
            class="p-2 rounded-full shadow-xl border-2 border-white bg-orange-600 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="fill-current w-8 h-8 text-white"
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
      search: "",
      size: "30%",
    };
  },
  computed: {
    students() {
      return this.$store.getters["students/students"];
    },
  },
  methods: {
    changePage(page) {
      this.page = page;

      this.$store.dispatch("students/populateStudents", {
        page,
        search: this.search,
      });
    },
    addNew() {
      this.$router.push("/student/add"); 
    },
    populateStore() {
      this.$store.dispatch("students/find");
    },
    handelClick(val) {
      this.$router.push(`/student/${val.id}`)
    }
  },
  mounted() {
    this.populateStore();
  },
  watch: {
    students(val) {
      if (val) {
        this.isLoading = false;
        this.tableData = val.pageOfItems;
      }
      else {
        this.isLoading = false;
      }
    },
  },
  components: {
    Pagination,
  },
};
</script>