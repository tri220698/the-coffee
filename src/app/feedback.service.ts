import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private ApolloClient : Apollo) { }

  public getAllFeedbacks = gql`
    query feedbacks {
      feedbacks {
        email
        datePosted
        avatar
        content
      }
    }
  `;

  public postFeedback = gql`
    mutation addFeedback($email:String!,$avatar:String!,$datePosted:String!,$content:String!){
      addFeedback(email:$email,avatar:$avatar,datePosted:$datePosted,content:$content){
        email
      }
    }
  `;

  public getFeedbacks() {
    return this.ApolloClient.watchQuery<any>({
      query : this.getAllFeedbacks
    })
  }

  public gqlAddFeedback(comment : any) {
    return this.ApolloClient.mutate({
      mutation : this.postFeedback,
      variables : {
        email : comment.email,
        avatar : comment.avatar,
        datePosted : comment.datePosted,
        content : comment.content
      },
      refetchQueries : [{
        query : this.getAllFeedbacks
      }]
    })
  }
}
