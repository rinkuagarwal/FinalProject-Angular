import { Address } from './Address';
export class Account{
  id:String="";
  number:String='';
  firstName:string = '';
  mobileNumber:any;
  email:any;
  lastName:string='';
  balance:number=0.0;
  depositAmount:number=0.0;
  createDate:Date=new Date();
  status:string='ACTIVE';
  type:string='SAVINGS';
  address:Address=new Address;
  withdrawAmount:number=0.0;
}
