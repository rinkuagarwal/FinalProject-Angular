import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './Account';
import { Address } from './Address';
const URL = 'http://localhost:8081/account/';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  //--------------UPDATE methods-------------------------
    updateAccount(Account: Account, id: any) {
      return this.http.put(URL + '/' + id, Account, {
        headers: { "content-type": 'application/json' }
      })
    }
  //---------------POST methods----------------
  save(account: Account) {
    return this.http.post(URL, account, {
      headers: { "content-type": 'application/json' },
      responseType: "text"
    });
  }
//----------------GET method--------------
  getAccountbyNumber(accountNumber: any) {
    return this.http.get(URL + 'number/' + accountNumber, {
      headers: {
        "content-type": 'application/json',
        reponseType: 'text'
      }
    });
  }
//------------------GETALL method----------------
  getAllAccounts() {
    return this.http.get(URL);
  }

}
