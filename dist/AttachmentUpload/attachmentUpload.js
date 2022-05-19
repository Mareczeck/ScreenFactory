var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var attachmentUpload;
        (function (attachmentUpload) {
            var AttachmentUploaderViewerModel = /** @class */ (function () {
                function AttachmentUploaderViewerModel(params, componentInfo) {
                    var _this = this;
                    this.declarationKind = ko.observable();
                    this.newAttachments = ko.observableArray();
                    this.attachments = ko.observableArray();
                    this.subscriptions = [];
                    this.events_handlePreventDefault = 'dragenter.attachmentUpload.handlePreventDefault dragover.attachmentUpload.handlePreventDefault dragleave.attachmentUpload.handlePreventDefault drop.attachmentUpload.handlePreventDefault';
                    this.events_handleDragEnterDragOver = 'dragenter.attachmentUpload.handleDragEnterDragOver dragover.attachmentUpload.handleDragEnterDragOver';
                    this.events_handleDragLeaveDrop = 'dragleave.attachmentUpload.handleDragLeaveDrop drop.attachmentUpload.handleDragLeaveDrop';
                    this.documentTypeOptions = ko.observableArray();
                    this._internalAttachmentsCollectionUpdate = false;
                    this.dataContext = params.$parentData;
                    // server
                    this.server = params.server;
                    if (!this.server) {
                        throw new Error('[AttachmentUploaderViewer.server] Failed to find ServerConnection');
                    }
                    // documentTypeCodelist
                    this.documentTypeCodelist = params.documentTypeCodelist;
                    if (this.documentTypeCodelist) {
                        this.documentTypeOptions(this.getSelectOptionsFromSource(this.documentTypeCodelist));
                        this.subscriptions.push(this.documentTypeCodelist.items.subscribe(function () {
                            _this.documentTypeOptions(_this.getSelectOptionsFromSource(_this.documentTypeCodelist));
                        }));
                        this.documentTypeValueMember = this.documentTypeCodelist.getValueMemberName();
                        this.documentTypeDisplayMember = this.documentTypeCodelist.getDisplayMemberName();
                        this.documentTypeServerDescriptionColumn = this.documentTypeCodelist.getServerDescriptionColumnName();
                    }
                    else {
                        throw new Error('[AttachmentUploaderViewer.documentTypeCodelist] Failed to find Codelist');
                    }
                    this.notificationsController = params.notificationsController;
                    this.modalDialog = params.modalDialog;
                    this.fileTypeFilter = params.fileTypeFilter;
                    if (_.isUndefined(params.allowMultipleFiles)) {
                        this.allowMultipleFiles = true;
                    }
                    else {
                        this.allowMultipleFiles = params.allowMultipleFiles;
                    }
                    this.maxFileSize = params.maxFileSize || 3700;
                    this.uploadRequestMessageType = params.uploadRequestMessageType || 'uploadAttachment';
                    this.uploadResponseMessageType = params.uploadResponseMessageType || 'uploadAttachmentResponse';
                    this.deleteRequestMessageType = params.deleteRequestMessageType || 'removeDocumentIds';
                    this.deleteResponseMessageType = params.deleteResponseMessageType || 'removeDocumentIdsResponse';
                    this.declarationKind = params.declarationKind;
                    if (_.isUndefined(params.requiredByCustoms)) {
                        this.requiredByCustoms = false;
                    }
                    else {
                        this.requiredByCustoms = params.requiredByCustoms;
                    }
                    if (_.isUndefined(params.cwar)) {
                        this.cwar = true;
                    }
                    else {
                        this.cwar = params.cwar;
                    }
                    this.canBeRemoved = params.canBeRemoved;
                    if (_.isUndefined(params.isEditMode)) {
                        this.isEditMode = true;
                    }
                    else {
                        this.isEditMode = params.isEditMode;
                    }
                    this.isNewAttName = params.isNewAttName || 'isNew';
                    this.documentLinkAttName = params.documentLinkAttName || 'documentLink';
                    this.mrn = params.mrn;
                    this.onAttachmentOpenClickHandler = params.OnAttachmentOpenClick;
                    this.onUploadFinishedHandler = params.OnUploadFinished;
                    this.$componentElem = $(componentInfo.element);
                    this.fileTypesArray = ko.pureComputed(this.getFileTypesArray, this);
                    if (params.newAttachmentsCollection) {
                        this.newAttachmentsCollection = params.newAttachmentsCollection;
                    }
                    if (params.attachmentsCollection) {
                        this.attachmentsCollection = params.attachmentsCollection;
                        this.loadUploadedAttachments();
                        this.subscriptions.push(this.attachmentsCollection.$items.subscribe(this.loadUploadedAttachments, this, 'arrayChange'));
                    }
                    this.iconClasses = {
                        iconAdd: params.iconAdd || 'icon icon-tulli-add',
                        iconRemove: params.iconRemove || 'icon icon-tulli-delete',
                        iconUpload: params.iconUpload || 'icon icon-tulli-service-upload',
                        iconCancel: params.iconCancel || 'icon icon-tulli-close',
                        iconUp: params.iconUp || 'icon icon-tulli-arrow-up',
                        iconDown: params.iconDown || 'icon icon-tulli-arrow-down'
                    };
                    this.isRemoveAllEnabled = ko.pureComputed(this.getIsRemoveAllEnabled, this);
                    this.isUploadAllEnabled = ko.pureComputed(this.getIsUploadAllEnabled, this);
                    this.isAddDetailsVisible = ko.pureComputed(this.getIsAddDetailsVisible, this);
                    this.isUploadedAttachmentsVisible = ko.pureComputed(this.getIsUploadedAttachmentsVisible, this);
                    this.removeAllBtnEnabledBindingValue = ko.pureComputed(this.getRemoveAllBtnEnabledBindingValue, this);
                    this.removeAllBtnAriaDisabledBindingValue = ko.pureComputed(this.getRemoveAllBtnAriaDisabledBindingValue, this);
                    this.uploadAllBtnEnabledBindingValue = ko.pureComputed(this.getUploadAllBtnEnabledBindingValue, this);
                    this.uploadAllBtnAriaDisabledBindingValue = ko.pureComputed(this.getUploadAllBtnAriaDisabledBindingValue, this);
                    var self = this;
                    self.onAttachmentOpenClick = function (item, event) {
                        var promiseChain = Promise.resolve();
                        if (self.onAttachmentOpenClickHandler) {
                            promiseChain = promiseChain.then(function () {
                                var itemClickParams = { documentId: item.documentId };
                                return self.onAttachmentOpenClickHandler(null, event, itemClickParams);
                            });
                            return false;
                        }
                        else {
                            return true;
                        }
                    };
                    this.registerTemplateEventHandlers(self);
                    var dropArea = self.getDropArea();
                    this.registerNontemplateEventHandlers(self, dropArea);
                }
                //#region public methods (api)
                AttachmentUploaderViewerModel.prototype.updateNewAttachmentsCollection = function () {
                    var _this = this;
                    var newAttachmentObjects = _.map(this.newAttachments(), function (obj) {
                        if (ko.unwrap(obj.documentType)) {
                            return { fileName: obj.fileName(), description: obj.description(), newAttachmentStatus: obj.newAttachmentStatus(), documentType: _this.getDocumentTypeRefListItem(obj) };
                        }
                        else {
                            return { fileName: obj.fileName(), description: obj.description(), newAttachmentStatus: obj.newAttachmentStatus() };
                        }
                    });
                    var promiseChain = this.newAttachmentsCollection.$fromJson(newAttachmentObjects);
                    return promiseChain;
                };
                AttachmentUploaderViewerModel.prototype.getDocumentTypeText = function (docType) {
                    return docType[this.documentTypeDisplayMember];
                };
                AttachmentUploaderViewerModel.prototype.onSelectFileClick = function (model, event) {
                    var btnSelectFileNative = model.getBtnSelectFileNative();
                    event.preventDefault();
                    $(btnSelectFileNative).trigger('click');
                };
                //#endregion
                AttachmentUploaderViewerModel.prototype.registerTemplateEventHandlers = function (self) {
                    var _this = this;
                    self.removeAttachment = function (item) {
                        var message = self.dataContext.$localize('AttachmentUpload$$removeAttachmentConfirmText');
                        var title = self.dataContext.$localize('AttachmentUpload$$removeAttachment');
                        return self.modalDialog.showConfirmAsync({ message: message, title: title }).then(function (result) {
                            if (result === true) {
                                self.newAttachments.remove(item);
                                return self.updateNewAttachmentsCollection();
                            }
                        });
                    };
                    self.removeUploadedAttachment = function (item) {
                        var message = self.dataContext.$localize('AttachmentUpload$$removeAttachmentConfirmText');
                        var title = self.dataContext.$localize('AttachmentUpload$$removeAttachment');
                        return self.modalDialog.showConfirmAsync({ message: message, title: title }).then(function (result) {
                            if (result === true) {
                                return self.createRemoveAttachmentPromise(item, self);
                            }
                            else {
                                return Promise.resolve();
                            }
                        }).then(function (res) {
                            return self.updateAttachmentsCollection();
                        }).catch(function (err) {
                            console.error(err);
                            self.notificationsController.addError({ message: err });
                        });
                    };
                    self.removeAllAttachments = function (model, event) {
                        var _a, _b;
                        if (ko.unwrap(self.isRemoveAllEnabled)) {
                            var message = self.dataContext.$localize('AttachmentUpload$$removeAllAttachmentsConfirmText');
                            var title = self.dataContext.$localize('AttachmentUpload$$removeAllAttachments');
                            return self.modalDialog.showConfirmAsync({ message: message, title: title }).then(function (result) {
                                if (result === true) {
                                    self.newAttachments.removeAll();
                                    return self.updateNewAttachmentsCollection();
                                }
                            });
                        }
                        else if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            var $button = $((event.currentTarget || event.srcElement));
                            var msg = window.sf.localization.currentCulture().errorFormatter.formatButtonDisabled($button.text());
                            sffw.safeWriteToAriaLiveRegion(msg);
                        }
                    };
                    self.removeAllUploadedAttachments = function () {
                        var message = self.dataContext.$localize('AttachmentUpload$$removeAllAttachmentsConfirmText');
                        var title = self.dataContext.$localize('AttachmentUpload$$removeAllAttachments');
                        return self.modalDialog.showConfirmAsync({ message: message, title: title }).then(function (result) {
                            var arr = [];
                            if (result === true) {
                                arr = _.map(self.attachments(), function (obj) {
                                    return self.createRemoveAttachmentPromise(obj, self);
                                });
                            }
                            return arr;
                        }).then(function (arr) {
                            return Promise.all(arr);
                        }).then(function () {
                            return self.updateAttachmentsCollection();
                        }).catch(function (err) {
                            console.error(err);
                            self.notificationsController.addError({ message: err });
                        });
                    };
                    self.uploadAllAttachments = function (model, event) {
                        var _a, _b;
                        if (ko.unwrap(self.isUploadAllEnabled)) {
                            var arr = _.map(self.newAttachments(), function (obj) {
                                obj.newAttachmentStatus(attachmentUpload.AttachmentStatus.Uploading);
                                return self.createUploadAttachmentPromise(obj, self);
                            });
                            Promise.all(arr).then(function (results) {
                                // if at least one upload passed ok, invoke OnUploadFinished
                                if (results.indexOf(true) > -1) {
                                    if (self.onUploadFinishedHandler) {
                                        self.onUploadFinishedHandler();
                                    }
                                }
                            });
                        }
                        else if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                            var $button = $((event.currentTarget || event.srcElement));
                            var msg = window.sf.localization.currentCulture().errorFormatter.formatButtonDisabled($button.text());
                            sffw.safeWriteToAriaLiveRegion(msg);
                        }
                    };
                    self.cancelUpload = function (item) {
                        var message = self.dataContext.$localize('AttachmentUpload$$cancelUploadConfirmText');
                        var title = self.dataContext.$localize('AttachmentUpload$$cancelUpload');
                        return self.modalDialog.showConfirmAsync({ message: message, title: title }).then(function (result) {
                            if (result === true) {
                                item.pendingRequest.abort();
                                item.newAttachmentStatus(attachmentUpload.AttachmentStatus.UploadError);
                                item.percent(null);
                                item.pendingRequest = null;
                            }
                        });
                    };
                    self.handleFilesFromInput = function (files) {
                        return self.handleFiles(files).then(function () {
                            // reset file input for further file selection
                            var $input = self.getBtnSelectFileNative();
                            var form = $input.wrap('<form>').closest('form').get(0);
                            form.reset();
                            $input.unwrap();
                        });
                    };
                    self.onRowUp = function (item) {
                        return new Promise(function (resolve) {
                            var colIdx = _this.attachments.indexOf(item);
                            if (colIdx > 0) {
                                sffw.moveArrayItem(_this.attachments, item, 'up');
                            }
                            resolve();
                        }).then(function () {
                            return self.updateAttachmentsCollection();
                        });
                    };
                    self.onRowDown = function (item) {
                        return new Promise(function (resolve) {
                            var colIdx = _this.attachments.indexOf(item);
                            if (colIdx < _this.attachments().length - 1) {
                                sffw.moveArrayItem(_this.attachments, item, 'down');
                            }
                            resolve();
                        }).then(function () {
                            return self.updateAttachmentsCollection();
                        });
                    };
                };
                AttachmentUploaderViewerModel.prototype.registerNontemplateEventHandlers = function (self, dropArea) {
                    // preventDefaults
                    $(window).on(self.events_handlePreventDefault, function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    $(dropArea).on(self.events_handlePreventDefault, function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    // setDDUnavailable
                    $(window).on(self.events_handleDragEnterDragOver, function (e) {
                        if (e.originalEvent instanceof DragEvent) {
                            e.originalEvent.dataTransfer.dropEffect = 'none';
                        }
                    });
                    // highlight
                    $(dropArea).on(self.events_handleDragEnterDragOver, function (e) {
                        dropArea.addClass('highlight');
                        if (e.originalEvent instanceof DragEvent) {
                            e.originalEvent.dataTransfer.dropEffect = 'copy';
                        }
                    });
                    // unhighlight
                    $(dropArea).on(self.events_handleDragLeaveDrop, function (e) {
                        dropArea.removeClass('highlight');
                    });
                    // handleDrop
                    $(dropArea).on('drop.attachmentUpload.handleDrop', function (e) {
                        if (e.originalEvent instanceof DragEvent) {
                            var dt = e.originalEvent.dataTransfer;
                            var files = dt.files;
                            self.handleFiles(files);
                        }
                    });
                };
                AttachmentUploaderViewerModel.prototype.loadUploadedAttachments = function (collection) {
                    if (!this._internalAttachmentsCollectionUpdate) {
                        this.attachments(this.attachmentsCollection.$createJsonObj());
                    }
                };
                AttachmentUploaderViewerModel.prototype.createUploadAttachmentPromise = function (obj, self) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        self.startUpload(obj).then(function (req) { return new sffw.ServerResponse(req); }).then(function (res) {
                            var _a;
                            obj.pendingRequest = null;
                            if (res.isError()) {
                                reject(res.getErrorMessage() + " (" + obj.fileName() + ")");
                            }
                            else {
                                // TODO ??:
                                // if not expected response type then invoke onunexpectedresponse event
                                var msgType = res.getMessageType();
                                if (msgType === self.uploadResponseMessageType) {
                                    var docType = _this.getDocumentTypeRefListItem(obj);
                                    var retObj = JSON.parse(res.getJsonString());
                                    var att = (_a = { fileName: obj.fileName(), description: obj.description(), documentType: docType, documentId: retObj.documentId, checkSum: retObj.checkSum }, _a[_this.isNewAttName] = true, _a);
                                    self.attachments.push(att);
                                    self.newAttachments.remove(obj);
                                    resolve(res);
                                }
                                else {
                                    var rejectMsg = _this.dataContext.$localize('AttachmentUpload$$receivedUnexpectedUploadResponse');
                                    rejectMsg = rejectMsg.replace('{fileName}', obj.fileName()).replace('{msgType}', msgType);
                                    reject(rejectMsg);
                                }
                            }
                        });
                    }).then(function () {
                        return self.updateNewAttachmentsCollection().then(function () {
                            return self.updateAttachmentsCollection();
                        }).then(function () {
                            return true;
                        });
                    }).catch(function (err) {
                        console.error(err);
                        obj.newAttachmentStatus(attachmentUpload.AttachmentStatus.UploadError);
                        obj.percent(null);
                        self.notificationsController.addError({ message: err });
                        return false;
                    });
                };
                AttachmentUploaderViewerModel.prototype.createRemoveAttachmentPromise = function (obj, self) {
                    var _this = this;
                    return new Promise(function (resolve, reject) {
                        if (obj[_this.isNewAttName] === true) {
                            resolve(self.delete(obj));
                        }
                        else {
                            resolve(null);
                        }
                    }).then(function (res) {
                        if (res) {
                            if (res.isError()) {
                                // tslint:disable-next-line: no-string-throw
                                throw (res.getErrorMessage() + " (" + obj.fileName + ")");
                            }
                            else {
                                // TODO ??:
                                // if not expected response type then invoke onunexpectedresponse event
                                var msgType = res.getMessageType();
                                if (msgType === self.deleteResponseMessageType) {
                                    self.attachments.remove(obj);
                                }
                                else {
                                    var msg = _this.dataContext.$localize('AttachmentUpload$$receivedUnexpectedRemoveResponse');
                                    msg = msg.replace('{fileName}', obj.fileName).replace('{msgType}', msgType);
                                    throw (msg);
                                }
                            }
                        }
                        else {
                            self.attachments.remove(obj);
                        }
                    });
                };
                AttachmentUploaderViewerModel.prototype.startUpload = function (obj) {
                    var _this = this;
                    return new Promise(function (resolve) {
                        obj.getFileContent().then(function (content) {
                            var objMsg = {
                                fileName: obj.fileName(),
                                description: obj.description(),
                                documentType: _this.getDocumentTypeRefListItem(obj)[_this.documentTypeValueMember],
                                documentTypeTitle: _this.getDocumentTypeRefListItem(obj)[_this.documentTypeServerDescriptionColumn],
                                declarationKind: ko.unwrap(_this.declarationKind).$createJsonObj(),
                                requiredByCustoms: ko.unwrap(_this.requiredByCustoms),
                                cwar: ko.unwrap(_this.cwar),
                                mrn: ko.unwrap(_this.mrn),
                                canBeRemoved: ko.unwrap(_this.canBeRemoved),
                                language: obj.getLanguage(),
                                fileData: content
                            };
                            return objMsg;
                        }).then(function (msg) {
                            var pho = { objName: obj.fileName(),
                                onUploadProgressChanged: obj.onUploadProgressChanged
                            };
                            return _this.server.startPostAsync({ url: _this.uploadRequestMessageType, data: JSON.stringify(msg), progress: pho }).then(function (req) {
                                req.onreadystatechange = function () {
                                    if (req.readyState === req.DONE) {
                                        resolve(req);
                                    }
                                };
                                obj.pendingRequest = req;
                            });
                        });
                    });
                };
                AttachmentUploaderViewerModel.prototype.delete = function (obj) {
                    var msg = { documentId: [{ id: obj.documentId, checkSum: obj.checkSum }] };
                    return this.server.postAsync({ url: this.deleteRequestMessageType, data: JSON.stringify(msg) });
                };
                AttachmentUploaderViewerModel.prototype.updateAttachmentsCollection = function () {
                    var _this = this;
                    return Promise.resolve().then(function () {
                        _this._internalAttachmentsCollectionUpdate = true;
                    }).then(function () {
                        return _this.attachmentsCollection.$fromJson(_this.attachments());
                    }).then(function (resolve) {
                        _this._internalAttachmentsCollectionUpdate = false;
                    });
                };
                AttachmentUploaderViewerModel.prototype.getDocumentTypeRefListItem = function (obj) {
                    var valueMember = this.documentTypeValueMember;
                    var selectedDocumentType = ko.unwrap(obj.documentType);
                    if (selectedDocumentType) {
                        return _(this.documentTypeCodelist.items()).find(function (o) {
                            return typeof (o[valueMember]) !== 'undefined' && o[valueMember] !== null && o[valueMember].toString() === selectedDocumentType;
                        });
                    }
                    else {
                        return null;
                    }
                };
                //#region computed observables methods
                AttachmentUploaderViewerModel.prototype.getFileTypesArray = function () {
                    var ret = [];
                    var x = ko.unwrap(this.fileTypeFilter).toLowerCase();
                    if (x) {
                        try {
                            var str = x.replace(/\s+/g, '');
                            ret = str.split(',');
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    return ret;
                };
                AttachmentUploaderViewerModel.prototype.getIsRemoveAllEnabled = function () {
                    if (this.newAttachments().length === 0) {
                        return false;
                    }
                    return !(_.some(this.newAttachments(), function (obj) {
                        // all attachments without validation errors = both fileName and documentType filled
                        // fileName must have maximum length 100 chars
                        return obj.hasStatusUploading();
                    }));
                };
                AttachmentUploaderViewerModel.prototype.getIsUploadAllEnabled = function () {
                    if (this.newAttachments().length === 0) {
                        return false;
                    }
                    return !(_.some(this.newAttachments(), function (obj) {
                        // all attachments without validation errors = both fileName and documentType filled
                        // fileName must have maximum length 100 chars
                        return obj.hasValidationErrors() || obj.hasStatusUploading();
                    }));
                };
                AttachmentUploaderViewerModel.prototype.getIsAddDetailsVisible = function () {
                    return this.newAttachments().length > 0;
                };
                AttachmentUploaderViewerModel.prototype.getIsUploadedAttachmentsVisible = function () {
                    return this.attachments().length > 0;
                };
                // to use with ko enabled binding
                AttachmentUploaderViewerModel.prototype.getRemoveAllBtnEnabledBindingValue = function () {
                    var _a, _b;
                    if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                        return true;
                    }
                    else {
                        return ko.unwrap(this.isRemoveAllEnabled) || false;
                    }
                };
                // to use with ko aria-disabled attr binding instead of enabled binding
                AttachmentUploaderViewerModel.prototype.getRemoveAllBtnAriaDisabledBindingValue = function () {
                    var _a, _b;
                    if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                        return !(ko.unwrap(this.isRemoveAllEnabled) || false);
                    }
                    else {
                        return null;
                    }
                };
                // to use with ko enabled binding
                AttachmentUploaderViewerModel.prototype.getUploadAllBtnEnabledBindingValue = function () {
                    var _a, _b;
                    if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                        return true;
                    }
                    else {
                        return ko.unwrap(this.isUploadAllEnabled) || false;
                    }
                };
                // to use with ko aria-disabled attr binding instead of enabled binding
                AttachmentUploaderViewerModel.prototype.getUploadAllBtnAriaDisabledBindingValue = function () {
                    var _a, _b;
                    if ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusableDisabledButtons) {
                        return !(ko.unwrap(this.isUploadAllEnabled) || false);
                    }
                    else {
                        return null;
                    }
                };
                //#region
                AttachmentUploaderViewerModel.prototype.getDropArea = function () {
                    return this.$componentElem.find('.upload-box');
                };
                AttachmentUploaderViewerModel.prototype.getBtnSelectFileNative = function () {
                    return this.$componentElem.find('input.btn-hidden');
                };
                AttachmentUploaderViewerModel.prototype.handleFiles = function (files) {
                    var _this = this;
                    var justAdded = [];
                    var promiseChain = Promise.resolve();
                    _.forEach(files, function (file) {
                        if (_this.validFileType(file)) {
                            if (_this.validFileSize(file)) {
                                justAdded.push(_this.addFile(file));
                            }
                            else {
                                _this.handleRestrictedFileSize(file);
                            }
                        }
                        else {
                            _this.handleRestrictedFileType(file);
                        }
                    });
                    if (justAdded.length > 0) {
                        var newAttachmentObjects_1 = _.map(this.newAttachments(), function (obj) {
                            return { fileName: obj.fileName(), newAttachmentStatus: obj.newAttachmentStatus(), description: obj.description() };
                        });
                        promiseChain = promiseChain.then(function () {
                            return _this.newAttachmentsCollection.$fromJson(newAttachmentObjects_1);
                        }).then(function () {
                            return _this.updateNewAttachmentsCollection();
                        }).then(function () {
                            _.each(justAdded, function (obj) {
                                obj.registerKnockoutSubscriptions();
                            });
                        });
                    }
                    return promiseChain;
                };
                AttachmentUploaderViewerModel.prototype.getBytesFromKiloBytes = function (kBytes) {
                    return kBytes * 1000;
                };
                AttachmentUploaderViewerModel.prototype.getFileSize = function (bytes) {
                    if (bytes < 1000) {
                        return bytes + " B";
                    }
                    else if (bytes >= 1000 && bytes < 1000000) {
                        return (bytes / 1000).toFixed(1) + " KB";
                    }
                    else if (bytes >= 1000000) {
                        return (bytes / 1000000).toFixed(1) + " MB";
                    }
                };
                AttachmentUploaderViewerModel.prototype.validFileType = function (file) {
                    var arr = this.fileTypesArray();
                    var fileType = this.getFileType(file.name);
                    return arr.length > 0 ? arr.indexOf("." + fileType) > -1 : true;
                };
                AttachmentUploaderViewerModel.prototype.getFileType = function (fileName) {
                    var regExp = new RegExp(/[^.]+$/);
                    var fileType = regExp.exec(fileName.toLowerCase());
                    return fileType;
                };
                AttachmentUploaderViewerModel.prototype.validFileSize = function (file) {
                    var ret = this.maxFileSize ? this.getBytesFromKiloBytes(ko.unwrap(this.maxFileSize)) >= file.size : true;
                    return ret;
                };
                AttachmentUploaderViewerModel.prototype.addFile = function (file) {
                    var fileName = file.name;
                    if (fileName.length > attachmentUpload.MAX_FILENAME_LENGTH) {
                        var fileType = "" + this.getFileType(fileName);
                        if (fileType.length > attachmentUpload.MAX_FILENAME_LENGTH) {
                            fileName = fileName.substr(0, attachmentUpload.MAX_FILENAME_LENGTH);
                        }
                        else {
                            fileName = fileName.substr(0, attachmentUpload.MAX_FILENAME_LENGTH - fileType.length - 1) + "." + fileType;
                        }
                        var msg = this.dataContext.$localize('AttachmentUpload$$fileNameTruncated');
                        msg = msg.replace('{fileName}', fileName);
                        this.notificationsController.addWarning({ message: "" + msg });
                    }
                    var defaultDescription = fileName.substr(0, fileName.lastIndexOf('.'));
                    var newAttachment = new attachmentUpload.NewAttachment({ fileName: fileName, fileObject: file, description: defaultDescription }, this);
                    this.newAttachments.push(newAttachment);
                    return newAttachment;
                };
                AttachmentUploaderViewerModel.prototype.handleRestrictedFileType = function (file) {
                    if (this.notificationsController) {
                        var errMsg = this.dataContext.$localize('AttachmentUpload$$rejectFileDueToType');
                        errMsg = errMsg.replace('{fileName}', file.name);
                        this.notificationsController.addError({ message: "" + errMsg });
                    }
                };
                AttachmentUploaderViewerModel.prototype.handleRestrictedFileSize = function (file) {
                    if (this.notificationsController) {
                        var errMsg = this.dataContext.$localize('AttachmentUpload$$rejectFileDueToSize');
                        errMsg = errMsg.replace('{fileName}', file.name).replace('{fileSize}', this.getFileSize(file.size)).replace('{maxFileSize}', this.getFileSize(this.getBytesFromKiloBytes(ko.unwrap(this.maxFileSize))));
                        this.notificationsController.addError({ message: "" + errMsg });
                    }
                };
                AttachmentUploaderViewerModel.prototype.getSelectOptionsFromSource = function (source) {
                    var result = [];
                    var displayMemberName = source.getDisplayMemberName();
                    var valueMemberName = source.getValueMemberName();
                    result.push({ value: null, text: this.dataContext.$localize('AttachmentUpload$$choose'), isSelected: false });
                    _.each(source.items(), function (itm) {
                        var item;
                        if (itm[displayMemberName]) {
                            item = { value: itm[valueMemberName].toString(), text: itm[displayMemberName], isSelected: false };
                        }
                        else {
                            item = { value: itm[valueMemberName].toString(), text: itm[valueMemberName], isSelected: false };
                        }
                        result.push(item);
                    });
                    return result;
                };
                AttachmentUploaderViewerModel.prototype.dispose = function () {
                    var dropArea = this.getDropArea();
                    $(window).off(this.events_handlePreventDefault);
                    $(dropArea).off(this.events_handlePreventDefault);
                    $(window).off(this.events_handleDragEnterDragOver);
                    $(dropArea).off(this.events_handleDragEnterDragOver);
                    $(dropArea).off(this.events_handleDragLeaveDrop);
                    $(dropArea).off('drop.attachmentUpload.handleDrop');
                    this.$componentElem = null;
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                };
                return AttachmentUploaderViewerModel;
            }());
            attachmentUpload.AttachmentUploaderViewerModel = AttachmentUploaderViewerModel;
        })(attachmentUpload = components.attachmentUpload || (components.attachmentUpload = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var attachmentUpload;
        (function (attachmentUpload) {
            var AttachmentStatus;
            (function (AttachmentStatus) {
                AttachmentStatus["Waiting"] = "Waiting";
                AttachmentStatus["Ready"] = "Ready";
                AttachmentStatus["Uploading"] = "Uploading";
                AttachmentStatus["UploadError"] = "UploadError";
            })(AttachmentStatus = attachmentUpload.AttachmentStatus || (attachmentUpload.AttachmentStatus = {}));
            attachmentUpload.MAX_FILENAME_LENGTH = 100;
            attachmentUpload.MAX_FILEDESC_LENGTH = 255;
            var NewAttachment = /** @class */ (function () {
                function NewAttachment(params, model) {
                    this.fileName = ko.observable();
                    this.description = ko.observable();
                    this.mrn = ko.observable();
                    this.documentType = ko.observable();
                    this.newAttachmentStatus = ko.observable(AttachmentStatus.Waiting);
                    this.hasValidationErrors = ko.observable();
                    this.percent = ko.observable();
                    this.descriptionValidationError = ko.observable();
                    this.descriptionHasError = ko.observable();
                    this.documentTypeValidationError = ko.observable();
                    this.documentTypeHasError = ko.observable();
                    this._pendingUserTriggeredChange = false;
                    this.localization = window.sf.localization;
                    this.subscriptions = [];
                    this.fileName(params.fileName);
                    this.description(params.description);
                    this.fileObject = params.fileObject;
                    this.model = model;
                    this.newAttachmentStatusText = ko.pureComputed(this.getNewAttachmentStatusText, this);
                    this.hasStatusUploading = ko.pureComputed(this.getHasStatusUploading, this);
                    this.hasNotStatusUploading = ko.pureComputed(this.getHasNotStatusUploading, this);
                    this.descriptionValidationError(this.getDescriptionValidationError());
                    this.descriptionHasError(this.getDescriptionHasError());
                    this.documentTypeValidationError(this.getDocumentTypeValidationError());
                    this.documentTypeHasError(this.getDocumentTypeHasError());
                    this.hasValidationErrors(this.getHasValidationErrors());
                    var self = this;
                    self.onUploadProgressChanged = function (data, event, evtParams) {
                        return new Promise(function (resolve) {
                            if (evtParams.lengthComputable === true) {
                                self.percent(" ... " + ((evtParams.loaded / evtParams.total) * 100).toFixed(0) + "%");
                            }
                            resolve();
                        });
                    };
                }
                NewAttachment.prototype.registerKnockoutSubscriptions = function () {
                    var _this = this;
                    this.subscriptions.push(this.description.subscribe(function () {
                        _this._pendingUserTriggeredChange = true;
                        _this.descriptionValidationError(_this.getDescriptionValidationError());
                        _this.descriptionHasError(_this.getDescriptionHasError());
                        _this.hasValidationErrors(_this.getHasValidationErrors());
                        _this.changeStatus();
                        _this.model.updateNewAttachmentsCollection();
                        _this._pendingUserTriggeredChange = false;
                    }));
                    this.subscriptions.push(this.documentType.subscribe(function () {
                        _this._pendingUserTriggeredChange = true;
                        _this.documentTypeValidationError(_this.getDocumentTypeValidationError());
                        _this.documentTypeHasError(_this.getDocumentTypeHasError());
                        _this.hasValidationErrors(_this.getHasValidationErrors());
                        _this.changeStatus();
                        _this.model.updateNewAttachmentsCollection();
                        _this._pendingUserTriggeredChange = false;
                    }));
                    this.subscriptions.push(this.newAttachmentStatus.subscribe(function () {
                        if (!_this._pendingUserTriggeredChange) {
                            _this.model.updateNewAttachmentsCollection();
                        }
                    }));
                };
                NewAttachment.prototype.getLanguage = function () {
                    return this.localization.currentCultureCode();
                };
                NewAttachment.prototype.getFileContent = function () {
                    return this.readAsBase64();
                };
                NewAttachment.prototype.changeStatus = function () {
                    if (ko.unwrap(this.hasValidationErrors) === true) {
                        if (ko.unwrap(this.newAttachmentStatus) !== AttachmentStatus.Waiting) {
                            this.newAttachmentStatus(AttachmentStatus.Waiting);
                        }
                    }
                    else {
                        if (ko.unwrap(this.newAttachmentStatus) !== AttachmentStatus.Ready) {
                            this.newAttachmentStatus(AttachmentStatus.Ready);
                        }
                    }
                };
                NewAttachment.prototype.getHasStatusUploading = function () {
                    return ko.unwrap(this.newAttachmentStatus) === AttachmentStatus.Uploading;
                };
                NewAttachment.prototype.getHasNotStatusUploading = function () {
                    return !this.getHasStatusUploading();
                };
                NewAttachment.prototype.getDescriptionValidationError = function () {
                    var val = ko.unwrap(this.description);
                    if (val && val.length > 0) {
                        if (val.length > attachmentUpload.MAX_FILEDESC_LENGTH) {
                            return "" + this.localization.currentCulture().errorFormatter.formatLengthTooLong({ $meta: { caption: this.model.dataContext.$localize('AttachmentUpload$$description'), maxLength: attachmentUpload.MAX_FILEDESC_LENGTH } });
                        }
                    }
                    else {
                        return "" + this.localization.currentCulture().errorFormatter.formatIsNotSet({ $meta: { caption: this.model.dataContext.$localize('AttachmentUpload$$description') } });
                    }
                    return null;
                };
                NewAttachment.prototype.getDescriptionHasError = function () {
                    return this.getDescriptionValidationError() !== null;
                };
                NewAttachment.prototype.getDocumentTypeValidationError = function () {
                    var val = ko.unwrap(this.documentType);
                    if (!val) {
                        return "" + this.localization.currentCulture().errorFormatter.formatIsNotSet({ $meta: { caption: this.model.dataContext.$localize('AttachmentUpload$$documentType') } });
                    }
                    return null;
                };
                NewAttachment.prototype.getDocumentTypeHasError = function () {
                    return this.getDocumentTypeValidationError() !== null;
                };
                NewAttachment.prototype.getHasValidationErrors = function () {
                    return this.getDescriptionHasError() || this.getDocumentTypeHasError();
                };
                NewAttachment.prototype.getNewAttachmentStatusText = function () {
                    var status = ko.unwrap(this.newAttachmentStatus);
                    switch (status) {
                        case AttachmentStatus.Waiting:
                            return this.model.dataContext.$localize('AttachmentUpload$$waitingForDetails');
                        case AttachmentStatus.Ready:
                            return this.model.dataContext.$localize('AttachmentUpload$$readyForUpload');
                        case AttachmentStatus.Uploading:
                            return this.model.dataContext.$localize('AttachmentUpload$$uploading');
                        case AttachmentStatus.UploadError:
                            return this.model.dataContext.$localize('AttachmentUpload$$uploadError');
                    }
                };
                NewAttachment.prototype.readAsBase64 = function () {
                    var _this = this;
                    var contentAsBase64;
                    return new Promise(function (resolve, reject) {
                        var dataUrlPrefix = 'base64,';
                        var reader = new FileReader();
                        reader.onerror = reject;
                        reader.onloadend = function (_readerEvt) {
                            var dataUrl = reader.result;
                            if (!dataUrl) {
                                reject();
                            }
                            else {
                                contentAsBase64 = dataUrl.slice(dataUrl.indexOf(dataUrlPrefix) + dataUrlPrefix.length);
                                resolve(contentAsBase64);
                            }
                        };
                        reader.readAsDataURL(_this.fileObject);
                    }).then(function () {
                        return contentAsBase64;
                    });
                };
                NewAttachment.prototype.dispose = function () {
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                    this.pendingRequest = null;
                    this.fileObject = null;
                };
                return NewAttachment;
            }());
            attachmentUpload.NewAttachment = NewAttachment;
        })(attachmentUpload = components.attachmentUpload || (components.attachmentUpload = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var attachmentUpload;
        (function (attachmentUpload) {
            if (ko && !ko.components.isRegistered('sffw-attach-uploader-viewer')) {
                ko.components.register('sffw-attach-uploader-viewer', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.attachmentUpload.AttachmentUploaderViewerModel(params, componentInfo); }
                    },
                    template: "\n<div class=\"sffw-attachment-upload\">\n    <!-- ko if: ko.unwrap(isEditMode) === true -->\n    <div class=\"upload-box\" role=\"upload\">\n        <div class=\"upload-box-content\">\n            <input class=\"btn-hidden\" type=\"file\" data-bind=\"attr: { multiple: allowMultipleFiles, accept: fileTypeFilter }, event: { change: function() { handleFilesFromInput($element.files); } }\">\n            <button class=\"btn btn-primary btn-icon-left btn-select-file\" data-bind=\"click: onSelectFileClick\">\n                <span data-bind=\"css: iconClasses.iconAdd\" aria-hidden=\"true\"></span>\n                <!-- ko text: ko.unwrap(allowMultipleFiles) === true ? $root.$localize('AttachmentUpload$$addFilesBtn') : $root.$localize('AttachmentUpload$$addFileBtn') --><!--/ko-->\n            </button>\n            <p data-bind=\"text: $root.$localize('AttachmentUpload$$dropAreaText')\"></p>\n            <!-- ko if: ko.unwrap(fileTypeFilter) -->\n            <p data-bind=\"text: $root.$localize('AttachmentUpload$$allowedFileTypes') + ' ' + ko.unwrap(fileTypeFilter)\"></p>\n            <!-- /ko -->\n        </div>\n    </div>\n    <div class=\"add-details\" data-bind=\"visible: isAddDetailsVisible\">\n        <h4 data-bind=\"text: $root.$localize('AttachmentUpload$$addDetails')\"></h4>\n        <!-- TODO aria-rowcount, aria-label, TR's INPUTs aria-label -->\n        <table role=\"table\" class=\"files-table new-attachments-table\">\n            <thead>\n                <tr>\n                    <th><span data-bind=\"text: $root.$localize('AttachmentUpload$$description')\"></span></th>\n                    <th><span data-bind=\"text: $root.$localize('AttachmentUpload$$documentType')\"></span></th>\n                    <th><span data-bind=\"text: $root.$localize('AttachmentUpload$$newAttachmentStatus')\"></span></th>\n                    <th></th>\n                </tr>\n            </thead>\n            <tbody data-bind=\"foreach: { data: newAttachments, as: 'item' }\">\n                <tr>\n                    <td>\n                        <div>\n                            <input type=\"text\" autocomplete=\"off\" class=\"\" data-bind=\"textInput: item.description, enable: item.hasNotStatusUploading\" />\n                        </div>\n                        <div class=\"errorText\" data-bind=\"visible: descriptionHasError\">\n                            <!-- ko text: descriptionValidationError --><!--/ko-->\n                        </div>\n                    </td>\n                    <td>\n                        <div>\n                            <select data-bind=\"options: $parent.documentTypeOptions, enable: item.hasNotStatusUploading,\n                                value: item.documentType, optionsText: 'text', optionsValue: 'value'\">\n                            </select>\n                        </div>\n                        <div class=\"errorText\" data-bind=\"visible: documentTypeHasError\">\n                            <!-- ko text: documentTypeValidationError --><!--/ko-->\n                        </div>\n                    </td>\n                    <td>\n                        <span data-bind=\"text: item.newAttachmentStatusText\"></span>\n                        <span data-bind=\"text: item.percent\"></span>\n                    </td>\n                    <td>\n                        <div class=\"buttons\">\n                            <button class=\"btn btn-default btn-icon-left\" data-bind=\"visible: item.hasNotStatusUploading, click: $parent.removeAttachment\">\n                                <span data-bind=\"css: $parent.iconClasses.iconRemove\" aria-hidden=\"true\"></span>\n                                <!-- ko text: $root.$localize('AttachmentUpload$$removeBtn') --><!--/ko-->\n                            </button>\n                            <button class=\"btn btn-default btn-icon-left\" data-bind=\"visible: item.hasStatusUploading, click: $parent.cancelUpload\">\n                                <span data-bind=\"css: $parent.iconClasses.iconCancel\" aria-hidden=\"true\"></span>\n                                <!-- ko text: $root.$localize('AttachmentUpload$$cancelBtn') --><!--/ko-->\n                            </button>\n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n        <div class=\"buttons\">\n            <button class=\"btn btn-default btn-icon-left\" data-bind=\"enable: removeAllBtnEnabledBindingValue,\n                click: removeAllAttachments,\n                attr: { 'aria-disabled': removeAllBtnAriaDisabledBindingValue }\">\n                <span data-bind=\"css: iconClasses.iconRemove\" aria-hidden=\"true\"></span>\n                <!-- ko text: $root.$localize('AttachmentUpload$$removeAllBtn') --><!--/ko-->\n            </button>\n            <button class=\"btn btn-primary btn-icon-left\" data-bind=\"enable: uploadAllBtnEnabledBindingValue,\n                click: uploadAllAttachments,\n                attr: { 'aria-disabled': uploadAllBtnAriaDisabledBindingValue }\">\n                <span data-bind=\"css: iconClasses.iconUpload\" aria-hidden=\"true\"></span>\n                <!-- ko text: $root.$localize('AttachmentUpload$$uploadAllBtn') --><!--/ko-->\n            </button>\n        </div>\n    </div>\n    <!-- /ko -->\n    <div class=\"uploaded-attachments\" data-bind=\"visible: isUploadedAttachmentsVisible\">\n        <h4 data-bind=\"text: $root.$localize('AttachmentUpload$$uploadedAttachments')\"></h4>\n        <!-- TODO aria-rowcount, aria-label, TR's INPUTs aria-label -->\n        <table role=\"table\" class=\"files-table uploaded-attachments-table\">\n            <thead>\n                <tr>\n                    <!-- ko if: ko.unwrap(isEditMode) === true -->\n                    <th class=\"col-updown\"></th>\n                    <!-- /ko -->\n                    <th><span data-bind=\"text: $root.$localize('AttachmentUpload$$description')\"></span></th>\n                    <th><span data-bind=\"text: $root.$localize('AttachmentUpload$$documentType')\"></span></th>\n                    <!-- ko if: ko.unwrap(isEditMode) === true -->\n                    <th></th>\n                    <!-- /ko -->\n                </tr>\n            </thead>\n            <tbody data-bind=\"foreach: { data: attachments, as: 'item' }\">\n                <tr>\n                    <!-- ko if: ko.unwrap($parent.isEditMode) === true -->\n                    <td>\n                        <div class=\"col-buttons-updown\">\n                            <button data-bind=\"css: $parent.iconClasses.iconUp, click: $parent.onRowUp, attr: { 'aria-label': $root.$localize('AttachmentUpload$$moveUp') }\"></button>\n                            <button data-bind=\"css: $parent.iconClasses.iconDown, click: $parent.onRowDown, attr: { 'aria-label': $root.$localize('AttachmentUpload$$moveDown') }\"></button>\n                        </div>\n                    </td>\n                    <!-- /ko -->\n                    <td>\n                        <a target=\"_blank\" data-bind=\"text: item.description,\n                            click: $parent.onAttachmentOpenClick,\n                            attr: { href: ($parent.documentLinkAttName && $parent.attachmentsCollection.$items()[$index()] && $parent.attachmentsCollection.$items()[$index()][$parent.documentLinkAttName] ? $parent.attachmentsCollection.$items()[$index()][$parent.documentLinkAttName].$value() : null) }\">\n                        </a>\n                    </td>\n                    <td>\n                        <!-- ko text: $parent.getDocumentTypeText(item.documentType) --><!--/ko-->\n                    </td>\n                    <!-- ko if: ko.unwrap($parent.isEditMode) === true -->\n                    <td>\n                        <div class=\"buttons\">\n                            <button class=\"btn btn-default btn-icon-left\" data-bind=\"click: $parent.removeUploadedAttachment\">\n                                <span data-bind=\"css: $parent.iconClasses.iconRemove\" aria-hidden=\"true\"></span>\n                                <!-- ko text: $root.$localize('AttachmentUpload$$removeBtn') --><!--/ko-->\n                            </button>\n                        </div>\n                    </td>\n                    <!-- /ko -->\n                </tr>\n            </tbody>\n        </table>\n        <!-- ko if: ko.unwrap(isEditMode) === true -->\n        <div class=\"buttons\">\n            <button class=\"btn btn-default btn-icon-left\" data-bind=\"click: removeAllUploadedAttachments\">\n                <span data-bind=\"css: iconClasses.iconRemove\" aria-hidden=\"true\"></span>\n                <!-- ko text: $root.$localize('AttachmentUpload$$removeAllBtn') --><!--/ko-->\n            </button>\n        </div>\n        <!-- /ko -->\n    </div>\n</div>\n"
                });
            }
        })(attachmentUpload = components.attachmentUpload || (components.attachmentUpload = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var ServerResponse = /** @class */ (function () {
        function ServerResponse(req) {
            this.req = req;
        }
        ServerResponse.prototype.getJsonString = function () {
            return this.req.responseText;
        };
        ServerResponse.prototype.extractJson = function (args) {
            var obj = JSON.parse(this.req.responseText);
            var path = sffw.api.plainObject.ObjectPath.fromALangNotation(args.path);
            var value = _.get(obj, path.toObjectNotation());
            return JSON.stringify(value);
        };
        ServerResponse.prototype.isError = function () {
            return !(this.req.status > 199 && this.req.status < 300);
        };
        ServerResponse.prototype.getErrorMessage = function () {
            if (!this.isError()) {
                return '';
            }
            return "Server responded with status " + this.req.status + " " + this.req.statusText;
        };
        ServerResponse.prototype.getMessageType = function () {
            // if CORS are used Access-Control-Expose-Headers should be set or it may fail
            return this.req.getResponseHeader('X-MessageType') || '';
        };
        ServerResponse.prototype.getStatusCode = function () {
            if (_.isFinite(this.req.status)) {
                return this.req.status;
            }
            return null;
        };
        ServerResponse.prototype.getHeader = function (args) {
            // if CORS are used Access-Control-Expose-Headers should be set or it may fail
            return this.req.getResponseHeader(args.name);
        };
        ServerResponse.prototype.saveToFile = function (args) {
            try {
                var a = document.createElement("a");
                var content = this.req.responseType === 'blob' ? this.req.response : new Blob([this.req.responseText]);
                var blobUrl = URL.createObjectURL(content);
                a.href = blobUrl;
                a.download = args.fileName || 'file';
                setTimeout(function () {
                    a.click();
                    window.URL.revokeObjectURL(blobUrl);
                });
                return true;
            }
            catch (err) {
                console.error(err);
                return false;
            }
        };
        return ServerResponse;
    }());
    sffw.ServerResponse = ServerResponse;
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var plainObject;
        (function (plainObject) {
            var ObjectPath = /** @class */ (function () {
                function ObjectPath(parts) {
                    this.parts = parts;
                }
                ObjectPath.fromALangNotation = function (path) {
                    var parts = path.split('/').map(function (s) {
                        return new ObjectPathPart(s, false);
                    });
                    return new ObjectPath(parts);
                };
                ObjectPath.fromObjectNotation = function (path) {
                    var parts = path.split('.').map(function (s) {
                        return new ObjectPathPart(s, true);
                    });
                    return new ObjectPath(parts);
                };
                ObjectPath.prototype.isArrayItem = function () {
                    return this.parts[this.parts.length - 1].hasIndex();
                };
                ObjectPath.prototype.lastPartZeroBasedIndex = function () {
                    return this.parts[this.parts.length - 1].zeroBasedIndex;
                };
                ObjectPath.prototype.toActionLangNotation = function () {
                    return this.parts.map(function (p) {
                        return p.toString(false);
                    }).join('/');
                };
                ObjectPath.prototype.toObjectNotation = function () {
                    return this.parts.map(function (p) {
                        return p.toString(true);
                    }).join('.');
                };
                ObjectPath.prototype.parentPath = function () {
                    if (this.parts.length === 1) {
                        return null;
                    }
                    else {
                        return new ObjectPath(this.parts.slice(0, this.parts.length - 1));
                    }
                };
                ObjectPath.prototype.lastItemArrayPath = function () {
                    if (!this.isArrayItem()) {
                        throw new Error("ObjectPath.lastItemArrayPath expects to be called only if it is ArrayItem (" + this.parts + ")");
                    }
                    var arrayParts = this.parts.slice(0, this.parts.length - 1);
                    arrayParts.push(new ObjectPathPart(this.parts[this.parts.length - 1].text, true));
                    return new ObjectPath(arrayParts);
                };
                return ObjectPath;
            }());
            plainObject.ObjectPath = ObjectPath;
            var ObjectPathPart = /** @class */ (function () {
                function ObjectPathPart(path, zeroBased) {
                    var matches = path.match(/^(\w+)\[(\d+)\]$/);
                    if (matches && matches.length === 3) {
                        this.text = matches[1];
                        this.zeroBasedIndex = zeroBased ? Number(matches[2]) : Number(matches[2]) - 1;
                    }
                    else {
                        this.text = path;
                        this.zeroBasedIndex = null;
                    }
                }
                ObjectPathPart.prototype.hasIndex = function () {
                    return _.isNumber(this.zeroBasedIndex);
                };
                ObjectPathPart.prototype.toString = function (zeroBased) {
                    if (this.hasIndex()) {
                        return this.text + "[" + ((this.zeroBasedIndex || 0) + (zeroBased ? 0 : 1)) + "]";
                    }
                    else {
                        return this.text;
                    }
                };
                return ObjectPathPart;
            }());
            plainObject.ObjectPathPart = ObjectPathPart;
        })(plainObject = api.plainObject || (api.plainObject = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    function moveArrayItem(array, item, direction) {
        var currentPos = array.indexOf(item);
        if (direction === 'up') {
            if (currentPos > 0) {
                array.splice(currentPos, 1);
                array.splice(currentPos - 1, 0, item);
            }
        }
        if (direction === 'down') {
            if (currentPos < array().length - 1) {
                array.splice(currentPos, 1);
                array.splice(currentPos + 1, 0, item);
            }
        }
    }
    sffw.moveArrayItem = moveArrayItem;
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
