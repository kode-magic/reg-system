<template>
  <div>
    <el-dialog
      title="Add Family"
      :width="size"
      :visible.sync="visible"
      close="z-50"
    >
      <div class="border-t border-b py-4 px-5">
        <el-form
          label-position="top"
          ref="travelForm"
          :model="travelForm"
          :rules="rules"
        >
          <div class="flex flex-wrap -mx-2">
            <div class="w-1/2 px-2">
              <el-form-item prop="name" label="Name">
                <el-input
                  v-model="travelForm.name"
                  placeholder="Name"
                  size="medium"
                />
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="gender" label="Gender">
                <div class="flex">
                  <el-radio-group v-model="travelForm.gender">
                    <el-radio label="Male"></el-radio>
                    <el-radio label="Female"></el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="relationship" label="Relationship">
                <el-select
                  size="medium"
                  v-model="travelForm.relationship"
                  filterable
                  placeholder="Relationship"
                >
                  <el-option
                    v-for="(item, index) in relationships"
                    :key="index"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="contact" label="Cantact">
                <el-input placeholder="Contact" v-model="travelForm.contact">
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
            <div class="w-1/2 px-2 mt-2">
              <el-form-item>
                <el-checkbox v-model="travelForm.emergency"
                  >Emergency Contact</el-checkbox
                >
              </el-form-item>
            </div>
            <div class="w-1/2 px-2 mt-2">
              <el-form-item>
                <el-checkbox v-model="travelForm.nextKin"
                  >Next of Kin</el-checkbox
                >
              </el-form-item>
            </div>
          </div>
          <div>
            <el-form-item prop="address" label="Address">
              <el-input
                type="textarea"
                rows="2"
                size="medium"
                placeholder="Address"
                v-model="travelForm.address"
              />
            </el-form-item>
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
          @click="submitForm('travelForm')"
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
      countryCode: "+232",
      travelForm: {
        name: "",
        gender: "",
        relationship: "",
        contact: "",
        address: "",
        emergency: false,
        nextKin: false,
      },
    };
  },
  computed: {
    countries() {
      return this.$store.getters.countries;
    },
    relationships() {
      return this.$store.getters.relationships;
    },
    travel() {
      return this.$store.getters["employee/travel"];
    },
    rules() {
      const districtCheck =
        this.travelForm.country && this.travelForm.country === "Sierra Leone";

      return {
        name: [
          {
            required: true,
            message: "Name is required",
          },
        ],
        gender: [{ required: true, message: "Gender is required" }],
        relationship: [
          {
            required: true,
            message: "Relationship is required",
          },
        ],
        contact: [
          {
            required: true,
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
            .dispatch("employee/address", this.travelForm)
            .then((data) => {
              this.isLoading = false;
              this.$message.success("Address added successfully");
              this.cancel();
            })
            .catch((err) => {
              console.log(err);
              this.isLoading = false;
              this.$message.error("Something went wrong");
            });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$store.commit("employee/setTravel", false);
      this.travelForm = {
        name: "",
        gender: "",
        relationship: "",
        contact: "",
        address: "",
        emergency: false,
        nextKin: false,
      };
      this.$refs["travelForm"].resetFields();
    },
  },
  watch: {
    travel(val) {
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

<style>
</style>