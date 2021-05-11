import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { UpdateAccountComponent } from './update-account/update-account.component';
import { SearchAccountComponent } from './search-account/search-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SearchAllComponent } from './search-all/search-all.component';
import { EmployeelandComponent } from './employeeland/employeeland.component';

import { CustomerlandComponent } from './customerland/customerland.component';

import { DepositComponent } from './deposit/deposit.component';
import { CustomerUpdateComponent } from "./customer-update/customer-update.component";
import { WithdrawComponent } from './withdraw/withdraw.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'About', component: AboutUsComponent },
  { path: 'Help', component: HelpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  { path: 'searchaccount', component: SearchAccountComponent },
  { path: 'land', component: EmployeelandComponent },
  { path: 'updateEmployee', component: UpdateAccountComponent },
  { path: 'customer', component: CustomerlandComponent },
  { path: 'searchall', component: SearchAllComponent },
  { path: 'update', component: CustomerUpdateComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'deposit', component: DepositComponent },


];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    UpdateAccountComponent,
    SearchAccountComponent,
    AboutUsComponent,
    HelpComponent,
    LoginComponent,
    CreateAccountComponent,
    SearchAllComponent,
    EmployeelandComponent,
    CustomerlandComponent,
    DepositComponent,
    CustomerUpdateComponent,
    WithdrawComponent,
  ],
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true } // <-- debugging purposes only
  ),
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
