import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private ApolloClient : Apollo) { }

  public getAllCategories = gql`
    query categories {
      categories {
        id
        categoryName
      }
    }
  `;

  public getCategoryById = gql`
    query category($id : ID) {
      category(id : $id) {
        categoryName
        drinks {
          id
          name
          img
          price
        }
      }
    }
  `;

  getGqlCategories() {
    return this.ApolloClient.watchQuery<any>({
      query : this.getAllCategories
    })
  }

  getGqlCategoryById(id) {
    return this.ApolloClient.watchQuery<any>({
      query : this.getCategoryById,
      variables : {
        id : id
      }
    })
  }
}
