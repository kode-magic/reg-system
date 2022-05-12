<template>
  <div>
    <el-dialog
      title="Add Address"
      :width="size"
      :visible.sync="visible"
      close="z-50"
    >
      <div class="border-t border-b py-4 px-5">
        <el-form
          label-position="top"
          ref="addressForm"
          :model="addressForm"
          :rules="rules"
        >
          <div class="flex flex-wrap -mx-2">
            <div class="w-1/2 px-2">
              <el-form-item prop="type" label="Type">
                <el-select
                  size="medium"
                  v-model="addressForm.type"
                  filterable
                  placeholder="Type"
                >
                  <el-option
                    v-for="(item, index) in types"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="country" label="Country">
                <el-select
                  size="medium"
                  v-model="addressForm.country"
                  filterable
                  placeholder="Country"
                >
                  <el-option
                    v-for="(item, index) in countries"
                    :key="index"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="city" label="City">
                <el-input
                  size="medium"
                  v-model="addressForm.city"
                  placeholder="City"
                >
                </el-input>
              </el-form-item>
            </div>
            <div
              class="w-1/2 px-2"
              v-if="addressForm.country === 'Sierra Leone'"
            >
              <el-form-item prop="district" label="District">
                <el-select
                  size="medium"
                  v-model="addressForm.district"
                  filterable
                  placeholder="District"
                >
                  <el-option
                    v-for="(item, index) in districts"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="flex -mx-2">
            <div class="w-1/2 px-2">
              <el-form-item prop="address" label="Address">
                <el-input
                  type="textarea"
                  rows="2"
                  size="medium"
                  placeholder="Address"
                  v-model="addressForm.address"
                />
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item label="Remarks">
                <el-input
                  type="textarea"
                  rows="2"
                  size="medium"
                  placeholder="Remarks"
                  v-model="addressForm.remarks"
                />
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="flex justify-end py-2 px-4">
        <el-button
          size="small"
          class="focus:outline-none"
          plain
          type="danger"
          @click="cancel"
          >Cancel</el-button
        >
        <el-button
          @click="submitForm('addressForm')"
          size="small"
          :loading="isLoading"
          class="focus:outline-none"
          type="primary"
          >Save</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      isLoading: false,
      size: "45%",
      addressForm: {
        type: "",
        country: "",
        city: "",
        district: "",
        address: "",
        remarks: "",
        employee: "",
      },
    };
  },
  computed: {
    countries() {
      return this.$store.getters.countries;
    },
    types() {
      return this.$store.getters.types;
    },
    districts() {
      return this.$store.getters.districts;
    },
    address() {
      return this.$store.getters["employee/address"];
    },
    rules() {
      const checkDistrict = () => {
        if (this.addressForm.country === "Sierra Leone") return true;
        else return false;
      };

      return {
        type: [
          {
            required: true,
            message: "Type is required",
          },
        ],
        country: [{ required: true, message: "Country is required" }],
        city: [
          {
            required: true,
            message: "City is required",
          },
        ],
        district: [
          {
            required: checkDistrict,
            trigger: "change",
            message: "District is required",
          },
        ],
        address: [{ required: true, message: "Address is required" }],
      };
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;

          this.$store
            .dispatch("employee/address", this.addressForm)
            .then((data) => {
              this.$router.go();
            })
            .catch((err) => {
              this.isLoading = false;
              this.$message.error("Something went wrong");
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.addressForm = {
        type: "",
        country: "",
        city: "",
        district: "",
        address: "",
        remarks: "",
      };
      this.$refs["addressForm"].resetFields();
      this.$store.commit("employee/setAddress", false);
    },
  },
  mounted() {
    const sId = this.$route.query.sId;
    this.addressForm.employee = sId;
  },
  watch: {
    address(val) {
      this.visible = val;
    },
    visible(val) {
      if (!val) {
        this.cancel();
      }
    },
  },
};
</script>