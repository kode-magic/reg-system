import gql from "graphql-tag";
import { paginateData } from "./paginate";

const students = {
  namespaced: true,
  state: () => {
    return {
      students: null,
      modules: null,
      addresses: null,
      store: null,
      storeAddress: null,
      storeFamily: null,
      storeBanks: null,
      banks: null,
      module: false,
      family: false,
      bank: false,
      travel: false,
      families: null,
    };
  },
  mutations: {
    setStudents(state, students) {
      state.students = students;
    },
    setStore(state, store) {
      state.store = store;
    },
    setStoreAddress(state, storeAddress) {
      state.storeAddress = storeAddress;
    },
    setAddresses(state, addresses) {
      state.addresses = addresses;
    },
    setAddModule(state, module) {
      state.module = module;
    },
    setStudentModules(state, modules){
      state.modules = modules;
    }
  },
  actions: {
    async find({ commit, dispatch }) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query {
            listStudents {
              id
              studentId
              givenNames
              familyName
              gender
              age
              civilStatus
              birthDate
              birthCountry
              birthPlace
              nationality
              religion
              phone
              email
              semester
              course
              faculty
              studentType
            }
          }
        `,
      });

      const students = response.data.listStudents;

      await commit("setStore", students);

      dispatch("populateStudents", {
        page: 1,
      });
    },
    populateStudents({ state, commit }, { page }) {
      const store = state.store;
      const students = store ? paginateData(store, page, 15) : null;
      commit("setStudents", students);
    },
    async findOne(_, id) {
      try {
        let response = await this.app.apolloProvider.defaultClient.query({
          query: gql`
            query($id: String!) {
              getStudent(id: $id) {
                id
                studentId
                givenNames
                familyName
                gender
                age
                civilStatus
                birthDate
                birthCountry
                birthPlace
                nationality
                religion
                phone
                email
                semester
                course
                faculty
                studentType
                admissionDate
              }
            }
          `,
          variables: {
            id,
          },
        });

        return response.data.getStudent;
      } catch (error) {
        throw error.message.replace("GraphQL error: ", "");
      }
    },
    async create(
      _,
      {
        studentId,
        givenNames,
        familyName,
        gender,
        birthDate,
        phone,
        course,
        semester,
        studentType,
        civilStatus,
        birthCountry,
        nationality,
        email,
        birthPlace,
        religion,
        admissionDate,
        countryCode,
        address,
      }
    ) {
      try {
        let response = await this.app.apolloProvider.defaultClient.mutate({
          mutation: gql`
            mutation(
              $studentId: String!
              $givenNames: String!
              $familyName: String!
              $gender: String!
              $birthDate: String!
              $phone: String!
              $course: String!
              $semester: String!
              $studentType: String!
              $civilStatus: String!
              $birthCountry: String!
              $nationality: String!
              $email: String!
              $birthPlace: String!
              $religion: String!
              $admissionDate: String!
              $address: String!
            ) {
              createStudent(
                student: {
                  studentId: $studentId
                  givenNames: $givenNames
                  familyName: $familyName
                  gender: $gender
                  birthDate: $birthDate
                  phone: $phone
                  course: $course
                  semester: $semester
                  studentType: $studentType
                  civilStatus: $civilStatus
                  birthCountry: $birthCountry
                  nationality: $nationality
                  email: $email
                  birthPlace: $birthPlace
                  religion: $religion
                  admissionDate: $admissionDate
                  address: $address
                }
              )
            }
          `,
          variables: {
            studentId,
            givenNames,
            familyName,
            gender,
            birthDate,
            phone: `${countryCode}${phone}`,
            course,
            semester,
            studentType,
            civilStatus,
            birthCountry,
            nationality,
            email,
            birthPlace,
            religion,
            admissionDate,
            address,
          },
        });
        return response.data.createStudent;
      } catch (error) {
        throw error.message.replace("GraphQL error: ", "");
      }
    },
    async assignModule(_, { student, module, semester }) {
      let response = await this.app.apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation($student: String!, $module: String!, $semester: String!) {
            addStudentModule(
              mod: { student: $student, module: $module, semester: $semester }
            )
          }
        `,
        variables: {
          student,
          module,
          semester,
        },
      });
      return response.data.addStudentModule;
    },
    async findStudentModules({ commit, dispatch }, student) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query($student: String!) {
            listStudentModules(student: $student) {
              id 
              module { code name creditHour }
            }
          }
        `,
        variables: {
          student
        },
      });

      const modules = response.data.listStudentModules;
      commit("setStudentModules", modules);
    },
  },
  getters: {
    students: (state) => {
      return state.students;
    },
    modules: (state) => {
      return state.modules;
    },
  },
};

export default students;
