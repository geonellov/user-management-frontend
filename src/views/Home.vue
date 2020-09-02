<template>
  <div class="home">

    <div class="row">
      <div class="user-list">
        <div class="overflow-y-auto h-75 bg-white shadow-md rounded px-8 pt-6 pb-8 m-12">
            <a class="ml-8 pb-5" v-for="user of users" :key="user.id" @click="selectUser(user.id)">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-3 text-xl">
                  {{ user.firstName}}
                </div>
              </div>
            </a>
        </div>
      </div>

      <div class="content-side">

        <!--Form for Edit-->
        <div v-if="editMode">
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 m-12" method="POST" @submit.prevent="editUser">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="edit_firstName">
                First Name
              </label>
              <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                     id="edit_firstName" v-model="firstName" type="text">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="edit_lastName">
                Last Name
              </label>
              <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                     id="edit_lastName" v-model="lastName" type="text">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="edit_email">
                Email
              </label>
              <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                     id="edit_email" v-model="email" type="text">
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                             rounded focus:outline-none focus:shadow-outline" type="submit">
                Update
              </button>
              <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                             rounded focus:outline-none focus:shadow-outline"
                      @click.prevent="deleteUser">
                Delete
              </button>
              <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                             rounded focus:outline-none focus:shadow-outline"
                      @click.prevent="cancelUpdate">
                Cancel
              </button>
            </div>
          </form>
        </div>
        <!--Form for Add -->
        <div v-else>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 m-12" method="POST" @submit.prevent="addUser">
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="add_firstName">
                First Name
              </label>
              <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                     id="add_firstName" v-model="firstName" type="text">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="add_lastName">
                Last Name
              </label>
              <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                     id="add_lastName" v-model="lastName" type="text">
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 text-sm font-bold mb-2" for="add_email">
                Email
              </label>
              <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                     id="add_email" v-model="email" type="text">
            </div>
            <div class="flex items-center justify-between">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4
                             rounded focus:outline-none focus:shadow-outline" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import usersData from '@/graphql/queries/Users.gql'
import viewUser from '@/graphql/queries/User.gql'
import addUser from '@/graphql/mutations/addUser.gql'
import delUser from '@/graphql/mutations/deleteUser.gql'
import editUser from '@/graphql/mutations/editUser.gql'
// import UserList from "@/components/UserList";

export default {
  name: 'Home',
  components: {
    // HelloWorld
  },
  mounted() {
      this.getUsersList()
  },
  data() {
    return {
      users:[],
      editMode: false,
      userID: "",
      firstName: "",
      lastName: "",
      email: ""
    }
  },

  methods: {
      getUsersList(){
      this.$apollo.query({
        query: usersData,
      }).then((data) => {
        this.users = data.data.users
      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    selectUser(user) {
      this.$apollo.query({
        query: viewUser,
        variables:{
          id: user
        }
      }).then((data) => {
        this.userID = data.data.user.id
        this.firstName= data.data.user.firstName
        this.lastName = data.data.user.lastName
        this.email = data.data.user.email

        this.editMode = true

      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    addUser(){
      // Call to the graphql mutation
      this.$apollo.mutate({
        // Query
        mutation: addUser,
        // Parameters
        variables: {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        },
        // refetchQueries:[{query:usersData}]
      }).then((data) => {
        // Result
        this.clearForm()
        this.getUsersList()

        console.log(data)

      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    deleteUser(){
      // Call to the graphql mutation
      this.$apollo.mutate({
        // Query
        mutation: delUser,
        // Parameters
        variables: {
          id: this.userID
        }
      }).then((data) => {
        // Result
        console.log(data)
        this.clearForm()
        this.getUsersList()

        this.editMode = false

      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    editUser(){
      // Call to the graphql mutation
      this.$apollo.mutate({
        // Query
        mutation: editUser,
        // Parameters
        variables: {
          id: this.userID,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email
        }
      }).then((data) => {
        // Result
        console.log(data)
        this.clearForm()
        this.getUsersList()
        this.editMode = false

      }).catch((error) => {
        // Error
        console.error(error)
      })
    },
    cancelUpdate(){
      this.editMode = false
      this.clearForm()
    },
    clearForm(){
      this.userID = ""
      this.firstName= ""
      this.lastName = ""
      this.email = ""
    }

  }
}
</script>


<style>
.row {
  display: flex;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 10vh;
}
.user-list{
  background: aquamarine;
  flex: 40%;
}
.content-side{
  background: aquamarine;
  flex: 60%;
}
button {
  border: none;
  color: white;
  padding: 10px 27px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.delBtn{
  background-color: crimson;
  margin-right: 10px;
}
.editBtn{
  background-color: coral;
}
.addBtn{
  background-color:darkgreen;
}
input {
  width: 80%;
}
</style>
