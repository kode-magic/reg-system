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
          ref="familyForm"
          :model="familyForm"
          :rules="rules"
        >
          <div class="flex flex-wrap -mx-2">
            <div class="w-1/2 px-2">
              <el-form-item prop="name" label="Name">
                <el-input
                  v-model="familyForm.name"
                  placeholder="Name"
                  size="medium"
                />
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="birthDate" label="Birth Date">
                <el-date-picker
                  v-model="familyForm.birthDate"
                  type="date"
                  format="yyyy/MM/dd"
                  value-format="yyyy-MM-dd"
                  :picker-options="futureOptions"
                  placeholder="Birth Date"
                >
                </el-date-picker>
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="gender" label="Gender">
                <div class="flex">
                  <el-radio-group v-model="familyForm.gender">
                    <el-radio label="Male"></el-radio>
                    <el-radio label="Female"></el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </div>
            <div class="w-1/2 px-2">
              <el-form-item prop="relation" label="Relationship">
                <el-select
                  size="medium"
                  v-model="familyForm.relation"
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
                <el-input placeholder="Contact" v-model="familyForm.contact">
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
            <div class="w-1/2 px-2 pt-10">
              <el-form-item>
                <el-checkbox v-model="familyForm.emergencyContact"
                  >Emergency Contact</el-checkbox
                >
              </el-form-item>
            </div>
            <div class="w-1/2 px-2 pt-2">
              <el-form-item>
                <el-checkbox v-model="familyForm.isKin"
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
                v-model="familyForm.address"
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
          @click="submitForm('familyForm')"
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
      futureOptions: {
        disabledDate: this.futureDate,
      },
      countryCode: "+232",
      familyForm: {
        name: "",
        gender: "",
        relation: "",
        contact: "",
        address: "",
        emergencyContact: false,
        isKin: false,
        birthDate: "",
        employee: "",
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
    family() {
      return this.$store.getters["employee/family"];
    },
    rules() {
      return {
        name: [
          {
            required: true,
            message: "Name is required",
          },
        ],
        gender: [{ required: true, message: "Gender is required" }],
        birthDate: [{ required: true, message: "Birth is required" }],
        relation: [
          {
            required: true,
            message: "Relationship is required",
          },
        ],
        contact: [
          {
            required: true,
            message: "Contact is required",
          },
          { validator: this.checkPhone, trigger: ["change", "blur"] },
        ],
        address: [{ required: true, message: "Address is required" }],
      };
    },
  },
  methods: {
    futureDate(time) {
      return time.getTime() > Date.now() - 8.64e7;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isLoading = true;

          this.$store
            .dispatch("employee/family", {
              ...this.familyForm,
              countryCode: this.countryCode,
            })
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
      this.familyForm = {
        name: "",
        gender: "",
        relation: "",
        contact: "",
        address: "",
        emergencyContact: false,
        birthDate: "",
        isKin: false,
      };
      this.$refs["familyForm"].resetFields();
      this.$store.commit("employee/setFamily", false);
    },
  },
  mounted() {
    const sId = this.$route.query.sId;
    this.familyForm.employee = sId;
  },
  watch: {
    family(val) {
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