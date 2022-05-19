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
        if (isDesigntime) {
            var designLabel = new cGen.Tree('span');
            designLabel.content.push({ text: 'list ' + def.name });
            componentWrapperTree.content.push(designLabel);
        }
        else {
            var list = new cGen.Tree('sffw-list');
            var params = [];
            if (def.listName) {
                params.push("listName: '" + def.listName + "'");
            }
            if (def.showCheckboxes) {
                if (def.showCheckboxes.Binding) {
                    params.push("showCheckboxes: " + cGen.processBinding(def.showCheckboxes.Binding));
                }
                else {
                    params.push("showCheckboxes: " + def.showCheckboxes);
                }
            }
            if (def.lastClickedRow && def.lastClickedRow.Binding) {
                params.push("lastClickedRow: " + cGen.processBinding(def.lastClickedRow.Binding, null));
            }
            if (def.columns) {
                var columns = _.map(def.columns, function (c) {
                    var columnParts = [];
                    if (c.UnderlyingColumnName) {
                        columnParts.push("Name: '" + c.UnderlyingColumnName + "'");
                        if (c.ColumnName) {
                            columnParts.push("DisplayColumnName: '" + c.ColumnName + "'");
                        }
                    }
                    else if (c.ColumnName) {
                        columnParts.push("Name: '" + c.ColumnName + "'");
                    }
                    if (c.Caption) {
                        if (c.Caption.Binding) {
                            if (c.Caption.Binding.Context === '$localized') {
                                columnParts.push("Caption: '" + c.Caption.Binding.Path + "'");
                                columnParts.push('IsCaptionLocalized: true');
                            }
                            else {
                                columnParts.push("Caption: " + cGen.processBinding(c.Caption.Binding));
                            }
                        }
                        else {
                            columnParts.push("Caption: '" + c.Caption.replace(/\"/g, '&quot;') + "'");
                        }
                    }
                    if (c.UnderlyingDataType) {
                        columnParts.push("DataType: '" + c.UnderlyingDataType + "'");
                        if (c.DataType) {
                            columnParts.push("DisplayDataType: '" + c.DataType + "'");
                        }
                    }
                    else if (c.DataType) {
                        columnParts.push("DataType: '" + c.DataType + "'");
                    }
                    if (c.IsHtml === true) {
                        columnParts.push("IsHtml: " + c.IsHtml);
                    }
                    if (c.IsVisible === false) {
                        columnParts.push("IsVisible: " + c.IsVisible);
                    }
                    if (c.ColumnWidth) {
                        columnParts.push("ColumnWidth: '" + c.ColumnWidth + "'");
                    }
                    if (c.EnableFilter === false) {
                        columnParts.push("EnableFilter: " + c.EnableFilter);
                    }
                    if (c.filterOptions) {
                        var filterOptions = _.map(c.filterOptions, function (opt) {
                            var optParts = [];
                            if (opt.text) {
                                if (opt.text.Binding) {
                                    if (opt.text.Binding.Context === '$localized') {
                                        optParts.push("text: '" + opt.text.Binding.Path + "'");
                                        optParts.push('isLocalized: true');
                                    }
                                    else {
                                        optParts.push("text: " + cGen.processBinding(opt.text.Binding));
                                    }
                                }
                                else {
                                    optParts.push("text: '" + opt.text + "'");
                                }
                            }
                            if (opt.value) {
                                optParts.push("value: '" + opt.value + "'");
                            }
                            return "{" + optParts.join(', ') + "}";
                        });
                        columnParts.push("filterOptions: [" + filterOptions.join(', ') + "]");
                    }
                    if (c.FilterOperatorType) {
                        columnParts.push("FilterOperatorType: '" + c.FilterOperatorType + "'");
                    }
                    if (c.formatAsAmount === true) {
                        columnParts.push("formatAsAmount: " + c.formatAsAmount);
                    }
                    if (c.formatAsCurrency === true) {
                        columnParts.push("formatAsCurrency: " + c.formatAsCurrency);
                    }
                    if (c.filterOptionSource && c.filterOptionSource.Reference) {
                        var apiScope = c.filterOptionSource.IsGlobal ? '$root.$globals.$api' : '$root.$api';
                        columnParts.push("filterOptionSource: " + apiScope + "['" + c.filterOptionSource.Reference + "']");
                    }
                    if (c.AlwaysInvisible === true) {
                        columnParts.push("AlwaysInvisible: " + c.AlwaysInvisible);
                    }
                    if (c.filterOptionSourceDisplayMember) {
                        columnParts.push("filterOptionSourceDisplayMember: '" + c.filterOptionSourceDisplayMember + "'");
                    }
                    if (c.minDecimalPlaces) {
                        columnParts.push("minDecimalPlaces: " + c.minDecimalPlaces);
                    }
                    if (c.currencySymbol) {
                        if (c.currencySymbol.Binding) {
                            columnParts.push("currencySymbol: " + cGen.processBinding(c.currencySymbol.Binding));
                        }
                        else {
                            columnParts.push("currencySymbol: '" + c.currencySymbol.replace(/\"/g, '&quot;') + "'");
                        }
                    }
                    if (c.showCopyButton === true) {
                        columnParts.push("showCopyButton: " + c.showCopyButton);
                    }
                    if (c.columnTitle) {
                        if (c.columnTitle.Binding) {
                            if (c.columnTitle.Binding.Context === '$localized') {
                                columnParts.push("columnTitle: '" + c.columnTitle.Binding.Path + "'");
                                columnParts.push('IsColumnTitleLocalized: true');
                            }
                            else {
                                columnParts.push("columnTitle: " + cGen.processBinding(c.columnTitle.Binding));
                            }
                        }
                        else {
                            columnParts.push("columnTitle: '" + c.columnTitle.replace(/\"/g, '&quot;') + "'");
                        }
                    }
                    return "{" + columnParts.join(', ') + "}";
                });
                params.push("columns: [" + columns.join(', ') + "]");
            }
            if (def.pagingTemplate) {
                params.push("pagingTemplate: '" + def.pagingTemplate + "'");
            }
            if (def.dataCollection && def.dataCollection.Binding) {
                params.push("dataCollection: " + cGen.processBinding(def.dataCollection.Binding, null));
            }
            if (def.isMultiselect) {
                params.push("isMultiselect: " + def.isMultiselect);
            }
            if (def.controller && def.controller.Reference) {
                var apiScope = def.controller.IsGlobal ? '$root.$globals.$api' : '$root.$api';
                params.push("controller: " + apiScope + "['" + def.controller.Reference + "']");
            }
            if (def.maxVisibleFilterOptions) {
                if (def.maxVisibleFilterOptions.Binding) {
                    params.push("maxVisibleFilterOptions: " + cGen.processBinding(def.maxVisibleFilterOptions.Binding));
                }
                else {
                    params.push("maxVisibleFilterOptions: " + def.maxVisibleFilterOptions);
                }
            }
            if (def.allowSelectAll) {
                params.push("allowSelectAll: " + def.allowSelectAll);
            }
            if (def.isRowMarkedAttName) {
                params.push("isRowMarkedAttName: '" + def.isRowMarkedAttName + "'");
            }
            if (def.isRowSelectedAttName) {
                params.push("isRowSelectedAttName: '" + def.isRowSelectedAttName + "'");
            }
            if (def.showCheckboxInRowAttName) {
                params.push("showCheckboxInRowAttName: '" + def.showCheckboxInRowAttName + "'");
            }
            if (def.lastClickedRowSelectWhenCheckboxesOff) {
                params.push("lastClickedRowSelectWhenCheckboxesOff: " + def.lastClickedRowSelectWhenCheckboxesOff);
            }
            if (def.pagingControlsPosition) {
                params.push("pagingControlsPosition: '" + def.pagingControlsPosition + "'");
            }
            if (def.savedState && def.savedState.Binding) {
                params.push("savedState: " + cGen.processBinding(def.savedState.Binding));
            }
            if (def.savedStateOptions) {
                params.push("savedStateOptions: '" + def.savedStateOptions + "'");
            }
            if (def.savedColumns && def.savedColumns.Binding) {
                params.push("savedColumns: " + cGen.processBinding(def.savedColumns.Binding));
            }
            if (def.allowFilterClearIcon) {
                params.push("allowFilterClearIcon: " + def.allowFilterClearIcon);
            }
            if (def.useArrowKeys) {
                params.push("useArrowKeys: " + def.useArrowKeys);
            }
            if (def.viewSettingsButtonTitle) {
                if (def.viewSettingsButtonTitle.Binding) {
                    params.push("viewSettingsButtonTitle: " + cGen.processBinding(def.viewSettingsButtonTitle.Binding));
                }
                else {
                    params.push("viewSettingsButtonTitle: '" + def.viewSettingsButtonTitle.replace(/\"/g, '&quot;') + "'");
                }
            }
            if (def.iconSortAsc) {
                params.push("iconSortAsc: '" + def.iconSortAsc + "'");
            }
            if (def.iconSortDesc) {
                params.push("iconSortDesc: '" + def.iconSortDesc + "'");
            }
            if (def.iconClearFilter) {
                params.push("iconClearFilter: '" + def.iconClearFilter + "'");
            }
            if (def.iconPageFirst) {
                params.push("iconPageFirst: '" + def.iconPageFirst + "'");
            }
            if (def.iconPagePrevious) {
                params.push("iconPagePrevious: '" + def.iconPagePrevious + "'");
            }
            if (def.iconDataLoading) {
                params.push("iconDataLoading: '" + def.iconDataLoading + "'");
            }
            if (def.iconDataLoadError) {
                params.push("iconDataLoadError: '" + def.iconDataLoadError + "'");
            }
            if (def.iconDataRefresh) {
                params.push("iconDataRefresh: '" + def.iconDataRefresh + "'");
            }
            if (def.iconPageNext) {
                params.push("iconPageNext: '" + def.iconPageNext + "'");
            }
            if (def.iconPageLast) {
                params.push("iconPageLast: '" + def.iconPageLast + "'");
            }
            if (def.iconViewSettings) {
                params.push("iconViewSettings: '" + def.iconViewSettings + "'");
            }
            if (def.iconCopy) {
                params.push("iconCopy: '" + def.iconCopy + "'");
            }
            if (def.notificationsController && def.notificationsController.Reference) {
                var apiScope = def.notificationsController.IsGlobal ? '$root.$globals.$api' : '$root.$api';
                params.push("notificationsController: " + apiScope + "['" + def.notificationsController.Reference + "']");
            }
            if (def.pageSizeValues) {
                if (def.pageSizeValues.Binding) {
                    params.push("pageSizeValues: " + cGen.processBinding(def.pageSizeValues.Binding));
                }
                else {
                    params.push("pageSizeValues: '" + def.pageSizeValues.replace(/\"/g, '&quot;') + "'");
                }
            }
            params.push('$parentData: $data');
            list.attributes.params = params.join(', ');
            if (def.OnSelectionChange) {
                list.attributes.params += ', onSelectionChange: ' + cGen.processActionReference(def.OnSelectionChange);
            }
            if (def.OnRowClicked) {
                list.attributes.params += ', onRowClicked: ' + cGen.processActionReference(def.OnRowClicked);
            }
            if (def.OnRowsChanged) {
                list.attributes.params += ', onRowsChanged: ' + cGen.processActionReference(def.OnRowsChanged);
            }
            if (def.OnViewSettingsButtonClicked) {
                list.attributes.params += ', onViewSettingsButtonClicked: ' + cGen.processActionReference(def.OnViewSettingsButtonClicked);
            }
            componentWrapperTree.content.push(list);
        }
    }
    exports.gen = gen;
});
