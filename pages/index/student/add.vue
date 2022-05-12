<template>
  <div class="h-screen overflow-hidden flex">
    <div class="container mx-auto p-5 pb-24 flex-1 overflow-y-auto">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/student' }"
          >Students</el-breadcrumb-item
        >
        <el-breadcrumb-item>New Student</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="pt-5">
        <el-form
          label-position="top"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <div class="bg-white mb-8 shadow border-2 border-gray-600 rounded">
            <div
              class="border-b-2 border-gray-600 px-5 py-4 flex items-center justify-between"
            >
              <p class="text-lg">Basic Information</p>
            </div>
            <div class="px-5 py-6 flex -mx-3">
              <div class="flex w-3/4 px-5 -mx-3">
                <div class="w-1/2 px-3">
                  <div class="mb-5">
                    <p class="font-semibold mb-1">Personal Details</p>
                    <div class="flex flex-wrap -mx-2">
                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item prop="studentId" label="Student ID">
                          <el-input
                            placeholder="Student id"
                            v-model="ruleForm.studentId"
                          >
                          </el-input>
                        </el-form-item>
                      </div>
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item prop="studentType" label="Student Type">
                          <el-select
                            filterable
                            placeholder="student type"
                            v-model="ruleForm.studentType"
                          >
                            <el-option
                              v-for="(item, index) in studentTypes"
                              :key="`studentType-${index}`"
                              :label="item"
                              :value="item"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item prop="givenNames" label="Given Name">
                          <el-input
                            v-model="ruleForm.givenNames"
                            placeholder="given name"
                          ></el-input>
                        </el-form-item>
                      </div>
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item prop="familyName" label="Family Name">
                          <el-input
                            v-model="ruleForm.familyName"
                            placeholder="family name"
                          ></el-input>
                        </el-form-item>
                      </div>

                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item label="Civil Status" prop="civilStatus">
                          <div class="md:flex">
                            <el-select
                              v-model="ruleForm.civilStatus"
                              filterable
                              placeholder="Civil Status"
                            >
                              <el-option
                                v-for="(item, index) in status"
                                :key="`civilStatus-${index}`"
                                :label="item"
                                :value="item"
                              >
                              </el-option>
                            </el-select>
                          </div>
                        </el-form-item>
                      </div>
                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item label="Religion" prop="religion">
                          <el-select
                            filterable
                            placeholder="Religion"
                            v-model="ruleForm.religion"
                          >
                            <el-option
                              v-for="(item, index) in religions"
                              :key="`religion-${index}`"
                              :label="item"
                              :value="item"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-1/2 px-3">
                  <div class="mb-5">
                    <p class="font-semibold mb-1">Birth Details</p>
                    <div class="flex -mx-2 flex-wrap">
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item prop="gender" label="Gender">
                          <div class="flex">
                            <el-radio-group v-model="ruleForm.gender">
                              <el-radio label="Male"></el-radio>
                              <el-radio label="Female"></el-radio>
                            </el-radio-group>
                          </div>
                        </el-form-item>
                      </div>
                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item prop="birthDate" label="Birth Date">
                          <el-date-picker
                            v-model="ruleForm.birthDate"
                            type="date"
                            format="yyyy/MM/dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="futureOptions"
                            placeholder="Birth Date"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </div>
                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item label="Birth Country" prop="birthCountry">
                          <el-select
                            filterable
                            placeholder="birth country"
                            v-model="ruleForm.birthCountry"
                          >
                            <el-option
                              v-for="(item, index) in countries"
                              :key="`birthCountry-${index}`"
                              :label="item.name"
                              :value="item.name"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item label="Birth Place" prop="birthPlace">
                          <el-input
                            placeholder="birth city"
                            v-model="ruleForm.birthPlace"
                          >
                          </el-input>
                        </el-form-item>
                      </div>
                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item label="Nationality" prop="nationality">
                          <el-select
                            filterable
                            placeholder="ationality"
                            v-model="ruleForm.nationality"
                          >
                            <el-option
                              v-for="(item, index) in countries"
                              :key="`nationality-${index}`"
                              :label="item.name"
                              :value="item.name"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-5 w-1/4">
                <div v-if="basicSummery()">
                  <p class="font-semibold">Basic Information</p>
                  <div class="flex mt-1">
                    <p class="bg-gray-600 p-s rounded-full"></p>
                  </div>
                  <div class="pl-2 ml-s border-l-2 border-gray-500">
                    <p v-if="ruleForm.studentId">
                      Student ID: {{ ruleForm.studentId }}
                    </p>
                    <p v-if="ruleForm.studentType">
                      Student Type: {{ ruleForm.studentType }}
                    </p>
                    <p v-if="ruleForm.givenNames">
                      Given Names: {{ ruleForm.givenNames }}
                    </p>
                    <p v-if="ruleForm.familyName">
                      Family Name: {{ ruleForm.familyName }}
                    </p>
                    <p v-if="ruleForm.gender">Gender: {{ ruleForm.gender }}</p>
                    <p v-if="ruleForm.civilStatus">
                      Civil Status: {{ ruleForm.civilStatus }}
                    </p>
                    <p v-if="ruleForm.religion">
                      Religion: {{ ruleForm.religion }}
                    </p>
                    <p v-if="ruleForm.birthDate">
                      Birth Date: {{ ruleForm.birthDate }}
                    </p>
                    <p v-if="ruleForm.birthCountry">
                      Birth Country: {{ ruleForm.birthCountry }}
                    </p>
                    <p v-if="ruleForm.birthPlace">
                      Birth City: {{ ruleForm.birthPlace }}
                    </p>
                    <p v-if="ruleForm.nationality">
                      Nationality: {{ ruleForm.nationality }}
                    </p>
                  </div>
                  <div class="flex">
                    <p class="bg-gray-500 p-s rounded-full"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white border-2 shadow border-gray-600 rounded">
            <div
              class="border-b-2 border-gray-600 px-5 py-4 flex items-center justify-between"
            >
              <p class="text-lg">Other Information</p>
            </div>
            <div class="px-5 py-6 flex -mx-3">
              <div class="flex w-3/4 px-5 -mx-3">
                <div class="w-1/2 px-3">
                  <div>
                    <p class="font-semibold mb-1">Faculty Details</p>
                    <div class="flex -mx-2 flex-wrap">
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item label="Faculty" prop="faculty">
                          <el-select
                            filterable
                            placeholder="faculty"
                            @change="fetchCourses"
                            v-model="ruleForm.faculty"
                          >
                            <el-option
                              v-for="(item, index) in faculties"
                              :key="`faculty-${index}`"
                              :label="item.name"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item label="Course" prop="course">
                          <el-select
                            filterable
                            placeholder="course"
                            :loading="unitLoading"
                            v-model="ruleForm.course"
                          >
                            <el-option
                              v-for="(item, index) in courses"
                              :key="`course-${index}`"
                              :label="item.name"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item label="Semester" prop="semester">
                          <el-select
                            filterable
                            placeholder="semester"
                            v-model="ruleForm.semester"
                          >
                            <el-option
                              v-for="(item, index) in semesters"
                              :key="`semester-${index}`"
                              :label="item.name"
                              :value="item.id"
                            >
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </div>
                      <div class="md:w-1/2 w-full px-2 mb-1">
                        <el-form-item prop="admissionDate" label="Admission Date">
                          <el-date-picker
                            v-model="ruleForm.admissionDate"
                            type="date"
                            format="yyyy/MM/dd"
                            value-format="yyyy-MM-dd"
                            :picker-options="futureOptions"
                            placeholder="admission date"
                          >
                          </el-date-picker>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="w-1/2 px-3">
                  <div>
                    <p class="font-semibold mb-1">Contact & Other Details</p>
                    <div class="flex flex-wrap -mx-2 mb-4">
                      <div class="w-1/2 px-2 phone mb-1">
                        <el-form-item prop="phone" label="Phone">
                          <el-input
                            placeholder="Phone"
                            v-model="ruleForm.phone"
                          >
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
                      <div class="w-1/2 px-2 mb-1">
                        <el-form-item prop="email" label="Email">
                          <el-input
                            placeholder="Email"
                            v-model="ruleForm.email"
                          >
                          </el-input>
                        </el-form-item>
                      </div>
                      <div class="w-full px-2 mb-1">
                        <el-form-item prop="address" label="Student Address">
                          <el-input
                            placeholder="student address"
                            type="textarea"
                            v-model.trim="ruleForm.address"
                          >
                          </el-input>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="px-5 w-1/4">
                <div v-if="otherSummery()">
                  <p class="font-semibold">Other Information</p>
                  <div class="flex mt-1">
                    <p class="bg-gray-500 p-s rounded-full"></p>
                  </div>
                  <div class="pl-2 ml-s border-l-2 border-gray-500">
                    <p v-if="ruleForm.faculty">
                      Faculty: {{ facultyData() }}
                    </p>
                    <p v-if="ruleForm.course">Course: {{ courseData() }}</p>
                    <p v-if="ruleForm.semester">
                      Semester: {{ semesterData() }}
                    </p>
                    <p v-if="ruleForm.admissionDate">
                      Semester: {{ ruleForm.admissionDate }}
                    </p>
                    <p v-if="ruleForm.phone">
                      Phone: {{ `${countryCode}${ruleForm.phone}` }}
                    </p>
                    <p v-if="ruleForm.email">Email: {{ ruleForm.email }}</p>
                    <p v-if="ruleForm.address">Address: {{ ruleForm.address }}</p>
                  </div>
                  <div class="flex">
                    <p class="bg-gray-500 p-s rounded-full"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-8 flex justify-end">
            <el-button
              class="focus:outline-none"
              size="medium"
              type="danger"
              plain
              @click="close"
              >Cancel</el-button
            >
            <el-button
              class="focus:outline-none"
              @click="submitForm('ruleForm')"
              type="primary"
              size="medium"
              >Save</el-button
            >
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      unitLoading: false,
      countryCode: "+232",
      phoneError: false,
      ruleForm: {
        givenNames: "",
        familyName: "",
        gender: "",
        birthDate: "",
        course: "",
        semester: "",
        faculty: "",
        phone: "",
        studentId: "",
        studentType: "",
        religion: "",
        birthPlace: "",
        nationality: "",
        birthCountry: "",
        email: "",
        admissionDate: "",
        address: "",
        academicYear: ""
      },
      futureOptions: {
        disabledDate: this.futureDate,
      },
      rules: {
        givenNames: [{ required: true, message: "Given name is required" }],
        familyName: [{ required: true, message: "Family name is required" }],
        gender: [{ required: true, message: "Gender is required" }],
        birthDate: [{ required: true, message: "Birth date is required" }],
        course: [{ required: true, message: "Course is required" }],
        faculty: [{ required: true, message: "Faculty is required" }],
        email: [{ required: true, message: "Email is required" }],
        birthPlace: [{ required: true, message: "Birth City is required" }],
        religion: [{ required: true, message: "Religion is required" }],
        civilStatus: [{ required: true, message: "Civil Status is required" }],
        phone: [
          { required: true, message: "Phone is required" },
          { validator: this.checkPhone, trigger: ["change", "blur"] },
        ],
        studentId: [{ required: true, message: "Student ID is required" }],
        studentType: [{ required: true, message: "Specify student type" }],
        nationality: [{ required: true, message: "Nationality is required" }],
        semester: [{ required: true, message: "Semester is required" }],
        address: [{ required: true, message: "Address is required" }],
        academicYear: [{ required: true, message: "Academic year is required" }],
        admissionDate: [{ required: true, message: "Admission date is required" }],
      },
    };
  },
  computed: {
    status() {
      return this.$store.getters.civilStatus;
    },
    faculties() {
      console.log(this.$store.getters["semester/list"]);
      return this.$store.getters["faculty/list"];
    },
    courses() {
      return this.$store.getters["faculty/courses"];
    },
    countries() {
      return this.$store.getters.countries;
    },
    studentTypes() {
      return this.$store.getters.studentTypes;
    },
    religions() {
      return this.$store.getters.religions;
    },
    semesters() {
      return this.$store.getters['semester/list'];
    },
  },
  methods: {
    checkPhone(rule, value, callback) {
      const phoneReg = /^[1-9]{1}[0-9]{7,11}$/;

      if (!Number.isInteger(+value)) {
        callback(new Error("Please enter a numeric value"));
      } else {
        if (phoneReg.test(value)) {
          if (!this.phoneError) {
            callback();
          } else
            callback(
              new Error(
                `${this.countryCode}${this.ruleForm.phone} already exists`
              )
            );
        } else {
          callback(new Error("phone number format is incorrect"));
        }
      }
    },
    fetchCourses(val) {
      this.unitLoading = true;
      this.$store.dispatch("faculty/courses", val);
    },
    futureDate(time) {
      return time.getTime() > Date.now() - 8.64e7;
    },
    close() {
      this.$router.go(-1);
    },
    basicSummery() {
      if (
        this.ruleForm.givenNames ||
        this.ruleForm.familyName ||
        this.ruleForm.gender ||
        this.ruleForm.birthDate ||
        this.ruleForm.religion ||
        this.ruleForm.nationality ||
        this.ruleForm.civilStatus ||
        this.ruleForm.birthCity ||
        this.ruleForm.birthCountry ||
        this.ruleForm.studentId ||
        this.ruleForm.studentType
      )
        return true;
      else return false;
    },
    otherSummery() {
      if (
        this.ruleForm.faculty ||
        this.ruleForm.course ||
        this.ruleForm.semester ||
        this.ruleForm.level ||
        this.ruleForm.phone ||
        this.ruleForm.email ||
        this.ruleForm.admissionDate
      )
        return true;
      else return false;
    },
    courseData() {
      const course = this.$store.getters["faculty/course"](this.ruleForm.course);

      if (course) {
        return course.name;
      }
    },
    facultyData() {
      const faculty = this.$store.getters["faculty/faculty"](
        this.ruleForm.faculty
      );

      if (faculty) {
        return faculty.name;
      }
    },
    semesterData() {
      const semester = this.$store.getters["semester/semester"](
        this.ruleForm.semester
      );

      if (semester) {
        return semester.name;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "Loading...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });

          this.$store
            .dispatch("students/create", {
              ...this.ruleForm,
              countryCode: this.countryCode,
            })
            .then(async (data) => {
              loading.close();
              await this.$message({
                showClose: true,
                message: data,
                type: "success",
                duration: 5000
              });
              window.location = "/student";
            })
            .catch((err) => {
              if (err.indexOf("already exists") != -1) {
                this.phoneError = true;
                this.$refs[formName].validate((valid) => {
                  if (!valid) return false;
                });
              } else {
                this.$message.error(err);
              }

              loading.close();
            });
        } else {
          return false;
        }
      });
    },
  },
  watch: {
    courses(val) {
      this.unitLoading = false;
    },
    "ruleForm.phone"(val) {
      if (val) this.phoneError = false;
    },
  },
  mounted() {
    this.$store.dispatch("semester/findList");
    this.$store.dispatch("faculty/findList");
  },
};
</script>
<style scoped>
.p-s {
  padding: 3px;
}

.ml-s {
  margin-left: 2px;
}
</style>