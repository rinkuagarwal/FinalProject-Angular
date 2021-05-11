import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  title: String = "Update Account Details";
  account: Account = new Account();
  accountArray: any;
  currentStatus: any;
  accountResult: any;

  constructor(private accountService: AccountService) { }
//-----------------search customer details using account number--------------
  searchAccountByNumber(number: any) {

    let URL = 'http://localhost:8081/account/';
    let accountNumber = (<HTMLInputElement>document.getElementById('number')).value;
    if (accountNumber) {
      URL = URL + 'number/' + accountNumber;
      const observable = this.accountService.getAccountbyNumber(accountNumber);
      observable.subscribe(response => {
        this.accountArray = response;
        console.log("sucess");
        if (this.accountArray) {
          this.account = this.accountArray
        }
        else {
          Swal.fire({
            text: "Enter a valid account number",
            icon: 'warning'
          });
        }
      },
        (error: any) => {
          Swal.fire({
            text: "Enter a valid Account Number",
            icon: 'error'
          });
        }
      )
    }
    else {
      Swal.fire({
        text: "Enter a valid account number",
        icon: 'warning',
      })
    }
  }

  // -------------check if argument is number or not--------------
  isNumber(n: any) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }
//--------------customer can deposit certain amount which is updated in database---------------------
  deposit() {
    if (this.account.status != "ACTIVE") {
      Swal.fire("Your Account is not Active!")
    }
    else {
      if (this.isNumber(this.account.depositAmount)) {

        if (this.account.number) {

          if (this.account.depositAmount) {

            if (this.account.depositAmount != 0) {

              Swal.fire({
                title: 'Confirm Deposit?',
                text: 'Are you sure about depositing Rs:' + this.account.depositAmount + '?',
                showDenyButton: true,
                confirmButtonText: `Deposit`,
                denyButtonText: `Cancel`,
              }).then((result) => {

                if (result.isConfirmed) {

                  var a: number = +this.account.balance
                  var b: number = +this.account.depositAmount
                  a += b;
                  this.accountArray.balance = a;

                  const promise = this.accountService.updateAccount(this.account, this.account.id);
                  promise.subscribe((response: any) => {
                    console.log(response);

                    this.accountArray[response];

                    Swal.fire({
                      title: 'Thank you for banking with us...!',
                      text: "Amount Deposited : " + this.account.depositAmount + "\n Available Balance : " + this.account.balance,
                      icon: 'success'
                    });
                  },

                    error => {
                      console.log(error);
                      Swal.fire("Error occured..! \n Try Again");

                    })
                } else if (result.isDenied) {
                  Swal.fire({
                    text: "Your transaction is Cancelled!!!",
                    icon: 'error'
                  });
                }
              })
            }

            else {
              Swal.fire({
                text: "Enter an amount greater than zero ",
                icon: 'warning',
              });
            }
          }
          else {
            Swal.fire({
              text: "Please enter a valid amount to withdraw",
              icon: 'warning'
            })
          }
        }
        else {
          Swal.fire({
            text: "Enter a valid account number",
            icon: 'warning',
          })
        }
      } else {
        Swal.fire({
          text: "Amount should be a number",
          icon: 'error',
        })
      }
    }

  }
  ngOnInit(): void {
  }


}
