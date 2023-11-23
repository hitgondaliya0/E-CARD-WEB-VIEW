import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  userId: any;
  isSocialSignUp: boolean;
  modaldark : string = localStorage.getItem('modaldark')!;
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    if(this.modaldark == 'true') {
      $('#header').css('background', 'rgba(0, 0, 0, 0.5)');
    } else if(this.modaldark == 'false') {
      $('.common-div').css('background', 'rgba(0, 0, 0, 0)');
    }
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.userId = params['userId'];
        this.isSocialSignUp = params['isSocialSignUp'];
        console.log(this.userId); // userId
        console.log(this.isSocialSignUp); // userId

      }
    );
    localStorage.setItem('userId' , this.userId);
    localStorage.setItem('isSocialSignUp' , JSON.stringify(this.isSocialSignUp));

  }

}
