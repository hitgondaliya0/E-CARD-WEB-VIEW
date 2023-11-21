import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyserviceService } from 'src/service/companyservice.service';

@Component({
  selector: 'app-help-card',
  templateUrl: './help-card.component.html',
  styleUrls: ['./help-card.component.css']
})
export class HelpCardComponent {
  UserId : any = 'JVWq97vXD30=';
  feedback:string;
  // Feedback : String = '';
  Feedback = new FormControl(null,[
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern('.{1,}'),
  ]);
  feedbackForm: FormGroup = new FormGroup({
    feedback:this.Feedback

});
  constructor(
		private toastr: ToastrService,
		private companyService: CompanyserviceService,
		private router: Router
	) {}


  onsubmit () {
    const model = {
			UserId: this.UserId,
      Feedback: this.Feedback.value,
    };


    console.log(this.Feedback.value);
		this.companyService.UserFeedback(model).subscribe((res) => {
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
