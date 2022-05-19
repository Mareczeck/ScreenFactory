var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var payTrailForm;
        (function (payTrailForm) {
            var PayTrailFormModel = /** @class */ (function () {
                function PayTrailFormModel(params, componentInfo) {
                    this.replSpecChars = sffw.replaceUriParamSpecialChars;
                    this.encodeURI = encodeURI;
                    this.postUrl = params.postUrl || 'https://payment.paytrail.com/e2';
                    this.buttonCaption = params.buttonCaption;
                    if (_.isUndefined(params.encodeURLs)) {
                        this.encodeURLs = ko.observable(false);
                    }
                    else if (typeof (params.encodeURLs) === 'function') {
                        this.encodeURLs = params.encodeURLs;
                    }
                    else {
                        this.encodeURLs = ko.observable(params.encodeURLs);
                    }
                    this.MERCHANT_ID = params.MERCHANT_ID;
                    this.URL_SUCCESS = params.URL_SUCCESS;
                    this.URL_CANCEL = params.URL_CANCEL;
                    this.ORDER_NUMBER = params.ORDER_NUMBER;
                    this.PARAMS_IN = params.PARAMS_IN;
                    this.PARAMS_OUT = params.PARAMS_OUT;
                    this.AMOUNT = params.AMOUNT;
                    this.AUTHCODE = params.AUTHCODE;
                    this.MSG_UI_MERCHANT_PANEL = params.MSG_UI_MERCHANT_PANEL || ko.observable();
                    this.URL_NOTIFY = params.URL_NOTIFY || ko.observable();
                    this.LOCALE = params.LOCALE || ko.observable();
                    this.REFERENCE_NUMBER = params.REFERENCE_NUMBER || ko.observable();
                    this.PAYER_PERSON_PHONE = params.PAYER_PERSON_PHONE || ko.observable();
                    this.PAYER_PERSON_EMAIL = params.PAYER_PERSON_EMAIL || ko.observable();
                    this.PAYER_PERSON_FIRSTNAME = params.PAYER_PERSON_FIRSTNAME || ko.observable();
                    this.PAYER_PERSON_LASTNAME = params.PAYER_PERSON_LASTNAME || ko.observable();
                    this.PAYER_COMPANY_NAME = params.PAYER_COMPANY_NAME || ko.observable();
                    this.PAYER_PERSON_ADDR_STREET = params.PAYER_PERSON_ADDR_STREET || ko.observable();
                    this.PAYER_PERSON_ADDR_POSTAL_CODE = params.PAYER_PERSON_ADDR_POSTAL_CODE || ko.observable();
                    this.PAYER_PERSON_ADDR_TOWN = params.PAYER_PERSON_ADDR_TOWN || ko.observable();
                    this.PAYER_PERSON_ADDR_COUNTRY = params.PAYER_PERSON_ADDR_COUNTRY || ko.observable();
                    this.OnSubmitHandler = params.OnSubmit;
                    this.AMOUNT_formatted = ko.pureComputed(this.getAmountFormatted, this);
                }
                PayTrailFormModel.prototype.onSubmit = function (formElement) {
                    var _this = this;
                    var promiseChain = Promise.resolve();
                    if (this.OnSubmitHandler) {
                        promiseChain = promiseChain.then(function () {
                            return _this.OnSubmitHandler();
                        }).then(function (result) {
                            if (result === false) {
                                // no submit
                            }
                            else {
                                formElement.submit();
                            }
                        });
                        return false;
                    }
                    else {
                        return true;
                    }
                };
                PayTrailFormModel.prototype.getAmountFormatted = function () {
                    var amount = ko.unwrap(this.AMOUNT);
                    if (amount) {
                        // decimal can be number or big.js Big and will have toFixed function
                        if (typeof amount.toFixed !== 'undefined') {
                            return amount.toFixed(2);
                        }
                        else {
                            return amount.toString();
                        }
                    }
                    return null;
                };
                PayTrailFormModel.prototype.isParamIn = function (parName) {
                    var parsIn = ko.unwrap(this.PARAMS_IN);
                    var parsInArr = parsIn ? parsIn.split(',') : [];
                    return parsInArr.indexOf(parName) > 0;
                };
                return PayTrailFormModel;
            }());
            payTrailForm.PayTrailFormModel = PayTrailFormModel;
        })(payTrailForm = components.payTrailForm || (components.payTrailForm = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var payTrailForm;
        (function (payTrailForm) {
            if (ko && !ko.components.isRegistered('sffw-paytrail-form')) {
                ko.components.register('sffw-paytrail-form', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.payTrailForm.PayTrailFormModel(params, componentInfo); }
                    },
                    template: "\n            <form data-bind=\"submit: onSubmit, attr: { action: postUrl, method: 'POST' }\">\n                <!--  Required fields -->\n                <input name=\"MERCHANT_ID\" type=\"hidden\" data-bind=\"value: MERCHANT_ID\">\n                <input name=\"URL_SUCCESS\" type=\"hidden\" data-bind=\"value: ko.unwrap(encodeURLs) ? encodeURI(ko.unwrap(URL_SUCCESS)) : ko.unwrap(URL_SUCCESS)\">\n                <input name=\"URL_CANCEL\" type=\"hidden\" data-bind=\"value: ko.unwrap(encodeURLs) ? encodeURI(ko.unwrap(URL_CANCEL)) : ko.unwrap(URL_CANCEL)\">\n                <input name=\"ORDER_NUMBER\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(ORDER_NUMBER))\">\n                <input name=\"PARAMS_IN\" type=\"hidden\" data-bind=\"value: PARAMS_IN\">\n                <input name=\"PARAMS_OUT\" type=\"hidden\" data-bind=\"value: PARAMS_OUT\">\n                <input name=\"AMOUNT\" type=\"hidden\" data-bind=\"value: AMOUNT_formatted\">\n                <input name=\"AUTHCODE\" type=\"hidden\" data-bind=\"value: AUTHCODE\">\n                <!--  Required fields -->\n\n                <!--  Optional fields -->\n                <!-- ko if: isParamIn('MSG_UI_MERCHANT_PANEL') -->\n                <input name=\"MSG_UI_MERCHANT_PANEL\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(MSG_UI_MERCHANT_PANEL))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('URL_NOTIFY') -->\n                <input name=\"URL_NOTIFY\" type=\"hidden\" data-bind=\"value: ko.unwrap(encodeURLs) ? encodeURI(ko.unwrap(URL_NOTIFY)) : ko.unwrap(URL_NOTIFY)\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('LOCALE') -->\n                <input name=\"LOCALE\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(LOCALE))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('REFERENCE_NUMBER') -->\n                <input name=\"REFERENCE_NUMBER\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(REFERENCE_NUMBER))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_PHONE') -->\n                <input name=\"PAYER_PERSON_PHONE\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_PHONE))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_EMAIL') -->\n                <input name=\"PAYER_PERSON_EMAIL\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_EMAIL))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_FIRSTNAME') -->\n                <input name=\"PAYER_PERSON_FIRSTNAME\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_FIRSTNAME))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_LASTNAME') -->\n                <input name=\"PAYER_PERSON_LASTNAME\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_LASTNAME))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_COMPANY_NAME') -->\n                <input name=\"PAYER_COMPANY_NAME\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_COMPANY_NAME))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_ADDR_STREET') -->\n                <input name=\"PAYER_PERSON_ADDR_STREET\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_ADDR_STREET))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_ADDR_POSTAL_CODE') -->\n                <input name=\"PAYER_PERSON_ADDR_POSTAL_CODE\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_ADDR_POSTAL_CODE))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_ADDR_TOWN') -->\n                <input name=\"PAYER_PERSON_ADDR_TOWN\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_ADDR_TOWN))\">\n                <!-- /ko -->\n                <!-- ko if: isParamIn('PAYER_PERSON_ADDR_COUNTRY') -->\n                <input name=\"PAYER_PERSON_ADDR_COUNTRY\" type=\"hidden\" data-bind=\"value: replSpecChars(ko.unwrap(PAYER_PERSON_ADDR_COUNTRY))\">\n                <!-- /ko -->\n                <!--  Optional fields -->\n\n                <div class=\"sffw-paytrail-form-button\">\n                    <button type=\"submit\" data-bind=\"visible: ko.unwrap(buttonCaption), text: buttonCaption\">\n                </div>\n            </form>"
                });
            }
        })(payTrailForm = components.payTrailForm || (components.payTrailForm = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    function replaceUriParamSpecialChars(strValue) {
        var replacedValue = strValue ? encodeURIComponent(strValue.replace(/'/g, "''")) : strValue;
        return replacedValue;
    }
    sffw.replaceUriParamSpecialChars = replaceUriParamSpecialChars;
})(sffw || (sffw = {}));
