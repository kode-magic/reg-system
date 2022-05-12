import gql from "graphql-tag";
import { paginateData } from "./paginate";

const courses = {
  namespaced: true,
  state: () => {
    return {
      courses: null,
      store: null,
      list: [],
      add: null,
    };
  },
  mutations: {
    setCourses(state, courses) {
      state.courses = courses;
    },
    setStore(state, store) {
      state.store = store;
    },
    setAdd(state, add) {
      state.add = add;
    },
  },
  actions: {
    async find({ commit, dispatch }) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query {
            listCourses {
              name
              description
              faculty
              totalStudents
              createdAt
              updatedAt
            }
          }
        `,
      });

      const courses = response.data.listCourses;

      await commit("setStore", courses);

      dispatch("populateCourses", { page: 1, search: "" });
    },
    populateCourses({ state, commit }, { page, search }) {
      const store = state.store;
      const courses = store ? paginateData(store, page, 10) : null;
      commit("setCourses", courses);
    },
    async create(_, { name, faculty, description }) {
      let response = await this.app.apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation($name: String!, $faculty: String!, $description: String!) {
            createCourse(
              course: {
                name: $name
                faculty: $faculty
                description: $description
              }
            ) 
          }
        `,
        variables: {
          name,
          faculty,
          description,
        },
      });

      return response.data.createCourse;
    },
  },
  getters: {
    courses: (state) => {
      return state.courses;
    },
    list: (state) => {
      return state.list;
    },
    add: (state) => {
      return state.add;
    },
  },
};

export default courses;
