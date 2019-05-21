import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users : User[];
  constructor(private accountService : AccountService) { }

  getUserFromService() {
    this.accountService.getGqlUsers().valueChanges.subscribe(({data}) => {
      this.users = data.users;
    })
  }

  ngOnInit() {
    this.getUserFromService();
  }

  loginUser(email : string, password : string) {
    let test = false;
    this.users.some((user) => {
      if(email.trim() === user.email && password.trim() === user.password){
        console.log(user);
        test = true;
        this.accountService.setLoggedIn(user);
        alert('Logined!!!')
        window.location.href = "";
      }
      return test === true;
    });
    if(test === false) {
      window.alert("Username or Password was wrong!!!")
    }
    window.event.preventDefault();
  }
}
