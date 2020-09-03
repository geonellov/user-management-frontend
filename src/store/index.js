import Vue from 'vue'
import Vuex from 'vuex'
import usersData from '@/graphql/queries/Users.gql'
import addUser from '@/graphql/mutations/addUser.gql'
import editUser from '@/graphql/mutations/editUser.gql'
import deleteUser from '@/graphql/mutations/deleteUser.gql'
import viewUser from '@/graphql/queries/User.gql'
import { apolloProvider } from "@/vue-apollo";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    userByID: {}
  },
  mutations: {
    setUsers(state, payload){
      state.users = payload
    },
    setUserByID(state, payload){
      state.userByID = payload
    }
  },
  actions: {
    getUsers ({commit}) {
      apolloProvider.defaultClient.query({
        query: usersData,
      }).then((data) => {
          commit('setUsers', data.data.users)
      }).catch((error) => {
        console.error(error)
      })
    },
    getUserByID({commit}, {id}) {
      apolloProvider.defaultClient.query({
        query: viewUser,
        variables:{
          id: id
        }
      }).then((data) => {
          commit('setUserByID', data.data.user )
      }).catch((error) => {
        console.error(error)
      })
    },
    addUser({dispatch},{userData}){
      apolloProvider.defaultClient.mutate({
        mutation: addUser,
        variables: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email
        },
      }).then((data) => {
            dispatch('getUsers')
            console.log(data)
      }).catch((error) => {
            console.error(error)
      })
    },
    editUser({dispatch},{userData}){
      apolloProvider.defaultClient.mutate({
        mutation: editUser,
        variables: {
          id: userData.userID,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email
        }
      }).then((data) => {
          dispatch('getUsers')
          console.log(data)
      }).catch((error) => {
        console.error(error)
      })
    },
    deleteUser({dispatch},{ID}){
      apolloProvider.defaultClient.mutate({
        mutation: deleteUser,
        variables: {
          id: ID
        }
      }).then((data) => {
        dispatch('getUsers')
        console.log(data)
      }).catch((error) => {
        console.error(error)
      })
    },

  },
  modules: {
  }
})
