import { Injectable } from '@angular/core';
import { Drink } from '../models/drink';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class DrinksService {
  constructor(private ApolloClient : Apollo) { }

  public getAllDrinks = gql`
    query drinks {
      drinks {
        id
        name
        img
        desc
        price
        bought
        dateAccess
        category{
          id
          categoryName
        }
      }
    }
  `;

  public getDrinkById = gql`
  query drink($id : ID){
    drink(id:$id) {
      id
      name
      img
      desc
      price
      bought
      dateAccess
      category{
        id
        categoryName
      }
    }
  }
  `;

  public mutationAddDrink = gql`
    mutation addDrink($name : String,$img : String,$desc : String,$price : Int,$bought : Int,$dateAccess: String,$categoryId: ID) {
      addDrink(name :$name,img:$img,desc:$desc,price:$price,bought:$bought,dateAccess:$dateAccess,categoryId:$categoryId) {
        name
      }
    }
  `;

  public queryUpdateDrink = gql`
    query updateDrink($id: ID,$name : String,$img : String,$desc : String,$price : Int,$bought : Int,$dateAccess: String,$categoryId: String) {
      updateDrink(id: $id,name :$name,img:$img,desc:$desc,price:$price,bought:$bought,dateAccess:$dateAccess,categoryId:$categoryId) {
        name
      }
    }
  `;

  public queryDeleteDrink = gql`
    query deleteDrink($id : ID) {
      deleteDrink(id : $id) {
        name
      }
    }
  `;

  public querySearchDrink = gql`
    query searchDrinks($name : String) {
      searchDrinks(name : $name) {
        id
        name
        img
        price
      }
    }
  `;

  public queryGetTopDrinks = gql`
    query topDrinks {
      topDrinks {
        id
        name
        img
        desc
        price
        bought
      }
    }
  `;

  public getGqlTopDrinks() {
    return this.ApolloClient.watchQuery<any>({
      query : this.queryGetTopDrinks
    })
  }
  public getGqlDrinks() {
    return this.ApolloClient.watchQuery<any>({
      query : this.getAllDrinks
    })
  }

  public getGqlDrinkById(id : string) {
    return this.ApolloClient.watchQuery<any>({
      query : this.getDrinkById,
      variables : {
        id : id
      }
    })
  }

  public gqlAddDrink(newDrink : Drink) {
    return this.ApolloClient.mutate({
      mutation : this.mutationAddDrink,
      variables : {
        name : newDrink.name,
        img : newDrink.img,
        desc : newDrink.desc,
        price : newDrink.price,
        bought : newDrink.bought,
        dateAccess : String(newDrink.dateAccess),
        categoryId : newDrink.category
      },
      refetchQueries : [{
        query : this.getAllDrinks
      }]
    })
  }

  public gqlUpdateDrink(drink : Drink) {
    return this.ApolloClient.watchQuery<any>({
      query : this.queryUpdateDrink,
      variables : {
        id : drink.id,
        name : drink.name,
        img : drink.img,
        desc : drink.desc,
        price : drink.price,
        bought : drink.bought,
        dateAccess : String(drink.dateAccess),
        categoryId : drink.category
      }
    })
  }

  public gqlDeleteDrink(id) {
    return this.ApolloClient.watchQuery<any>({
      query : this.queryDeleteDrink,
      variables : {
        id : id
      }
    })
  }

  public gqlSearchDrink(search) {
    return this.ApolloClient.watchQuery<any>({
      query : this.querySearchDrink,
      variables : {
        name : search
      }
    })
  }
}
