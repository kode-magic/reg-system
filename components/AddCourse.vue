<template>
  <div>
    <el-dialog :width="size" title="New Course" :visible.sync="visible">
      <el-form
        :model="courseForm"
        :rules="rules"
        ref="courseForm"
        @submit.prevent.native
        label-position="top"
        label-width="35%"
        ><div class="px-5 pb-5 border-b border-t">
          <div>
            <el-form-item label="Faculty" prop="faculty">
              <el-select
                filterable
                v-model="courseForm.faculty"
                placeholder="Faculty"
              >
                <el-option
                  v-for="item in faculties"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Name" prop="name">
              <el-input placeholder="Name" v-model="courseForm.name"> </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Description" prop="description">
              <el-input
                type="textarea"
                placeholder="Description"
                v-model="courseForm.description"
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
              @click="submitForm('courseForm')"
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
      courseForm: {
        name: "",
        faculty: "",
        description: "",
      },
      rules: {
        name: [{ required: true, message: "Name is required" }],
        faculty: [{ required: true, message: "Faculty is required" }],
        description: [{ required: true, message: "Description is required" }],
      },
      size: "30%",
    };
  },
  computed: {
    faculties() {
      return this.$store.getters["faculty/list"];
    },
    add() {
      return this.$store.getters["courses/add"];
    },
  },
  methods: {
    close() {
      this.$refs["courseForm"].resetFields();

      this.isLoading = false;
      this.$store.commit("courses/setAdd", false);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this.$store
            .dispatch("courses/create", this.courseForm)
            .then((data) => {
              this.$router.go();
            })
            .catch((err) => {
              this.isLoading = false;
              console.log(err);
              // this.visible = false;
            });
        } else {
          return false;
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("faculty/findList");
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

<style>
</style>