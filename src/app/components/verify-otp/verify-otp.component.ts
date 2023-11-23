import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from 'src/service/companyservice.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {
  otp: string;
  username: string;
  mobile: number = parseInt(localStorage.getItem('mobile')!);
  isdCode: string = localStorage.getItem('isdCode')!; // Default ISD code
  phoneNumber: string = '';
  Oldmobile: string;
  NewisdCode: string;
  email: string;
  oldNo: string;
  newNo: string = localStorage.getItem('Newmobile')!;
  RequestType: string = 'ContactVerification';
  UserId: string = localStorage.getItem('userId')!;
  Cusip: string = localStorage.getItem('Cusip')!;

  constructor(
    private toastr: ToastrService,
    private companyService: CompanyserviceService,
    private router: Router
  ) {}
  
  ngOnInit() {
  }

  onsubmit() {
    const model = {
      UserId: this.UserId,
      Otp: this.otp,
      RequestType: this.RequestType,
      Cusip: this.Cusip,
      MobileNo: this.mobile,
      IsdCode: this.isdCode,
    };

    console.log(model);
    this.companyService.verifyOtp(model).subscribe((res) => {
      console.log(res);
      if (res.StatusCode == 1) {
        this.toastr.success(res.Message);
        this.router.navigate(['/setting']);
      } else {
        this.toastr.error(res.Message);
      }
    });
  }
}
