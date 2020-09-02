<template>
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
</template>

<script>

import usersData from "@/graphql/queries/Users.gql";

export default {
  name: 'UserList',
  props: {
    msg: String
  },
  mounted() {
    this.usersList()
  },
  data() {
    return {
      users:[]
    }
  },
  methods: {
    usersList(){
      this.$apollo.query({
        query: usersData,
      }).then((data) => {
        this.users = data.data.users
      }).catch((error) => {
        // Error
        console.error(error)
      })
    }
    }
}
</script>

