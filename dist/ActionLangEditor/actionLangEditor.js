var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var actionLangEditor;
        (function (actionLangEditor) {
            var ActionLangEditorModel = /** @class */ (function () {
                function ActionLangEditorModel(args, componentInfo) {
                    var _this = this;
                    this.isDisposed = false;
                    this.disposables = [];
                    // this should stay as arrow function to have access to this
                    this.onWindowResize = function () { _this.editor.layout(42); }; // setting value incompatible with IDimension to force the editor to do layout
                    this.code = args.code;
                    this.isValid = args.isValid;
                    this.contextJson = args.contextJson;
                    this.onCommunicationError = args.OnCommunicationError;
                    this.server = args.server;
                    this.completionUrl = args.completionUrl;
                    this.validationUrl = args.validationUrl;
                    require.config({ paths: { vs: '../resources' } });
                    require(['vs/editor/editor.main'], function () {
                        if (_this.isDisposed) {
                            return;
                        }
                        if (!ActionLangEditorModel.setupDone) {
                            monaco.languages.register({ id: 'actionLang' });
                            monaco.languages.setMonarchTokensProvider('actionLang', new actionLangEditor.TokenProvider());
                            ActionLangEditorModel.setupDone = true;
                        }
                        // CompletitionProvider is not part of ActionLangEditorModel setup because it needs reference to the model
                        _this.disposables.push(monaco.languages.registerCompletionItemProvider('actionLang', new actionLangEditor.CompletionProvider(_this)));
                        var containerElement = $(componentInfo.element).find('.sffw-actionlang-editor-container').get(0);
                        var codeStr = _this.code.$value();
                        _this.editor = monaco.editor.create(containerElement, {
                            value: codeStr,
                            language: 'actionLang',
                            minimap: {
                                enabled: false
                            },
                            automaticLayout: true,
                            fixedOverflowWidgets: true
                        });
                        _this.disposables.push(_this.editor.getModel().onDidChangeContent(function () {
                            if (!_this.isDisposed && !_this.changingEditorContent) {
                                return _this.code.$setValueAsync(_this.editor.getValue(), true).then(function () {
                                    if (!_this.isDisposed) {
                                        _this.validation.onCodeChange();
                                    }
                                });
                            }
                        }));
                        $(window).on('resize', _this.onWindowResize);
                        _this.validation = new actionLangEditor.Validation(_this);
                        _this.disposables.push(_this.code.$value.subscribe(function () {
                            if (!_this.isDisposed && (_this.code.$value() !== _this.editor.getValue())) {
                                _this.changingEditorContent = true;
                                _this.editor.setValue(_this.code.$value());
                                _this.changingEditorContent = false;
                                _this.validation.onCodeChange();
                            }
                        }));
                        window.sf = window.sf || {};
                        window.sf.codeEditor = _this.editor;
                    });
                }
                ActionLangEditorModel.prototype.getLines = function () {
                    return this.editor.getModel().getLinesContent();
                };
                ActionLangEditorModel.prototype.getContextObj = function () {
                    try {
                        return JSON.parse(ko.unwrap(this.contextJson.$value()));
                    }
                    catch (err) {
                        throw new Error("Error while parsing ActionLangEditor Context value from JSON\n" + err);
                    }
                };
                ActionLangEditorModel.prototype.setIsValid = function (value) {
                    if (this.isValid) {
                        return this.isValid.$setValueAsync(value, false);
                    }
                };
                ActionLangEditorModel.prototype.dispose = function () {
                    this.isDisposed = true;
                    if (this.validation) {
                        this.validation.dispose();
                    }
                    _.each(this.disposables, function (sub) {
                        if (sub && sub.dispose) {
                            sub.dispose();
                        }
                    });
                    $(window).off('resize', this.onWindowResize);
                    window.sf.codeEditor = null;
                };
                return ActionLangEditorModel;
            }());
            actionLangEditor.ActionLangEditorModel = ActionLangEditorModel;
        })(actionLangEditor = components.actionLangEditor || (components.actionLangEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var actionLangEditor;
        (function (actionLangEditor) {
            var CompletionProvider = /** @class */ (function () {
                function CompletionProvider(model) {
                    this.model = model;
                }
                CompletionProvider.prototype.provideCompletionItems = function (model, position) {
                    var lines = model.getLinesContent();
                    var completionRequestContent = JSON.stringify({
                        context: this.model.getContextObj(),
                        position: position,
                        lines: lines
                    });
                    return this.model.server.sendRequest(this.model.completionUrl, 'POST', null, completionRequestContent)
                        .then(function (response) {
                        if (!response.isError()) {
                            var result = JSON.parse(response.getJsonString());
                            if (result && result.completionItems) {
                                _.each(result.completionItems, function (item) {
                                    item.kind = monaco.languages.CompletionItemKind[item.kind];
                                });
                                return result.completionItems;
                            }
                            else {
                                return [];
                            }
                        }
                        else {
                            console.error(response.getErrorMessage());
                            return [];
                        }
                    })
                        .catch(function (err) {
                        console.error(err);
                        return [];
                    });
                };
                return CompletionProvider;
            }());
            actionLangEditor.CompletionProvider = CompletionProvider;
        })(actionLangEditor = components.actionLangEditor || (components.actionLangEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var actionLangEditor;
        (function (actionLangEditor) {
            if (ko && !ko.components.isRegistered('sffw-actionlang-editor')) {
                ko.components.register('sffw-actionlang-editor', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.actionLangEditor.ActionLangEditorModel(params, componentInfo); }
                    },
                    template: "\n<div class=\"sffw-actionlang-editor-container\"></div>"
                });
            }
        })(actionLangEditor = components.actionLangEditor || (components.actionLangEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var actionLangEditor;
        (function (actionLangEditor) {
            var TokenProvider = /** @class */ (function () {
                function TokenProvider() {
                    // Set defaultToken to invalid to see what you do not tokenize yet
                    this.defaultToken = 'invalid';
                    this.ignoreCase = true;
                    this.keywords = ['if', 'then', 'else', 'endif', 'foreach', 'do', 'endfor', 'and', 'or', 'not', 'in', 'while', 'endwhile', 'var'];
                    /* enums are DRE specific */
                    this.enums = ['rule', 'condition', 'selectioncriteria', 'satisfied', 'unsatisfied', 'required', 'optional', 'notused', 'select', 'none'];
                    this.operators = ['=', '<>', '<', '>', '<=', '>=', '+', '-', '*', '/', '=>', '?', ':'];
                    this.symbols = /[=><?:+\-*\/]+/;
                    this.escapes = /\\(?:[nrt\\"'])/;
                    this.tokenPostfix = '.actionLang';
                    this.tokenizer = {
                        root: [
                            // identifierskm, enums and keywords
                            [/[a-z_$][\w$]*/, { cases: { '@keywords': 'keyword', '@enums': 'keyword' /* DRE specific */, '@default': 'identifier' } }],
                            // whitespace
                            { include: '@whitespace' },
                            // guid
                            [/\{[a-fA-F,0-9]{8}-[a-fA-F,0-9]{4}-[a-fA-F,0-9]{4}-[a-fA-F,0-9]{4}-[a-fA-F,0-9]{12}\}/, 'number.hex'],
                            // date
                            [/'[0-9]{8}'[dD]{1}/, 'number.hex'],
                            // time
                            [/'[0-9]{6}'[tT]{1}/, 'number.hex'],
                            // datetime
                            [/'[0-9]{8} [0-9]{6}'[dD]{1}[tT]{1}/, 'number.hex'],
                            // delimiters and operators
                            [/[()\[\]]/, '@brackets'],
                            [/@symbols/, { cases: { '@operators': 'operator',
                                        '@default': '' } }],
                            // numbers
                            [/\d*\.\d+([eE][\-+]?\d+)?[fF]?/, 'number.float'],
                            [/\d+[fF]{1}/, 'number.float'],
                            [/\d*\.\d+[dD]?/, 'number.float'],
                            [/\d+[dD]{1}/, 'number.float'],
                            [/\d+/, 'number'],
                            // delimiter
                            [/[,.]/, 'delimiter'],
                            // strings
                            [/"([^"\\]|\\.)*$/, 'string.invalid'],
                            [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
                            // xpath
                            [/'([^'\\]|\\.)*$/, 'string.invalid'],
                            [/'/, { token: 'string.quote', bracket: '@open', next: '@xpath' }]
                        ],
                        comment: [
                            [/[^\/*]+/, 'comment'],
                            [/\/\*/, 'comment', '@push'],
                            ['\\*/', 'comment', '@pop'],
                            [/[\/*]/, 'comment']
                        ],
                        string: [
                            [/[^\\"]+/, 'string'],
                            [/@escapes/, 'string.escape'],
                            [/\\./, 'string.escape.invalid'],
                            [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
                        ],
                        xpath: [
                            [/[^\\']+/, 'string'],
                            [/@escapes/, 'string.escape'],
                            [/\\./, 'string.escape.invalid'],
                            [/'/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
                        ],
                        whitespace: [
                            [/[ \t\r\n]+/, 'white'],
                            [/\/\*/, 'comment', '@comment'],
                            [/\/\/.*$/, 'comment'],
                        ]
                    };
                }
                return TokenProvider;
            }());
            actionLangEditor.TokenProvider = TokenProvider;
        })(actionLangEditor = components.actionLangEditor || (components.actionLangEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var actionLangEditor;
        (function (actionLangEditor) {
            var Validation = /** @class */ (function () {
                function Validation(model) {
                    this.model = model;
                    this.validationDelay = 2000;
                    this.isDisposed = false;
                    this.model.setIsValid(true);
                }
                Validation.prototype.onCodeChange = function () {
                    var _this = this;
                    if (this.timeoutID !== null) {
                        clearTimeout(this.timeoutID);
                    }
                    this.timeoutID = setTimeout(function () { _this.validate(); }, this.validationDelay);
                };
                Validation.prototype.validate = function () {
                    var _this = this;
                    this.timeoutID = null;
                    var validationRequestContent = JSON.stringify({ context: this.model.getContextObj(), lines: this.model.getLines() });
                    return this.model.server.sendRequest(this.model.validationUrl, 'POST', null, validationRequestContent)
                        .then(function (response) {
                        if (_this.isDisposed) {
                            return;
                        }
                        var editorModel = _this.model.editor.getModel();
                        if (!editorModel) {
                            return; // model was disposed
                        }
                        if (!response.isError()) {
                            var responseJsonString = response.getJsonString();
                            var validationResponse_1 = responseJsonString.length > 0 ? JSON.parse(responseJsonString) : null;
                            if (validationResponse_1 && validationResponse_1.validationResults && validationResponse_1.validationResults.length > 0) {
                                return _this.model.setIsValid(false).then(function () {
                                    var markers = _this.prepareMarkers(validationResponse_1.validationResults);
                                    monaco.editor.setModelMarkers(editorModel, 'validation', markers);
                                });
                            }
                        }
                        // if there is problem with server response or it contain empty object, we remove validation errors
                        return _this.model.setIsValid(true).then(function () {
                            monaco.editor.setModelMarkers(editorModel, 'validation', []);
                        });
                    });
                };
                Validation.prototype.prepareMarkers = function (validationErrors) {
                    var result = [];
                    _.each(validationErrors, function (err) {
                        result.push({
                            startColumn: err.position.column + 1,
                            endColumn: err.position.column + 1,
                            severity: monaco.MarkerSeverity.Error,
                            message: err.error,
                            startLineNumber: err.position.lineNumber + 1,
                            endLineNumber: err.position.lineNumber + 1
                        });
                    });
                    return result;
                };
                Validation.prototype.dispose = function () {
                    if (this.timeoutID !== null) {
                        clearTimeout(this.timeoutID);
                        this.timeoutID = null;
                        this.isDisposed = true;
                    }
                };
                return Validation;
            }());
            actionLangEditor.Validation = Validation;
        })(actionLangEditor = components.actionLangEditor || (components.actionLangEditor = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
