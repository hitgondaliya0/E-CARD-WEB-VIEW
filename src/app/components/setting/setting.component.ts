import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HideLoader, ShowLoader } from 'src/app/shared/show-hide-loader';
import { environment } from 'src/environments/environment';
import { CompanyserviceService } from 'src/service/companyservice.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent {
  Web_URL = environment.Web_URL;
  call_javascript_code : any;
  UserId : string = localStorage.getItem('userId')!;
  email: string = '';
  mobile : string = '';
  username : string='';
  isdCode : string='';
  isdcodesign: string = '';
  logoutButton() {
    console.log("Logout button clicked");
    // window.postMessage('logout');
    //@ts-ignore
    window.call_javascript_code.postMessage("logout");
}

shareButton() {
  console.log("Share button clicked");
  // window.window.postMessage('share');
  //@ts-ignore
 window.call_javascript_code.postMessage("share");
}

rateButton() {
  console.log("Rate Us button clicked");
  //@ts-ignore
 window.call_javascript_code.postMessage("rateus");
}

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

