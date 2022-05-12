<template>
  <div class="w-full bg-menu shadow z-50">
    <div class="container mx-auto py-3 px-12">
      <div class="flex justify-between">
        <div class="flex items-center">
          <p class="text-2xl text-orange-500">FBC Student</p>
        </div>
        <div class="flex justify-end">
          <div class="flex items-center">
            <div class="flex" v-if="notHome">
              <div class="w-6 flex justify-center mx-2">
                <svg
                  aria-hidden="true"
                  data-prefix="fas"
                  data-icon="bell"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  class="svg-inline--fa fa-bell fa-w-14 fa-7x w-5 h-5"
                >
                  <path
                    fill="#ffffff"
                    d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                  ></path>
                </svg>
              </div>
              <div v-if="user" class="flex justify-center mx-2">
                <el-dropdown>
                  <span class="el-dropdown-link text-white text-base">
                    {{ user.name }} <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>

                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Logout</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div v-if="!user" class="px-3">
              <el-button class="focus:outline-none" size="small" @click="login"
                >Login</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notHome: false,
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    login() {
      this.$store.commit("setLogin", false);
      this.$store.commit("setLogin", true);
    },
    init() {
      const route = this.$route;
      const path = route.path;

      if (path !== "/") {
        this.notHome = true;
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>