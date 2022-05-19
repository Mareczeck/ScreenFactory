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
        var errorSummary;
        (function (errorSummary) {
            'use strict';
            if (!ko.components.isRegistered('sffw-error-summary')) {
                ko.components.register('sffw-error-summary', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) {
                            return new sffw.components.errorSummary.ErrorSummaryViewModel(params, componentInfo);
                        }
                    },
                    template: "\n<div class=\"sffw-error-summary\">\n    <!-- ko if: ko.unwrap(isVisible) && (clientErrors().length > 0 || serverErrors().length > 0) -->\n    <table>\n        <thead>\n            <tr>\n                <th data-bind=\"text: typeof(customPointerCaption) !== 'undefined' ? customPointerCaption: $root.$localize('errorSummary$$pointer')\"></th>\n                <th data-bind=\"text: typeof(customDescriptionCaption) !== 'undefined' ? customDescriptionCaption: $root.$localize('errorSummary$$description')\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <!-- ko foreach: {data: serverErrors, as: 'error'} -->\n            <tr>\n                <!-- ko if: error.pointerSourceComponent() -->\n                <td>\n                    <a href=\"#\" data-bind=\"text: error.getPointerCaptionOrPointer(),\n                        click: function(data, event) { return error.viewModel.onItemClicked(error.pointer(), event); },\n                        attr: { 'aria-label': $root.$localize('errorSummary$$showFormElement') + ' - ' + error.getPointerCaptionOrPointer() }\">\n                    </a>\n                </td>\n                <!-- /ko -->\n                <!-- ko ifnot: error.pointerSourceComponent() -->\n                <td data-bind=\"text: error.getPointerCaptionOrPointer()\"></td>\n                <!-- /ko -->\n                <td data-bind=\"text: code\"></td>\n            </tr>\n            <tr>\n                <td colspan=\"2\" data-bind=\"text: reason\">\n            </tr>\n            <!-- /ko -->\n            <!-- ko foreach: {data: clientErrors, as: 'error'} -->\n            <tr>\n                <!-- ko if: error.pointerSourceComponent() -->\n                <td>\n                    <a href=\"#\" data-bind=\"text: error.getPointerCaptionOrPointer(),\n                        click: function(data, event) { return error.viewModel.onItemClicked(this.getPointer(), event); },\n                        attr: { 'aria-label': $root.$localize('errorSummary$$showFormElement') + ' - ' + error.getPointerCaptionOrPointer() }\">\n                    </a>\n                </td>\n                <!-- /ko -->\n                <!-- ko ifnot: error.pointerSourceComponent() -->\n                <td data-bind=\"text: error.getPointerCaptionOrPointer()\"></td>\n                <!-- /ko -->\n                <td data-bind=\"text: (error.viewModel.preferDisplayMessageInDescription === true && descriptionError().length === 0) ? descriptionError : message\">\n            </tr>\n            <tr>\n                <td colspan=\"2\" data-bind=\"text: (error.viewModel.preferDisplayMessageInDescription === true && descriptionError().length === 0) ? message : descriptionError\">\n            </tr>\n            <!-- /ko -->\n        </tbody>\n    </table>\n    <!-- /ko -->\n</div>"
                });
            }
        })(errorSummary = components.errorSummary || (components.errorSummary = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var errorSummary;
        (function (errorSummary) {
            'use strict';
            var ErrorSummaryViewModel = /** @class */ (function () {
                function ErrorSummaryViewModel(params, componentInfo) {
                    var _this = this;
                    this.descriptionColumn = 'Description';
                    this.subscriptions = [];
                    this.dataContext = params.$parentData;
                    if (params.root) {
                        this.root = params.root;
                        this.rootPosition = this.root ? this.root.$getPosition().join('.') : 'root falsy';
                    }
                    if (params.serverValidationErrors) {
                        this.serverValidationErrors = params.serverValidationErrors.$items;
                    }
                    if (params.reasonCodelistDisplayMember) {
                        this.reasonCodelistDisplayMember = params.reasonCodelistDisplayMember;
                    }
                    else {
                        this.reasonCodelistDisplayMember = '_description';
                    }
                    if (params.errorCodeDisplayMember) {
                        this.errorCodeDisplayMember = params.errorCodeDisplayMember;
                    }
                    else {
                        this.errorCodeDisplayMember = '_description';
                    }
                    this.clientErrors = ko.observableArray();
                    this.serverErrors = ko.observableArray();
                    this.isVisible = ko.unwrap(params.isVisible);
                    this.allowDescDownload = ko.unwrap(params.AllowDescriptionDownload);
                    if (typeof params.DescriptionSeparator !== 'undefined') {
                        this.descriptionStringSeparator = params.DescriptionSeparator;
                    }
                    else {
                        this.descriptionStringSeparator = ' - ';
                    }
                    this.desCodelist = params.DescriptionCodelist;
                    if (params.DescriptionColumn != null && params.DescriptionColumn !== '') {
                        this.descriptionColumn = params.DescriptionColumn;
                    }
                    if (params.isVisible === false) {
                        this.isVisible = false;
                    }
                    else {
                        this.isVisible = params.isVisible || true;
                    }
                    if (params.AllowDescriptionDownload === false) {
                        this.allowDescDownload = false;
                    }
                    else {
                        this.allowDescDownload = params.AllowDescriptionDownload || true;
                    }
                    this.errorPointerMap = params.errorPointerMap ? params.errorPointerMap : null;
                    this.hideMissingDescription = typeof params.hideMissingDescription === 'undefined' ? false : params.hideMissingDescription;
                    this.preferDisplayMessageInDescription = typeof params.preferDisplayMessageInDescription === 'undefined' ? true : ko.unwrap(params.preferDisplayMessageInDescription);
                    this.customPointerCaption = params.customPointerCaption;
                    this.customDescriptionCaption = params.customDescriptionCaption;
                    this.itemClickHandler = params.OnItemClick;
                    var self = this;
                    self.onItemClicked = function (pointer, event) {
                        if (self.itemClickHandler) {
                            if (pointer && self.errorPointerMap) {
                                var mapItem = self.errorPointerMap.getPointerItem(pointer);
                                if (mapItem) {
                                    var itemClickParams = { errorSourceForm: mapItem.errorSourceForm, errorSourceComponent: mapItem.errorSourceComponent,
                                        navigationTreeNode: mapItem.navigationTreeNode, pointer: pointer };
                                    self.itemClickHandler(null, event, itemClickParams);
                                }
                            }
                        }
                    };
                    if (this.root) {
                        this.delayedClientErrors = ko.pureComputed(function () {
                            return _this.root.$validationErrors();
                        }).extend({ rateLimit: { timeout: 200, method: 'notifyWhenChangesStop' } });
                        this.fillClientValidationErrors();
                        this.subscriptions.push(this.delayedClientErrors.subscribe(function () {
                            _this.fillClientValidationErrors();
                        }));
                    }
                    if (this.serverValidationErrors) {
                        this.delayedServerErrors = ko.pureComputed(function () {
                            return _this.serverValidationErrors();
                        }).extend({ rateLimit: { timeout: 200, method: 'notifyWhenChangesStop' } });
                        this.fillServerValidationErrors();
                        this.subscriptions.push(this.delayedServerErrors.subscribe(function () {
                            _this.fillServerValidationErrors();
                        }));
                    }
                }
                ErrorSummaryViewModel.prototype.fillClientValidationErrors = function () {
                    var _this = this;
                    this.clientErrors.removeAll();
                    if (this.root) {
                        var errors = this.delayedClientErrors();
                        _.each(errors, function (err) {
                            _this.clientErrors.push(new errorSummary.ClientErrorSummaryItem(err, _this));
                        });
                    }
                };
                ErrorSummaryViewModel.prototype.fillServerValidationErrors = function () {
                    var _this = this;
                    this.serverErrors.removeAll();
                    if (this.serverValidationErrors) {
                        var errors = this.delayedServerErrors();
                        _.each(errors, function (err) {
                            _this.serverErrors.push(new errorSummary.ServerErrorSummaryItem(err, _this));
                        });
                    }
                };
                ErrorSummaryViewModel.prototype.dispose = function () {
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                };
                return ErrorSummaryViewModel;
            }());
            errorSummary.ErrorSummaryViewModel = ErrorSummaryViewModel;
        })(errorSummary = components.errorSummary || (components.errorSummary = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var errorSummary;
        (function (errorSummary) {
            var ErrorSummaryItem = /** @class */ (function () {
                function ErrorSummaryItem(viewModel) {
                    this.code = ko.observable();
                    this.message = ko.observable();
                    this.descriptionError = ko.observable('');
                    this.pointer = ko.observable();
                    this.pointerSourceComponent = ko.observable();
                    this.reason = ko.observable();
                    this.viewModel = viewModel;
                }
                ErrorSummaryItem.prototype.getPointerSourceComponent = function (pointer) {
                    if (pointer && this.viewModel.errorPointerMap) {
                        var item = this.viewModel.errorPointerMap.getPointerItem(pointer);
                        return item ? item.errorSourceComponent : null;
                    }
                    return null;
                };
                return ErrorSummaryItem;
            }());
            errorSummary.ErrorSummaryItem = ErrorSummaryItem;
            var ClientErrorSummaryItem = /** @class */ (function (_super) {
                __extends(ClientErrorSummaryItem, _super);
                function ClientErrorSummaryItem(err, viewModel) {
                    var _this = _super.call(this, viewModel) || this;
                    _this.err = err;
                    sffw.assert(_this.err, 'Validation error is missing');
                    _this.attribute = _this.err.attribute;
                    _this.message = ko.observable(_this.err.message);
                    if (_this.attribute) {
                        _this.pointer(_this.getPointer());
                        var cmpnt = _this.getPointerSourceComponent(_this.pointer());
                        _this.pointerSourceComponent(cmpnt);
                    }
                    var errorMessage;
                    if (_this.message()) {
                        errorMessage = _this.message().split(_this.viewModel.descriptionStringSeparator);
                    }
                    else {
                        _this.message(_this.viewModel.dataContext.$localize('errorSummary$$messageNone'));
                        _this.descriptionError(_this.viewModel.dataContext.$localize('errorSummary$$errorUndefined'));
                        return _this;
                    }
                    if (errorMessage.length > 1) {
                        _this.message(errorMessage[0]);
                        _this.descriptionError(errorMessage[1]);
                        return _this;
                    }
                    if ((ko.unwrap(_this.viewModel.allowDescDownload) === true || _this.viewModel.allowDescDownload === true) && (_this.viewModel.isVisible !== false && ko.unwrap(_this.viewModel.isVisible) !== false)) {
                        if (typeof _this.viewModel.desCodelist !== 'undefined') {
                            var args = { columnName: 'code', columnValue: _this.message(), relevantDate: new Date(), requeryIfLoadedAndNotFound: false };
                            _this.viewModel.desCodelist.getItemByStringColumnAsync(args)
                                .then(function (codelistItem) {
                                if (codelistItem.isFound() && codelistItem.getPropertyValue({ propName: _this.viewModel.descriptionColumn })) {
                                    _this.descriptionError(codelistItem.getPropertyValue({ propName: _this.viewModel.descriptionColumn }));
                                }
                                else if (_this.viewModel.preferDisplayMessageInDescription === false) {
                                    var descErr = null;
                                    if (ko.unwrap(_this.viewModel.hideMissingDescription) !== true) {
                                        descErr = _this.viewModel.dataContext.$localize('errorSummary$$missingDescriptionText');
                                    }
                                    _this.descriptionError(descErr);
                                }
                            });
                        }
                    }
                    _this.getPointerCaptionOrPointer = function () {
                        var result = _this.getPointer();
                        if (_this.viewModel.errorPointerMap) {
                            result = _this.viewModel.errorPointerMap.getPointerCaption({ path: result });
                        }
                        return result;
                    };
                    return _this;
                }
                // vrátí cestu k atributu relativně od root v XPath notaci; s IDataParentynecháním _ na začátku jmen a s indexy položek od 1
                ClientErrorSummaryItem.prototype.getPointer = function () {
                    var result = this.attribute.$name;
                    var x = this.attribute;
                    var collection = null;
                    var collectionName = null;
                    // pokud $parentStruct už nemá $parentStruct, jedná se o datacontext a ten už nás nezajímá
                    while (x.$parentStruct && x.$parentStruct !== this.viewModel.root && x.$parentStruct.$parentStruct) {
                        if (x.$parentStruct.$meta.type === 'collection') {
                            // neviditelný complex reprezentující collection item
                            // zde se správně sestaví xpath pro validation errory prázdných záznamů kolekce
                            collection = x.$parentStruct;
                            collectionName = collection.$name;
                            collectionName = collectionName[0] === '_' ? collectionName.substr(1) : collectionName;
                            result = collectionName + "[" + (collection.$items().indexOf(x) + 1) + "]"; // index bude od 1, proto +1
                            x = collection;
                        }
                        else {
                            if (x.$parentStruct.$parentStruct.$meta.type === 'collection') {
                                var colStruct = x.$parentStruct;
                                collection = x.$parentStruct.$parentStruct;
                                collectionName = collection.$name;
                                collectionName = collectionName[0] === '_' ? collectionName.substr(1) : collectionName;
                                result = collectionName + "[" + (collection.$items().indexOf(colStruct) + 1) + "]/" + result; // index bude od 1, proto +1
                                x = collection;
                            }
                            else {
                                x = x.$parentStruct;
                                var parentStructName = x.$name;
                                parentStructName = parentStructName[0] === '_' ? parentStructName.substr(1) : parentStructName;
                                result = parentStructName + "/" + result;
                            }
                        }
                    }
                    return result;
                };
                return ClientErrorSummaryItem;
            }(ErrorSummaryItem));
            errorSummary.ClientErrorSummaryItem = ClientErrorSummaryItem;
            var ServerErrorSummaryItem = /** @class */ (function (_super) {
                __extends(ServerErrorSummaryItem, _super);
                function ServerErrorSummaryItem(err, viewModel) {
                    var _this = _super.call(this, viewModel) || this;
                    _this.err = err;
                    sffw.assert(_this.err, 'Validation error is missing');
                    if (_this.err.Pointer) {
                        _this.pointer(_this.err.Pointer.$value());
                        var cmpnt = _this.getPointerSourceComponent(_this.pointer());
                        _this.pointerSourceComponent(cmpnt);
                    }
                    if (_this.err.Code) {
                        _this.code(_this.err.Code[_this.viewModel.errorCodeDisplayMember].$value());
                    }
                    if (_this.err.ReasonCodelist && _this.err.ReasonCodelist.$hasValue()) {
                        _this.reason(_this.err.ReasonCodelist[_this.viewModel.reasonCodelistDisplayMember].$value());
                    }
                    else if (_this.err.Reason) {
                        _this.reason(_this.err.Reason.$value());
                    }
                    _this.getPointerCaptionOrPointer = function () {
                        var result = _this.pointer();
                        if (_this.viewModel.errorPointerMap) {
                            result = _this.viewModel.errorPointerMap.getPointerCaption({ path: result });
                        }
                        return result;
                    };
                    return _this;
                }
                return ServerErrorSummaryItem;
            }(ErrorSummaryItem));
            errorSummary.ServerErrorSummaryItem = ServerErrorSummaryItem;
        })(errorSummary = components.errorSummary || (components.errorSummary = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    function assert(condition, message) {
        if (!condition) {
            if (message) {
                console.error('Assertion failed: ' + message);
            }
            else {
                console.error('Assertion failed');
            }
        }
    }
    sffw.assert = assert;
})(sffw || (sffw = {}));
