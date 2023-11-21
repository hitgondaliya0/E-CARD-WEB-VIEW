import { Component, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from 'src/service/companyservice.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {
  otp: string;
  username : string;
  mobile : number;
  isdCode: string = '91'; // Default ISD code
  phoneNumber: string = '';
  Oldmobile : string;
  NewisdCode : string;
  email : string;
  oldNo : string;
  newNo : string;
  RequestType : string = 'ContactVerification';
  UserId : string = 'JVWq97vXD30=';
  Cusip : string;
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
		this.UserId = 'JVWq97vXD30=';
		this.companyService
			.getEditProfile( this.UserId)
			.subscribe((res) => {
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
        console.log(this.username)
			});
	}
  saveEdit(){
    console.log(this.username);
    console.log(this.email);
    this.UserId = 'JVWq97vXD30=';
    const model = {
			UserId: this.UserId,
      UserName: this.username,
      Email: this.email,
      MobileNo: this.mobile,
      IsdCode : this.isdCode
    };

    console.log(model);
		this.companyService.updateProfile(model).subscribe((res) => {
      console.log(res);
      if(res.Data !==null) {
        this.Cusip = res.Data.CurrentDateTime;
        console.log(this.Cusip);
      }
      this.newNo = this.isdCode + this.mobile; 
      console.log(this.newNo)
			if (res.StatusCode == 1) {
					this.toastr.success(res.Message);
					// this.router.navigate(['/setting']);
          if(this.oldNo!==this.newNo && this.isdCode == '91') {

            $('#myModal').css('display', 'block');
            $('.dashboard-card').css('opacity', '0.2');
          }
          else{
            this.router.navigate(['/setting']);
          }
				} 
       else {
				this.toastr.error(res.Message);
			}
		});
  }

  closeModal() {
    $('#myModal').css('display', 'none');
    $('.dashboard-card').css('opacity', '1');
  }
  
    onsubmit () {
      const model = {
        UserId: this.UserId,
        Otp: this.otp,
        RequestType : this.RequestType,
        Cusip : this.Cusip,
        MobileNo : this.mobile,
        IsdCode : this.isdCode,


      };
  
      console.log(model);
      this.companyService.verifyOtp(model).subscribe((res) => {
        console.log(res);
        if (res.StatusCode == 1) {
            this.toastr.success(res.Message);
            this.router.navigate(['/setting']);
          } 
         else {
          this.toastr.error(res.Message);
        }
      });
    }

  
  
}
