var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var activeXSigner;
        (function (activeXSigner) {
            var signerElementId = 'activeXSigner';
            var ActiveXSigner = /** @class */ (function () {
                function ActiveXSigner(_datacontext, args) {
                    this.algorithm = args.algorithm || 'sha256';
                    // insert activeX element at the end of the header if it does not exist
                    if (window && document) {
                        var el = document.getElementById(signerElementId);
                        if (!el) {
                            $(document.body).append("<object id=\"activeXSigner\" classid=\"clsid:9F848ED6-9BFB-4F75-8DB9-07DBE6711228\" codebase=\"./resources/ActiveXSigner.cab#version=1,0,1,0\" style=\"display: none;\">");
                        }
                    }
                }
                ActiveXSigner.prototype.signXml = function (args) {
                    var result = new activeXSigner.SignResult();
                    try {
                        if (!ActiveXSigner.isActiveXInstalled('Aquasoft.ActiveXSigner')) {
                            return result;
                        }
                        var o = document.getElementById(signerElementId);
                        if (!o) {
                            return result;
                        }
                        result.activeXFound = true;
                        if (!o.SelectCertificate()) {
                            return result;
                        }
                        result.certificateSelected = true;
                        o.SigningAlgorithm = this.algorithm;
                        o.Sign(args.xml, true);
                        result.signedXml = o.SignedXml;
                        result.signingSuccessful = !!o.SignedXml;
                        return result;
                    }
                    catch (err) {
                        result.otherError = (err && err.message) || ('unspecified error');
                        return result;
                    }
                };
                ActiveXSigner.isActiveXInstalled = function (classname) {
                    try {
                        var obj = new ActiveXObject(classname);
                        return !!obj;
                    }
                    catch (ignored) {
                        // ignored
                    }
                    return false;
                };
                return ActiveXSigner;
            }());
            activeXSigner.ActiveXSigner = ActiveXSigner;
        })(activeXSigner = components.activeXSigner || (components.activeXSigner = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.components.activeXSigner.ActiveXSigner;
    });
}
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var activeXSigner;
        (function (activeXSigner) {
            var SignResult = /** @class */ (function () {
                function SignResult() {
                    this.signingSuccessful = false;
                    this.signedXml = null;
                    this.activeXFound = false;
                    this.certificateSelected = false;
                    this.otherError = null;
                }
                SignResult.prototype.getSignedXml = function () {
                    return this.signedXml;
                };
                SignResult.prototype.wasSigningSuccessful = function () {
                    return this.signingSuccessful;
                };
                SignResult.prototype.wasActiveXFound = function () {
                    return this.activeXFound;
                };
                SignResult.prototype.wasCertificateSelected = function () {
                    return this.certificateSelected;
                };
                SignResult.prototype.getOtherErrorMessage = function () {
                    return this.otherError;
                };
                return SignResult;
            }());
            activeXSigner.SignResult = SignResult;
        })(activeXSigner = components.activeXSigner || (components.activeXSigner = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
