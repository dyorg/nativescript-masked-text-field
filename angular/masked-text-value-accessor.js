import { Directive, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { TextValueAccessor } from "@nativescript/angular/forms/value-accessors/text-value-accessor";
const MASKED_TEXT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MaskedTextValueAccessor),
    multi: true
};
let MaskedTextValueAccessor = class MaskedTextValueAccessor extends TextValueAccessor {
};
MaskedTextValueAccessor = __decorate([
    Directive({
        selector: "MaskedTextField[ngModel], MaskedTextField[formControlName], MaskedTextField[formControl]" +
            "maskedTextField[ngModel], maskedTextField[formControlName], maskedTextField[formControl]" +
            "masked-text-field[ngModel], masked-text-field[formControlName], masked-text-field[formControl]",
        providers: [MASKED_TEXT_VALUE_ACCESSOR],
        host: {
            "(blur)": "onTouched()",
            "(textChange)": "onChange($event.value)"
        }
    })
], MaskedTextValueAccessor);
export { MaskedTextValueAccessor };
