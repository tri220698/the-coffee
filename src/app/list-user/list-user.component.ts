import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  userById : User ;
  gender = "" ;
  users : User[];
  constructor(private accountService : AccountService) { }
  getUserFromService() {
    this.accountService.getGqlUsers().valueChanges.subscribe(({data}) => {
      this.users = data.users;
    })
  }
  getUserFromId(id){
    this.accountService.getGqlUserById(id).valueChanges.subscribe(({data}) => {
      this.userById = data.user;
      this.gender = data.user.gender;
    });
  }

  deleteUser(userId: string) {
    if(confirm("Do you want to delete this user ?")) {
      this.accountService.gqlDeleteUser(userId).valueChanges.subscribe(() => {
        this.users.some((element,index) => {
          if(element.id == userId) {
            this.users.splice(index,1);
            return true;
          }else {
            return false;
          }
        })
      });
      console.log("Delete successfully!!!");
    }else {
      console.log("Do not delete");
    }
  }

  genderChanged(e) {
    this.gender = e.target.value;
  }

  updateUser(firstName:string,pwd:string,lastName:string,phone:string,location:string,verify:string) {
    this.userById.firstName = firstName.trim();
    this.userById.lastName = lastName.trim();
    this.userById.phone = phone.trim();
    this.userById.location = location.trim();
    this.userById.gender = this.gender;
    if(pwd.trim() == verify.trim()) {
      this.userById.password = pwd.trim();
      this.accountService.gqlUpdateUser(this.userById).valueChanges.subscribe(() => {
        alert("Update account successfully !!!");
      })
    }else {
      alert("Password and verify are not the same !!!")
    }
  }
  ngOnInit() {
    this.getUserFromService();
  }

}
