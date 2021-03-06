import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../categories.service';
import { FormControl, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  checkLogin = false;
  roleLogin : string = 'user';
  search = new FormControl('', [Validators.required]);
  categories : Category[];
  gqlCategories : any[] = [];
  constructor(private categoryService : CategoriesService,
    private accountService : AccountService) { }

  getCategoryFromService() {
    this.categoryService.getGqlCategories().valueChanges.subscribe(({data}) => {
      this.gqlCategories = data.categories;
    })
  }

  searchProduct(s) {
    if(s == "") {
      alert("Fill full!!!");
    }else{
      window.location.href = "/list-product/"+s;
    }

    window.event.preventDefault();
  }
  checkedLogin() {
    this.checkLogin = this.accountService.isLoggedIn;
    this.roleLogin = this.accountService.isLoggedIn.role;
  }
  ngOnInit() {
    this.getCategoryFromService();
    this.checkedLogin();
  }


}
