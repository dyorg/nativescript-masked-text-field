import { getTransformedText } from "@nativescript/core/ui";
import { MaskedTextFieldBase, textProperty } from "./masked-text-field-common";
export * from "./masked-text-field-common";
export class MaskedTextField extends MaskedTextFieldBase {
    constructor() {
        super();
    }
    [textProperty.getDefault]() {
        return "";
    }
    [textProperty.setNative](value) {
        this.__setNativeText(value);
    }
    __setNativeText(value) {
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
        const source = getTransformedText(stringValue, this.textTransform);
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
