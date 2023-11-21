import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from 'src/service/companyservice.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  userId: string = "JVWq97vXD30=";
  OldPassword : string ;
  NewPassword : string ;
  ConfirmPassword : string;
  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  confirmPasswordClass = 'form-control';
  confirmPasswordClass1 = false;

  
  oldPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern('.{8,}'),
  ]);
  newPassword = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern('.{8,}'),
  ]);
  confirmPassword  = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern('.{8,}'),
  ]);

  passwordForm: FormGroup = new FormGroup({
    OldPassword:this.oldPassword,
    NewPassword: this.newPassword,
    ConfirmPassword :  this.confirmPassword

});
  constructor(
		private toastr: ToastrService,
		private companyService: CompanyserviceService,
		private router: Router
	) {}
  changePassword() {
    const model = {
			UserId: this.userId,
      OldPassword: this.passwordForm.value.OldPassword,
      NewPassword: this.passwordForm.value.NewPassword,
      ConfirmPassword: this.passwordForm.value.ConfirmPassword
    };

    console.log(model);
		this.companyService.ChangePassword(model).subscribe((res) => {
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

  checkPasswords(pw: string, cpw: string) {
    this.isConfirmPasswordDirty = true;
    if (cpw == pw) {
      this.passwordsMatching = true;
      this.confirmPasswordClass = 'form-control is-valid';
    } else {
      this.passwordsMatching = false;
      this.confirmPasswordClass = 'form-control is-invalid';
    }
  }
  public showPassword!: boolean;
  public showPasswordOnPress!: boolean;
  public showPasswordnew!: boolean;
  public showPasswordOnPressnew!: boolean;
  public showPasswordconfirm!: boolean;
  public showPasswordOnPressconfirm!: boolean;
 name = 'Angular';
}
