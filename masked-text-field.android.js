"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskedTextField = void 0;
const text_base_1 = require("ui/text-base");
const masked_text_field_common_1 = require("./masked-text-field-common");
__exportStar(require("./masked-text-field-common"), exports);
class MaskedTextField extends masked_text_field_common_1.MaskedTextFieldBase {
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
    [masked_text_field_common_1.textProperty.getDefault]() {
        this.nativeView.getText();
    }
    [masked_text_field_common_1.textProperty.setNative](value) {
        this._setNativeText(value);
    }
    _setNativeText(value) {
        const stringValue = (value === null || value === undefined) ? "" : value.toString();
        const transformedText = text_base_1.getTransformedText(stringValue, this.textTransform);
        this._isChangingNativeTextIn = true;
        this.nativeView.setText(transformedText);
        this._isChangingNativeTextIn = false;
    }
}
exports.MaskedTextField = MaskedTextField;
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
