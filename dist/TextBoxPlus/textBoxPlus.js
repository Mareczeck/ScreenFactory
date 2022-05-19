var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var textBoxPlus;
        (function (textBoxPlus) {
            'use strict';
            var handlers = ko.bindingHandlers;
            handlers.textBoxPlusFormatting = handlers.textBoxPlusFormatting || {
                init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var $element = $(element);
                    var isCurrency = allBindings.get('isCurrency');
                    var isAmount = allBindings.get('isAmount');
                    var minDecimalPlaces = allBindings.get('minDecimalPlaces');
                    var currencySymbol = allBindings.get('currencySymbol');
                    var focusHandler = function () {
                        $element.val(ko.unwrap(valueAccessor()));
                    };
                    var blurHandler = function () {
                        $element.val(sffw.formatAsAmountOrCurrency(ko.unwrap(valueAccessor()), isAmount, isCurrency, minDecimalPlaces, currencySymbol));
                    };
                    $element.on('focus', focusHandler);
                    $element.on('blur', blurHandler);
                    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                        $element.off('focus', focusHandler);
                        $element.off('blur', blurHandler);
                    });
                },
                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    var $element = $(element);
                    var isCurrency = allBindings.get('isCurrency');
                    var isAmount = allBindings.get('isAmount');
                    var minDecimalPlaces = allBindings.get('minDecimalPlaces');
                    var currencySymbol = allBindings.get('currencySymbol');
                    var value = ko.unwrap(valueAccessor());
                    var hasFocus = $element.is(':focus');
                    value = hasFocus ? value : sffw.formatAsAmountOrCurrency(ko.unwrap(valueAccessor()), isAmount, isCurrency, minDecimalPlaces, currencySymbol);
                    $element.val(value);
                }
            };
        })(textBoxPlus = components.textBoxPlus || (components.textBoxPlus = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    function formatAsAmountOrCurrency(strValue, formatAsAmount, formatAsCurrency, minDecPlaces, currencySymbol) {
        if (!strValue) {
            return '';
        }
        if (!formatAsAmount && !formatAsCurrency) {
            return strValue;
        }
        var decimalSign = window.sf.localization.currentCulture().getDecimalSign();
        var thousandSign = window.sf.localization.currentCulture().getThousandSign();
        var places = 0; // pocet destinych pozic
        if (formatAsCurrency) {
            places = 2;
        }
        if (formatAsAmount) {
            places = 6;
        }
        var symbol = ko.unwrap(currencySymbol) || '\u20AC'; // euro znak
        var normalizedNumberStr = strValue.replace(decimalSign, '.');
        if (_.isNaN(Number(normalizedNumberStr))) {
            return '';
        }
        var numValue = new Big(normalizedNumberStr);
        var numberParts = numValue.toFixed().split('.');
        var sign = numValue.lt(0) ? '-' : '';
        var integralPart = numValue.abs().round(0, 0).toString(); // absolutní hodnota celočíselné části
        var leftover = integralPart.length > 3 ? (integralPart.length) % 3 : 0;
        var decimalPart = '';
        if (numberParts.length > 1) {
            var decPlacesStr = numberParts[1].substr(0, places);
            if (minDecPlaces && minDecPlaces > 0 && decPlacesStr.length < minDecPlaces) {
                decPlacesStr = decPlacesStr.concat(Array(minDecPlaces - decPlacesStr.length + 1).join('0'));
            }
            decimalPart = "" + decimalSign + decPlacesStr;
        }
        else if (minDecPlaces && minDecPlaces > 0) {
            decimalPart = "" + decimalSign + Array(minDecPlaces + 1).join('0');
        }
        return sign + (leftover ? integralPart.substr(0, leftover) + thousandSign : '') + integralPart.substr(leftover).replace(/(\d{3})(?=\d)/g, '$1' + thousandSign)
            + decimalPart
            + (formatAsCurrency ? " " + symbol : '');
    }
    sffw.formatAsAmountOrCurrency = formatAsAmountOrCurrency;
})(sffw || (sffw = {}));
