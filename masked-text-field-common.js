import { CoercibleProperty, Property } from "@nativescript/core/ui/core/view";
import { TextField } from "@nativescript/core/ui/text-field";
export * from "@nativescript/core/ui/text-field";
export class MaskedTextFieldBase extends TextField {
    constructor() {
        super(...arguments);
        this._emptyMaskedValue = "";
        this._placeholder = "_";
        this._tokenRulesMap = {
            "0": /\d/,
            "9": /\d|\s/,
            "#": /\d|\s|\+|\-/,
            "L": /[a-zA-Z]/,
            "?": /[a-zA-Z]|\s/,
            "&": /\S/,
            "C": /./,
            "A": /[a-zA-Z0-9]/,
            "a": /[a-zA-Z0-9]|\s/
        };
        this._maskTokens = [];
    }
    _updateMaskedText(start, previousCharactersCount, newText, isBackwardsIn) {
        const unmaskedChangedValue = this._getUnmaskedValue(newText, start);
        const newMaskedValue = this._getNewMaskedValue(start, start + previousCharactersCount, unmaskedChangedValue, isBackwardsIn);
        this.__setNativeText(newMaskedValue);
        textProperty.nativeValueChange(this, newMaskedValue);
        let newCaretPosition = this._getNextRegExpToken(start, isBackwardsIn);
        if (newCaretPosition === -1) {
            newCaretPosition = start + (isBackwardsIn ? 1 : 0);
        }
        else {
            newCaretPosition = this._getNextRegExpToken(newCaretPosition + unmaskedChangedValue.length, isBackwardsIn);
            if (newCaretPosition === -1) {
                newCaretPosition = this._getNextRegExpToken((isBackwardsIn ? 0 : newMaskedValue.length - 1), !isBackwardsIn)
                    + (!isBackwardsIn ? 1 : 0);
            }
        }
        return newCaretPosition;
    }
    _generateMaskTokens() {
        const maskChars = this.mask.split("");
        const emptyMaskedValueBuider = [];
        let isEscapeCharIn = false;
        this._maskTokens.length = 0;
        for (const char of maskChars) {
            if (isEscapeCharIn) {
                isEscapeCharIn = false;
                this._maskTokens.push(char);
                emptyMaskedValueBuider.push(char);
                continue;
            }
            if (char === "\\") {
                isEscapeCharIn = true;
                continue;
            }
            const tokenRule = this._tokenRulesMap[char];
            this._maskTokens.push(tokenRule || char);
            emptyMaskedValueBuider.push(tokenRule ? this._placeholder : char);
        }
        this._emptyMaskedValue = emptyMaskedValueBuider.join("");
    }
    _getUnmaskedValue(value, startTokenIndex) {
        if (!value) {
            return "";
        }
        const resultBuilder = [];
        const chars = value.toString().split("");
        let tokenLoop = startTokenIndex || 0;
        let charLoop = 0;
        while (tokenLoop < this._maskTokens.length && charLoop < chars.length) {
            const char = chars[charLoop];
            const token = this._maskTokens[tokenLoop];
            if (char === token || char === this._placeholder) {
                if (char === this._placeholder) {
                    resultBuilder.push(this._placeholder);
                }
                tokenLoop++;
                charLoop++;
                continue;
            }
            if (token instanceof RegExp) {
                if (token.test(char)) {
                    resultBuilder.push(char);
                    tokenLoop++;
                }
                charLoop++;
                continue;
            }
            tokenLoop++;
        }
        return resultBuilder.join("");
    }
    _getNewMaskedValue(replaceStart, replaceEnd, unmaskedReplaceValue, isBackwardsIn) {
        replaceStart = this._getNextRegExpToken(replaceStart, isBackwardsIn);
        if (replaceStart > replaceEnd) {
            replaceEnd = replaceStart;
        }
        const currentValue = this.text || this._emptyMaskedValue;
        const unmaskedValueAndSuffix = unmaskedReplaceValue + this._getUnmaskedValue(currentValue.substring(replaceEnd), replaceEnd);
        const unmaskedValueAndSuffixSplit = unmaskedValueAndSuffix.split("");
        const currentValueSplit = currentValue.split("");
        for (let loop = replaceStart, charLoop = 0; loop > -1 && loop < this._emptyMaskedValue.length; loop = this._getNextRegExpToken(loop + 1), charLoop++) {
            currentValueSplit[loop] = unmaskedValueAndSuffixSplit[charLoop] || this._placeholder;
        }
        return currentValueSplit.join("");
    }
    _getNextRegExpToken(start, isBackwardsIn) {
        const step = (isBackwardsIn ? -1 : 1);
        for (let loop = start; loop > -1 && loop < this._maskTokens.length; loop += step) {
            if (this._maskTokens[loop] instanceof RegExp) {
                return loop;
            }
        }
        return -1;
    }
}
export const maskProperty = new Property({
    name: "mask",
    defaultValue: "",
    valueChanged: (target, oldValue, newValue) => {
        target._generateMaskTokens();
    }
});
maskProperty.register(MaskedTextFieldBase);
export const textProperty = new CoercibleProperty({
    name: "text",
    defaultValue: null,
    coerceValue: (target, value) => {
        if (!target._emptyMaskedValue) {
            return value;
        }
        const unmaskedValue = target._getUnmaskedValue(value);
        return target._getNewMaskedValue(0, target._emptyMaskedValue.length, unmaskedValue);
    }
});
textProperty.register(MaskedTextFieldBase);
