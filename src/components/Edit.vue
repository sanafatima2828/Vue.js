

<template>

  <div id="users">
    <h1>Edit User</h1>
      <div class="row">
        <div class="col-md-3">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" class="form-control"  v-model="user.name" name="Name">
          </div>
        </div>
        </div>
           <br />
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>CNIC:</label>
            <input type="number" class="form-control"  v-model="user.cnic" name="CNIC">
            </div>
          </div>
        </div>
           <br />
        <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Designation:</label>
              <input type="text" class="form-control"  v-model="user.designation" name="Designation">
            </div>
          </div>         
        </div>
           <br />
         <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Salary:</label>
            <input type="text" class="form-control" v-model="user.salary"  name="salary">
            </div>
          </div>         
        </div>   
        <br />
         <div class="row">
          <div class="col-md-3">
            <div class="form-group">
              <label>Role:</label>      
               <select class="form-control"  v-model="user.role_Id"  name="role_Id" selected >
                <option value="" selected disabled>Please Select</option>
                <option v-for="role in roles" :value="role.id" :key="role.id" :selected="user.role_Id == role.id" >{{ role.type }}</option>
              </select>
              <br><br>
            </div>
          </div>         
        </div>    
        <br />
        <div class="form-group">
          <button type="submit" @click="submit()" class="btn btn-primary" >Edit</button>
        </div>
         <br />
        <router-link class="btn btn-primary" v-bind:to="'/List'">Back to List</router-link>
  </div>
</template>
<script >
import axios from 'axios';

export default {
    name:"users",
    data () {
    return {
       user : {                      
            name: "",
            cnic:"",
            designation:"",
            salary:"",
            role_Id:"",
             },
                roles: [{id :"1" , type : "Employee"} , 
              {id : "2" , type :"Manager"} ] ,
             }},
   mounted () {
    axios
      .get('https://localhost:44338/api/Users/'+window.location.pathname.split('/')[2])
      .then(response => (   this.user = response.data))
      },
  methods: { 
     submit() {          
            var vm = this;
            var emp = {      
                     Id:window.location.pathname.split('/')[2],          
                      Name: vm.user.name,
                       CNIC:vm.user.cnic,
                        Designation: vm.user.designation,
                        salary:vm.user.salary,
                        Role_Id:vm.user.role_Id,
                    }
                       
                       this.errors = {};     
                      axios({
                        method:'put',
                        url:'https://localhost:44338/api/Users/'+ window.location.pathname.split('/')[2],
                        data:{
                        "Name": emp.Name,
                       "CNIC":emp.CNIC,
                        "Designation": emp.Designation,
                        "salary":emp.salary,
                        "Role_Id":emp.Role_Id,
                        "Id":emp.Id,
                        }}).then(    
                          alert("Update successfully"),
                       self.$router.push('/List')
                        ).catch(error => {    
          if (error.response.status === 422) {    
      //  this.errors = error.response.data.errors || {};     
           }  
            if (status == '200') {
           
       self.$router.push('/List');
      }
               });
        },
       },}</script>