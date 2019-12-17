

<template>

  <div>
    <h1>Create User</h1>
    <form   id="loginForm" @submit="formSubmit">
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control" v-model="name" name="Name">
          </div>
        </div>
        </div>
           <br />
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>CNIC:</label>
            <input type="number" class="form-control" v-model="cnic" name="CNIC">
            </div>
          </div>
        </div>
           <br />
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Designation:</label>
              <input type="text" class="form-control" v-model="designation" name="designation">
            </div>
          </div>         
        </div>
           <br />
         <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Salary:</label>
            <input type="text" class="form-control" v-model="salary"  name="salary">
            </div>
          </div>         
        </div><br />
         <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Role:</label>      
               <select class="form-control"  v-model="role"  name="role">
                <option value="" selected disabled>Please Select</option>
                <option v-for="role in roles" :value="role.id" :key="role.id" >{{ role.type }}</option>
              </select>
              <br><br>
            </div>
          </div>         
        </div>
           <br />
        <div class="form-group">
          <button type="submit" v-on:click="submit()" class="btn btn-primary" >Create</button>         
        </div>
         <br />
        <router-link class="btn btn-primary" v-bind:to="'/List'">Back to List</router-link>
    </form>
      
  </div>
</template>
<script >
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
                      alert('Message sent!') ,self.$router.push('/List')   
                        ).catch(error => {    
          if (error.response.status === 422) {    
      //  this.errors = error.response.data.errors || {};     
           }  
               });
        },
       },}</script>
       <style lang="stylus" scoped>
       
       </style>