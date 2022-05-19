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
        var cGen = cGenV2ParamObj.cGen;
        var def = cGenV2ParamObj.def;
        var componentWrapperTree = cGenV2ParamObj.componentWrapperTree;
        var isDesigntime = cGenV2ParamObj.isDesigntime;
        var containerEnabled = cGenV2ParamObj.containerEnabled;
        var folderUrl = cGenV2ParamObj.folderUrl;
        var contentTree;
        var params = [];
        var editor = cGen.editor;
        contentTree = new cGen.Tree('sffw-labeledtext');
        if (def.Data && def.Data.Binding) {
            params.push("Data: " + cGen.processBindingPreferAsString(def.Data.Binding));
        }
        if (def.IsCurrency) {
            params.push("IsCurrency: " + def.IsCurrency);
        }
        if (def.IsAmount) {
            params.push("IsAmount: " + def.IsAmount);
        }
        if (def.TextAlign) {
            contentTree.style['text-align'] = def.TextAlign.toLowerCase();
        }
        if (def.MinDecimalPlaces) {
            params.push("MinDecimalPlaces: " + def.MinDecimalPlaces);
        }
        if (def.CurrencySymbol) {
            if (def.CurrencySymbol.Binding) {
                params.push("CurrencySymbol: " + cGen.processBinding(def.CurrencySymbol.Binding));
            }
            else {
                params.push("CurrencySymbol: '" + def.CurrencySymbol.replace(/\"/g, '&quot;') + "'");
            }
        }
        editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
        if (params.length > 0) {
            contentTree.attributes.params = params.join(', ');
        }
    }
    exports.gen = gen;
});
