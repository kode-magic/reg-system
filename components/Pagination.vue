<template>
  <div class="flex">
    <div class="flex overflow-hidden rounded-md items-center">
      <div class="flex">
        <button
          :disabled="currentPage === 1"
          :class="{
            'text-gray-500': currentPage === 1,
            'cursor-not-allowed': currentPage === 1,
          }"
          @click="first"
          class="px-3 py-2 focus:outline-none flex items-center cursor-pointer"
        >
          <svg
            aria-hidden="true"
            data-prefix="far"
            data-icon="angle-double-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            class="svg-inline--fa fa-angle-double-left fa-w-12 fa-7x w-3 h-3 fill-current"
          >
            <path
              fill="currentColor"
              d="M20.2 247.5L167 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L85.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L184 412.5c-4.7 4.7-12.3 4.7-17 0l-146.8-148c-4.7-4.7-4.7-12.3 0-17zm160 17l146.8 148c4.7 4.7 12.3 4.7 17 0l19.8-19.8c4.7-4.7 4.7-12.3 0-17L245.3 256l118.5-119.7c4.7-4.7 4.7-12.3 0-17L344 99.5c-4.7-4.7-12.3-4.7-17 0l-146.8 148c-4.7 4.7-4.7 12.3 0 17z"
              class=""
            ></path>
          </svg>
        </button>
        <div
          :disabled="currentPage === 1"
          @click="prev"
          :class="[
            { 'text-gray-500': currentPage === 1 },
            { 'cursor-not-allowed': currentPage === 1 },
          ]"
          class="px-3 py-2 flex focus:outline-none items-center cursor-pointer"
        >
          <svg
            aria-hidden="true"
            data-prefix="far"
            data-icon="angle-left"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
            class="svg-inline--fa fa-angle-left fa-w-6 fa-7x w-3 h-3"
          >
            <path
              fill="currentColor"
              d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z"
              class=""
            ></path>
          </svg>
        </div>
      </div>
      <button
        :disabled="currentPage === row"
        :class="[
          { 'text-gray-500': currentPage === row },
          { 'cursor-not-allowed': currentPage === row },
        ]"
        class="px-3 py-2 h-full flex focus:outline-none items-center"
        @click="change(row)"
        v-for="(row, index) in pages"
        :key="index"
      >
        <span class="noselect">{{ row }}</span>
      </button>
      <div class="flex">
        <button
          :disabled="currentPage === totalPages || totalPages === 0"
          :class="[
            { 'text-gray-500': currentPage === totalPages || totalPages === 0 },
            {
              'cursor-not-allowed':
                currentPage === totalPages || totalPages === 0,
            },
          ]"
          @click="next"
          class="px-3 py-2 focus:outline-none flex items-center cursor-pointer"
        >
          <svg
            aria-hidden="true"
            data-prefix="far"
            data-icon="angle-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192 512"
            class="svg-inline--fa fa-angle-right fa-w-6 fa-7x w-3 h-3 fill-current"
          >
            <path
              fill="currentColor"
              d="M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z"
              class=""
            ></path>
          </svg>
        </button>
        <button
          :disabled="currentPage === totalPages || totalPages === 0"
          :class="[
            { 'text-gray-500': currentPage === totalPages || totalPages === 0 },
            {
              'cursor-not-allowed':
                currentPage === totalPages || totalPages === 0,
            },
          ]"
          @click="last"
          class="px-3 py-1 focus:outline-none flex items-center cursor-pointer"
        >
          <svg
            aria-hidden="true"
            data-prefix="far"
            data-icon="angle-double-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            class="svg-inline--fa fa-angle-double-right fa-w-12 fa-7x w-3 h-3"
          >
            <path
              fill="currentColor"
              d="M363.8 264.5L217 412.5c-4.7 4.7-12.3 4.7-17 0l-19.8-19.8c-4.7-4.7-4.7-12.3 0-17L298.7 256 180.2 136.3c-4.7-4.7-4.7-12.3 0-17L200 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17zm-160-17L57 99.5c-4.7-4.7-12.3-4.7-17 0l-19.8 19.8c-4.7 4.7-4.7 12.3 0 17L138.7 256 20.2 375.7c-4.7 4.7-4.7 12.3 0 17L40 412.5c4.7 4.7 12.3 4.7 17 0l146.8-148c4.7-4.7 4.7-12.3 0-17z"
              class=""
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 0,
    },
    pages: {
      default: null,
    },
  },
  data() {
    return {};
  },
  methods: {
    next() {
      const page = this.currentPage + 1;
      this.$emit("change", page);
    },
    prev() {
      const page = this.currentPage - 1;
      this.$emit("change", page);
    },
    first() {
      const page = 1;
      this.$emit("change", page);
    },
    last() {
      const page = this.totalPages;
      this.$emit("change", page);
    },
    change(page) {
      this.$emit("change", page);
    },
  },
};
</script>