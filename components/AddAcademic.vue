<template>
  <div>
    <el-dialog :width="size" title="New Module" :visible.sync="visible">
      <el-form
        :model="academicForm"
        :rules="rules"
        ref="academicForm"
        @submit.prevent.native
        label-position="top"
        label-width="35%"
        ><div class="px-5 pb-5 border-b border-t">
          <div>
            <el-form-item label="Academic Year" prop="academicYear">
              <el-input placeholder="eg. 2021/2022" v-model="academicForm.academicYear">
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Description" prop="description">
              <el-input
                type="textarea"
                placeholder="Description"
                v-model="academicForm.description"
              >
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="px-5 py-4">
          <div class="flex justify-end">
            <el-button
              size="small"
              class="focus:outline-none"
              type="danger"
              plain
              @click="close"
              >Cancel</el-button
            >
            <el-button
              size="small"
              class="focus:outline-none"
              :loading="isLoading"
              @click="submitForm('academicForm')"
              type="primary"
              >Save</el-button
            >
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      visible: false,
      academicForm: {
        academicYear: "",
        description: ""
      },
      rules: {
        academicYear: [{ required: true, message: "Academic is required" }],
        description: [{ required: true, message: "Description is required" }]
      },
      size: "30%",
    };
  },
  computed: {
    academics() {
      return this.$store.getters["academics/list"];
    },
    add() {
      return this.$store.getters["academics/add"];
    },
  },
  methods: {
    close() {
      this.$refs["academicForm"].resetFields();

      this.isLoading = false;
      this.$store.commit("academics/setAdd", false);
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this.$store
            .dispatch("academics/create", this.academicForm)
            .then(async (data) => {
              await this.$message({
                showClose: true,
                message: data,
                type: "success",
                duration: 5000
              });
              this.$router.go();
            })
            .catch((err) => {
              this.isLoading = false;
              this.$message.error(err);
            });
        } else {
          return false;
        }
      });
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
