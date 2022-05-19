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
        if (isDesigntime) {
            contentTree = new cGen.Tree('div');
            contentTree.content.push({ text: '{výběr souboru}' });
            editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
        }
        else {
            contentTree = new cGen.Tree('sffw-file-reader');
            if (def.TextAlign) {
                contentTree.style['text-align'] = def.TextAlign.toLowerCase();
            }
            if (def.FileContent && def.FileContent.Binding) {
                params.push("FileContent: " + cGen.processBindingPreferAsString(def.FileContent.Binding));
            }
            if (def.FileName && def.FileName.Binding) {
                params.push("FileName: " + cGen.processBindingPreferAsString(def.FileName.Binding));
            }
            if (def.FileType && def.FileType.Binding) {
                params.push("FileType: " + cGen.processBindingPreferAsString(def.FileType.Binding));
            }
            if (def.Filter) {
                if (def.Filter.Binding) {
                    params.push("Filter: " + cGen.processBindingPreferAsString(def.Filter.Binding));
                }
                else {
                    params.push("Filter: '" + def.Filter + "'");
                }
            }
            if (def.OnChange) {
                params.push("OnChange: " + cGen.processActionReference(def.OnChange));
            }
            editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
            if (def.IsEnabled === false) {
                params.push("IsEnabled: false");
            }
            else {
                var enableBinding = contentTree.databind.enable;
                params.push("IsEnabled: " + enableBinding);
            }
            if (params.length > 0) {
                contentTree.attributes.params = params.join(', ');
            }
        }
    }
    exports.gen = gen;
});
