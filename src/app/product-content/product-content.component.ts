import { Component, OnInit } from '@angular/core';
import { DrinksService } from '../drinks.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css']
})
export class ProductContentComponent implements OnInit {
  drink : any;
  constructor(private route : ActivatedRoute,
    private location : Location,
    private drinksService : DrinksService) { }

  goBack() {
    this.location.back();
  }

  getDrinkFromRoute(){
    const id = this.route.snapshot.paramMap.get('id');
    this.drinksService.getGqlDrinkById(id).valueChanges.subscribe(({data}) => {
      this.drink = data.drink;
    });
  }

  buyProduct() {
    document.getElementById('alert').classList.add('show');
    this.drink.bought = this.drink.bought + 1;
    this.drink.dateAccess = new Date().getTime();
    this.drink.category = this.drink.category.id;
    this.drinksService.gqlUpdateDrink(this.drink).valueChanges.subscribe();
  }

  deleteAlert() {
    document.getElementById('alert').classList.remove('show');
  }
  ngOnInit() {
    this.getDrinkFromRoute();
  }

}
