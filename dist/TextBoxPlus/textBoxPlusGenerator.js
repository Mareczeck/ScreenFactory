(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.gen = void 0;
    function gen(cGenV2ParamObj) {
        var _ = (typeof window !== 'undefined' ? window._ : require('lodash'));
        var cGen = cGenV2ParamObj.cGen;
        var def = cGenV2ParamObj.def;
        var componentWrapperTree = cGenV2ParamObj.componentWrapperTree;
        var isDesigntime = cGenV2ParamObj.isDesigntime;
        var containerEnabled = cGenV2ParamObj.containerEnabled;
        var folderUrl = cGenV2ParamObj.folderUrl;
        var contentTree;
        var editor = cGen.editor;
        switch (def.InputType || 'Normal') {
            case 'Numeric':
                contentTree = new cGen.Tree('input');
                contentTree.attributes.type = 'number';
                break;
            case 'Normal':
                contentTree = new cGen.Tree('input');
                contentTree.attributes.type = 'text';
                break;
            case 'TextTrimmed':
                contentTree = new cGen.Tree('input');
                contentTree.attributes.type = 'text';
                contentTree.databind.trim = true;
                break;
            default:
                throw new Error("Unsupported InputType=" + def.InputType + " in TextBox (" + JSON.stringify(def));
        }
        contentTree.attributes.autocomplete = 'off';
        if (def.Data) {
            if (def.IsCurrency)
                contentTree.databind.isCurrency = "" + def.IsCurrency;
            if (def.IsAmount)
                contentTree.databind.isAmount = "" + def.IsAmount;
            if (def.MinDecimalPlaces)
                contentTree.databind.minDecimalPlaces = "" + def.MinDecimalPlaces;
            if (def.CurrencySymbol) {
                if (def.CurrencySymbol.Binding) {
                    contentTree.databind.currencySymbol = "" + cGen.processBinding(def.CurrencySymbol.Binding);
                }
                else {
                    contentTree.databind.currencySymbol = "'" + def.CurrencySymbol.replace(/\"/g, '&quot;') + "'";
                }
            }
            if (!def.Data.Binding.TargetProperty) {
                if (def.ImmediateUpdate) {
                    contentTree.databind.textInput = cGen.processBindingPreferAsString(def.Data.Binding);
                }
                else {
                    contentTree.databind.valueNotifyRefusalErrorText = cGen.processBindingPreferAsString(def.Data.Binding);
                }
                contentTree.databind.textBoxPlusFormatting = cGen.processBindingPreferAsString(def.Data.Binding);
            }
            else {
                contentTree.databind.value = cGen.processBinding(def.Data.Binding);
                contentTree.databind.textBoxPlusFormatting = cGen.processBinding(def.Data.Binding);
            }
        }
        if (def.TextAlign) {
            contentTree.style['text-align'] = def.TextAlign.toLowerCase();
        }
        if (def.MaxLength !== undefined) {
            if (_.isFinite(def.MaxLength)) {
                contentTree.attributes.maxlength = def.MaxLength.toString();
            }
            else {
                if (def.MaxLength.Binding) {
                    contentTree.attrBinding.maxlength = cGen.processBinding(def.MaxLength.Binding);
                }
                else {
                    throw new Error("Unsupported MaxLength value " + def.MaxLength + " in TextBox (" + JSON.stringify(def));
                }
            }
        }
        if (!isDesigntime) {
            cGen.mixinOnKeyDown(def, contentTree);
            cGen.mixinOnEnterPressed(def, contentTree);
        }
        editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
        contentTree.databind.readOnly = contentTree.databind.enable || false;
    }
    exports.gen = gen;
});
