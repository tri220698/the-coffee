import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { User } from '../../models/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  gender = "";
  constructor(private accountService : AccountService) { }

  registerUser(firstName : string,lastName: string,email: string,phone: string,location: string,gender1,password: string,confirm: string) {
    let newUser = new User();
    newUser.firstName = firstName.trim();
    newUser.lastName = lastName.trim();
    newUser.email = email.trim();
    newUser.phone = phone.trim();
    newUser.location = location.trim();
    newUser.gender = gender1;
    if(password == confirm) {
      newUser.password = password;
      newUser.avatar = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png";
      newUser.role = "user";
      this.accountService.gqlAddNewUser(newUser).subscribe(() => {
        alert("Register successfully");
        window.location.href = "http://localhost:4200/login";
      })
    }else {
      alert("Password and Confirm password are not the same")
    }
    window.event.preventDefault();
  }
  ngOnInit() {
  }

}
