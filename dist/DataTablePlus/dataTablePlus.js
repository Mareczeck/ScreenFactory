var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var dataTablePlus;
        (function (dataTablePlus) {
            var DataTablePlusColumnModel = /** @class */ (function () {
                function DataTablePlusColumnModel(column) {
                    var _this = this;
                    this.Caption = column.Caption;
                    this.IsVisible = column.IsVisible;
                    this.ColumnWidth = column.ColumnWidth;
                    this.HeaderCssClass = column.HeaderCssClass;
                    this.tooltip = column.Tooltip;
                    this.tooltipIconClass = column.TooltipIcon;
                    this.tooltipButtonAriaLabel = column.TooltipButtonAriaLabel;
                    this.colHeaderClasses = ko.pureComputed(function () {
                        var classNames = _.map(_this.HeaderCssClass, function (hClass) {
                            return ko.unwrap(hClass.ClassCondition) === true ? hClass.ClassName : '';
                        });
                        return "" + classNames.join(' ');
                    });
                }
                return DataTablePlusColumnModel;
            }());
            dataTablePlus.DataTablePlusColumnModel = DataTablePlusColumnModel;
        })(dataTablePlus = components.dataTablePlus || (components.dataTablePlus = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var dataTablePlus;
        (function (dataTablePlus) {
            var DataTablePlusModel = /** @class */ (function () {
                function DataTablePlusModel(params, componentInfo) {
                    var _this = this;
                    this.isScrollable = ko.observable(false);
                    this.rowSelectionEnabled = ko.observable(false);
                    this.allowUserChangeSelection = ko.observable(true);
                    this.columns = [];
                    this.pageBackEnabled = ko.pureComputed(function () {
                        return _this.pageNumber() > 1;
                    });
                    this.pageBackEnabledBindingValue = ko.pureComputed(function () {
                        var _a, _b;
                        if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            return true;
                        }
                        else {
                            return _this.pageBackEnabled();
                        }
                    });
                    this.pageBackAriaDisabledBindingValue = ko.pureComputed(function () {
                        var _a, _b;
                        if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            return !(_this.pageBackEnabled());
                        }
                        else {
                            return null;
                        }
                    });
                    this.pageForwardEnabled = ko.pureComputed(function () {
                        return _this.pageNumber() < _this.pagesCount();
                    });
                    this.pageForwardEnabledBindingValue = ko.pureComputed(function () {
                        var _a, _b;
                        if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            return true;
                        }
                        else {
                            return _this.pageForwardEnabled();
                        }
                    });
                    this.pageForwardAriaDisabledBindingValue = ko.pureComputed(function () {
                        var _a, _b;
                        if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            return !(_this.pageForwardEnabled());
                        }
                        else {
                            return null;
                        }
                    });
                    this.pageNumber = ko.observable(1);
                    this.subscriptions = [];
                    this.onRowClick = function (_data, event) {
                        if (ko.unwrap(_this.rowSelectionEnabled) && ko.unwrap(_this.allowUserChangeSelection)) {
                            var newIndex = (ko.unwrap(_this.pagingEnabled) ? _this.getPageOffset() : 0) + event.currentTarget.rowIndex;
                            _this.index(newIndex);
                        }
                        if (_this.onRowClickHandler) {
                            _this.onRowClickHandler(_data, event, { data: _data });
                        }
                        return true;
                    };
                    this.onPageForwardClick = function () {
                        var _a, _b;
                        var isEnabled = _this.pageForwardEnabled();
                        if (isEnabled) {
                            if (_this.pageNumber() < _this.pagesCount()) {
                                var newPageNum = _this.pageNumber() + 1;
                                _this.pageNumber(newPageNum);
                            }
                        }
                        else if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            _this.writeButtonDisabledErrToAriaLiveRegion(_this.dataContext.$localize('DataTablePlus$$nextPageAriaLabel'));
                        }
                    };
                    this.onPageBackClick = function () {
                        var _a, _b;
                        var isEnabled = _this.pageBackEnabled();
                        if (isEnabled) {
                            if (_this.pageNumber() > 1) {
                                var newPageNum = _this.pageNumber() - 1;
                                _this.pageNumber(newPageNum);
                            }
                        }
                        else if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            _this.writeButtonDisabledErrToAriaLiveRegion(_this.dataContext.$localize('DataTablePlus$$prevPageAriaLabel'));
                        }
                    };
                    this.dataContext = params.$parentData;
                    if (params.Data) {
                        this.items = params.Data.$items;
                    }
                    this.index = params.Index || ko.observable();
                    // if index is not preset to some number, we set it to 1
                    // prevzato z kodu PagingRepeater ale delat to bordel pri nastaveni
                    // indexu, protoze si SF mysli ze je to UserChange
                    /*if (!_.isFinite(this.index())) {
                        this.index(1);
                    }*/
                    this.isVisible = params.IsVisible;
                    this.showSelector = params.ShowSelector;
                    this.selectorClass = params.SelectorClass;
                    this.selectorWidth = params.SelectorWidth;
                    // bacause binding style via $data.isScrollable ? 'auto' : 'unset'
                    // can't handle both bool and observable, unlike setting css
                    // via $data.isScrollable, which works with both without any problem... grrr
                    // hence we need to convert whatever to observable here and use
                    // $data.isScrollable() in style binding
                    if (_.isFunction(params.IsScrollable)) {
                        this.isScrollable = params.IsScrollable;
                    }
                    else {
                        this.isScrollable(params.IsScrollable);
                    }
                    this.maxHeight = params.MaxHeight;
                    if (_.isFunction(params.RowSelectionEnabled)) {
                        this.rowSelectionEnabled = params.RowSelectionEnabled;
                    }
                    else {
                        this.rowSelectionEnabled(params.RowSelectionEnabled);
                    }
                    if (_.isFunction(params.AllowUserChangeSelection)) {
                        this.allowUserChangeSelection = params.AllowUserChangeSelection;
                    }
                    else {
                        this.allowUserChangeSelection(params.AllowUserChangeSelection);
                    }
                    _.each(ko.unwrap(params.Columns), function (col) {
                        var column = new dataTablePlus.DataTablePlusColumnModel(col);
                        _this.columns.push(column);
                    });
                    this.onRowClickHandler = params.OnRowClick;
                    this.alternateRows = params.AlternateRows;
                    this.hoverHighlight = params.HoverHighlight;
                    this.isHeaderVisible = params.IsHeaderVisible;
                    this.ariaLabel = params.AriaLabel;
                    this.pagingEnabled = params.PagingEnabled;
                    this.pageSize = params.PageSize || 10;
                    this.name = params.Name;
                    this.page = ko.pureComputed(function () {
                        return "" + _this.pageNumber();
                    });
                    this.rowsCount = ko.pureComputed(function () {
                        return _this.items().length;
                    }).extend({ rateLimit: { timeout: 200, method: 'notifyWhenChangesStop' } });
                    // there is always at least 1 page even if there is no record
                    this.pagesCount = ko.pureComputed(function () { return Math.ceil(_this.rowsCount() / ko.unwrap(_this.pageSize)) || 1; });
                    this.pageFirstRowIndex = ko.pureComputed(this.getPageFirstRowIndex, this)
                        .extend({ rateLimit: { timeout: 200, method: 'notifyWhenChangesStop' } });
                    ;
                    this.pageLastRowIndex = ko.pureComputed(this.getPageLastRowIndex, this)
                        .extend({ rateLimit: { timeout: 200, method: 'notifyWhenChangesStop' } });
                    ;
                    this.subscriptions.push(this.pageLastRowIndex.subscribe(function () {
                        _this.writeShowingDataAnnouncementToAriaLiveRegion();
                    }));
                    var $table = $(componentInfo.element).find('.sffw-datatableplus');
                    this.resizeHandler = function () {
                        var $headCells = $table.find('thead tr:first').children('.datatableplus-column').not('.selector');
                        // get the thead columns width array
                        // if not set in SF designtime, set browser-computed value
                        $headCells.each(function (index, node) {
                            var width = $(node).width();
                            if (typeof _this.columns[index].ColumnWidth === 'undefined' || ko.unwrap(_this.isScrollable)) {
                                _this.columns[index].ColumnWidth = width + "px";
                            }
                        });
                        // (re)set the width of tbody columns
                        $table.find('tbody tr').each(function (index, tr) {
                            $(tr).children().not('.selector').each(function (i, v) {
                                if (ko.unwrap(_this.isScrollable)) {
                                    $(v).width(_this.columns[i].ColumnWidth);
                                }
                                else {
                                    $(v).css('width', '');
                                }
                            });
                        });
                    };
                    // Adjust the width of tbody cells when window resizes
                    $(window).on('resize', this.resizeHandler);
                    // only if ResizeObserver API is supported (https://caniuse.com/resizeobserver)
                    if (window.ResizeObserver) {
                        this.observer = new ResizeObserver(function (entries) {
                            entries.forEach(function (entry) {
                                // here we could do something more sophisticated if needed...
                                // if (entry.contentBoxSize) {
                                //     // Firefox implements `contentBoxSize` as a single content rect, rather than an array
                                //     const contentBoxSize: ResizeObserverSize = Array.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
                                //     console.log(`ResizeObserver::ifblock::entry: blockSize=${contentBoxSize.blockSize}, inlineSize=${contentBoxSize.inlineSize}`)
                                // } else {
                                //     const contentRect: DOMRectReadOnly = entry.contentRect;
                                //     console.log(`ResizeObserver::elseblock::entry: width: ${contentRect.width},  height: ${contentRect.height}`)
                                // }
                                setTimeout(function () {
                                    $(window).trigger('resize');
                                }, 0);
                            });
                        });
                        this.observer.observe($table[0]);
                    }
                    this.subscriptions.push(this.isScrollable.subscribe(function () {
                        setTimeout(function () {
                            $(window).trigger('resize');
                        }, 0);
                    }));
                }
                DataTablePlusModel.prototype.writeShowingDataAnnouncementToAriaLiveRegion = function () {
                    var msg = this.dataContext.$localize('DataTablePlus$$showingDataAnnouncement');
                    msg = msg.replace('{rowFrom}', "" + ko.unwrap(this.pageFirstRowIndex))
                        .replace('{rowTo}', "" + ko.unwrap(this.pageLastRowIndex))
                        .replace('{rowCount}', "" + ko.unwrap(this.rowsCount))
                        .replace('{tableName}', ("" + (ko.unwrap(this.ariaLabel) ? ko.unwrap(this.ariaLabel) : this.name)));
                    sffw.safeWriteToAriaLiveRegion(msg);
                };
                DataTablePlusModel.prototype.writeButtonDisabledErrToAriaLiveRegion = function (btnText) {
                    var msg = window.sf.localization.currentCulture().errorFormatter.formatButtonDisabled(btnText);
                    sffw.safeWriteToAriaLiveRegion(msg);
                };
                DataTablePlusModel.prototype.getPageOffset = function () {
                    return (ko.unwrap(this.pageNumber) - 1) * ko.unwrap(this.pageSize);
                };
                DataTablePlusModel.prototype.getPageFirstRowIndex = function () {
                    var pagingEnabled = ko.unwrap(this.pagingEnabled);
                    if (pagingEnabled) {
                        return this.getPageOffset() + 1;
                    }
                    else {
                        return 1;
                    }
                };
                DataTablePlusModel.prototype.getPageLastRowIndex = function () {
                    var pagingEnabled = ko.unwrap(this.pagingEnabled);
                    if (ko.unwrap(pagingEnabled)) {
                        var lastRowIndex = this.getPageOffset() + ko.unwrap(this.pageSize);
                        var collectionItemsCount = this.items().length;
                        if (lastRowIndex <= collectionItemsCount) {
                            return lastRowIndex;
                        }
                        return collectionItemsCount;
                    }
                    else {
                        return this.items().length;
                    }
                };
                DataTablePlusModel.prototype.dispose = function () {
                    var _a;
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                    $(window).off('resize', this.resizeHandler);
                    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
                };
                return DataTablePlusModel;
            }());
            dataTablePlus.DataTablePlusModel = DataTablePlusModel;
        })(dataTablePlus = components.dataTablePlus || (components.dataTablePlus = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var dataTablePlus;
        (function (dataTablePlus) {
            if (ko && !ko.components.isRegistered('sffw-datatable-plus')) {
                ko.components.register('sffw-datatable-plus', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.dataTablePlus.DataTablePlusModel(params, componentInfo); }
                    },
                    template: "\n<table class=\"sffw-datatableplus\" data-bind=\"visible: $data.isVisible,\n    css: { 'datatableplus-scroll': $data.isScrollable(), 'selection-disabled': ko.unwrap(rowSelectionEnabled) && !ko.unwrap(allowUserChangeSelection), 'alternate-rows': alternateRows, 'hover-highlight':  hoverHighlight },\n    attr: { 'aria-label': ariaLabel, 'aria-rowcount': rowsCount }\">\n    <thead data-bind=\"visible: isHeaderVisible\">\n        <tr class=\"datatableplus-header-row\">\n            <!-- ko if: ko.unwrap(rowSelectionEnabled) && ko.unwrap($data.showSelector) -->\n            <th aria-hidden=\"true\" class=\"datatableplus-column selector container\" data-bind=\"style: { width: $data.selectorWidth }\"></th>\n            <!-- /ko -->\n            <!-- ko foreach: columns -->\n            <th class=\"datatableplus-column container\" data-bind=\"style: { width: $data.ColumnWidth }, visible: $data.IsVisible, class: $data.colHeaderClasses\">\n                <div class=\"datatableplus-column-caption-wrap\">\n                    <span data-bind=\"text: $data.Caption\"></span>\n                    <!-- ko if: ko.unwrap($data.tooltip) -->\n                        <!-- ko template: { name: '$tooltipTemplate', data: $data } --><!-- /ko -->\n                    <!-- /ko -->\n                </div>\n            </th>\n            <!-- /ko -->\n        </tr>\n    </thead>\n    <tbody data-bind=\"style: { 'max-height': $data.isScrollable() ? $data.maxHeight : '' }\">\n        <!-- ko foreach: items -->\n        <!-- ko if: ($index() + 1) >= ko.unwrap($parent.pageFirstRowIndex) && ($index() + 1) <= ko.unwrap($parent.pageLastRowIndex) -->\n            <tr class=\"datatableplus-row\" data-bind=\"click: $parent.onRowClick, css: { selected: ko.unwrap($parent.rowSelectionEnabled) && ($parent.index() == $index() + 1) }, attr: { 'aria-selected': ko.unwrap($parent.rowSelectionEnabled) && ($parent.index() == ($index() + 1)) }\">\n                <!-- ko if: ko.unwrap($parent.rowSelectionEnabled) && ko.unwrap($parent.showSelector) -->\n                <td aria-hidden=\"true\" class=\"selector container\">\n                    <!-- ko if: $parent.index() == $index() + 1 -->\n                    <span data-bind=\"class: $parent.selectorClass\"></span>\n                    <!-- /ko -->\n                </td>\n                <!-- /ko -->\n                <!-- ko foreach: $parent.columns -->\n                <td class=\"container\" data-bind=\"visible: $data.IsVisible\">\n                    <!-- ko template: { nodes: [$componentTemplateNodes[$index()]], data: $parent } --><!-- /ko -->\n                </td>\n                <!-- /ko -->\n            </tr>\n        <!-- /ko -->\n        <!-- /ko -->\n    </tbody>\n</table>\n<!-- ko if: pagingEnabled -->\n    <!-- ko template: { name: '$pagingTemplate', data: $data } --><!-- /ko -->\n<!-- /ko -->\n\n<script type=\"text/html\" id=\"$tooltipTemplate\">" + sffw.SFFW_TOOLTIPBUTTON_TEMPLATE + "</script>\n\n<script type=\"text/html\" id=\"$pagingTemplate\">\n    <div class=\"datatableplus-paging\">\n        <button class=\"paging-button\" data-bind=\"click: onPageBackClick, enable: pageBackEnabledBindingValue,\n            attr: { 'aria-label': $root.$localize('DataTablePlus$$prevPageAriaLabel'),\n                    'aria-disabled': pageBackAriaDisabledBindingValue }\">\n            <i class=\"fa fa-play fa-flip-horizontal\" aria-hidden=\"true\"></i>\n        </button>\n        <button class=\"paging-button\" data-bind=\"click: onPageForwardClick, enable: pageForwardEnabledBindingValue,\n            attr: { 'aria-label': $root.$localize('DataTablePlus$$nextPageAriaLabel'),\n            'aria-disabled': pageForwardAriaDisabledBindingValue }\">\n            <i class=\"fa fa-play\" aria-hidden=\"true\"></i>\n        </button>\n        <span class=\"paging-currentpage\" data-bind=\"text: page\"></span>\n        <span class=\"paging-slash\">/</span>\n        <span class=\"paging-pagemax\" data-bind=\"text: pagesCount\"></span>\n        <span class=\"paging-rows\">(<span class=\"paging-rows-count\" data-bind=\"text: rowsCount\"></span><span data-bind=\"text: $root.$localize('DataTablePlus$$rows')\"></span>)</span>\n    </div>\n</script>\n"
                });
            }
        })(dataTablePlus = components.dataTablePlus || (components.dataTablePlus = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    sffw.SFFW_TOOLTIPBUTTON_TEMPLATE = "\n<div class=\"sffw-tooltip-button-wrapper\">\n    <button class=\"tooltip-button\" data-bind=\"attr: { tabindex: (ko.unwrap(window.sf.accessibility.preferences.focusTooltipButtons) === false ? -1 : 0), 'aria-label': tooltipButtonAriaLabel, 'aria-pressed': 'false' }, tooltipButton: true\">\n        <span data-bind=\"css: tooltipIconClass\" aria-hidden=\"true\" ></span>\n    </button>\n    <div class=\"tooltip-popover-container\" role=\"status\">\n        <div class=\"tooltip-popover\" role=\"tooltip\" style=\"display: none\">\n            <div class=\"popover-arrow\" style=\"left: 50%;\"></div>\n            <div class=\"popover-content\" data-bind=\"text: tooltip\"></div>\n        </div>\n    </div>\n</div>\n";
    var handlers = ko.bindingHandlers;
    handlers.tooltipButton = handlers.tooltipButton || {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            var $element = $(element);
            var eventNamesBind = 'click touch';
            var $tooltipPopover = $element.parent().find('.tooltip-popover-container .tooltip-popover');
            $element.on(eventNamesBind, function () {
                $tooltipPopover.toggle();
                var elemOffset = $element.offset();
                var parentOffset = $element.offsetParent().offset();
                var padding = 0;
                var topPos = elemOffset.top - parentOffset.top - $tooltipPopover.outerHeight() - padding;
                var leftPos = elemOffset.left - parentOffset.left + ($element.outerWidth() / 2) - ($tooltipPopover.outerWidth() / 2);
                topPos = (topPos < 0 && parentOffset.top === 0) ? 0 : topPos;
                leftPos = leftPos < 0 ? 0 : leftPos;
                $tooltipPopover.css({ 'top': topPos + 'px', 'left': leftPos + 'px' });
                $element.attr('aria-pressed', $tooltipPopover.is(':visible') ? 'true' : 'false');
            });
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $element.off(eventNamesBind);
            });
        }
    };
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    function safeWriteToAriaLiveRegion(message) {
        if (message && window.sf.accessibility && window.sf.accessibility.ariaLiveRegion) {
            window.sf.accessibility.ariaLiveRegion.append(message);
        }
    }
    sffw.safeWriteToAriaLiveRegion = safeWriteToAriaLiveRegion;
})(sffw || (sffw = {}));
