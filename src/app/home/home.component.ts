import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userId: any;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.userId = params['userId'];
        console.log(this.userId); // userId
      }
    );
    localStorage.setItem('userId' , this.userId);
  }

}
