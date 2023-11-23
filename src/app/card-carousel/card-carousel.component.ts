import * as $ from 'jquery';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from 'src/service/companyservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})

export class CardCarouselComponent { 
  UserId: string =localStorage.getItem('userId')!;
  animations?: any[];
  modaldark: boolean = false;
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
  constructor(
		private toastr: ToastrService,
		private companyService: CompanyserviceService,
		private router: Router
	) {}
  ngOnInit() {
    this.getAllCardDetails();
    localStorage.setItem('modaldark', JSON.stringify(this.modaldark));

  }
  getAllCardDetails() {
		console.log("woo hoooo , it's calling in Edit Profile");
		this.UserId =  localStorage.getItem('userId')!;
		this.companyService
			.getAllCardsDetails( this.UserId)
			.subscribe((res) => {
				if (res.StatusCode == 1) {
					console.log(res.Data);
				}

       
			});
	}

  openModal() {
    $('#myModal').css('display', 'block');
    $('.dashboard-card').css('background-color', 'rgba(0,0,0,0.2)');
    $('.dashboard-card').css('opacity', '0.2');
    // $('.carousel-dark').css('opacity', '0.2');
    // $('.carousel-dark').css('background', 'rgba(0, 0, 0, 0.5)');
    this.modaldark = true;
    localStorage.setItem('modaldark', JSON.stringify(this.modaldark));


  }
  
  closeModal() {
    $('#myModal').css('display', 'none');
    $('.dashboard-card').css('opacity', '1');
    this.modaldark = false;
    localStorage.setItem('modaldark', JSON.stringify(this.modaldark));

  }


}
