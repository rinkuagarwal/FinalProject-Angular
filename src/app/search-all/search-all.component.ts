import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {
  accountArray: any;
  account:Account=new Account();

  constructor(private accountService: AccountService) { }
//----------------getting details of employee using account number-----------
  searchByAccountNumber(number: any) {
    const observable = this.accountService.getAccountbyNumber(number);
    observable.subscribe(response => {
      console.log(response);
      this.accountArray = [response];
      if (this.accountArray[0] == undefined) {
        swal.fire({
          icon:"error",
          text:"No Account found for account number : "+ number})

      } else {
        alert("Displaying..")
      }
    },
      error => {
        swal.fire({
          icon:"error",
          text:"Error Occured. Not able to search"});
      })

  }
//-------------fetch all the accounts details---------------
  ngOnInit(): void {
    const observable = this.accountService.getAllAccounts();
    observable.subscribe(response => {
      console.log(response);
      this.accountArray = response;

    });
  }

}
