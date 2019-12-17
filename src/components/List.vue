<template>
    
 <div id="app">
    <router-link class="btn btn-primary" v-bind:to="'./CreateForm'">Create New User</router-link>
    <br/> <br/>
  <table class="table" id="usersdata" >
      <thead>
          <tr>
              
              <th>Id</th>
              <th>Name</th>             
              <th>CNIC</th>
              <th>Designation</th>
              <th>Salary</th>
              <th>Actions</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="user in info" :Key="user.id">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.cnic}}</td>
              <td>{{user.designation}}</td>
              <td>{{user.salary}}</td>
              <td>
                  <button class="btn btn-danger" v-on:click="remove(user)">Remove</button>
                  <router-link class="btn btn-primary" v-bind:to="'./EditForm/'+user.id">Edit</router-link>
                 
              </td>
          </tr>
      </tbody>
  </table>
  </div>
  </template>
<script>
import axios from 'axios';
export default {
  
  data () {
    return {
       info: [],
      
       
    }
  },
  mounted () {
    axios
      .get('https://localhost:44338/api/Users')
      .then(response => (
      
        this.info = response.data     
        ))
    
  },
  methods: {
    remove: function (user) {
      // `this` inside methods points to the Vue instance
      axios
      .delete('https://localhost:44338/api/Users/'+user.id)
      .then(response => (     
        this.info = response.data    
     
        )); location.reload(),
        window.location("/List")

      // `event` is the native DOM event
    },
   
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
  margin-top: 60px;
  padding-top: 0% !important;
  padding: 5%;
}

table {
  
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255,255,255,0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th, td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}
</style>