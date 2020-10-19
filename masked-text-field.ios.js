"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskedTextField = void 0;
const text_base_1 = require("ui/text-base");
const masked_text_field_common_1 = require("./masked-text-field-common");
__exportStar(require("./masked-text-field-common"), exports);
class MaskedTextField extends masked_text_field_common_1.MaskedTextFieldBase {
    constructor() {
        super();
    }
    [masked_text_field_common_1.textProperty.getDefault]() {
        return "";
    }
    [masked_text_field_common_1.textProperty.setNative](value) {
        this._setNativeText(value);
    }
    _setNativeText(value) {
        const style = this.style;
        const dict = new Map();
        switch (style.textDecoration) {
            case "none":
                break;
            case "underline":
                dict.set(NSUnderlineStyleAttributeName, 1);
                break;
            case "line-through":
                dict.set(NSStrikethroughStyleAttributeName, 1);
                break;
            case "underline line-through":
                dict.set(NSUnderlineStyleAttributeName, 1);
                dict.set(NSStrikethroughStyleAttributeName, 1);
                break;
            default:
                throw new Error(`Invalid text decoration value: ${style.textDecoration}. Valid values are: 'none', 'underline', 'line-through', 'underline line-through'.`);
        }
        if (style.letterSpacing !== 0) {
            dict.set(NSKernAttributeName, style.letterSpacing * this.nativeView.font.pointSize);
        }
        if (style.color) {
            dict.set(NSForegroundColorAttributeName, style.color.ios);
        }
        const stringValue = (value === undefined || value === null) ? "" : value.toString();
        const source = text_base_1.getTransformedText(stringValue, this.textTransform);
        if (dict.size > 0) {
            const result = NSMutableAttributedString.alloc().initWithString(source);
            result.setAttributesRange(dict, { location: 0, length: source.length });
            this.nativeView.attributedText = result;
        }
        else {
            this.nativeView.attributedText = undefined;
            this.nativeView.text = source;
        }
    }
    textFieldShouldChangeCharactersInRangeReplacementString(textField, range, replacementString) {
        const isBackwardsIn = (replacementString === "");
        const newCaretPositionNumber = this._updateMaskedText(range.location, range.length, replacementString, isBackwardsIn);
        const caretPosition = textField.positionFromPositionOffset(textField.beginningOfDocument, newCaretPositionNumber);
        textField.selectedTextRange = textField.textRangeFromPositionToPosition(caretPosition, caretPosition);
        return false;
    }
}
exports.MaskedTextField = MaskedTextField;
