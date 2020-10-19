"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskedTextFieldModule = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const angular_1 = require("@nativescript/angular");
angular_1.registerElement("MaskedTextField", () => require("../masked-text-field").MaskedTextField);
const MASKED_TEXT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => MaskedTextValueAccessor), multi: true
};
let MaskedTextValueAccessor = class MaskedTextValueAccessor extends angular_1.TextValueAccessor {
};
MaskedTextValueAccessor = __decorate([
    core_1.Directive({
        selector: "MaskedTextField[ngModel], MaskedTextField[formControlName], maskedTextField[ngModel], maskedTextField[formControlName], masked-text-field[ngModel], masked-text-field[formControlName]",
        providers: [MASKED_TEXT_VALUE_ACCESSOR]
    })
], MaskedTextValueAccessor);
let MaskedTextFieldModule = class MaskedTextFieldModule {
};
MaskedTextFieldModule = __decorate([
    core_1.NgModule({
        declarations: [MaskedTextValueAccessor],
        providers: [],
        imports: [
            forms_1.FormsModule
        ],
        exports: [
            forms_1.FormsModule,
            MaskedTextValueAccessor
        ]
    })
], MaskedTextFieldModule);
exports.MaskedTextFieldModule = MaskedTextFieldModule;
