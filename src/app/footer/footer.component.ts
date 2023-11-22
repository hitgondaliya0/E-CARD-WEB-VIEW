import { Component } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  userId: string =  localStorage.getItem('userId')!;
  ngOnInit() {
    console.log(this.userId);
    // localStorage.setItem('OlduserId' , JSON.stringify(this.userId));
  }
  home() {
    $('.img-home').attr("src", "../../assets/home-white.svg");
    $('.img-createcard').attr("src", "../../assets/create-add.svg");
    $('.img-setting').attr("src", "../../assets/setting.svg");
  }
  createcard() {
    $('.img-home').attr("src", "../../assets/home.svg");
    $('.img-createcard').attr("src", "../../assets/create-add.svg");
    $('.img-setting').attr("src", "../../assets/setting.svg");
  }
  
  setting() {
    $('.img-home').attr("src", "../../assets/home.svg");
    $('.img-createcard').attr("src", "../../assets/create-add.svg");
    $('.img-setting').attr("src", "../../assets/setting-white.svg");
  }


}
