import * as $ from 'jquery';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})

export class CardCarouselComponent { 
  animations?: any[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  
  openModal() {
    $('#myModal').css('display', 'block');
    $('.dashboard-card').css('opacity', '0.2');

  }
  
  closeModal() {
    $('#myModal').css('display', 'none');
    $('.dashboard-card').css('opacity', '1');
  }


}
