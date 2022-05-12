<template>
  <div class="bg-gray-100" style="overflow:scroll; height:600px;">
    <div v-if="student">
      <div class="h-32 bg-gray-300 shadow-lg "></div>
      <div class="w-full -mt-24">
        <div class="bg-white shadow-md rounded-md mx-10 my-5">
          <div class="p-8 flex justify-between items-center">
            <div class="flex">
              <div>
                <img
                  class="mx-auto h-20 w-20 rounded-full"
                  src="https://p.kindpng.com/picc/s/623-6236350_profile-icon-png-white-clipart-png-download-windows.png"
                  alt=""
                />
              </div>
              <div class="ml-5">
                <p class="text-2xl font-bold">
                  {{ `${student.givenNames} ${student.familyName}` }}
                  <span class="ml-2 text-sm">( {{ student.studentId }} )</span>
                </p>
                <p>{{ student.studentType }}</p>
                <p>{{ student.admissionDate }}</p>
              </div>
            </div>
            <div>
              <el-button v-if="student.photo" icon="el-icon-edit">Change Photo</el-button>
              <el-button v-else icon="el-icon-edit">Upload Photo</el-button>
            </div>
          </div>
          <div class="flex border-t">
            <p class="text-center w-1/3 py-3">{{ student.faculty }}</p>
            <p class="text-center border-l border-r w-1/3 py-3">
              {{ student.course }}
            </p>
            <p class="text-center w-1/3 py-3">{{ student.semester }}</p>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-md mx-10 py-4 my-5">
          <div class="flex px-6 -mx-5">
            <div class="w-1/2 px-5">
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Gender:</div>
                <div>{{ student.gender }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Age:</div>
                <div>{{ student.age }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Birth Date:
                </div>
                <div>{{ student.birthDate }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Birth Country:
                </div>
                <div>{{ student.birthCountry }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Birth Place:
                </div>
                <div>{{ student.birthPlace }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Nationality:
                </div>
                <div>{{ student.nationality }}</div>
              </div>
            </div>
            <div class="w-1/2 px-5">
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Religion:</div>
                <div>{{ student.religion }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Civil Status:
                </div>
                <div>{{ student.civilStatus }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Phone:</div>
                <div>{{ student.phone }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Email:</div>
                <div>{{ student.email }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Student Type:
                </div>
                <div>{{ student.studentType }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Admission Date:
                </div>
                <div>{{ student.admissionDate }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-md mx-10 pt-3 my-5">
          <div class="border-b-2 flex">
            <nuxt-link
              :to="subjects"
              active-class="border-orange-500 font-bold text-orange-600"
              exact
              class="border-b-2 mx-5 block tab pb-2"
              >Modules</nuxt-link
            >
            <nuxt-link
              :to="grades"
              active-class="border-orange-500 font-bold text-orange-600"
              class="border-b-2 mx-5 block tab pb-2"
              >Grades</nuxt-link
            >
          </div>
          <div class="px-5 py-2 mb-10">
            <nuxt />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="h-screen flex flex-col items-center justify-center">
      <div v-if="!isLoading" class="flex flex-col items-center">
        <div class="bg-white rounded-full p-10">
          <svg
            aria-hidden="true"
            data-prefix="far"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            class="svg-inline--fa fa-search fa-w-16 fa-7x w-20 h-20 fill-current text-gray-300"
          >
            <path
              fill="currentColor"
              d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
              class=""
            ></path>
          </svg>
        </div>
        <p class="text-xl text-gray-700 mt-10">
          Click on a staff to view profile
        </p>
      </div>
      <div v-else class="flex flex-col items-center">
        <load-vue />
        <p class="text-xl text-gray-400 mt-10">Loading . . .</p>
      </div>
    </div>
  </div>
</template>

<script>
import LoadVue from '~/components/Load.vue';

export default {
  data() {
    const sId = this.$route.params.id;

    const subjects = `/student/${sId}`;
    const grades = `/student/${sId}/grades`;

    return {
      subjects,
      grades,
      student: null,
      isLoading: true,
    };
  },
  components: {
    LoadVue,
  },
  mounted() {
    const sId = this.$route.params.id;

    if (sId) {
      this.$store
        .dispatch("students/findOne", sId)
        .then((data) => {
          this.student = data;
          this.isLoading = false;
        })
        .catch((error) => {
          this.isLoading = false;
          this.$message.error("Something went wrong");
        });
    } else this.isLoading = false;
  },
};
</script>