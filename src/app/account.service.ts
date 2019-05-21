import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loggedInAccount = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  constructor(private ApolloClient : Apollo) { }

  public getAllUsers = gql`
    query users{
      users {
        id
        firstName
        lastName
        gender
        email
        phone
        location
        password
        avatar
        role
      }
    }
  `;

  public getUserById = gql`
  query user($id:ID){
    user(id:$id) {
      id
      firstName
      lastName
      gender
      email
      phone
      location
      password
      avatar
      role
    }
  }
  `;

  public mutationNewUser = gql`
    mutation addUser($firstName:String,$lastName:String,$gender:String,$email:String,$phone:String,$location:String,$password:String,$avatar:String,$role:String){
      addUser(firstName:$firstName,lastName:$lastName,gender:$gender,email:$email,phone:$phone,location:$location,password:$password,avatar:$avatar,role:$role){
        role
      }
    }
  `;

  public queryUpdateUser = gql`
    query updateUser($id : ID,$firstName:String,$lastName:String,$gender:String,$email:String,$phone:String,$location:String,$password:String,$avatar:String,$role:String) {
      updateUser(id:$id,firstName:$firstName,lastName:$lastName,gender:$gender,email:$email,phone:$phone,location:$location,password:$password,avatar:$avatar,role:$role) {
        id
      }
    }
  `;

  public queryDeleteUser = gql`
    query deleteUser($id:ID) {
      deleteUser(id:$id) {
        id
      }
    }
  `;

  getGqlUsers() {
    return this.ApolloClient.watchQuery<any>({
      query : this.getAllUsers
    })
  }

  getGqlUserById(id) {
    return this.ApolloClient.watchQuery<any>({
      query : this.getUserById,
      variables : {
        id : id
      }
    })
  }

  gqlAddNewUser(newUser : User) {
    return this.ApolloClient.mutate({
      mutation : this.mutationNewUser,
      variables : {
        firstName : newUser.firstName,
        lastName : newUser.lastName,
        gender : newUser.gender,
        email : newUser.email,
        location : newUser.location,
        avatar : newUser.avatar,
        role : newUser.role,
        phone : newUser.phone,
        password : newUser.password
      },
      refetchQueries : [{
        query : this.getAllUsers
      }]
    })
  }

  gqlUpdateUser(user : User) {
    return this.ApolloClient.watchQuery<any>({
      query : this.queryUpdateUser,
      variables : {
        id : user.id,
        firstName : user.firstName,
        lastName : user.lastName,
        gender : user.gender,
        email : user.email,
        location : user.location,
        avatar : user.avatar,
        role : user.role,
        phone : user.phone,
        password : user.password
      }
    })
  }

  gqlDeleteUser(id) {
    return this.ApolloClient.watchQuery<any>({
      query : this.queryDeleteUser,
      variables : {
        id : id
      }
    })
  }

  setLoggedIn(user : User) {
    this.loggedInAccount = user;
    sessionStorage.setItem('loggedIn',JSON.stringify(user));
  }

  logoutAccount() {
    sessionStorage.removeItem('loggedIn');
  }

  get isLoggedIn() {
    return JSON.parse(sessionStorage.getItem('loggedIn') || JSON.stringify(this.loggedInAccount));
  }
}
