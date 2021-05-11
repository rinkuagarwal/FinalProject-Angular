import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent {

  public user : User;


  constructor(private loginService: LoginService) {
      this.user = new User();
  }
  //-----to refresh the page-----------
  refresh(): void {
    window.location.reload();}

    //------------to do employee login only using the credentials below---
  validateLogin() {
    if(this.user.username=="abhilasha@gmail.com" && this.user.password=="singh123"||
    this.user.username=="rinky@gmail.com" && this.user.password=="rinky123"||
    this.user.username=="akanksha@gmail.com" && this.user.password=="akku123"||
    this.user.username=="rupak@gmail.com" && this.user.password=="rupak123"||
    this.user.username=="henna@gmail.com" && this.user.password=="heena123"){
        this.loginService.validateLogin(this.user).subscribe(result => {
        console.log('result is ', result);

      }, error => {
        console.log('error is ', error);

      });
    } else{
      this.refresh();
      alert('enter valid user name and password');

    }
  }

}


