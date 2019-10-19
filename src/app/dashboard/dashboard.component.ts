import { Component, OnInit } from '@angular/core';
import { Drink } from '../../models/drink';
import { DrinksService } from '../drinks.service';
import { Feedback } from 'src/models/feedback';
import { FeedbackService } from '../feedback.service';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  checkLogin : User = null;
  topDrinks : Drink[] = [];
  recentDrinks : Drink[] = [];
  public gqlFeedbacks : any[] = [];
  constructor(private drinksService : DrinksService,
    private feedbacksService : FeedbackService,
    private accountService : AccountService,private router : Router) { }

  checkedLogin() {
    this.checkLogin = this.accountService.isLoggedIn;
  }

  getGqlFeedbacks () {
    this.feedbacksService.getFeedbacks().valueChanges.subscribe(({data,loading})=> {
      this.gqlFeedbacks = data.feedbacks;
    })
  }

  getTop3Drinks() {
    this.drinksService.getGqlTopDrinks().valueChanges.subscribe(({data})=>{
      this.topDrinks = data.topDrinks;
    })
  }

  getRecentDrinks() {
    this.drinksService.getGqlDrinks().valueChanges.subscribe(({data}) => {
      for(let i = 0; i < 3; i++){
        let index = 0;
        let max = 0;
        data.drinks.forEach((element,id) => {
          if(max < (element.dateAccess)) {
            max = element.dateAccess;
            index = id;
          }
        });
        let dr = data.drinks.splice(index,1);
        this.recentDrinks.push(dr[0]);
      }
    })
  }

  comment(feedback: string) {
    if(this.checkLogin == null || this.accountService.isLoggedIn == false) {
      alert("You must login before commenting");
      this.router.navigate(['login']);
    }else {
      let t = new Date();
      console.log(t.getDate() + "-" + (t.getMonth() +1 ) + "-" + t.getFullYear());
      let newFeedback = new Feedback();
      newFeedback.email = this.checkLogin.email;
      newFeedback.avatar = this.checkLogin.avatar;
      newFeedback.datePosted = t.getDate() + "-" + (t.getMonth() +1 ) + "-" + t.getFullYear() +"  " +(t.getHours()) + ":" + (t.getMinutes())+":"+t.getSeconds();
      newFeedback.content = feedback.trim();
      this.feedbacksService.gqlAddFeedback(newFeedback).subscribe((result) => {
        console.log(result);
      })
    }
    window.event.preventDefault();
  }
  ngOnInit() {
    this.getGqlFeedbacks();
    this.checkedLogin();
    this.getTop3Drinks();
    this.getRecentDrinks();
  }

}
