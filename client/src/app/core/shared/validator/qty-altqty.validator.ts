import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function qtyAltQty(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
       
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.qtyAltQty) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (matchingControl.value < control.value) {
            matchingControl.setErrors({ qtyAltQty: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}