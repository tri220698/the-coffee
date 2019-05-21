import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from 'src/models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  gender = "";
  loggedIn : User;
  constructor(private accountService : AccountService) { }

  checkLogin() {
    this.loggedIn = this.accountService.isLoggedIn;
    this.gender = this.loggedIn.gender;
    console.log(this.loggedIn);
  }

  genderChanged(e) {
    this.gender = e.target.value;
    console.log(this.gender);
  }

  updateUser(firstName:string,pwd:string,lastName:string,phone:string,location:string,verify:string) {
    if(firstName.trim() == "" || pwd.trim() == "" || lastName.trim() == "" || phone.trim() == "" ||location.trim() == "" || verify.trim() == "") {
      alert("You must complete the information before submitting!!!");
    }else {
      this.loggedIn.firstName = firstName.trim();
      this.loggedIn.lastName = lastName.trim();
      this.loggedIn.phone = phone.trim();
      this.loggedIn.location = location.trim();
      this.loggedIn.gender = this.gender;
      if(pwd.trim() == verify.trim()) {
        this.loggedIn.password = pwd.trim();
        this.accountService.gqlUpdateUser(this.loggedIn).valueChanges.subscribe(() => {
          this.accountService.setLoggedIn(this.loggedIn);
          alert("Update account successfully !!!");
        })
      }else {
        alert("Password and verify are not the same !!!")
      }
    }
  }
  ngOnInit() {
    this.checkLogin();
    setTimeout(function() {
      document.getElementById("loading").style.visibility = "hidden";
      document.getElementById("profile").style.visibility = "visible";
    }, 1000);
    // var md5 = require('md5');
    // console.log(md5('123'));
  }

}
