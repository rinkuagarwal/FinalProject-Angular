import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { Address } from '../Address';
import { AccountService } from '../account.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-search-account',
  templateUrl: './search-account.component.html',
  styleUrls: ['./search-account.component.css']
})
export class SearchAccountComponent implements OnInit {
  accountArray:Account[]=[];
  account:Account=new Account(); //model -stores all form data

  accountResult: any;
   accountList: any;

  constructor(private accountservice: AccountService) { }

  //--------------get details of ustomer using account number------------
  getAccountbyNumber(number:any)
  {
    const accountNumber =number;

      if(accountNumber!=null){
        const promise = this.accountservice.getAccountbyNumber(accountNumber);
      promise.subscribe(response=> {
        this.accountResult = [response];
        if (this.accountResult!=0) {
          this.accountArray = this.accountResult;
          console.log(response);

        }
        else {
          swal.fire({
            icon:"error",
            text:"No Account found for account number:  "+number});
        }
      },
        error => {
          console.log(error);
          swal.fire({
            icon:"error",
            text:"Enter Account Number "});
        });
      }


  }
  ngOnInit(): void {
  }

}
