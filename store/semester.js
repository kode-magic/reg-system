import gql from "graphql-tag";

const semester = {
  namespaced: true,
  state: () => {
    return {
      list: null,
      semesters: null
    }
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setSemesters(state, semesters) {
      state.semesters = semesters;
    },
  },
  actions: {
    async find({ commit, dispatch }) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query {
            listSemesters {
              id
              name
            }
          }
        `,
      });

      const semesters = response.data.listSemesters;

      await commit("setSemesters", semesters);
    },
    async findList({ commit }) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query {
            listSemesters {
              id
              name
              student {
                id
              }
            }
          }
        `,
      });

      const semesters = response.data.listSemesters;

      await commit("setList", semesters);
    },
  },
  getters: {
    semesters: (state) => {
      return state.semesters
    },
    list: (state) => {
      return state.list
    },
    semester: (state) => (id) => {
      return state.list ? state.list.find((e) => e.id === id) : null;
    },
  }
};

export default semester;