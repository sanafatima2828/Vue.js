

<template>

  <div id="users">
    <h1 id="heading">Edit User</h1>
    <table>
          <tr> 
            <td><label>Name:</label></td>
           <td><input type="text" class="form-control"  v-model="user.name" name="Name"></td>
        </tr>
             <tr> 
                 <td> <label>CNIC:</label></td>
           <td> <input type="number" class="form-control"  v-model="user.cnic" name="CNIC"></td>
             </tr>
             <tr>          
              <td><label>Designation:</label></td>
             <td> <input type="text" class="form-control"  v-model="user.designation" name="Designation"></td>
            <tr>
             <td> <label>Salary:</label></td>
           <td> <input type="text" class="form-control" v-model="user.salary"  name="salary"></td>
            </tr>
            <tr>
            <td>  <label>Role:</label>   </td>   
              <td> <select   class="form-control"  v-model="user.role_Id"  name="role_Id" selected >
                <option value="" selected disabled>Please Select</option>
                <option v-for="role in roles" :value="role.id" :key="role.id" :selected="user.role_Id == role.id" >{{ role.type }}</option>
              </select></td>
            </tr>
           <tr>
               <td colspan="2"><button type="submit" @click="submit()" class="btn btn-primary" >Edit</button></td>
            </tr>
        <tr>
        <td colspan="2"><router-link class="btn btn-primary" v-bind:to="'/List'">Back to List</router-link></td>
        </tr>
        </table>
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
select{
width:170px;
}
#heading{
  text-align: left;
}
</style>