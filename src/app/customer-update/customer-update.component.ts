import { Component, OnInit } from '@angular/core';
import { Account } from '../Account';
import { AccountService } from '../account.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  title: String = "Update Account Details";
  account: Account = new Account();
  accountArray: any;
  currentStatus: any;


  constructor(private accountService: AccountService) { }
  //-------------search account details of customer by account number---------------
  searchAccountByNumber(number: any) {

    let URL = 'http://localhost:8081/account/';
    let accountNumber = (<HTMLInputElement>document.getElementById('number')).value;
    if (accountNumber) {
      URL = URL + 'number/' + accountNumber;
      const observable = this.accountService.getAccountbyNumber(accountNumber);
      observable.subscribe(response => {
        this.accountArray = response;
        // this.currentStatus = this.accountArray.status;
        if (this.accountArray) {
          this.account = this.accountArray
        }
        else {
          swal.fire({
            text: "Enter a valid account number",
            icon: 'warning'
          });
        }
      },
        (error: any) => {
          console.log(error);
          swal.fire({
            text: "Error occured...! Try again",
            icon: 'error'
          });
        })
    }
    else {
      swal.fire({
        text: "Please enter account number",
        icon: 'warning',
      })
    }
  }
  // -------------check if argument is number or not--------------
  isNumber(n: any) {
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  //------------------update the customer account details---------
  update() {

    if (this.account.mobileNumber.length < 10 || this.account.mobileNumber.length > 10) {
      swal.fire("Required length for mobile number is 10");
    }
    else if (!this.isNumber(this.account.mobileNumber)) {
      swal.fire("Mobile number should be number!")
    }
    else if (!this.isNumber(this.account.address.pinCode)) {
      swal.fire("Pincode should be number!")
    }
    else {
      const promise = this.accountService.updateAccount(this.account, this.account.id);
      promise.subscribe((response: any) => {
        console.log(response);
        this.accountArray[response];

        swal.fire({
          title: 'Do you want to update the changes?',
          showDenyButton: true,
          confirmButtonText: `Update`,
          denyButtonText: `Don't Update`,
        }).then((result) => {

          if (result.isConfirmed) {
            swal.fire('Updated!', '', 'success')
          } else if (result.isDenied) {
            swal.fire('Changes are not updated', '', 'info')
          }
        })

      },

        error => {
          console.log(error);
          swal.fire({
            icon: "error",
            text: "Update not possible"
          });

        })
    }
  }

  ngOnInit(): void {
  }

}
