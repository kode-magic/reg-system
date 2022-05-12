<template>
  <div class="flex-1 relative z-0 bg-gray-100 overflow-y-auto order-last pb-20">
    <div v-if="!staff">
      <div class="h-32 bg-orange-600"></div>
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
                  {{ `${staff.givenNames} ${staff.familyName}` }}
                  <span class="ml-2 text-sm">( {{ staff.staffId }} )</span>
                </p>
                <p>{{ staff.staffType }}</p>
                <p>{{ staff.position }}</p>
              </div>
            </div>
            <div>
              <el-button icon="el-icon-edit">Edit Profile</el-button>
            </div>
          </div>
          <div class="flex border-t">
            <p class="text-center w-1/3 py-3">{{ staff.department }}</p>
            <p class="text-center border-l border-r w-1/3 py-3">
              {{ staff.unit }}
            </p>
            <p class="text-center w-1/3 py-3">{{ staff.level }}</p>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-md mx-10 py-4 my-5">
          <div class="flex px-6 -mx-5">
            <div class="w-1/2 px-5">
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Gender:</div>
                <div>{{ staff.gender }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Age:</div>
                <div>{{ staff.age }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Birth Date:
                </div>
                <div>{{ staff.birthDate }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Birth Country:
                </div>
                <div>{{ staff.birthCountry }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Birth City:
                </div>
                <div>{{ staff.birthCity }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Nationality:
                </div>
                <div>{{ staff.nationality }}</div>
              </div>
            </div>
            <div class="w-1/2 px-5">
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Religion:</div>
                <div>{{ staff.religion }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Civil Status:
                </div>
                <div>{{ staff.civilStatus }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Phone:</div>
                <div>{{ staff.phone }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">Email:</div>
                <div>{{ staff.email }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  Nassit Number:
                </div>
                <div>{{ staff.nassitNumber }}</div>
              </div>
              <div class="flex justify-between mb-2">
                <div class="font-medium text-gray-500 truncate">
                  No of Children:
                </div>
                <div>{{ staff.childrenCount }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white shadow-md rounded-md mx-10 pt-3 my-5">
          <div class="border-b-2 flex">
            <nuxt-link
              :to="general"
              active-class="border-orange-500 font-bold text-orange-600"
              exact
              class="border-b-2 mx-5 block tab pb-2"
              >General Information</nuxt-link
            >
            <nuxt-link
              :to="assessments"
              active-class="border-orange-500 font-bold text-orange-600"
              class="border-b-2 mx-5 block tab pb-2"
              >Assessments</nuxt-link
            >
            <nuxt-link
              :to="attachments"
              active-class="border-orange-500 font-bold text-orange-600"
              class="border-b-2 mx-5 block tab pb-2"
              >Attachments</nuxt-link
            >
          </div>
          <div class="px-5 py-2">
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
import LoadVue from "./Load.vue";

export default {
  data() {
    const sId = this.$route.query.sId;

    const general = `/hr/finder${sId ? `?sId=${sId}` : ""}`;
    const assessments = `/hr/finder/assessments${sId ? `?sId=${sId}` : ""}`;
    const attachments = `/hr/finder/attachments${sId ? `?sId=${sId}` : ""}`;

    return {
      general,
      assessments,
      attachments,
      staff: null,
      isLoading: true,
    };
  },
  components: {
    LoadVue,
  },
  mounted() {
    const sId = this.$route.query.sId;

    if (sId) {
      this.$store
        .dispatch("employee/findOne", sId)
        .then((data) => {
          this.staff = data;
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