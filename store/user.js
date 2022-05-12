import gql from "graphql-tag";
import { paginateData } from "./paginate";

const users = {
  namespaced: true,
  state: () => {
    return {
      users: null,
      store: null,
      add: null,
    };
  },
  mutations: {
    setUsers(state, users) {
      state.users = users;
    },
    setStore(state, store) {
      state.store = store;
    },
    setAdd(state, add) {
      state.add = add;
    }
  },
  actions: {
    async find({ commit, dispatch }) {
      let response = await this.app.apolloProvider.defaultClient.query({
        query: gql`
          query {
            listUsers {
              id
              name
              phone
              email
              username
              role
              createdAt
              updatedAt
            }
          }
        `,
      });

      const users = response.data.listUsers;

      await commit("setStore", users);

      dispatch("populateUsers", {
        page: 1,
      });
    },
    populateUsers({ state, commit }, { page }) {
      const store = state.store;
      const users = store ? paginateData(store, page, 15) : null;
      commit("setUsers", users);
    },
    async create(
      _,
      {
        name,
        phone,
        email,
        username,
        role,
        password,
        countryCode,
      }
    ) {
      try {
        let response = await this.app.apolloProvider.defaultClient.mutate({
          mutation: gql`
            mutation(
              $name: String!
              $phone: String!
              $email: String!
              $username: String!
              $role: String!
              $password: String!
            ) {
              createUser(
                student: {
                  name: $name
                  phone: $phone
                  email: $email
                  username: $username
                  role: $role
                  password: $password
                }
              )
            }
          `,
          variables: {
            name,
            phone: `${countryCode}${phone}`,
            email,
            username,
            role,
            password,
          },
        });
        return response.data.createUser;
      } catch (error) {
        throw error.message.replace("GraphQL error: ", "");
      }
    },
  },
  getters: {
    users: (state) => {
      return state.users;
    },
    add: (state) => {
      return state.add;
    },
  },
};

export default users;
