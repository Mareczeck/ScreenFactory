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
        var processBinding = cGen.processBinding;
        var contentTree;
        var params = [];
        var editor = cGen.editor;
        if (isDesigntime) {
            contentTree = new cGen.Tree('input');
            contentTree.attributes.type = 'text';
            editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
        }
        else {
            contentTree = new cGen.Tree('sffw-tariclookup');
            if (def.Data && def.Data.Binding) {
                params.push('data: ' + processBinding(def.Data.Binding, null));
            }
            if (def.DataApiObject) {
                var referencePrefix = def.DataApiObject.IsGlobal ? "$root.$globals.$api" : "$root.$api";
                params.push("dataApiObject: " + referencePrefix + "['" + def.DataApiObject.Reference + "']");
            }
            if (def.DisplayMember) {
                params.push("displayMember: '" + def.DisplayMember + "'");
            }
            if (def.PanelClass) {
                params.push("panelClass: '" + def.PanelClass + "'");
            }
            if (def.MinChars || def.MinChars === 0) {
                params.push("minChars: " + def.MinChars);
            }
            if (def.expectLinebreaksInValues === true) {
                params.push("expectLinebreaksInValues: true");
            }
            if (def.enabledMember) {
                var databindValue = def.enabledMember.Binding
                    ? processBinding(def.enabledMember.Binding)
                    : "'" + def.enabledMember.replace(/\"/g, '&quot;') + "'";
                params.push("enabledMember: " + databindValue);
            }
            if (def.staticODataFilter) {
                var databindValue = def.staticODataFilter.Binding
                    ? processBinding(def.staticODataFilter.Binding)
                    : "'" + def.staticODataFilter.replace(/\"/g, '&quot;') + "'";
                params.push("staticODataFilter: " + databindValue);
            }
            params.push("accessibleDisabledEditorsSupport: " + !!cGen.defFromIde.VisualSettings.AccessibleDisabledEditors);
            params.push("$parentData: $data");
            params.push("$localizeFn: $root.$localize");
            editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
            if (def.IsEnabled === false) {
                params.push("isEnabled: false");
            }
            else {
                var enableBinding = contentTree.databind.enable;
                params.push("isEnabled: " + enableBinding);
            }
            if (params.length > 0) {
                contentTree.attributes.params = params.join(', ');
            }
        }
    }
    exports.gen = gen;
});
