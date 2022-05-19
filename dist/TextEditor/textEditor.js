var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var textEditor;
        (function (textEditor) {
            if (ko && !ko.components.isRegistered('sffw-text-editor')) {
                ko.components.register('sffw-text-editor', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.textEditor.TextEditorModel(params, componentInfo); }
                    },
                    template: "\n<div class=\"sffw-text-editor-container\"></div>"
                });
            }
        })(textEditor = components.textEditor || (components.textEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var textEditor;
        (function (textEditor) {
            var TextEditorModel = /** @class */ (function () {
                function TextEditorModel(args, componentInfo) {
                    var _this = this;
                    this.subscriptions = [];
                    // this should stay as arrow function to have access to this
                    this.onWindowResize = function () { _this.editor.layout(42); }; // setting value incompatible with IDimension to force the editor to do layout
                    this.code = args.code;
                    this.language = args.language;
                    require.config({ paths: { vs: '../resources' } });
                    require(['vs/editor/editor.main'], function () {
                        var containerElement = $(componentInfo.element).find('.sffw-text-editor-container').get(0);
                        var codeStr = _this.code();
                        _this.editor = monaco.editor.create(containerElement, {
                            value: codeStr,
                            language: _this.language,
                            minimap: {
                                enabled: false
                            },
                            automaticLayout: true,
                            fixedOverflowWidgets: true
                        });
                        _this.subscriptions.push(_this.editor.getModel().onDidChangeContent(function () {
                            _this.code(_this.editor.getValue());
                        }));
                        $(window).on('resize', _this.onWindowResize);
                        _this.subscriptions.push(_this.code.subscribe(function () {
                            if (_this.code() !== _this.editor.getValue()) {
                                _this.editor.setValue(_this.code());
                            }
                        }));
                    });
                }
                TextEditorModel.prototype.dispose = function () {
                    _.each(this.subscriptions, function (sub) {
                        if (sub && sub.dispose) {
                            sub.dispose();
                        }
                    });
                    $(window).off('resize', this.onWindowResize);
                    window.sf.codeEditor = null;
                };
                return TextEditorModel;
            }());
            textEditor.TextEditorModel = TextEditorModel;
        })(textEditor = components.textEditor || (components.textEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
