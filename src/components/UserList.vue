<template>

      <div class="overflow-y-auto h-75 bg-white shadow-md rounded px-8 pt-6 pb-8 m-12">
        <a class="ml-8 pb-5" v-for="user of users" :key="user.id" @click="getUserByID(user.id)">
          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-3 text-xl">
              {{ user.firstName}}
            </div>
          </div>
        </a>
      </div>

</template>

<script>

export default {
  name: 'UserList',
  props: {
    users: Array,
  },
  methods: {
    getUserByID (id) {
      this.$store.dispatch('getUserByID', {id})
    },
  }
}
</script>

