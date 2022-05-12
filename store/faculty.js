import gql from "graphql-tag";
import { paginateData } from "./paginate";

const faculty = {
  namespaced: true,
  state: () => {
    return {
      faculties: null,
      store: null,
      list: [],
      courses: [],
      add: null,
    };
  },
  mutations: {
    setFaculties(state, faculties) {
      state.faculties = faculties;
    },
    setList(state, list) {
      state.list = list;
    },
    setStore(state, store) {
      state.store = store;
    },
    setAdd(state, add) {
      state.add = add;
    },
    setCourses(state, courses) {
      state.courses = courses;
    },
  },
  actions: {
    async find({ commit, dispatch }) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query {
            listFaculties {
              id
              name
              description
              totalCourses
              totalStudents
              createdAt
              updatedAt
            }
          }
        `,
      });

      const faculties = response.data.listFaculties;

      await commit("setStore", faculties);
      dispatch("proplateFaculties", { page: 1, search: "" });
    },
    courses({ state, commit }, id) {
      const faculty = state.list ? state.list.find((e) => e.id === id) : [];

      const courses = faculty ? faculty.courses : [];
      commit("setCourses", courses);
    },
    async findList({ commit }) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query {
            listFaculties {
              id
              name
              courses {
                id
                name
              }
            }
          }
        `,
      });

      const faculties = response.data.listFaculties;
      await commit("setList", faculties);
    },
    proplateFaculties({ state, commit }, { page, search }) {
      const store = state.store;
      const faculties = store ? paginateData(store, page, 10) : null;
      commit("setFaculties", faculties);
    },
    async create(_, { name, description }) {
      let response = await this.app.apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation($name: String!, $description: String!) {
            createFaculty(
                faculty: {
                name: $name, 
                description: $description
            })
          }
        `,
        variables: {
          name,
          description
        },
      });

      console.log(response.data);

      return response.data.createFaculty;
    },
  },
  getters: {
    faculties: (state) => {
      return state.faculties;
    },
    list: (state) => {
      return state.list;
    },
    courses: (state) => {
      return state.courses;
    },
    add: (state) => {
      return state.add;
    },
    course: (state) => (id) => {
      return state.courses.find((e) => e.id === id);
    },
    faculty: (state) => (id) => {
      return state.list ? state.list.find((e) => e.id === id) : null;
    },
  },
};

export default faculty;
