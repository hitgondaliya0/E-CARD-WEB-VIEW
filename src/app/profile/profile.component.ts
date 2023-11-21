import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CompanyserviceService } from 'src/service/companyservice.service';
import { HideLoader, ShowLoader } from '../shared/show-hide-loader';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
	isLoadChildComponent: boolean = true;
	userId: string = "JVWq97vXD30=";
	gallery: any;
	payment: any;
	companyProfile: any;
	companyName: '';
	aboutCompany: any;
	products: any;
	activeTab: string = 'home';
	cardUrl: string = '';
	cardId : number =0;

	Web_URL = environment.Web_URL;

	constructor(private companyService: CompanyserviceService) {}

	ngOnInit() {
		if (this.userId) this.getCompanyDetails();
		console.log (this.userId);
	}

	getCompanyDetails() {
		console.log("woo hoooo , it's calling");
		this.userId = 'JVWq97vXD30=';
		this.isLoadChildComponent = false;
		ShowLoader();
		this.companyService
			.getCompanyDetails('userId', this.userId ,  this.cardId)
			.subscribe((res) => {
				HideLoader();
				if (res.StatusCode == 1) {
					const {
						CompanyDetails,
						GalleryDetails,
						PaymentDetails,
						ProductDetails
					} = res.Data;
					localStorage.setItem('companyId', CompanyDetails.Id);
					localStorage.setItem('CompanyName', CompanyDetails.CardUrl);
					this.cardUrl = CompanyDetails.CardUrl;
					this.companyProfile = CompanyDetails;
					this.companyName = CompanyDetails.Name;
					const aboutCompanyDetails = {
						yearOfEstablishment: CompanyDetails.YearOfEstablishment,
						typeOfBusiness: CompanyDetails.TypeOfBusiness,
						aboutCompany: CompanyDetails.AboutCompany
					};
					this.products = ProductDetails;
					this.aboutCompany = aboutCompanyDetails;
					this.payment = PaymentDetails;
					this.gallery = GalleryDetails;
					this.isLoadChildComponent = true;
				}
			});
	}

	logout() {
		localStorage.clear();
		window.location.reload();
	}

	copyMessage() {
		let value = this.Web_URL + this.cardUrl;
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = value;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}
}
