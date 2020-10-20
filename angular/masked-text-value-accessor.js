"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskedTextValueAccessor = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const text_value_accessor_1 = require("@nativescript/angular/forms/value-accessors/text-value-accessor");
const MASKED_TEXT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => MaskedTextValueAccessor),
    multi: true
};
let MaskedTextValueAccessor = class MaskedTextValueAccessor extends text_value_accessor_1.TextValueAccessor {
};
MaskedTextValueAccessor = __decorate([
    core_1.Directive({
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
exports.MaskedTextValueAccessor = MaskedTextValueAccessor;
