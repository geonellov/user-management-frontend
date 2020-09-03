<template>
  <div>
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
                 id="edit_firstName" v-model="userInfo.firstName" type="text">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="edit_lastName">
            Last Name
          </label>
          <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                 id="edit_lastName" v-model="userInfo.lastName" type="text">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="edit_email">
            Email
          </label>
          <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                 id="edit_email" v-model="userInfo.email" type="text">
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
                 id="add_firstName" v-model="userInfo.firstName" type="text">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="add_lastName">
            Last Name
          </label>
          <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                 id="add_lastName" v-model="userInfo.lastName" type="text">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="add_email">
            Email
          </label>
          <input class="shadow appearance-none border rounded
                            w-full py-2 px-3 text-gray-700 leading-tight
                            focus:outline-none focus:shadow-outline"
                 id="add_email" v-model="userInfo.email" type="text">
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


</template>

<script>

export default {
  name: 'Form',
  props: {
    user: Object
  },
  watch:{
    user(val){
      this.userID = val.id
      this.userInfo.firstName= val.firstName
      this.userInfo.lastName = val.lastName
      this.userInfo.email = val.email
      this.editMode = true
    }
  },
  data() {
    return {
      editMode:false,
      userID: "",
      userInfo:{
        firstName: "",
        lastName: "",
        email: ""
      }
    }
  },
  methods: {
    addUser () {
      let userData  = this.userInfo
      this.$store.dispatch('addUser', {userData})
      this.clearForm()
    },
    editUser () {
      let userData  = this.userInfo
      userData['userID'] = this.userID
      this.$store.dispatch('editUser', {userData})
      this.clearForm()
    },
    cancelUpdate(){
      this.clearForm()
      this.editMode = false
    },
    deleteUser(){
      let ID = this.userID
      this.$store.dispatch('deleteUser', {ID})
      this.editMode = false
      this.clearForm()
    },
    clearForm(){
      this.userID=""
      this.userInfo.firstName= ""
      this.userInfo.lastName = ""
      this.userInfo.email = ""
    }
  }
}
</script>