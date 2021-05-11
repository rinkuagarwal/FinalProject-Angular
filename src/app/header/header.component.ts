import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Directive, HostListener } from '@angular/core'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private accountservice: AccountService) { }

  ngOnInit(): void {
  }

}
