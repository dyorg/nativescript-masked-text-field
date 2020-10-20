import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { isKnownView, registerElement } from "@nativescript/angular/element-registry";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { MaskedTextValueAccessor } from "./masked-text-value-accessor";
if (!isKnownView("MaskedTextField")) {
    registerElement("MaskedTextField", () => require("../masked-text-field").MaskedTextField);
}
let MaskedTextFieldModule = class MaskedTextFieldModule {
};
MaskedTextFieldModule = __decorate([
    NgModule({
        declarations: [
            MaskedTextValueAccessor
        ],
        providers: [],
        imports: [
            FormsModule,
            NativeScriptFormsModule
        ],
        exports: [
            FormsModule,
            MaskedTextValueAccessor
        ]
    })
], MaskedTextFieldModule);
export { MaskedTextFieldModule };
