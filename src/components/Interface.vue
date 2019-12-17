
<template>
    
 <div id="app">
 <button class="btn btn-primary" v-on:click="showNewUserModal"> Add new User ... </button>
  <table class="table" id="usersdata">
      <thead>
          <tr>
              <th>#</th>
              <th>Id</th>
              <th>Name</th>             
              <th>CNIC</th>
              <th>Designation</th>
              <th>Salary</th>
              <th></th>
          </tr>
      </thead>
      <tbody>
          <tr v-for-key="(user,index) in users">
              <td>{{index+1}}</td>
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.cnic}}</td>
              <td>{{user.designation}}</td>
              <td>{{user.salary}}</td>
              <td>
                  <button class="btn btn-danger" v-on:click="removeUser(user,index)">Remove</button>
                  <button class="btn btn-default" v-on:click="showEditModal(user,index)">Edit</button>
              </td>
          </tr>
      </tbody>
  </table>
  </div>
  </template>
    <script>
        var usersdata = new Vue({
            el: "#usersdata",
            data: {
                users: [],
                Id:"",
                name: "",
                cnic:"",
                designation: "",
                salary:"",
                userId: null,
                userIndex: null
            },
            created: function () {
                this.getUsers();
            },
            methods: {
                showEditModal: function (user, index) {
                    this.userId = user.id;
                    this.userIndex = index;
                    this.Id=user.Id;
                    this.name = user.name;
                    this.cnic=user.cnic;
                    this.designation = user.designation;
                    this.salary=user.salary;              
                    $("#editUserModal").modal("show");
                },
                editUser: function () {
                    var vm = this;
                    var newUser = {
                        id: vm.userId,
                        name: vm.name,
                        cnic:vm.cnic,                       
                        designation:vm.designation,
                        salary:vm.salary,
                    }
                    $.ajax({ url: "https://localhost:44338/api/Users", data: newUser, method: "PutUser" })
                        .done(function () {
                             vm.users[vm.userIndex].Id = vm.Id;
                             vm.users[vm.userIndex].name = vm.name;
                            vm.users[vm.userIndex].cnic = vm.cnic;
                            vm.users[vm.userIndex].designation = vm.designation;
                            vm.users[vm.userIndex].salary = vm.salary;
                           toastr.success("Success");
                        }).fail(function () {
                            toastr.error("Error");
                        }).always(function () {
                            vm.name = "";
                            vm.designation = "";
                            $("#editUserModal").modal("hide");
                        });
                },
                removeUser: function (user,index) {
                    var vm = this;
                    $.ajax({ url: "https://localhost:44338/api/Users", data: user, method: "DeleteUser" })
                        .done(function (data) {
                            vm.users.splice(index, 1);
                            toastr.success("Success");
                        }).fail(function () {
                            toastr.error("Error");
                        });
                },
                showNewUserModal: function () {
                    $("#addNewUserModal").modal("show");
                },
                addUsers: function () {
                    var vm = this;
                    var newUser = {
                        Id:vm.Id,
                        name: vm.name,
                        cnic:vm.cnic,
                        designation: vm.designation,
                        salary:vm.salary,
                    }
                    $.ajax({ url: "https://localhost:44338/api/Users", data: newUser, method: "PostUser" })
                        .done(function (data) {
                            vm.users.splice(0, 0, newUser);
                            toastr.success("Success");
                        }).fail(function () {
                            toastr.error("Error");
                        }).always(function () {
                            vm.Id="";
                            vm.name = "";
                            vm.cnic="";
                            vm.designation = "";
                            vm.salary="";   
                            $("#addNewUserModal").modal("hide");
                        });
                },
                getUsers: function () {
                    var vm = this;
                    $.ajax({ url: "https://localhost:44338/api/Users", method: "GetUsers" })
                        .done(function (data) {
                            vm.users = data;
                            //toastr.success("Success");
                        }).fail(function () {
                            toastr.error("Error");
                        });
                }
            }
        });
       
    </script>