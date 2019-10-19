import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductContentComponent } from './product-content/product-content.component';
import { ListProductComponent } from './list-product/list-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesService } from './categories.service';
import { DrinksService } from './drinks.service';
import { FeedbackService } from './feedback.service';
import { AllProductComponent } from './all-product/all-product.component';
import { GraphQLModule } from './graphql.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductContentComponent,
    ListProductComponent,
    UserProfileComponent,
    ListUserComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    DashboardComponent,
    AllProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [CategoriesService,DrinksService,FeedbackService],
  bootstrap: [AppComponent]
})
export class AppModule { }
