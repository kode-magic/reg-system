<template>
  <div
    class="cursor-pointer bg-sec rounded-full p-1"
    :id="fileId"
    @click="click"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="16"
      height="16"
      class="fill-current"
    >
      <path
        class="heroicon-ui"
        d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileId: `_${Math.random().toString(36).substr(2, 9)}`,
    };
  },
  methods: {
    change({ target }) {
      if (target.files.length > 0) {
        this.isSelected = true;
        const file = target.files[0];

        const fileSize = target.files[0].size / 2048 / 1024;

        if (fileSize > 1) {
          const fileName = file.name;
          this.$emit("error", `File [${fileName}] is larger than 2mb`);
        } else {
          const fileName = file.name;

          const reader = new FileReader();

          reader.readAsDataURL(file);
          reader.onload = () => {
            this.$emit("input", file);
            this.$emit("change", fileName);
            this.$emit("base64", reader.result);

            const filePicker = document.querySelector(`#${this.fileId}`);
            const input = filePicker.querySelector("input");
            filePicker.removeChild(input);
          };
        }
      }
    },
    click() {
      const inputTag = document.createElement("input");
      inputTag.setAttribute("type", "file");
      inputTag.setAttribute("accept", "image/jpeg, image/jpg, application/pdf");
      inputTag.classList.add("hidden");

      const file = document.querySelector(`#${this.fileId}`);
      file.appendChild(inputTag);

      const input = file.querySelector("input");
      input.click();
      input.addEventListener("change", this.change);
    },
  },
};
</script>