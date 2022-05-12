<template>
  <div>
    <el-dialog :width="size" title="New Module" :visible.sync="visible">
      <el-form
        :model="moduleForm"
        :rules="rules"
        ref="moduleForm"
        @submit.prevent.native
        label-position="top"
        label-width="35%"
        ><div class="px-5 pb-5 border-b border-t">
          <div>
            <el-form-item label="Module Code" prop="code">
              <el-input placeholder="Module code" v-model="moduleForm.code">
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Module Name" prop="name">
              <el-input placeholder="Module name" v-model="moduleForm.name">
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Credit Hour" prop="name">
              <el-input
                placeholder="credit hour"
                v-model="moduleForm.creditHour"
              >
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Description" prop="description">
              <el-input
                type="textarea"
                placeholder="Description"
                v-model="moduleForm.description"
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
              @click="submitForm('moduleForm')"
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
      moduleForm: {
        code: "",
        name: "",
        description: "",
        creditHour: null,
      },
      rules: {
        code: [{ required: true, message: "code is required" }],
        name: [{ required: true, message: "Name is required" }],
        description: [{ required: true, message: "Description is required" }],
        creditHour: [{ required: true, message: "Credit hour is required" }],
      },
      size: "30%",
    };
  },
  computed: {
    faculties() {
      return this.$store.getters["faculty/list"];
    },
    add() {
      return this.$store.getters["modules/add"];
    },
  },
  methods: {
    close() {
      this.$refs["moduleForm"].resetFields();

      this.isLoading = false;
      this.$store.commit("modules/setAdd", false);
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this.moduleForm.creditHour = Number.parseFloat(
            this.moduleForm.creditHour
          );
          this.$store
            .dispatch("modules/create", this.moduleForm)
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
