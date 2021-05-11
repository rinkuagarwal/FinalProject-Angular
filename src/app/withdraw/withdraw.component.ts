import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  title: String = "Update Account Details";
  account: Account = new Account();
  accountArray: any;
  currentStatus: any;

  constructor(private accountService: AccountService) { }

  //----------------fetch details by account number---------------
  searchAccountByNumber(number: any) {

    let URL = 'http://localhost:8081/account/';
    let accountNumber = (<HTMLInputElement>document.getElementById('number')).value;
    if (accountNumber) {
      URL = URL + 'number/' + accountNumber;
      const observable = this.accountService.getAccountbyNumber(accountNumber);
      observable.subscribe(response => {
        this.accountArray = response;
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
          console.log(error);
          Swal.fire({
            text: "Enter a valid Account Number",
            icon: 'error'
          });
        })
    }
    else {
      Swal.fire({
        text: "Enter a valid account number",
        icon: 'warning',
      })
    }
  }

  //------------------update details---------------------
  update() {
    if (this.account.status != "ACTIVE") {
      Swal.fire("Your Account is not Active!")
    }
    else {
      if (this.account.number) {

        if (this.account.withdrawAmount) {

          if (this.account.withdrawAmount != 0) {

            if (this.account.balance >= this.account.withdrawAmount) {

              Swal.fire({
                title: 'Confirm Withdraw?',
                text: 'Are you sure about withdrawing Rs:' + this.account.withdrawAmount + '?',
                showDenyButton: true,
                confirmButtonText: `Withdraw`,
                denyButtonText: `Cancel`,
              }).then((result) => {

                if (result.isConfirmed) {

                  this.account.balance = this.account.balance - this.account.withdrawAmount;
                  const promise = this.accountService.updateAccount(this.account, this.account.id);
                  promise.subscribe((response: any) => {
                    console.log(response);
                    this.accountArray[response];

                    Swal.fire({
                      title: 'Thank you for banking with us...!',
                      text: "Amount Withdrawn : " + this.account.withdrawAmount + "\n Available Balance : " + this.account.balance,
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
                text: "Enter an amount less than or equal to " + this.account.balance,
                icon: 'warning',
              });
            }
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
    }
  }

  ngOnInit(): void {
  }

}

