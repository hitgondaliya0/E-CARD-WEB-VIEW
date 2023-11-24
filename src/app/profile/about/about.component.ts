import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HideLoader, ShowLoader } from 'src/app/shared/show-hide-loader';
import { CompanyserviceService } from 'src/service/companyservice.service';
import { AboutRequest } from 'src/shared/models/aboutRequest';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['../profile.component.css']
})
export class AboutComponent {
	@Input() aboutCompanyDetail: any;
	@Output() updateTabName = new EventEmitter<any>();
	htmlContent = '';

	config: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: '12rem',
		minHeight: '5rem',
		placeholder: 'Enter text here...',
		translate: 'no',
		defaultParagraphSeparator: 'p',
		defaultFontName: 'Arial',
		toolbarHiddenButtons: [
			[
				'insertImage',
				'insertVideo',
				'removeFormat',
				'toggleEditorMode',
				'subscript',
				'superscript'
			]
		],
		customClasses: [
			{
				name: 'quote',
				class: 'quote'
			},
			{
				name: 'redText',
				class: 'redText'
			},
			{
				name: 'titleText',
				class: 'titleText',
				tag: 'h1'
			}
		]
	};

	yearOfEstablishment!: string;
	typeOfBusiness: string = '';
	aboutCompany!: string;
	cardId : number = parseInt(localStorage.getItem('cardId')!);
	userId: string =  localStorage.getItem('userId')!;
	companyId: number = parseInt(localStorage.getItem('companyId')!);
	isLogged: string = localStorage.getItem('isLogged')!;
	companyName: string = localStorage.getItem('CompanyName')!;

	constructor(
		private companyService: CompanyserviceService,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		if (this.userId) this.getAboutDetails();
	}

	handleUpdateAboutDetails() {
		if (!this.userId)
			if (
				!this.typeOfBusiness &&
				!this.yearOfEstablishment &&
				!this.aboutCompany
			) {
				window.location.reload();
				return;
			}
		this.userId =  localStorage.getItem('userId')!;
		this.companyId = parseInt(localStorage.getItem('companyId')!);

		const model: AboutRequest = {
			id: this.companyId,
			userId: this.userId,
			cardId : this.cardId,
			yearOfEstablishment: this.yearOfEstablishment,
			typeOfBusiness: this.typeOfBusiness,
			aboutCompany: this.aboutCompany
		};
		ShowLoader();
		this.companyService.updateAboutDetails(model).subscribe((res) => {
			HideLoader();
			if (res.StatusCode == 1) {
				this.toastr.success(res.Message);
				if (this.isLogged || this.companyName) {
					this.updateTabName.emit();
				} else {
					window.location.reload();
				}
			} else {
				this.toastr.error(res.Message);
			}
		});
	}

	getAboutDetails() {
		// console.log(this.yearOfEstablishment);
		const data = this.aboutCompanyDetail!;
		this.yearOfEstablishment = data.yearOfEstablishment!;
		this.typeOfBusiness = data.typeOfBusiness!;
		this.aboutCompany = data.aboutCompany!;
	}
}
