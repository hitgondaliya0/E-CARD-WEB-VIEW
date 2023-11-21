import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
	UntypedFormGroup,
	UntypedFormBuilder,
	Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { validateAllFormFields } from 'src/app/shared/check-validation';
import { HideLoader, ShowLoader } from 'src/app/shared/show-hide-loader';
import { environment } from 'src/environments/environment';
import { CompanyserviceService } from 'src/service/companyservice.service';
import { ProfileRequest } from 'src/shared/models/profileRequest';

@Component({
  selector: 'app-home-web',
  templateUrl: './home-web.component.html',
  styleUrls: ['./home-web.component.css']
})
export class HomeWebComponent {
  @Input() companyDetails: any;
	@Output() updateTabName = new EventEmitter<any>();
	companyOwnersList: Array<string> = [];
	companyOwner: string = '';

	name: string = '';
	profilePicture: string = '';
	contactNo: string = '';
	website: string = '';
	address: string = '';
	whatsappNo: string = '';

	facebookLink: string = '';
	linkedinLink: string = '';
	instagramLink: string = '';
	twitterLink: string = '';
	pinterestLink: string = '';
	youtubeLink: string = '';
	telegramLink: string = '';
	manualLink: string = '';
	cardId: number = 0 ;

	companyForm!: UntypedFormGroup;
  
	userId:string ='JVWq97vXD30=';
	companyId: string = (localStorage.getItem('companyId')!);
	isLogged: string = localStorage.getItem('isLogged')!;
	companyName: string = localStorage.getItem('CompanyName')!;
  
	cardUrl: string = '';
	isShowCardCopyButton: boolean = false;
  
	API_URL = environment.API_URL;
	Web_URL = environment.Web_URL;
  
	constructor(
    private fb: UntypedFormBuilder,
		private companyService: CompanyserviceService,
		private toastr: ToastrService
    ) {}
    
    ngOnInit() {
      console.log(this.userId);
      this.companyForm = this.fb.group({
			name: [null, [Validators.required]],
			address: [null, [Validators.required]],
			contact: [null, [Validators.required]],
			cardUrl: [null],
			website: [null, [Validators.required]],
			whatsappNo: [null, [Validators.required]],
			owner: [null]
		});
		if (this.userId) this.getCompanyDetails();
	}

	get f() {
		return this.companyForm.controls;
	}

	uploadProfilePicture(files: FileList) {
		const imageFile = files[0];
		const reader = new FileReader();
		let rawImg;
		reader.onloadend = () => {
			rawImg = reader.result;
			this.profilePicture = rawImg!.toString();
		};
		reader.readAsDataURL(imageFile);
	}

	removeProfilePicture() {
		this.profilePicture = null!;
	}

	addOwner() {
		this.companyOwnersList.push(this.companyOwner);
		this.companyOwner = '';
	}

	deleteOwner(id: number) {
		this.companyOwnersList.splice(id, 1);
	}

	handleUpdateCompanyDetails() {
		this.userId = "JVWq97vXD30=";
		this.companyId = (localStorage.getItem('companyId')!);
		if (this.companyOwnersList.length == 0) {
			return;
		}
		if (this.companyForm.invalid) {
			validateAllFormFields(this.companyForm);
			return;
		}
		ShowLoader();
		const model: ProfileRequest = {
			id: this.companyId,
			cardId : this.cardId,
			userId: this.userId,
			name: this.name,
			cardUrl: this.cardUrl,
			companyLogo: this.profilePicture,
			phoneNo: this.contactNo,
			website: this.website,
			address: this.address,
			whatsappNo: this.whatsappNo,
			owner: this.companyOwnersList,
			facebookLink: this.facebookLink,
			linkedinLink: this.linkedinLink,
			instagramLink: this.instagramLink,
			twitterLink: this.twitterLink,
			pinterestLink: this.pinterestLink,
			youtubeLink: this.youtubeLink,
			telegramLink: this.telegramLink,
			manualLink: this.manualLink
		};
		this.companyService.updateCompanyDetails(model).subscribe((res) => {
			HideLoader();
			if (res.StatusCode == 1) {
				this.toastr.success(res.Message);
				this.isShowCardCopyButton = true;
				if (this.isLogged || this.companyName) {
					this.updateTabName.emit(this.cardUrl);
				} else {
					window.location.reload();
				}
				localStorage.setItem('CompanyName', this.cardUrl);
			} else {
				this.toastr.error(res.Message);
			}
		});
	}

	checkValidation() {
		if (this.companyOwnersList.length == 0) {
			return false;
		}
		if (this.companyForm.invalid) {
			validateAllFormFields(this.companyForm);
			return false;
		}
		return true;
	}

	getCompanyDetails() {
		const data = this.companyDetails;
		this.name = data.Name;
		if (data.CompanyLogo != null && data.CompanyLogo != '')
			this.profilePicture = environment.API_URL + data.CompanyLogo;
		this.contactNo = data.PhoneNo;
		this.website = data.Website;
		this.cardUrl = data.CardUrl;
		if (data.CardUrl) {
			this.isShowCardCopyButton = true;
		}
		this.address = data.Address;
		this.whatsappNo = data.WhatsappNo;
		if (data.Owner != null) {
			this.companyOwnersList = data.Owner;
		}
		this.facebookLink = data.FacebookLink;
		this.linkedinLink = data.LinkedinLink;
		this.instagramLink = data.InstagramLink;
		this.twitterLink = data.TwitterLink;
		this.pinterestLink = data.PinterestLink;
		this.youtubeLink = data.YoutubeLink;
		this.telegramLink = data.TelegramLink;
		this.manualLink = data.ManualLink;
	}

	async checkCardUrl() {
		this.userId = "JVWq97vXD30=";
		this.companyId = (localStorage.getItem('companyId')!);
		const tempUrl = this.name.replace(' ', '-');
		ShowLoader();
		return new Promise((resolve, reject) => {
			this.companyService
				.CheckDuplicateCard(this.userId, !this.cardUrl ? tempUrl : this.cardUrl)
				.subscribe((res) => {
					HideLoader();
					if (res.StatusCode == 1) {
						if (!this.cardUrl) {
							this.cardUrl = tempUrl;
						}
					} else {
						this.cardUrl = '';
						this.toastr.error(res.Message);
					}
					resolve(res);
				});
		});
	}

	checkFunction() {
		this.checkCardUrl().then((res) => {
			if (res) {
				this.handleUpdateCompanyDetails();
			}
		});
	}

	copyUrl() {
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

	showMessage() {
		this.toastr.warning('Please add all required fields');
	}
}
