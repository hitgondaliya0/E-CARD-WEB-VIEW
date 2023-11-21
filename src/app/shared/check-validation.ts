import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
	return (formGroup: UntypedFormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
			// return if another validator has already found an error on the matchingControl
			return;
		}

		// set error on matchingControl if validation fails
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	};
}

export function validateAllFormFields(formGroup: UntypedFormGroup) {
	Object.keys(formGroup.controls).forEach((field) => {
		//{2}
		const control = formGroup.get(field); //{3}
		if (control instanceof UntypedFormControl) {
			//{4}
			control.markAsTouched({ onlySelf: true });
		} else if (control instanceof UntypedFormGroup) {
			//{5}
			validateAllFormFields(control); //{6}
		}
	});
}
