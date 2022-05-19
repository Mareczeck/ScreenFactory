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
        var cgb;
        var params = [];
        cgb = new cGen.Tree('collapsible-group-box');
        if (def.Name) {
            params.push("Name: '" + def.Name + "'");
        }
        if (def.caption) {
            if (def.caption.Binding) {
                if (def.caption.Binding.Context === '$localized') {
                    params.push("caption: $root.$localize('" + def.caption.Binding.Path[0] + "')");
                }
                else {
                    params.push("caption: " + cGen.processBinding(def.caption.Binding));
                }
            }
            else {
                params.push("caption: '" + def.caption.replace(/\"/g, '&quot;') + "'");
            }
        }
        if (def.isExpanded === false) {
            params.push("isExpanded: " + def.isExpanded);
        }
        else if (def.isExpanded) {
            var isExpandedParam = def.isExpanded.Binding ? cGen.processBinding(def.isExpanded.Binding)
                : "'" + def.isExpanded.replace(/\"/g, '&quot;') + "'";
            params.push("isExpanded: " + isExpandedParam);
        }
        else {
            params.push("isExpanded: " + true);
        }
        if (def.isVisible === false) {
            params.push("isVisible: " + def.isVisible);
        }
        else if (def.isVisible) {
            var isVisibleParam = def.isVisible.Binding ? cGen.processBinding(def.isVisible.Binding)
                : "'" + def.isVisible.replace(/\"/g, '&quot;') + "'";
            params.push("isVisible: " + isVisibleParam);
        }
        else {
            params.push("isVisible: " + true);
        }
        if (def.collapsedIconClass) {
            params.push("collapsedIconClass: '" + def.collapsedIconClass + "'");
        }
        if (def.nonCollapsedIconClass) {
            params.push("nonCollapsedIconClass: '" + def.nonCollapsedIconClass + "'");
        }
        if (def.cssClass) {
            params.push("cssClass: '" + def.cssClass + "'");
        }
        if (def.conditionalCssClass) {
            cgb.cssBinding = cgb.cssBinding || {};
            _.each(def.conditionalCssClass, function (c) {
                if (c.ClassName) {
                    var condition = void 0;
                    if (c.Condition === false) {
                        condition = c.Condition;
                    }
                    else if (c.Condition) {
                        condition = c.Condition.Binding ? cGen.processBinding(c.Condition.Binding) : "'" + c.Condition.replace(/\"/g, '&quot;') + "'";
                    }
                    else {
                        condition = true;
                    }
                    cgb.cssBinding[c.ClassName] = condition;
                }
            });
        }
        if (def.heading) {
            params.push("heading: '" + def.heading + "'");
        }
        if (def.OnCollapseClick) {
            params.push("OnCollapseClick: " + cGen.processActionReference(def.OnCollapseClick));
        }
        params.push('$parentData: $data');
        cgb.attributes.params = params.join(', ');
        if (def.Content) {
            var childContainerEnabled = cGen.createEnabledValue({ def: def, containerEnabled: containerEnabled }).getValue();
            cgb.content.push(cGen.genComponentTree({ def: def.Content, isDesigntime: isDesigntime, containerEnabled: childContainerEnabled }));
        }
        componentWrapperTree.content.push(cgb);
    }
    exports.gen = gen;
});
