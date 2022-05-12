<template>
  <div class="flex bg-indigo-900 flex-col w-56 relative">
    <div class="flex-1 text-white flex flex-col overflow-y-auto">
      <div class="p-4 border-b border-main">
        <p class="text-xl text-gray-300 font-bold">FBC Student</p>
      </div>
      <ul class="mt-10">
        <li class="mb-4 px-4">
          <nuxt-link
            active-class="font-semibold text-orange-600 focus:outline-none"
            to="/"
            exact
            class="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="w-5 h-5 fill-current"
            >
              <path
                class="heroicon-ui"
                d="M13 20v-5h-2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7.59l-.3.3a1 1 0 1 1-1.4-1.42l9-9a1 1 0 0 1 1.4 0l9 9a1 1 0 0 1-1.4 1.42l-.3-.3V20a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zm5 0v-9.59l-6-6-6 6V20h3v-5c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v5h3z"
              />
            </svg>
            <p class="ml-3 leading-6 font-medium">Dashboard</p>
          </nuxt-link>
        </li>
        <li class="mb-4 px-4">
          <nuxt-link
            active-class="font-semibold text-orange-600 focus:outline-none"
            to="/faculty"
            class="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="w-5 h-5 fill-current"
            >
              <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                fill="#fff"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
            <p class="ml-3 leading-6 font-medium">Faculty</p>
          </nuxt-link>
        </li>
        <li class="mb-4 px-4">
          <nuxt-link
            active-class="font-semibold text-orange-600 focus:outline-none"
            to="/courses"
            class="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="w-5 h-5 fill-current"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              />
            </svg>
            <p class="ml-3 leading-6 font-medium">Courses</p>
          </nuxt-link>
        </li>
        <li class="mb-4 px-4">
          <nuxt-link
            active-class="font-semibold text-orange-600 focus:outline-none"
            to="/modules"
            class="flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="w-5 h-5 fill-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p class="ml-3 leading-6 font-medium">Modules</p>
          </nuxt-link>
        </li>
        <li class="mb-4 px-4">
          <nuxt-link
            active-class="font-semibold text-orange-600 focus:outline-none"
            to="/student"
            class="flex"
          >
            <svg
              class="h-5 w-5"
              x-description="Heroicon name: user-group"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <p class="ml-3 leading-6 font-medium">Student</p>
          </nuxt-link>
        </li>
        <li class="mb-4 px-4">
          <nuxt-link
            active-class="font-semibold text-orange-600 focus:outline-none"
            to="/academics"
            class="flex"
          >
            <svg
              class="h-5 w-5"
              x-description="Heroicon name: user-group"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <p class="ml-3 leading-6 font-medium">Academics</p>
          </nuxt-link>
        </li>
        <li class="mb-4 px-4">
          <nuxt-link
            active-class="font-semibold text-orange-600 focus:outline-none"
            to="/users"
            class="flex"
          >
            <svg
              class="h-5 w-5"
              x-description="Heroicon name: user-group"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
            <p class="ml-3 leading-6 font-medium">Users</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div
      class="flex-shrink-0 flex border-gray-200 py-4 border-t border-main px-4"
    >
      <div class="flex">
        <!-- <div>
          <img
            src="https://p.kindpng.com/picc/s/623-6236350_profile-icon-png-white-clipart-png-download-windows.png"
            alt=""
            class="inline-block h-9 w-9 rounded-full"
          />
        </div> -->
        <div class="ml-3">
          <p
            class="text-sm font-medium text-gray-400 group-hover:text-gray-900"
          >
            Wanjah Solleh
          </p>
          <p
            class="text-xs font-medium text-gray-500 group-hover:text-gray-700"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: false,
    };
  },
};
</script>

<style></style>
