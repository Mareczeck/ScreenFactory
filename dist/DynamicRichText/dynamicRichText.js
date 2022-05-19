var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var dynamicRichText;
        (function (dynamicRichText) {
            var DynamicRichTextModel = /** @class */ (function () {
                function DynamicRichTextModel(params, componentInfo) {
                    this.rawHtml = ko.observable();
                    this.subscriptions = [];
                    this.codelist = params.Codelist;
                    this.codelistKey = params.CodelistKey;
                    this.activeMode = params.ActiveMode;
                    this.keyMemberName = this.codelist.getValueMemberName();
                    this.contentMemberName = this.codelist.getDisplayMemberName();
                    this.subscriptions.push(this.codelist.items.subscribe(this.onCodelistChanged, this));
                    if (this.activeMode || this.codelist.items()) {
                        this.findItemAndGetHtml();
                    }
                    if (this.activeMode) {
                        this.subscriptions.push(window.sf.localization.currentCultureCode.subscribe(this.onCurrentCultureCodeChanged, this));
                    }
                }
                DynamicRichTextModel.prototype.onCodelistChanged = function () {
                    this.findItemAndGetHtml();
                };
                DynamicRichTextModel.prototype.onCurrentCultureCodeChanged = function () {
                    this.findItemAndGetHtml();
                };
                DynamicRichTextModel.prototype.findItemAndGetHtml = function () {
                    var _this = this;
                    this.codelist.getItemByStringColumnAsync({ columnName: this.keyMemberName, columnValue: this.codelistKey, relevantDate: new Date(), requeryIfLoadedAndNotFound: true }).then(function (result) {
                        if (result.item) {
                            _this.rawHtml(result.item[_this.contentMemberName]);
                        }
                        if (result.isError()) {
                            console.error(result.getErrorMessage());
                        }
                    });
                };
                DynamicRichTextModel.prototype.dispose = function () {
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                };
                return DynamicRichTextModel;
            }());
            dynamicRichText.DynamicRichTextModel = DynamicRichTextModel;
        })(dynamicRichText = components.dynamicRichText || (components.dynamicRichText = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var dynamicRichText;
        (function (dynamicRichText) {
            if (ko && !ko.components.isRegistered('sffw-dynamic-richtext')) {
                ko.components.register('sffw-dynamic-richtext', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.dynamicRichText.DynamicRichTextModel(params, componentInfo); }
                    },
                    template: "\n<div class=\"dynamic-richtext\" data-bind=\"html: rawHtml\"></div>\n            "
                });
            }
        })(dynamicRichText = components.dynamicRichText || (components.dynamicRichText = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
