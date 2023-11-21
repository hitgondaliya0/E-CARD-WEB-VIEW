import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})

export class SettingComponent {
  Web_URL = environment.Web_URL;
  call_javascript_code : any;
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

}

