import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HideLoader, ShowLoader } from 'src/app/shared/show-hide-loader';
import { CompanyserviceService } from 'src/service/companyservice.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  UserId : string = localStorage.getItem('userId')!;
  email: string ='';
  mobile : string = '';
  username : string = '';
  isdCode : string = '';
  isdcodesign: string = '';

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
    this.UserId =  localStorage.getItem('userId')!;
    ShowLoader();
    this.companyService
      .getEditProfile( this.UserId)
      .subscribe((res) => {
        HideLoader();
        if (res.StatusCode == 1) {
          this.email = res.Data.Email;
          this.mobile = res.Data.MobileNo;
          this.username = res.Data.UserName;
          this.isdCode = res.Data.IsdCode;
          this.isdcodesign = '+';
        }
      });
  }
}
