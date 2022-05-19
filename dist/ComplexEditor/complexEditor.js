"use strict";
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var complexEditor;
        (function (complexEditor) {
            if (ko && !ko.components.isRegistered('sffw-complex-editor')) {
                ko.components.register('sffw-complex-editor', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.complexEditor.ComplexEditorModel(params, componentInfo); }
                    },
                    template: "\n<!-- ko if: errorMessage -->\n    <div data-bind=\"text: errorMessage\"></div>\n<!-- /ko -->\n<!-- ko if: !errorMessage() && modelReady -->\n<div class=\"component container container-component m8-panel panel v-panel\" style=\"padding: 0px;width: 100%\">\n    <div class=\"panel-table\">\n        <div class=\"panel-row\">\n            <div class=\"panel-auto-fit-height panel-cell panel-h-stretch\" data-bind=\"foreach: { data: visibleAttributes, as: 'meta', noChildContext: true }\">\n                <div class=\"component editor m8-textbox textbox\" style=\"padding: 6px\">\n                    <div class=\"caption-halign-left caption-position-left caption-valign-middle editor-wrapper\"\n                        data-bind=\"css: {'required': meta.IsRequired}\"><label>\n                            <div class=\"caption-wrap\">\n                                <span class=\"caption-label-span caption-text\"\n                                    data-bind=\"css: {'error': data()[meta.Name].$isReportingErrors()}, text: meta.Caption || meta.Name\" />\n                            </div>\n                            <!-- ko if: meta.DataType===\"string\"||meta.DataType===\"integer\"||meta.DataType===\"decimal\" -->\n                            <input class=\"editor-value\" type=\"text\" autocomplete=\"off\"\n                                data-bind=\"valueNotifyRefusalErrorText: data()[meta.Name].$asString(), invalidated: data()[meta.Name].$isReportingErrors(), att: data()[meta.Name], enable: !meta.Disabled && ko.unwrap($component.enabled) && $root.$componentsEnabled(), attr: {'aria-invalid': data()[meta.Name].$isReportingErrors(), 'aria-required': meta.IsRequired}\">\n                            <!-- /ko -->\n                            <!-- ko if: meta.DataType===\"date\"||meta.DataType===\"dateTime\" -->\n                            <input class=\"editor-value flatpickr-input active\" type=\"text\"\n                                data-bind=\"valueNotifyRefusalErrorText: data()[meta.Name].$asString(), dateTimePicker: data()[meta.Name], invalidated: data()[meta.Name].$isReportingErrors(), att: data()[meta.Name],enable: ko.pureComputed(function () { return !meta.Disabled && ko.unwrap($component.enabled) && $root.$componentsEnabled(); }), attr: {'aria-invalid': data()[meta.Name].$isReportingErrors(), 'aria-required': meta.IsRequired}\">\n                            <!-- /ko -->\n                            <!-- ko if: meta.DataType===\"bool\" -->\n                            <input class=\"editor-value\" type=\"checkbox\" autocomplete=\"off\"\n                                data-bind=\"checked: data()[meta.Name].$value, invalidated: data()[meta.Name].$isReportingErrors(), att: data()[meta.Name], enable: !meta.Disabled && ko.unwrap($component.enabled) && $root.$componentsEnabled(), attr: {'aria-invalid': data()[meta.Name].$isReportingErrors(), 'aria-required': meta.IsRequired}\">\n                            <!-- /ko -->\n                        </label>\n                        <div class=\"errorText\" data-bind=\"visible: data()[meta.Name].$isReportingErrors(), attr: {'aria-hidden': true}\"\n                            aria-hidden=\"true\" style=\"display: none;\">\n                            <!-- ko text: data()[meta.Name].$errorText-->\n                            <!--/ko-->\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<!-- /ko -->\n"
                });
            }
        })(complexEditor = components.complexEditor || (components.complexEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {})); //
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var complexEditor;
        (function (complexEditor) {
            var ComplexEditorModel = /** @class */ (function () {
                function ComplexEditorModel(args, componentInfo) {
                    var _this = this;
                    this.subscriptions = [];
                    this.onUserChange = function () {
                        var data = _this.data();
                        if (data) {
                            _this.dataJson(JSON.stringify(data.$createJsonObj()));
                            if (_this.isDataValid) {
                                _this.isDataValid(data.$isValid());
                            }
                        }
                        else {
                            _this.dataJson(null);
                        }
                        return Promise.resolve();
                    };
                    var dataContext = ko.contextFor(componentInfo.element).$root;
                    this.definition = args.definition;
                    this.dataJson = args.dataJson;
                    this.isDataValid = args.isDataValid;
                    this.modelReady = ko.observable(false);
                    this.enabled = args.IsEnabled;
                    this.metadata = ko.pureComputed(function () {
                        try {
                            var parse = JSON.parse(ko.unwrap(_this.definition));
                            var metadataOk = _.isArray(parse === null || parse === void 0 ? void 0 : parse.metadata)
                                && _.every(parse.metadata, function (att) { return !!(att.Name && att.DataType); });
                            if (metadataOk) {
                                return parse.metadata;
                            }
                        }
                        catch (_a) {
                            // fail to parse will be indicated in errorMessage
                            return undefined;
                        }
                    });
                    this.visibleAttributes = ko.pureComputed(function () {
                        var metas = _this.metadata();
                        if (metas) {
                            return _.filter(metas, function (m) { return !m.Hidden; });
                        }
                        return [];
                    });
                    this.data = ko.computed(function () {
                        _this.modelReady(false);
                        if (_this.complex) {
                            _this.complex.$dispose();
                        }
                        var complex = new window.sf.runtime.DataContext(dataContext.$entities);
                        complex.$globals = dataContext.$globals;
                        complex.$subAttChanged(_this.onUserChange, [], 'userChangeCallback');
                        var metadata = _this.metadata();
                        if (metadata) {
                            _.each(metadata, function (mAtt) {
                                var meta = {
                                    type: mAtt.DataType,
                                    isRequired: mAtt.IsRequired
                                };
                                if (mAtt.Caption) {
                                    meta.caption = mAtt.Caption;
                                }
                                if (mAtt.MaxLength) {
                                    meta.maxLength = mAtt.MaxLength;
                                }
                                if (mAtt.Precision) {
                                    meta.precision = mAtt.Precision;
                                }
                                if (mAtt.Disabled) {
                                    meta.disabled = mAtt.Disabled;
                                }
                                complex === null || complex === void 0 ? void 0 : complex.$addAttribute({ name: mAtt.Name, meta: meta });
                            });
                            try {
                                var parse = JSON.parse(_this.definition());
                                if (parse && parse.initialData) {
                                    complex.$fromJson(parse.initialData);
                                }
                            }
                            catch (err) {
                                // if init data are not ok, we just log it in console but continue without prefilling
                                console.error("Error when trying to fill complex editor with init data. Definition: " + _this.definition());
                            }
                        }
                        _this.complex = complex;
                        _this.modelReady(true);
                        return complex;
                    });
                    this.errorMessage = ko.pureComputed(function () {
                        if (!_this.data()) {
                            return "Data model not found...";
                        }
                        if (!_this.definition()) {
                            return "Waiting for definition...";
                        }
                        if (!_this.metadata()) {
                            return "Problem with definition: " + _this.definition();
                        }
                        var attNotFound = _(_this.metadata())
                            .filter(function (m) { return !_this.data()[m.Name]; })
                            .map(function (m) { return m.Name; })
                            .sort()
                            .toArray()
                            .value();
                        if (attNotFound.length > 0) {
                            return "Following attributes were found in metadata but not in edited complex: " + attNotFound.join(', ');
                        }
                        return null;
                    });
                    ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () { return _this.dispose(); });
                }
                ComplexEditorModel.prototype.dispose = function () {
                    var _a;
                    (_a = this.complex) === null || _a === void 0 ? void 0 : _a.$dispose();
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                };
                return ComplexEditorModel;
            }());
            complexEditor.ComplexEditorModel = ComplexEditorModel;
        })(complexEditor = components.complexEditor || (components.complexEditor = {}));
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
