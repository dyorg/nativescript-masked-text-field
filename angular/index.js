"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskedTextFieldModule = void 0;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const element_registry_1 = require("@nativescript/angular/element-registry");
const angular_1 = require("@nativescript/angular");
const masked_text_value_accessor_1 = require("./masked-text-value-accessor");
if (!element_registry_1.isKnownView("MaskedTextField")) {
    element_registry_1.registerElement("MaskedTextField", () => require("../masked-text-field").MaskedTextField);
}
let MaskedTextFieldModule = class MaskedTextFieldModule {
};
MaskedTextFieldModule = __decorate([
    core_1.NgModule({
        declarations: [
            masked_text_value_accessor_1.MaskedTextValueAccessor
        ],
        providers: [],
        imports: [
            forms_1.FormsModule,
            angular_1.NativeScriptFormsModule
        ],
        exports: [
            forms_1.FormsModule,
            masked_text_value_accessor_1.MaskedTextValueAccessor
        ]
    })
], MaskedTextFieldModule);
exports.MaskedTextFieldModule = MaskedTextFieldModule;
