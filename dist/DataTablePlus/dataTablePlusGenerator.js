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
        var processBinding = cGen.processBinding;
        var genComponentTree = cGen.genComponentTree;
        var dataTablePlus;
        var designLabel;
        var params = [];
        var Columns;
        if (isDesigntime) {
            designLabel = new cGen.Tree('span');
            designLabel.content.push({ text: "dataTablePlus" + def.Name });
            componentWrapperTree.content.push(designLabel);
        }
        else {
            dataTablePlus = new cGen.Tree('sffw-datatable-plus');
            if (def.Name) {
                params.push("Name: '" + def.Name + "'");
            }
            if (def.Data && def.Data.Binding) {
                params.push("Data: " + processBinding(def.Data.Binding, null));
            }
            if (def.Index) {
                if (def.Index.Binding) {
                    params.push("Index: " + cGen.processBinding(def.Index.Binding));
                }
                else {
                    params.push("Index: " + def.Index);
                }
            }
            if (typeof def.IsVisible !== 'undefined') {
                if (def.Visible.Binding) {
                    params.push("IsVisible: " + cGen.processBinding(def.IsVisible.Binding));
                }
                else {
                    params.push("IsVisible: " + def.IsVisible);
                }
            }
            else {
                params.push('IsVisible: ' + true);
            }
            if (typeof def.ShowSelector !== 'undefined') {
                if (def.ShowSelector.Binding) {
                    params.push("ShowSelector: " + cGen.processBinding(def.ShowSelector.Binding));
                }
                else {
                    params.push("ShowSelector: " + def.ShowSelector);
                }
            }
            else {
                params.push("ShowSelector: " + true);
            }
            if (def.SelectorClass) {
                params.push("SelectorClass: '" + def.SelectorClass.replace(/\"/g, '&quot;') + "'");
            }
            else {
                params.push("SelectorClass: 'fa fa-fw fa-lg fa-caret-right'");
            }
            if (def.SelectorWidth) {
                params.push("SelectorWidth: '" + def.SelectorWidth.replace(/\"/g, '&quot;') + "'");
            }
            else {
                params.push("SelectorWidth: '20px'");
            }
            if (typeof def.IsScrollable !== 'undefined') {
                if (def.IsScrollable.Binding) {
                    params.push("IsScrollable: " + cGen.processBinding(def.IsScrollable.Binding));
                }
                else {
                    params.push("IsScrollable: " + def.IsScrollable);
                }
            }
            else {
                params.push("IsScrollable: " + false);
            }
            if (def.MaxHeight) {
                params.push("MaxHeight: '" + def.MaxHeight.replace(/\"/g, '&quot;') + "'");
            }
            else {
                params.push("MaxHeight: '200px'");
            }
            if (typeof def.RowSelectionEnabled !== 'undefined') {
                if (def.RowSelectionEnabled.Binding) {
                    params.push("RowSelectionEnabled: " + cGen.processBinding(def.RowSelectionEnabled.Binding));
                }
                else {
                    params.push("RowSelectionEnabled: " + def.RowSelectionEnabled);
                }
            }
            else {
                params.push("RowSelectionEnabled: " + false);
            }
            if (typeof def.AllowUserChangeSelection !== 'undefined') {
                if (def.AllowUserChangeSelection.Binding) {
                    params.push("AllowUserChangeSelection: " + cGen.processBinding(def.AllowUserChangeSelection.Binding));
                }
                else {
                    params.push("AllowUserChangeSelection: " + def.AllowUserChangeSelection);
                }
            }
            else {
                params.push("AllowUserChangeSelection: " + true);
            }
            if (typeof def.AlternateRows !== 'undefined') {
                params.push("AlternateRows: " + def.AlternateRows);
            }
            else {
                params.push("AlternateRows: " + true);
            }
            if (typeof def.HoverHighlight !== 'undefined') {
                params.push("HoverHighlight: " + def.HoverHighlight);
            }
            else {
                params.push("HoverHighlight: " + true);
            }
            if (typeof def.IsHeaderVisible !== 'undefined') {
                params.push("IsHeaderVisible: " + def.IsHeaderVisible);
            }
            else {
                params.push("IsHeaderVisible: " + true);
            }
            if (typeof def.PagingEnabled !== 'undefined') {
                if (def.PagingEnabled.Binding) {
                    params.push("PagingEnabled: " + cGen.processBinding(def.PagingEnabled.Binding));
                }
                else {
                    params.push("PagingEnabled: " + def.PagingEnabled);
                }
            }
            else {
                params.push("PagingEnabled: " + false);
            }
            if (def.PageSize) {
                if (def.PageSize.Binding) {
                    params.push("PageSize: " + cGen.processBinding(def.PageSize.Binding));
                }
                else {
                    params.push("PageSize: " + def.PageSize);
                }
            }
            if (def.Columns) {
                var childEnabled_1 = cGen.BindingFactory.addParentToFormPropertyBindings(containerEnabled);
                Columns = _.map(def.Columns, function (c) {
                    var columnParts = [];
                    if (c.Caption) {
                        if (c.Caption.Binding) {
                            columnParts.push("Caption: " + cGen.processBinding(c.Caption.Binding));
                        }
                        else {
                            columnParts.push("Caption: '" + c.Caption.replace(/\"/g, '&quot;') + "'");
                        }
                    }
                    if (typeof c.IsVisible !== 'undefined') {
                        if (c.IsVisible.Binding) {
                            columnParts.push("IsVisible: " + cGen.processBinding(c.IsVisible.Binding));
                        }
                        else {
                            columnParts.push("IsVisible: " + c.IsVisible);
                        }
                    }
                    else {
                        columnParts.push("IsVisible: " + true);
                    }
                    if (c.ColumnWidth) {
                        columnParts.push("ColumnWidth: '" + c.ColumnWidth + "'");
                    }
                    if (c.Tooltip) {
                        if (c.Tooltip.Binding) {
                            columnParts.push("Tooltip: " + cGen.processBinding(c.Tooltip.Binding));
                        }
                        else {
                            columnParts.push("Tooltip: '" + c.Tooltip.replace(/\"/g, '&quot;') + "'");
                        }
                    }
                    if (c.TooltipButtonAriaLabel) {
                        if (c.TooltipButtonAriaLabel.Binding) {
                            columnParts.push("TooltipButtonAriaLabel: " + cGen.processBinding(c.TooltipButtonAriaLabel.Binding));
                        }
                        else {
                            columnParts.push("TooltipButtonAriaLabel: '" + c.TooltipButtonAriaLabel.replace(/\"/g, '&quot;') + "'");
                        }
                    }
                    if (c.TooltipIcon) {
                        if (c.TooltipIcon.Binding) {
                            columnParts.push("TooltipIcon: " + cGen.processBinding(c.TooltipIcon.Binding));
                        }
                        else {
                            columnParts.push("TooltipIcon: '" + c.TooltipIcon.replace(/\"/g, '&quot;') + "'");
                        }
                    }
                    else {
                        columnParts.push("TooltipIcon: 'fa fa-question-circle-o'");
                    }
                    if (c.HeaderCssClass) {
                        var headerClasses = _.map(c.HeaderCssClass, function (hc) {
                            var hClassParts = [];
                            if (hc.ClassName) {
                                hClassParts.push("ClassName: '" + hc.ClassName.replace(/\"/g, '&quot;') + "'");
                                var condition = hc.Condition ? processBinding(hc.Condition.Binding) : 'true';
                                hClassParts.push("ClassCondition: " + condition);
                            }
                            return "{" + hClassParts.join(', ') + "}";
                        });
                        if (headerClasses.length > 0) {
                            columnParts.push("HeaderCssClass: [" + headerClasses.join(', ') + "]");
                        }
                    }
                    if (c.Content) {
                        dataTablePlus.content.push(genComponentTree({ def: c.Content, isDesigntime: isDesigntime, containerEnabled: childEnabled_1 }));
                    }
                    return "{" + columnParts.join(', ') + "}";
                });
                params.push("Columns: [" + Columns.join(', ') + "]");
            }
            if (def.CssClass) {
                dataTablePlus.cssBinding = dataTablePlus.cssBinding || {};
                _.each(def.CssClass, function (c) {
                    if (c.ClassName) {
                        var condition = c.Condition ? processBinding(c.Condition.Binding) : 'true';
                        dataTablePlus.cssBinding[c.ClassName] = condition;
                    }
                });
            }
            if (def.Accessibility$$AriaLabel) {
                if (typeof def.Accessibility$$AriaLabel === 'string') {
                    params.push("AriaLabel: '" + def.Accessibility$$AriaLabel.replace(/\"/g, '&quot;') + "'");
                }
                else {
                    params.push("AriaLabel: " + cGen.processBindingPreferAsString(def.Accessibility$$AriaLabel.Binding));
                }
            }
            if (def.OnRowClick) {
                params.push("OnRowClick: " + cGen.processActionReference(def.OnRowClick));
            }
            params.push('$parentData: $data');
            dataTablePlus.attributes.params = params.join(', ');
            componentWrapperTree.content.push(dataTablePlus);
        }
    }
    exports.gen = gen;
});
