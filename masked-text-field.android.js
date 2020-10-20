import { getTransformedText } from "@nativescript/core/ui";
import { MaskedTextFieldBase, textProperty } from "./masked-text-field-common";
export * from "./masked-text-field-common";
export class MaskedTextField extends MaskedTextFieldBase {
    constructor() {
        super(...arguments);
        this._isChangingNativeTextIn = false;
    }
    createNativeView() {
        const textEdit = super.createNativeView();
        const textWatcher = createMaskedTextFieldTextWatcher(new WeakRef(this));
        textEdit.addTextChangedListener(textWatcher);
        textEdit.textWatcher = textWatcher;
        textEdit.removeTextChangedListener(textEdit.listener);
        return textEdit;
    }
    initNativeView() {
        super.initNativeView();
        const nativeView = this.nativeView;
        nativeView.textWatcher.owner = new WeakRef(this);
    }
    disposeNativeView() {
        const nativeView = this.nativeView;
        nativeView.textWatcher.owner = null;
        super.disposeNativeView();
    }
    [textProperty.getDefault]() {
        this.nativeView.getText();
    }
    [textProperty.setNative](value) {
        this.__setNativeText(value);
    }
    __setNativeText(value) {
        const stringValue = (value === null || value === undefined) ? "" : value.toString();
        const transformedText = getTransformedText(stringValue, this.textTransform);
        this._isChangingNativeTextIn = true;
        this.nativeView.setText(transformedText);
        this._isChangingNativeTextIn = false;
    }
}
function createMaskedTextFieldTextWatcher(_owner) {
    return new android.text.TextWatcher({
        beforeTextChanged: function (s, start, count, after) {
        },
        onTextChanged: function (s, start, before, count) {
            const owner = _owner.get();
            if (!owner._isChangingNativeTextIn) {
                const changedText = s.toString().substr(start, count);
                const isBackwardsIn = (count === 0);
                const newCaretPosition = owner._updateMaskedText(start, before, changedText, isBackwardsIn);
                const editText = owner.nativeView;
                editText.setSelection(newCaretPosition);
            }
        },
        afterTextChanged: function (s) {
        }
    });
}
