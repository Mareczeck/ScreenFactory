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
        var readonlyContentTree;
        var editor = cGen.editor;
        contentTree = new cGen.Tree('select');
        contentTree.attributes.autocomplete = 'off';
        if (isDesigntime) {
            var option = new cGen.Tree('option');
            option.content.push({ text: 'Choose...' });
            contentTree.content.push(option);
            editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, readonlyContentTree: readonlyContentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
        }
        else {
            var member = processBinding(def.Data.Binding, null);
            contentTree.databind.value = member + "." + def.DisplayMember + ".$asString()";
            if (def.ReferenceList && def.ReferenceList.Reference) {
                var refList = (def.ReferenceList.IsGlobal ? '$root.$globals.$api.' : '$root.$api.') + def.ReferenceList.Reference;
                var resultSorting = def.ResultSorting || 'basic';
                var codelistPreferedAttName = def.CodelistPreferedAttName || 'IsPrefered';
                var createGroupHeadings = !(def.CreateGroupHeadings === false);
                contentTree.databind.options = refList + ".items.extend({ refComboPlusItemSort: { refList: " + refList + ", resultSorting: '" + resultSorting + "', codelistPreferedAttName: '" + codelistPreferedAttName + "' } })";
                if (resultSorting === 'preferedTop') {
                    contentTree.databind.optionsAfterRender = "function (option, item) { ko.applyBindingsToNode(option, { css: { 'option-prefered': item && item['" + codelistPreferedAttName + "'] } }, item); }";
                    if (createGroupHeadings) {
                        contentTree.databind.refComboPlusAddGroupHeadings = 'true';
                    }
                }
                contentTree.databind.event = "{'change': function (data, event) { " + member + ".onReferenceComboChange(data, event, '" + def.DisplayMember + "', " + refList + ".items()); }}";
            }
            if (def.DisplayMember) {
                contentTree.databind.optionsText = "'" + def.DisplayMember + "'";
                contentTree.databind.optionsValue = "'" + def.DisplayMember + "'";
            }
            contentTree.databind.optionsCaption = "$root.$localization.currentCulture().comboChooseString";
            contentTree.databind.valueAllowUnset = 'true';
            if (cGen.defFromIde.VisualSettings.AccessibleDisabledEditors) {
                readonlyContentTree = new cGen.Tree('input');
                readonlyContentTree.attributes.type = 'text';
                readonlyContentTree.attributes.readonly = 'true';
                editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, readonlyContentTree: readonlyContentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
                var enableBindingString = "ko.unwrap(" + (contentTree.databind.enable || false) + ")";
                readonlyContentTree.databind.visible = "((" + enableBindingString + ") === false) && ko.unwrap(window.sf.accessibility.preferences.accessibleDisabledEditors)";
                contentTree.databind.visible = "(" + enableBindingString + ") || !ko.unwrap(window.sf.accessibility.preferences.accessibleDisabledEditors)";
                readonlyContentTree.databind.value = member + "." + def.DisplayMember + ".$asString()";
            }
            else {
                editor.gen({ cGen: cGen, def: def, componentWrapperTree: componentWrapperTree, isDesigntime: isDesigntime, contentTree: contentTree, containerEnabled: containerEnabled, enabledAsObservable: true, folderUrl: folderUrl });
            }
        }
    }
    exports.gen = gen;
});
