<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :width="size"
      title="New Faculty"
      :visible.sync="visible"
      ><el-form
        :model="facultyForm"
        ref="facultyForm"
        @submit.prevent.native
        label-position="top"
        label-width="40%"
      >
        <div class="border-t border-b px-5 pb-5">
          <div>
            <el-form-item
              prop="name"
              label="Name"
              :rules="[{ required: true, message: 'Name is required' }]"
            >
              <el-input
                placeholder="Name"
                autocomplete="off"
                v-model="facultyForm.name"
              >
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item
              label="Description"
              prop="description"
              :rules="[{ required: true, message: 'Description is required' }]"
            >
              <el-input
                placeholder="Description"
                autocomplete="off"
                type="textarea"
                v-model="facultyForm.description"
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="flex justify-end p-3">
          <el-button
            size="small"
            type="danger"
            plain
            @click="close"
            class="focus:outline-none"
            >Cancel</el-button
          >
          <el-button
            :loading="isLoading"
            @click="submitForm('facultyForm')"
            type="primary"
            size="small"
            class="focus:outline-none"
            >Save</el-button
          >
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      isLoading: false,
      size: "30%",
      facultyForm: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    close() {
      this.$refs["facultyForm"].resetFields();
      this.isLoading = false;
      this.$store.commit("faculty/setAdd", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this.$store
            .dispatch("faculty/create", this.facultyForm)
            .then((data) => {
              this.$message({
                showClose: true,
                message: data,
                type: "success",
                duration: 5000
              });
              this.$router.go();
            })
            .catch((err) => {
              this.isLoading = false;
              this.$message({
                showClose: true,
                message: err,
                type: "error",
                duration: 5000
              });
            });
        } else {
          return false;
        }
      });
    },
  },
  computed: {
    add() {
      return this.$store.getters["faculty/add"];
    },
  },
  watch: {
    add(val) {
      this.visible = val;
    },
    visible(val) {
      if (!val) {
        this.close();
      }
    },
  },
};
</script>

<style></style>
