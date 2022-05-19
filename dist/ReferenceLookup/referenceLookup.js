var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var referenceLookup;
        (function (referenceLookup) {
            'use strict';
            if (!ko.components.isRegistered('sffw-referencelookup')) {
                ko.components.register('sffw-referencelookup', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.referenceLookup.ReferenceLookupViewModel(params, componentInfo); }
                    },
                    template: "   <!-- ko if: isEnabled -->\n            <input data-bind=\"referenceLookup: data, invalidated: data.$isReportingErrors(), att:data,\n                attr: { 'aria-controls': listboxContainerId, 'aria-owns': listboxContainerId, 'aria-invalid': data.$isReportingErrors(), 'aria-required': data.$meta.isRequired }\"\n                autocomplete=\"off\" aria-autocomplete=\"list\" role=\"combobox\">\n        <!-- /ko -->\n        <!-- ko ifnot: isEnabled -->\n            <!-- ko if: accessibleDisabledEditorsSupport -->\n            <input data-bind=\"value: data[displayMember].$asString,\n                readOnly: isEnabled,\n                attr: { 'aria-invalid': data.$isReportingErrors(), 'aria-required': data.$meta.isRequired }\"\n                autocomplete=\"off\" />\n            <!-- /ko -->\n            <!-- ko ifnot: accessibleDisabledEditorsSupport -->\n            <input data-bind=\"value: data[displayMember].$asString,\n                attr: { 'aria-invalid': data.$isReportingErrors(), 'aria-required': data.$meta.isRequired }\"\n                autocomplete=\"off\" disabled />\n            <!-- /ko -->\n        <!-- /ko -->"
                });
            }
            if (!ko.components.isRegistered('sffw-tariclookup')) {
                ko.components.register('sffw-tariclookup', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.referenceLookup.TaricLookupViewModel(params, componentInfo); }
                    },
                    template: "   <!-- ko if: isEnabled -->\n            <input data-bind=\"taricLookup: data, invalidated: data.$isReportingErrors(), att:data,\n                attr: { 'aria-controls': listboxContainerId, 'aria-owns': listboxContainerId, 'aria-invalid': data.$isReportingErrors(), 'aria-required': data.$meta.isRequired }\"\n                autocomplete=\"off\" aria-autocomplete=\"list\" role=\"combobox\">\n        <!-- /ko -->\n        <!-- ko ifnot: isEnabled -->\n            <!-- ko if: accessibleDisabledEditorsSupport -->\n            <input data-bind=\"value: data[displayMember].$asString,\n                readOnly: isEnabled,\n                attr: { 'aria-invalid': data.$isReportingErrors(), 'aria-required': data.$meta.isRequired }\"\n                autocomplete=\"off\" />\n            <!-- /ko -->\n            <!-- ko ifnot: accessibleDisabledEditorsSupport -->\n            <input data-bind=\"value: data[displayMember].$asString,\n                attr: { 'aria-invalid': data.$isReportingErrors(), 'aria-required': data.$meta.isRequired }\"\n                autocomplete=\"off\" disabled />\n            <!-- /ko -->\n        <!-- /ko -->"
                });
            }
        })(referenceLookup = components.referenceLookup || (components.referenceLookup = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var referenceLookup;
        (function (referenceLookup) {
            'use strict';
            var ReferenceLookupBindingHandler = /** @class */ (function () {
                function ReferenceLookupBindingHandler() {
                }
                ReferenceLookupBindingHandler.prototype.init = function (element, valueAccessor, allBindings, viewModelDeprecated, bindingContext) {
                    var vm = bindingContext.$component;
                    var findOptions = function (request, response) {
                        var elementValue = $(element).val().trim();
                        var lookupData;
                        vm.getLookupData(elementValue, vm.displayMember).then(function (data) {
                            lookupData = data;
                            var foundItem = _.find(lookupData, function (item) {
                                return item[vm.displayMember].toString().toLowerCase() === elementValue.toLowerCase();
                            });
                            if (foundItem != null) {
                                $(element).val(foundItem[vm.displayMember]);
                                if (vm.immediateUpdate) {
                                    return vm.data.$fromJson(lookupData[0], null, true);
                                }
                            }
                        }).then(function () {
                            var itemsWrapper = _(lookupData);
                            var lastPreferedItemIdx = itemsWrapper.findLastIndex(function (item) {
                                return item[vm.codelistPreferedAttName] === true;
                            });
                            var result = itemsWrapper
                                .map(function (item, index) { return ({ label: item[vm.displayMember], value: item[vm.displayMember], isLastPrefered: index === lastPreferedItemIdx }); })
                                .value();
                            response(result);
                        });
                    };
                    var scrollPosition = -1;
                    var lastScrollTop = 0;
                    var widget = $(element).autocomplete({
                        source: findOptions,
                        messages: {
                            noResults: function () {
                                return vm.localizeFn('referenceLookup$$noResultsFound');
                            },
                            results: function (count) {
                                var items = vm.localizeFn('referenceLookup$$numberOfFoundItems');
                                var chooseOptText = vm.localizeFn('referenceLookup$$chooseOptionText');
                                var elementValue = $(element).val().trim();
                                var tabKeyText = elementValue.length > 0 ? vm.localizeFn('referenceLookup$$tabSelectsTheFirstOption') : '';
                                return items + " " + count + ". " + chooseOptText + " " + tabKeyText;
                            }
                        },
                        appendTo: '.' + vm.panelClass,
                        // autoFocus: true,
                        minLength: vm.minChars,
                        select: function (event, ui) {
                            if (ui.item.disabled) {
                                return false;
                            }
                            if (vm.immediateUpdate && (typeof event.key === 'undefined' || event.key !== 'Tab')) {
                                vm.getLookupData(ui.item.value, vm.displayMember).then(function (data) {
                                    return vm.data.$fromJson(data[0], null, true);
                                });
                            }
                        },
                        // jqueryui change event is triggered when the field is blurred
                        // we have own $(element).blur handler, so we will not use change event
                        open: function (event, ui) {
                            var $input = $(event.target);
                            var $results = $input.autocomplete('widget');
                            if (vm.panelClass !== null && vm.panelClass !== '' && typeof vm.panelClass !== 'undefined') {
                                var top_1 = $results.position().top;
                                var height = $results.height();
                                var inputHeight = $input[0].offsetHeight;
                                var newTop = top_1 - height - inputHeight - 2;
                                var elemTopPosition = $('.' + vm.panelClass).position().top;
                                var elemHeight = $('.' + vm.panelClass).height();
                                var elemBottom = elemTopPosition + elemHeight;
                                if (elemBottom < (top_1 + height + inputHeight)) {
                                    $results.css('top', newTop + 'px');
                                }
                                scrollPosition = $('.' + vm.panelClass).scrollTop();
                            }
                            var isModalOpen = $('body.modal-open').length > 0;
                            if (isModalOpen) {
                                var modalZIndex = $(':root').css('--modal-z-index');
                                $results.css('z-index', modalZIndex !== null && modalZIndex !== void 0 ? modalZIndex : '9040');
                            }
                            $(element).attr('aria-expanded', 'true');
                        },
                        search: function (event, ui) {
                            // fix bug in jQuery.ui somewhere where menu.bindings just grows and grows
                            // https://bugs.jqueryui.com/ticket/15095
                            // possibly could be fixed in jQuery.ui 1.12.2
                            $(element).data('ui-autocomplete').menu.bindings = $();
                        },
                        close: function (event, ui) {
                            var _a;
                            if (vm.panelClass != null && vm.panelClass !== '') {
                                scrollPosition = -1;
                            }
                            $(element).attr('aria-expanded', 'false');
                            var menu = $(element).data('ui-autocomplete').menu;
                            (_a = menu.activeMenu) === null || _a === void 0 ? void 0 : _a.attr('aria-activedescendant', '');
                            menu.activeMenu.find('.ui-menu-item').attr('aria-selected', 'false');
                        },
                        focus: function (event, ui) {
                            if (ui.item.disabled) {
                                return false;
                            }
                            var menu = $(element).data('ui-autocomplete').menu;
                            var focused = menu.active;
                            if (focused.length > 0) {
                                var focusid = focused.attr('id');
                                menu.activeMenu.attr('aria-activedescendant', focusid);
                                menu.activeMenu.find('.ui-menu-item').attr('aria-selected', 'false');
                                focused.attr('aria-selected', 'true');
                            }
                        }
                    }).data('ui-autocomplete');
                    var $ul = widget.menu.element;
                    $ul.attr('id', vm.listboxContainerId);
                    $ul.attr('role', 'listbox');
                    widget._itemIsSelectable = function (item) {
                        return true;
                    };
                    widget._renderMenu = function (ul, items) {
                        $.each(items, function (index, item) {
                            var li = widget._renderItemData(ul, item);
                            li.attr('id', vm.listboxContainerId + "-" + index);
                            if (item.isLastPrefered) {
                                li.addClass('item-last-prefered');
                            }
                        });
                    };
                    function SetWarningTimeout(el) {
                        $(el).addClass('notifyRefusal');
                        setTimeout(function () {
                            $(el).removeClass('notifyRefusal');
                        }, 2000);
                    }
                    function clearReferenceAndShowWarning(refAtt, elementValue) {
                        return refAtt.$emptyRecursive(true).then(function () {
                            SetWarningTimeout(element);
                            $(element).val(elementValue);
                            refAtt.$setUntouchedRecursive(false);
                            var message = window.sf.localization.currentCulture().errorFormatter.formatInvalidValue(elementValue);
                            sffw.safeWriteToAriaLiveRegion(message);
                        });
                    }
                    $('.' + vm.panelClass).on('scroll', function (event) {
                        if (vm.panelClass !== null && vm.panelClass !== '' && typeof vm.panelClass !== 'undefined') {
                            var st = $(this).scrollTop();
                            if (scrollPosition !== -1) {
                                $('.' + vm.panelClass).scrollTop(scrollPosition);
                                if (st > lastScrollTop) {
                                    $(window).scrollTop($(window).scrollTop() + st - lastScrollTop);
                                }
                            }
                            lastScrollTop = st;
                        }
                    });
                    if (vm.minChars === 0) {
                        $(element).on('focus', function () {
                            if ($(element).val() !== null && $(element).val() !== '') {
                                $(element).autocomplete('search', $(element).val());
                            }
                            else {
                                $(element).autocomplete('search', '');
                            }
                        });
                    }
                    $(element).on('blur', function (event, ui) {
                        var referenceAtt = vm.data;
                        var descAtt = referenceAtt[vm.displayMember];
                        var elementValue = $(element).val().trim();
                        if (elementValue.length === 0) {
                            if (vm.data.$hasValue()) {
                                return vm.data.$emptyRecursive(true);
                            }
                        }
                        else if (descAtt.$hasValue() && descAtt.$value().toString().toLowerCase() === elementValue.toLowerCase()) {
                            $(element).val(descAtt.$value());
                        }
                        else {
                            var boxContent = $(element).val();
                            vm.getLookupData(boxContent, vm.displayMember).then(function (data) {
                                if (data != null && data.length > 0) {
                                    var selectedItem_1 = data[0];
                                    if (widget._itemIsSelectable(selectedItem_1)) {
                                        return vm.data.$fromJson(selectedItem_1, null, true).then(function () {
                                            $(element).val(selectedItem_1[vm.displayMember]);
                                        });
                                    }
                                    else {
                                        return clearReferenceAndShowWarning(vm.data, elementValue);
                                    }
                                }
                                else {
                                    return clearReferenceAndShowWarning(vm.data, elementValue);
                                }
                            });
                        }
                    });
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $('.' + vm.panelClass).off('scroll');
                        if (vm.minChars === 0) {
                            $(element).off('focus');
                        }
                        $(element).off('blur');
                        $(element).autocomplete('destroy');
                    });
                };
                ReferenceLookupBindingHandler.prototype.update = function (element, valueAccessor, allBindings, viewModelDeprecated, bindingContext) {
                    var vm = bindingContext.$component;
                    var displayMemberAtt = vm.data[vm.displayMember];
                    if (displayMemberAtt.$value() != null) {
                        $(element).val(displayMemberAtt.$value());
                    }
                    else {
                        $(element).val('');
                    }
                };
                return ReferenceLookupBindingHandler;
            }());
            var TaricLookupBindingHandler = /** @class */ (function (_super) {
                __extends(TaricLookupBindingHandler, _super);
                function TaricLookupBindingHandler() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                TaricLookupBindingHandler.prototype.init = function (element, valueAccessor, allBindings, viewModelDeprecated, bindingContext) {
                    _super.prototype.init.call(this, element, valueAccessor, allBindings, viewModelDeprecated, bindingContext);
                    var vm = bindingContext.$component;
                    var findOptions = function (request, response) {
                        var elementValue = $(element).val().trim();
                        var lookupData;
                        vm.getLookupData(elementValue, vm.displayMember).then(function (data) {
                            lookupData = data;
                            var foundItem = _.find(lookupData, function (item) {
                                return item[vm.displayMember].toString().toLowerCase() === elementValue.toLowerCase();
                            });
                            if (foundItem != null) {
                                $(element).val(foundItem[vm.displayMember]);
                                if (vm.immediateUpdate) {
                                    return vm.data.$fromJson(lookupData[0], null, true);
                                }
                            }
                        }).then(function () {
                            var result = _(lookupData)
                                .map(function (item) { return ({ label: item[vm.displayMember], value: item[vm.displayMember], disabled: item[ko.unwrap(vm.enabledMember)] === false }); })
                                .value();
                            response(result);
                        });
                    };
                    $(element).autocomplete('option', 'source', findOptions);
                    var widget = $(element).data('ui-autocomplete');
                    widget._itemIsSelectable = function (item) {
                        return item[ko.unwrap(vm.enabledMember)] === true;
                    };
                    widget._renderMenu = function (ul, items) {
                        $.each(items, function (index, item) {
                            var li = widget._renderItemData(ul, item);
                            li.attr('id', vm.listboxContainerId + "-" + index);
                            li.toggleClass('ui-state-disabled', item.disabled);
                            if (item.disabled) {
                                li.attr('aria-label', item.label + " (" + vm.localizeFn('referenceLookup$$disabled') + ")");
                            }
                        });
                    };
                };
                return TaricLookupBindingHandler;
            }(ReferenceLookupBindingHandler));
            var handlers = ko.bindingHandlers;
            handlers.referenceLookup = handlers.referenceLookup || new ReferenceLookupBindingHandler();
            handlers.taricLookup = handlers.taricLookup || new TaricLookupBindingHandler();
        })(referenceLookup = components.referenceLookup || (components.referenceLookup = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var referenceLookup;
        (function (referenceLookup) {
            'use strict';
            var ReferenceLookupViewModel = /** @class */ (function () {
                function ReferenceLookupViewModel(params, componentInfo) {
                    this.subscriptions = [];
                    this.panelClass = params.panelClass;
                    this.dataApiObject = params.dataApiObject;
                    this.data = params.data;
                    this.displayMember = params.displayMember || this.dataApiObject.getDisplayMemberName();
                    if (_.isUndefined(params.isEnabled)) {
                        this.isEnabled = ko.observable(true);
                    }
                    else if (typeof (params.isEnabled) === 'function') {
                        this.isEnabled = params.isEnabled;
                    }
                    else {
                        this.isEnabled = ko.observable(params.isEnabled);
                    }
                    this.minChars = _.isNumber(params.minChars) ? params.minChars : 1;
                    this.useContains = params.useContains !== false;
                    this.immediateUpdate = params.immediateUpdate === true;
                    this.expectLinebreaksInValues = params.expectLinebreaksInValues === true;
                    this.resultSorting = params.resultSorting || 'advanced';
                    this.codelistPreferedAttName = params.codelistPreferedAttName || 'IsPrefered';
                    this.listboxContainerId = "reference-lookup-listbox-container-" + sffw.generateRandomId();
                    if (typeof params.$localizeFn === 'function') {
                        this.localizeFn = params.$localizeFn;
                    }
                    else {
                        throw new Error('Localization function was not found');
                    }
                    this.accessibleDisabledEditorsSupport = params.accessibleDisabledEditorsSupport;
                }
                ReferenceLookupViewModel.prototype.getLookupData = function (startString, attributeName) {
                    return this.dataApiObject.getLookupData(startString, attributeName, this.useContains, this.expectLinebreaksInValues, this.resultSorting, undefined, this.codelistPreferedAttName)
                        .then(function (values) {
                        return values;
                    });
                };
                ReferenceLookupViewModel.prototype.dispose = function () {
                    this.data = null;
                    this.dataApiObject = null;
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                };
                return ReferenceLookupViewModel;
            }());
            referenceLookup.ReferenceLookupViewModel = ReferenceLookupViewModel;
        })(referenceLookup = components.referenceLookup || (components.referenceLookup = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var referenceLookup;
        (function (referenceLookup) {
            'use strict';
            var TaricLookupViewModel = /** @class */ (function () {
                function TaricLookupViewModel(params, componentInfo) {
                    var _this = this;
                    this.useContains = false;
                    this.immediateUpdate = false;
                    this.resultSorting = 'basic';
                    this.subscriptions = [];
                    this.panelClass = params.panelClass;
                    this.dataApiObject = params.dataApiObject;
                    this.data = params.data;
                    this.displayMember = params.displayMember || this.dataApiObject.getDisplayMemberName();
                    if (_.isUndefined(params.isEnabled)) {
                        this.isEnabled = ko.observable(true);
                    }
                    else if (typeof (params.isEnabled) === 'function') {
                        this.isEnabled = params.isEnabled;
                    }
                    else {
                        this.isEnabled = ko.observable(params.isEnabled);
                    }
                    this.minChars = _.isNumber(params.minChars) ? params.minChars : 4;
                    this.expectLinebreaksInValues = params.expectLinebreaksInValues === false ? false : true;
                    this.enabledMember = params.enabledMember;
                    this.staticODataFilter = params.staticODataFilter;
                    this.listboxContainerId = "reference-lookup-listbox-container-" + sffw.generateRandomId();
                    if (typeof params.$localizeFn === 'function') {
                        this.localizeFn = params.$localizeFn;
                    }
                    else {
                        throw new Error('Localization function was not found');
                    }
                    this.accessibleDisabledEditorsSupport = params.accessibleDisabledEditorsSupport;
                    this.subscriptions.push(window.sf.localization.currentCultureCode.subscribe(function () {
                        _this.itemsCache = null;
                    }));
                }
                TaricLookupViewModel.prototype.getLookupData = function (startString, attributeName) {
                    var _this = this;
                    if (this.itemsCache && this.itemsCache.startString === startString) {
                        return Promise.resolve(this.itemsCache.values);
                    }
                    return this.dataApiObject.getLookupData(startString, attributeName, this.useContains, this.expectLinebreaksInValues, this.resultSorting, ko.unwrap(this.staticODataFilter))
                        .then(function (values) {
                        _this.itemsCache = { startString: startString, values: values };
                        return values;
                    });
                };
                TaricLookupViewModel.prototype.dispose = function () {
                    this.data = null;
                    this.dataApiObject = null;
                    this.itemsCache = null;
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                };
                return TaricLookupViewModel;
            }());
            referenceLookup.TaricLookupViewModel = TaricLookupViewModel;
        })(referenceLookup = components.referenceLookup || (components.referenceLookup = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    function generateRandomId() {
        return "" + Date.now() + Math.random().toString(16).substr(2, 5).toUpperCase();
    }
    sffw.generateRandomId = generateRandomId;
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
