import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[UserService]
})
export class AppComponent implements OnInit {

  constructor(private service:UserService,private router: Router) {}
  ngOnInit(): void {

  }


  navigateToAdmin(){
    this.router.navigateByUrl('/addmin');
    }
  navigateToUser(){
      this.router.navigateByUrl('/user');
     }

}
