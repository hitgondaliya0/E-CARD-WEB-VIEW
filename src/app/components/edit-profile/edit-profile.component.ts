import {
  Component,
  OnInit,
  ViewChildren,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as $ from 'jquery';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from 'src/service/companyservice.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent {
form: FormGroup<any>;
  otp: string;
  username: string;
  mobile: number;
  isdCode: string = '91'; // Default ISD code
  phoneNumber: string = '';
  Oldmobile: string;
  NewisdCode: string;
  email: string;
  oldNo: string;
  newNo: string;
  RequestType: string = 'ContactVerification';
  UserId: string = localStorage.getItem('userId')!;
  Cusip: string;
  showOtpComponent = true;

  constructor(
    private toastr: ToastrService,
    private companyService: CompanyserviceService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.getEditprofile();
  }

  getEditprofile() {
    console.log("woo hoooo , it's calling in Edit Profile");
    this.UserId = localStorage.getItem('userId')!;
    this.companyService.getEditProfile(this.UserId).subscribe((res) => {
      if (res.StatusCode == 1) {
        this.email = res.Data.Email;
        this.mobile = res.Data.MobileNo;
        this.Oldmobile = res.Data.MobileNo;
        this.username = res.Data.UserName;
        this.isdCode = res.Data.IsdCode;
        this.NewisdCode = res.Data.IsdCode;
        this.oldNo = this.NewisdCode + this.Oldmobile;
        console.log(this.oldNo);
      }

      console.log(res);
      console.log(res.Data);
      console.log(this.email);
      console.log(this.mobile);
      console.log(this.username);
    });
  }
  saveEdit() {
    console.log(this.username);
    console.log(this.email);
    this.UserId = localStorage.getItem('userId')!;
    const model = {
      UserId: this.UserId,
      UserName: this.username,
      Email: this.email,
      MobileNo: this.mobile,
      IsdCode: this.isdCode,
    };

    console.log(model);
    this.companyService.updateProfile(model).subscribe((res) => {
      console.log(res);
      if (res.Data !== null) {
        this.Cusip = res.Data.CurrentDateTime;
        console.log(this.Cusip);
        localStorage.setItem('Cusip', this.Cusip);
        localStorage.setItem('mobile', JSON.stringify(this.mobile));
        
      }
      this.newNo = this.isdCode + this.mobile;
      console.log(this.newNo);
      if (res.StatusCode == 1) {
        // this.toastr.success(res.Message);
        if (this.oldNo !== this.newNo && this.isdCode == '91') {
          localStorage.setItem('Newmobile', this.newNo);
          localStorage.setItem('isdCode', this.isdCode);
          this.router.navigate(['/verify-otp']);

        } else {
          this.router.navigate(['/setting']);
        }
      } else {
        this.toastr.error(res.Message);
      }
    });
  }
}
