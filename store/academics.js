import gql from "graphql-tag";
import { paginateData } from "./paginate";

const academics = {
  namespaced: true,
  state: () => {
    return {
      academics: null,
      store: null,
      list: [],
      add: null,
    };
  },
  mutations: {
    setAcademics(state, academics) {
      state.academics = academics;
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
            listAcademics {
              id
              academicYear
              description
              status
              createdAt
              updatedAt
            }
          }
        `,
      });

      const academics = response.data.listAcademics;

      await commit("setStore", academics);

      dispatch("populateAcademics", { page: 1, search: "" });
    },
    populateAcademics({ state, commit }, { page, search }) {
      const store = state.store;
      const modules = store ? paginateData(store, page, 10) : null;
      commit("setAcademics", modules);
    },
    async create(_, { academicYear, description }) {
      let response = await this.app.apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation($academicYear: String!, $description: String!) {
            createAcademic(
              academic: {
                academicYear: $academicYear
                description: $description
              }
            ) 
          }
        `,
        variables: {
          academicYear,
          description
        },
      });

      return response.data.createAcademic;
    },
  },
  getters: {
    academics: (state) => {
      return state.academics;
    },
    list: (state) => {
      return state.list;
    },
    add: (state) => {
      return state.add;
    },
  },
};

export default academics;
