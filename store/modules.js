import gql from "graphql-tag";
import { paginateData } from "./paginate";

const modules = {
  namespaced: true,
  state: () => {
    return {
      modules: null,
      store: null,
      list: [],
      add: null,
    };
  },
  mutations: {
    setModules(state, modules) {
      state.modules = modules;
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
            listModules {
              id
              code
              name
              description
              creditHour
              createdAt
              updatedAt
            }
          }
        `,
      });

      const modules = response.data.listModules;

      await commit("setStore", modules);

      dispatch("populateModules", { page: 1, search: "" });
    },
    populateModules({ state, commit }, { page, search }) {
      const store = state.store;
      const modules = store ? paginateData(store, page, 10) : null;
      commit("setModules", modules);
    },
    async create(_, { code, name, description, creditHour }) {
      let response = await this.app.apolloProvider.defaultClient.mutate({
        mutation: gql`
          mutation($name: String!, $code: String!, $description: String!, $creditHour: Float!) {
            createModule(
              module: {
                code: $code
                name: $name
                description: $description
                creditHour: $creditHour
              }
            ) 
          }
        `,
        variables: {
          code,
          name,
          description,
          creditHour
        },
      });

      return response.data.createModule;
    },
  },
  getters: {
    modules: (state) => {
      return state.modules;
    },
    list: (state) => {
      return state.list;
    },
    add: (state) => {
      return state.add;
    },
  },
};

export default modules;
