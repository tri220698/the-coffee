import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drink } from '../../models/drink';
import { DrinksService } from '../drinks.service';
import { Category } from '../../models/category';
import { CategoriesService } from '../categories.service';
import { AccountService } from '../account.service';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  title = "";
  drinks : Drink[];
  checkLogin = false;
  constructor(private route : ActivatedRoute,
    private drinksService : DrinksService,
    private categoryService : CategoriesService) { }

  getDrinkFromService() {
    this.drinksService.getGqlDrinks().valueChanges.subscribe(({data}) => {
      this.drinks = data.drinks;
    })
  }

  getDrinkFromCategory(){
    const search = this.route.snapshot.paramMap.get('search');
    if(search == "all") {
      this.getDrinkFromService();
      this.title = "TẤT CẢ THỨC UỐNG";
    }else {
      this.categoryService.getGqlCategories().valueChanges.subscribe(({data}) => {
        let checkToSearch : boolean = false ;
         data.categories.forEach(element => {
          if(search == element.id){
                checkToSearch = true;
          }
         });
         if(checkToSearch == false) {
          this.drinksService.gqlSearchDrink(search).valueChanges.subscribe(({data})=>{
            this.title = search;
            this.drinks = data.searchDrinks;
          })
        }else {
          this.categoryService.getGqlCategoryById(search).valueChanges.subscribe(({data})=>{
            this.title = data.category.categoryName;
            this.drinks = data.category.drinks;
            console.log(this.drinks);
          })
        }
      })
    }
  }

  ngOnInit() {
    this.getDrinkFromCategory();
    setTimeout(function() {
      document.getElementById("loading").style.visibility = "hidden";
      document.getElementById("product").style.visibility = "visible";
    }, 1000);
  }

}
