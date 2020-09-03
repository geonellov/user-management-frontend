<template>
  <div class="home">
    <div class="row">
      <div class="user-list">
        <UserList :users="users"/>
      </div>
      <div class="content-side">
        <userForm :user="user"></userForm>
      </div>
    </div>
  </div>
</template>

<script>
import UserList from '@/components/UserList.vue'
import userForm from '@/components/Form.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    UserList,
    userForm
  },
  mounted() {
    this.$store.dispatch('getUsers')
  },
  computed: {
    ...mapState({
      users: state => state.users,
      user: state => state.userByID,
    })
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
