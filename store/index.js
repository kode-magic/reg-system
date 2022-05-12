import {
  districts,
  countries,
  civilStatus,
  religions,
  staffTypes,
  relationships,
  levels,
  locations,
  types,
  studentTypes
} from './store';
import faculty from "./faculty";
import courses from "./courses";
import students from "./students";
import subjects from './modules';
import semester from './semester'
import academics from './academics';
import users from './user'
import gql from 'graphql-tag';
import JWTDecode from 'jwt-decode';
const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => ({
  auth: null,
  countries,
  login: false,
  districts,
  civilStatus,
  types,
  religions,
  staff: null,
  user: null,
  subMenu: false,
  relationships,
  levels,
  locations,
  staffTypes,
  studentTypes,
});

export const mutations = {
  auth(state, val) {
    state.auth = val;
  },
  setLogin(state, login) {
    state.login = login;
  },
  setStaff(state, staff) {
    state.staff = staff;
  },
  setUser(state, user) {
    state.user = user;
  },
  setSubMenu(state, subMenu) {
    state.subMenu = subMenu;
  }
}

export const modules = {
  faculty,
  courses,
  students,
  subjects,
  semester,
  academics,
  users,
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (process.server && process.static) { return; }
    if (!req.headers.cookie) { return; }

    const parsed = cookieparser.parse(req.headers.cookie);
    const token = parsed.staff_access_token;

    if (!token) return;

    const decoded = JWTDecode(token);

    const {
      id,
      employeeId,
      givenNames,
      familyName,
      profileStatus,
      role } = decoded;

    commit("setStaff", token);
    commit("setUser", {
      id,
      employeeId,
      givenNames,
      familyName,
      profileStatus,
      role
    });
  },
  async login(_, { staffId, password }) {
    let response = await this.app.apolloProvider.defaultClient.mutate({
      mutation: gql`
            mutation ($username: String!, $password: String!) {
              loginUser(user: {
                username: $username,
                password: $password
              }) {
                token
              }
            }
        `,
      error(error) {
        console.log(JSON.stringify(error.message));;
      },
      variables: {
        username: staffId,
        password
      }
    });
    return response.data.loginUser;
  }
}

export const getters = {
  login: state => {
    return state.login;
  },
  countries: state => {
    return state.countries;
  },
  civilStatus: state => {
    return state.civilStatus;
  },
  districts: state => {
    return state.districts;
  },
  religions: state => {
    return state.religions;
  },
  relationships: state => {
    return state.relationships
  },
  user: state => {
    return state.user
  },
  subMenu: state => {
    return state.subMenu
  },
  locations: state => {
    return state.locations
  },
  levels: state => {
    return state.levels
  },
  staffTypes: state => {
    return state.staffTypes;
  },
  types: state => {
    return state.types;
  },
  studentTypes: state => {
    return state.studentTypes;
  }
}
