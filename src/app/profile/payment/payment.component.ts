import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HideLoader, ShowLoader } from 'src/app/shared/show-hide-loader';
import { environment } from 'src/environments/environment';
import { CompanyserviceService } from 'src/service/companyservice.service';
import { PaymentRequests } from 'src/shared/models/PaymentRequests';

@Component({
	selector: 'app-payment',
	templateUrl: './payment.component.html',
	styleUrls: ['../profile.component.css']
})
export class PaymentComponent {
	@Input() payment: any;
	@Output() updateTabName = new EventEmitter<any>();
	paytm = {
		image: '',
		number: ''
	};

	phonePe = {
		image: '',
		number: ''
	};

	googlePay = {
		image: '',
		number: ''
	};

	account = {
		name: '',
		number: '',
		ifscCode: '',
		type: '',
		bankName: ''
	};

	googlePayCheck = true;
	paytmCheck!: boolean;
	phonePeCheck!: boolean;
	accountDetailCheck!: boolean;
	cardId: number = 0 ;
	userId: string = 'JVWq97vXD30=';
	companyId: number = parseInt(localStorage.getItem('companyId')!);
	isLogged: string = localStorage.getItem('isLogged')!;
	companyName: string = localStorage.getItem('CompanyName')!;

	constructor(
		private companyService: CompanyserviceService,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		if (this.userId) this.getPaymentDetails();
	}

	uploadPicture(name: string, files: FileList) {
		const imageFile = files[0];
		const reader = new FileReader();
		let rawImg;
		reader.onloadend = () => {
			rawImg = reader.result;
			if (name == 'paytm') this.paytm.image = rawImg!.toString();
			if (name == 'phonepe') this.phonePe.image = rawImg!.toString();
			if (name == 'googlepay') this.googlePay.image = rawImg!.toString();
		};
		reader.readAsDataURL(imageFile);
	}

	removePicture(name: string) {
		if (name == 'paytm') this.paytm.image = '';
		if (name == 'phonepe') this.phonePe.image = '';
		if (name == 'googlepay') this.googlePay.image = '';
	}

	handleUpdatePaymentDetails() {
		this.userId = 'JVWq97vXD30=';
		if (!this.companyId && this.companyId != 0) {
			this.companyId = parseInt(localStorage.getItem('companyId')!);
		}
		const model: PaymentRequests = {
			id: this.companyId,
			userId: this.userId,
			cardId : this.cardId,
			paytmQrImage: this.paytm.image,
			paytmNumber: this.paytm.number,
			phonePeQrImage: this.phonePe.image,
			phonePeNumber: this.phonePe.number,
			googlePayQrImage: this.googlePay.image,
			googlePayNumber: this.googlePay.number,
			bankName: this.account.bankName,
			accountNumber: this.account.number,
			ifscCode: this.account.ifscCode,
			accountName: this.account.name,
			accountType: this.account.type
		};
		ShowLoader();
		this.companyService.updatePaymentDetails(model).subscribe((res) => {
			HideLoader();
			if (res.StatusCode == 1) {
				this.toastr.success(res.Message);
				if (this.isLogged || this.companyName) {
					this.companyId = this.payment.Id;
					this.updateTabName.emit();
				} else {
					window.location.reload();
				}
			} else {
				this.toastr.error(res.Message);
			}
		});
	}

	getPaymentDetails() {
		this.companyId = this.payment.Id;

		if (this.payment.PaytmQrImage != null && this.payment.PaytmQrImage != '')
			this.paytm.image = environment.API_URL + this.payment.PaytmQrImage;
		this.paytm.number = this.payment.PaytmNumber;

		if (
			this.payment.PhonePeQrImage != null &&
			this.payment.PhonePeQrImage != ''
		)
			this.phonePe.image = environment.API_URL + this.payment.PhonePeQrImage;
		this.phonePe.number = this.payment.PhonePeNumber;

		if (
			this.payment.GooglePayQrImage != null &&
			this.payment.GooglePayQrImage != ''
		)
			this.googlePay.image =
				environment.API_URL + this.payment.GooglePayQrImage;
		this.googlePay.number = this.payment.GooglePayNumber;

		this.account.bankName = this.payment.BankName;
		this.account.number = this.payment.AccountNumber;
		this.account.ifscCode = this.payment.IfscCode;
		this.account.name = this.payment.AccountName;
		this.account.type = this.payment.AccountType;

		if (this.paytm.image || this.paytm.number) this.paytmCheck = true;
		if (this.googlePay.image || this.googlePay.number)
			this.googlePayCheck = true;
		if (this.phonePe.image || this.phonePe.number) this.phonePeCheck = true;
		if (
			this.account.bankName ||
			this.account.number ||
			this.account.ifscCode ||
			this.account.name ||
			this.account.type
		)
			this.accountDetailCheck = true;
	}

	checkIssue() {
		console.log(this.googlePayCheck);
	}
}
