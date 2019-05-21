import { Component, OnInit } from '@angular/core';
import { DrinksService } from '../drinks.service';
import { CategoriesService } from '../categories.service';
import { Drink } from 'src/models/drink';
import { Category } from 'src/models/category';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  drinkById : Drink;
  selectCate : string ;
  selectCateOfProduct : string;
  categories: Category[];
  gqlDrinks : any[] = [];
  constructor(private drinksService : DrinksService,
    private categoryService : CategoriesService) { }

    getCategoryFromService() {
      this.categoryService.getGqlCategories().valueChanges.subscribe(({data}) => {
        this.categories = data.categories;
      })
    }

    getDrinkFromService() {
      this.drinksService.getGqlDrinks().valueChanges.subscribe(({data}) => {
        this.gqlDrinks = data.drinks;
      })
    }
  getDrinkFromId(id){
    this.drinksService.getGqlDrinkById(id).valueChanges.subscribe(({data})=>{
      this.drinkById = data.drink;
      for (let i = 0; i < document.getElementsByTagName("option").length ; i++) {
        if(data.drink.category.id == document.getElementById("selectCategory")[i].value){
          document.getElementsByTagName("option")[i].selected = true;
          this.selectCate = data.drink.category.id;
        }
      }
    })
  }
  saveProduct(drinkName : string,drinkImg : string,drinkDesc :string,drinkPrice : string) {
    this.drinkById.name = drinkName;
    this.drinkById.img = drinkImg;
    this.drinkById.desc = drinkDesc;
    this.drinkById.price = (Number).parseInt(drinkPrice);
    this.drinkById.category = this.selectCate;
    this.drinksService.gqlUpdateDrink(this.drinkById).valueChanges.subscribe(() => {
      this.gqlDrinks.forEach((element,index) => {
        if(element.id == this.drinkById.id ) {
          this.gqlDrinks[index] = this.drinkById;
        }
      });
      alert("Update drink successfully !!!");
    })
    window.event.preventDefault();
  }

  deleteProduct(id) {
    if(confirm("You want to delete this ?")) {
      this.drinksService.gqlDeleteDrink(id).valueChanges.subscribe(()=>{
        this.gqlDrinks.some((element,index)=>{
          if(id == element.id) {
            this.gqlDrinks.splice(index,1);
            return true;
          }
        })
        alert("delete successfully !!!");
      })
    }
  }

  categoryChanged(e) {
    this.selectCateOfProduct = e.target.value;
  }

  addProduct(nameProduct,imgProduct,descProduct,priceProduct) {
    console.log(this.selectCateOfProduct)
    let newDrink = new Drink();
    newDrink.name = nameProduct;
    newDrink.img = imgProduct;
    newDrink.desc = descProduct;
    newDrink.price = (Number).parseInt(priceProduct);
    newDrink.bought = 0;
    newDrink.category = this.selectCateOfProduct;
    newDrink.dateAccess = 0;
    this.drinksService.gqlAddDrink(newDrink).subscribe(()=>{
      alert("Add new product successfully!!!");
    })
    window.event.preventDefault();
  }
  ngOnInit() {
    this.getCategoryFromService();
    this.getDrinkFromService();
  }

}
