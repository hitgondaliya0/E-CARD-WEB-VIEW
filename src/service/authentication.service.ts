import { Injectable } from '@angular/core';
import { UserRequest } from 'src/shared/models/UserRequest';
import { DataserviceService } from './dataservice.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	loginEndPoint: string = 'api/v1/Authentication/Login';
	registerEndPoint: string = 'api/v1/Authentication/SignUp';
	verifyUserNameEndPoint: string = 'api/v1/Authentication/VerifyUserName';
	verifyOtpEndPoint: string = 'api/v1/Authentication/VerifyOtp';
	setPasswordEndPoint: string = ' api/v1/Authentication/ResetPassword';

	constructor(private service: DataserviceService) {}

	login(req: { username: string; password: string }) {
		return this.service.post(this.loginEndPoint, req);
	}

	register(req: UserRequest) {
		return this.service.post(this.registerEndPoint, req);
	}

	verifyUserName(username: string) {
		return this.service.get(
			`${this.verifyUserNameEndPoint}?userName=${username}`
		);
	}

	verifyOtp(req: { userId: string; otp: string; cusip: string }) {
		return this.service.post(this.verifyOtpEndPoint, req);
	}

	setPassword(req: { userId: string; password: string; cusip: string }) {
		return this.service.post(this.setPasswordEndPoint, req);
	}
}
