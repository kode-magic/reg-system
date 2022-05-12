<template>
  <div>
    <el-dialog :width="size" title="New Module" :visible.sync="visible">
      <el-form
        :model="userForm"
        :rules="rules"
        ref="userForm"
        @submit.prevent.native
        label-position="top"
        label-width="35%"
        ><div class="px-5 pb-5 border-b border-t">
          <div>
            <el-form-item label="Full Name" prop="name">
              <el-input placeholder="full name" v-model="userForm.name">
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="phone" label="Telephone">
                <el-input placeholder="phone" v-model="userForm.phone">
                  <el-select
                    class="phone"
                    style="width: 70px"
                    v-model="countryCode"
                    slot="prepend"
                    placeholder="Code"
                  >
                    <el-option
                      v-for="(item, index) in countries"
                      :key="`phone-${index}`"
                      :label="item.code"
                      :value="item.code"
                    >
                      <span style="float: left">{{ item.name }}</span>
                      <span
                        style="
                          float: right;
                          padding-left: 10px;
                          color: #8492a6;
                          font-size: 13px;
                        "
                        >{{ item.code }}</span
                      >
                    </el-option>
                  </el-select>
                </el-input>
              </el-form-item>
          </div>
          <div>
            <el-form-item label="Email Address" prop="email">
              <el-input placeholder="email" v-model="userForm.email">
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Username" prop="username">
              <el-input placeholder="username" v-model="userForm.username">
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="User Role" prop="role">
              <el-select v-model="userForm.role">
                <el-option label="Super Admin" value="Super Admin"></el-option>
                <el-option label="Viewer" value="Viewer"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="Password" prop="password">
              <el-input placeholder="password" v-model="userForm.password">
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
              @click="submitForm('userForm')"
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
      countryCode: "+232",
      userForm: {
        name: "",
        phone: "",
        email: "",
        username: "",
        role: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "Full name is required" }],
        phone: [{ required: true, message: "Telephone is required" }],
        email: [{ required: true, message: "Email is required" }],
        username: [{ required: true, message: "Username is required" }],
        role: [{ required: true, message: "Role is required" }],
        password: [{ required: true, message: "Password is required" }]
      },
      size: "30%",
    };
  },
  computed: {
    countries() {
      return this.$store.getters.countries;
    },
    academics() {
      return this.$store.getters["academics/list"];
    },
    add() {
      return this.$store.getters["users/add"];
    },
  },
  methods: {
    close() {
      this.$refs["userForm"].resetFields();

      this.isLoading = false;
      this.$store.commit("users/setAdd", false);
    },
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;
          this.$store
            .dispatch("users/create", { ...this.userForm, countryCode: this.countryCode, })
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
