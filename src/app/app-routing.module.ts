import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProductContentComponent } from './product-content/product-content.component';
import { ListProductComponent } from './list-product/list-product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LogoutComponent } from './logout/logout.component';
import { AccountGuard } from './account.guard';
import { RoleGuard } from './role.guard';
import { CheckLoginGuard } from './check-login.guard';
import { AllProductComponent } from './all-product/all-product.component';

const routes: Routes = [
  {path : '', redirectTo: '/dashboard', pathMatch : 'full'},
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'listuser',
    component: ListUserComponent,
    canActivate: [AccountGuard,RoleGuard]
  },
  {
    path: 'allproduct',
    component: AllProductComponent,
    canActivate: [AccountGuard,RoleGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CheckLoginGuard]
  },
  {
    path: 'product-content/:id',
    component: ProductContentComponent,
    canActivate: [AccountGuard]
  },
  {
    path: 'list-product/:search',
    component: ListProductComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AccountGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AccountGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
