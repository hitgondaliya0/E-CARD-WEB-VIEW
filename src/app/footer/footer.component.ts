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
  images = [
    {url: '../../assets/home-black.svg', text: 'home-black'},
    {url: '../../assets/home-white.svg', text: 'home-white'},
    {url: '../../assets/create-add.svg', text: 'createcard-black'},
    {url: '../../assets/create-add.svg', text: 'createcard-white'},
    {url: '../../assets/setting.svg', text: 'setting-black'},
    {url: '../../assets/setting-white.svg', text: 'setting-white'}
  ];


  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  Home = {
    activeUrl: '../../assets/home-white.svg',
    inactiveUrl: '../../assets/home-black.svg'
  };
  Createcard = {
    activeUrl: '../../assets/create-add-white.svg',
    inactiveUrl: '../../assets/create-add.svg'
  };
  Setting = {
    activeUrl: '../../assets/setting-white.svg',
    inactiveUrl: '../../assets/setting.svg'
  };

  constructor(private router: Router) {}


  ngOnInit() {
    console.log(this.userId);
  }
  home() {
    
  }


}
