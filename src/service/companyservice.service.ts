import { Injectable } from '@angular/core';
import { AboutRequest } from 'src/shared/models/aboutRequest';
import { ProductRequest } from 'src/shared/models/productRequest';
import { ProfileRequest } from 'src/shared/models/profileRequest';
import { PaymentRequests } from 'src/shared/models/PaymentRequests';
import { DataserviceService } from './dataservice.service';

@Injectable({
	providedIn: 'root'
})
export class CompanyserviceService {
	companyProfileEndPoint: string = 'api/v1/DigitalCard/UpdateCompanyDetails';
	companyAboutEndPoint: string = 'api/v1/DigitalCard/UpdateAboutUsDetails';
	companyProductEndPoint: string = 'api/v1/DigitalCard/UpdateProductDetails';
	RemoveProductEndPoint: string = 'api/v1/DigitalCard/RemoveProductDetails';
	companyPaymentEndPoint: string = 'api/v1/DigitalCard/UpdatePaymentDetails';
	companyGalleryEndPoint: string =
		'/api/v1/DigitalCard/UpdateCardGalleryDetails';
	getCompanyDetailsEndPoint: string = 'api/v1/DigitalCard/GetCompanyDetails';
	RemoveGalleryImageEndPoint: string =
		'api/v1/DigitalCard/RemoveCardGalleryDetails';
	SendEnquiryEndPoint: string = 'api/v1/DigitalCard/SendInquiryFormDetails';
	CheckDuplicateCardEndPoint: string =
		'api/v1/DigitalCard/CheckDuplicateCardUrl';
		ChangePasswordEndPoint : string = 'api/V1/DigitalCard/ChangePassword';
		GetProfileByIdEnPoint : string = 'api/V1/DigitalCard/GetProfileById'
		EditProfileEndPoint : string = 'api/V1/DigitalCard/EditProfile';
		UserFeedbackEndPoint : string = 'api/V1/DigitalCard/UserFeedback';
		verifyOtpEndPoint : string = 'api/V1/Authentication/VerifyOTP'

	constructor(private service: DataserviceService) {}

	updateCompanyDetails(req: ProfileRequest) {
		return this.service.post(this.companyProfileEndPoint, req);
	}

	updateAboutDetails(req: AboutRequest) {
		return this.service.post(this.companyAboutEndPoint, req);
	}

	updateProductDetails(req: ProductRequest) {
		return this.service.post(this.companyProductEndPoint, req);
	}

	removeProductDetail(id: number) {
		return this.service.delete(`${this.RemoveProductEndPoint}?id=${id}`);
	}

	updatePaymentDetails(req: PaymentRequests) {
		return this.service.post(this.companyPaymentEndPoint, req);
	}

	updateGalleryDetails(req: {
		Id: number;
		UserId: string;
		cardId : number;
		GalleryImages: Array<object>;
	}) {
		return this.service.post(this.companyGalleryEndPoint, req);
	}

	getCompanyDetails(name: string, id: string, cardId : number) {
		return this.service.get(`${this.getCompanyDetailsEndPoint}?${name}=${id}&cardId=${cardId}`);
	}

	removeGalleryImage(id: string) {
		return this.service.delete(`${this.RemoveGalleryImageEndPoint}?Id=${id}`);
	}

	sendEnquiryForm(req: {
		UserId: number;
		FullName: string;
		PhoneNumber: string;
		Email: string;
		Message: string;
	}) {
		return this.service.post(this.SendEnquiryEndPoint, req);
	}

	CheckDuplicateCard(userId: string, cardUrl: string) {
		return this.service.get(
			`${this.CheckDuplicateCardEndPoint}?userId=${userId}&cardUrl=${cardUrl}`
		);
	}
	ChangePassword(req: {
		UserId: string;
		OldPassword : string;
		NewPassword: string;
		ConfirmPassword : string;
	}) {
		return this.service.post(this.ChangePasswordEndPoint, req);
	}

	getEditProfile(UserId : string) {
		return this.service.get(`${this.GetProfileByIdEnPoint}?UserId=${UserId}`);
	}
	updateProfile(req: {
		UserId: any;
		UserName : string;
		Email: string;
		MobileNo : number;
		IsdCode : string;
	}) {
		return this.service.post(this.EditProfileEndPoint, req);
	}

	verifyOtp(req: {
		UserId: any;
		RequestType : string;
		MobileNo: number;
		IsdCode : string;
		Cusip : string;
		Otp : string;
	}) {
		return this.service.post(this.verifyOtpEndPoint, req);
	}
	
	UserFeedback(req: {
		UserId : string;
		Feedback : any;
	}){
		return this.service.post(this.UserFeedbackEndPoint, req);
	}
}
