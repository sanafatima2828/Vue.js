<template>
    
 <div id="app">
      <h1 id="heading">Create User</h1><br />
    <form   id="loginForm" @submit="formSubmit">
  <table class="table" id="usersdata" >
      <tbody>
          <tr >
            <td><label>Name:</label></td>
            <td> <input type="text" class="form-control" v-model="name" name="Name"></td>
          </tr>
          <tr> 
            <td>  <label>CNIC:</label></td> 
            <td>  <input type="number" maxlength="13" class="form-control" v-model="cnic" name="CNIC"></td>
          </tr>
          <tr> 
            <td>  <label>Designation:</label></td>
            <td><input type="text" class="form-control" v-model="designation" name="designation"></td>
          </tr>
          <tr> 
             <td> <label>Salary:</label></td>
             <td> <input type="text" class="form-control" v-model="salary"  name="salary"></td>
          </tr>
          <tr>
             <td>  <label>Role:</label></td>
             <td>  <select class="form-control"  v-model="role"  name="role">
                   <option value="" selected disabled>Please Select</option>
                   <option v-for="role in roles" :value="role.id" :key="role.id" >{{ role.type }}</option>
                  </select>
            </td>
          </tr>             
          <tr>
           <td colspan="2"> <button type="submit" v-on:click="submit()" class="btn btn-primary" >Create</button>  </td>
          </tr>
          <tr>
             <td colspan="2"><router-link class="btn btn-primary" v-bind:to="'/List'">Back to List</router-link></td>
          </tr>
        
      </tbody>
  </table>
    </form>
  </div>
  </template>
  <script>
import axios from 'axios';

export default {
  name: "index",
  data () {
    return {
       user : [],
       roles: [{id :"1" , type : "Employee"} , 
              {id : "2" , type :"Manager"} ] ,
             }},
   mounted () {
     
    axios
      .get('https://localhost:44338/api/Values')
      .then(response => ( 
        this.roles = response.data,
        this.user=response.data
        )).bind(this)
       },
  methods: { 
     submit() { 
            var vm = this;
            var user = {                      
                      Name: vm.name,
                       CNIC:vm.cnic,
                        Designation: vm.designation,
                        salary:vm.salary,
                        Role_Id:vm.role,
                        
                    }
                       
                       this.errors = {};     
                      axios({
                        method:'post',
                        url:'https://localhost:44338/api/Users',
                        data:{
                           "Name": user.Name,
                       "CNIC":user.CNIC,
                        "Designation": user.Designation,
                        "salary":user.salary,
                        "Role_Id":user.Role_Id,
                        }}).then(    
                      alert('Message sent!')  ,  window.location("/List")
                        ).catch(error => {    
          if (error.response.status === 422) {    
      //  this.errors = error.response.data.errors || {};     
           }  
               });
        },
       },}</script>
       <style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
  margin-top: 60px;
  padding-top: 0% !important;
  padding-top: 10%;
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
#heading{
  text-align: left;
}
select{
  width:170px;
}
</style>