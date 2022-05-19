var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var modalDialog;
        (function (modalDialog) {
            var DialogButton;
            (function (DialogButton) {
                DialogButton[DialogButton["Cancel"] = 0] = "Cancel";
                DialogButton[DialogButton["OK"] = 1] = "OK";
                DialogButton[DialogButton["Yes"] = 2] = "Yes";
                DialogButton[DialogButton["No"] = 3] = "No";
            })(DialogButton = modalDialog.DialogButton || (modalDialog.DialogButton = {}));
            var ModalDialog = /** @class */ (function () {
                function ModalDialog(datacontext, args) {
                    var _this = this;
                    this.subscriptions = [];
                    var locF;
                    if (typeof datacontext.$entities.$localizeText === 'function') {
                        locF = datacontext.$entities.$localizeText;
                    }
                    else {
                        throw new Error('Localization function was not found');
                    }
                    var afterViewModelCreated = function (model) {
                        _this.model = model;
                    };
                    // inject component
                    var componentParams = 'locF: locF, afterViewModelCreated: afterViewModelCreated';
                    this.$modalDlgComponent = $("<modal-dialog params=\"" + componentParams + "\"></modal-dialog>");
                    this.$modalDlgComponent.insertAfter('#mainFormHolder');
                    var vm = { locF: locF, afterViewModelCreated: afterViewModelCreated };
                    ko.applyBindings(vm, this.$modalDlgComponent[0]);
                }
                ModalDialog.prototype.showAlertAsync = function (args) {
                    var self = this;
                    if (typeof args.message === 'function') {
                        self.model.message = args.message;
                    }
                    else {
                        self.model.message(args.message);
                    }
                    if (typeof args.title === 'function') {
                        self.model.title = args.title;
                    }
                    else {
                        self.model.title(args.title);
                    }
                    self.model.buttons([DialogButton.OK]);
                    return new Promise(function (resolve, reject) {
                        self.showDialog();
                        self.bindAlertClickHandlers(resolve, reject);
                    }).then(function (result) {
                        self.unbindAlertClickHandlers();
                        self.hideDialog();
                        return;
                    }).catch(function () {
                        self.unbindAlertClickHandlers();
                        self.hideDialog();
                        return;
                    });
                };
                ModalDialog.prototype.showConfirmAsync = function (args) {
                    var self = this;
                    if (typeof args.message === 'function') {
                        self.model.message = args.message;
                    }
                    else {
                        self.model.message(args.message);
                    }
                    if (typeof args.title === 'function') {
                        self.model.title = args.title;
                    }
                    else {
                        self.model.title(args.title);
                    }
                    self.model.buttons([DialogButton.OK, DialogButton.Cancel]);
                    self.model.primaryButton(DialogButton.OK);
                    return new Promise(function (resolve, reject) {
                        self.showDialog();
                        self.bindConfirmClickHandlers(resolve, reject);
                    }).then(function (result) {
                        self.unbindConfirmClickHandlers();
                        self.hideDialog();
                        return result;
                    }).catch(function () {
                        self.unbindConfirmClickHandlers();
                        self.hideDialog();
                        return false;
                    });
                };
                ModalDialog.prototype.bindAlertClickHandlers = function (resolve, reject) {
                    $('.sffw-modal-dialog-container .modal-dialog .btn-ok').on('click', function () {
                        resolve();
                    });
                };
                ModalDialog.prototype.bindConfirmClickHandlers = function (resolve, reject) {
                    $('.sffw-modal-dialog-container .modal-dialog .btn-ok').on('click', function () {
                        resolve(true);
                    });
                    $('.sffw-modal-dialog-container .modal-dialog .btn-cancel').on('click', function () {
                        reject();
                    });
                };
                ModalDialog.prototype.unbindAlertClickHandlers = function () {
                    $('.sffw-modal-dialog-container .modal-dialog .btn-ok').off('click');
                };
                ModalDialog.prototype.unbindConfirmClickHandlers = function () {
                    $('.sffw-modal-dialog-container .modal-dialog .btn-ok').off('click');
                    $('.sffw-modal-dialog-container .modal-dialog .btn-cancel').off('click');
                };
                ModalDialog.prototype.showDialog = function () {
                    // inject backdrop
                    this.$modalDlgBackdrop = $("<div class=\"modal-backdrop fade in\"></div>");
                    this.$modalDlgBackdrop.insertAfter('#mainFormHolder');
                    $('.sffw-modal-dialog-container').show();
                    this.registerTabKeyHandler();
                };
                ModalDialog.prototype.hideDialog = function () {
                    this.unregisterTabKeyHandler();
                    $('.sffw-modal-dialog-container').hide();
                    // remove backdrop
                    this.$modalDlgBackdrop.remove();
                };
                ModalDialog.prototype.registerTabKeyHandler = function () {
                    var focusableElements = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
                    var $modal = this.$modalDlgComponent.find('.sffw-modal-dialog-container');
                    var $focusableContent = $modal.find(focusableElements).filter(':visible');
                    var $firstFocusableElement = $focusableContent.first();
                    var $lastFocusableElement = $focusableContent.last();
                    $(document).on('keydown.modaldialog', function (e) {
                        var isTabPressed = e.key === 'Tab' || e.keyCode === 9;
                        if (!isTabPressed) {
                            return;
                        }
                        if (e.shiftKey) { // if shift key pressed for shift + tab combination
                            if (document.activeElement === $firstFocusableElement[0]) {
                                $lastFocusableElement.trigger('focus'); // add focus for the last focusable element
                                e.preventDefault();
                            }
                        }
                        else { // if tab key is pressed
                            if (document.activeElement === $lastFocusableElement[0]) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                                $firstFocusableElement.trigger('focus'); // add focus for the first focusable element
                                e.preventDefault();
                            }
                        }
                    });
                    $firstFocusableElement.trigger('focus');
                    // $modal.trigger('focus');
                };
                ModalDialog.prototype.unregisterTabKeyHandler = function () {
                    $(document).off('keydown.modaldialog');
                };
                ModalDialog.prototype.dispose = function () {
                    _.each(this.subscriptions, function (sub) { return sub.dispose(); });
                    ko.cleanNode(this.$modalDlgComponent[0]);
                    this.$modalDlgComponent.remove();
                    this.model = null;
                };
                return ModalDialog;
            }());
            modalDialog.ModalDialog = ModalDialog;
        })(modalDialog = api.modalDialog || (api.modalDialog = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.api.modalDialog.ModalDialog;
    });
}
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var modalDialog;
        (function (modalDialog) {
            var ModalDialogModel = /** @class */ (function () {
                function ModalDialogModel(params, componentInfo) {
                    var _this = this;
                    this.buttons = ko.observableArray();
                    this.primaryButton = ko.observable();
                    this.message = ko.observable();
                    this.title = ko.observable();
                    this.locF = params.locF;
                    this.locF = params.locF;
                    this.getIsBtnVisible = function (button) {
                        return _this.buttons.indexOf(button) > -1;
                    };
                    this.getIsBtnOkVisible = function () {
                        return _this.getIsBtnVisible(modalDialog.DialogButton.OK);
                    };
                    this.getIsBtnCancelVisible = function () {
                        return _this.getIsBtnVisible(modalDialog.DialogButton.Cancel);
                    };
                    this.getIsBtnPrimary = function (button) {
                        return _this.primaryButton() === button;
                    };
                    this.getIsBtnOkprimary = function () {
                        return _this.getIsBtnPrimary(modalDialog.DialogButton.OK);
                    };
                    this.getIsBtnCancelprimary = function () {
                        return _this.getIsBtnPrimary(modalDialog.DialogButton.Cancel);
                    };
                    this.isBtnCancelVisible = ko.pureComputed(this.getIsBtnCancelVisible, this);
                    this.isBtnOkVisible = ko.pureComputed(this.getIsBtnOkVisible, this);
                    this.isBtnCancelPrimary = ko.pureComputed(this.getIsBtnCancelprimary, this);
                    this.isBtnOkPrimary = ko.pureComputed(this.getIsBtnOkprimary, this);
                    if (params.afterViewModelCreated) {
                        params.afterViewModelCreated(this);
                    }
                }
                return ModalDialogModel;
            }());
            modalDialog.ModalDialogModel = ModalDialogModel;
        })(modalDialog = api.modalDialog || (api.modalDialog = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var modalDialog;
        (function (modalDialog) {
            if (ko && !ko.components.isRegistered('modal-dialog')) {
                ko.components.register('modal-dialog', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.api.modalDialog.ModalDialogModel(params, componentInfo); }
                    },
                    template: "<div data-bind=\"attr: { 'aria-label': title, 'aria-description': message }\"\n                        class=\"sffw-modal-dialog-container\" tabindex=\"-1\" role=\"dialog\" aria-modal=\"true\">\n                        <div class=\"modal-dialog\" role=\"document\">\n                            <div class=\"modal-content\">\n                                <div class=\"modal-header\">\n                                    <h1 class=\"modal-title\" data-bind=\"text: title\"></h1>\n                                </div>\n                                <div class=\"modal-body\">\n                                    <p data-bind=\"text: message\"></p>\n                                </div>\n                                <div class=\"modal-footer\">\n                                    <button class=\"btn dialog-btn btn-cancel\" data-bind=\"visible: isBtnCancelVisible, css: { 'dialog-btn-primary': isBtnCancelPrimary }, text: locF('ModalDialog$$Cancel')\"></button>\n                                    <button class=\"btn dialog-btn btn-ok\" data-bind=\"visible: isBtnOkVisible, css: { 'dialog-btn-primary': isBtnOkPrimary }, text: locF('ModalDialog$$OK')\"></button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>"
                });
            }
        })(modalDialog = api.modalDialog || (api.modalDialog = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    function extractEventHandlerFromApiArgs(datacontext, args, eventName) {
        if (args.$events && args.$events[eventName] && args.$events[eventName].Reference) {
            if (args.$events[eventName].ReferenceType === 'Global') {
                return datacontext.$globals.$actions[args.$events[eventName].Reference];
            }
            else {
                return datacontext.$actions[args.$events[eventName].Reference];
            }
        }
        return undefined;
    }
    sffw.extractEventHandlerFromApiArgs = extractEventHandlerFromApiArgs;
})(sffw || (sffw = {}));
