var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var accessibility;
        (function (accessibility) {
            var AccessibilitySettings = /** @class */ (function () {
                function AccessibilitySettings(dataContext, args) {
                    this.isDisabledScreenreaderMenu = ko.observable();
                }
                AccessibilitySettings.prototype.focusTooltipButtons = function (args) {
                    var _a, _b;
                    (_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.focusTooltipButtons(args.focus);
                };
                AccessibilitySettings.prototype.disableScreenreaderMenu = function (args) {
                    this.isDisabledScreenreaderMenu(args.disable);
                };
                AccessibilitySettings.prototype.accessibleDisabledEditors = function (args) {
                    var _a, _b, _c, _d;
                    var isSupported = ((_b = (_a = window.sf.accessibility) === null || _a === void 0 ? void 0 : _a.preferences) === null || _b === void 0 ? void 0 : _b.accessibleDisabledEditorsSupport) === true;
                    sffw.assert(isSupported, "AccessibleDisabledEditors is not set to True in SF Project Options/Visual Settings");
                    if (isSupported) {
                        (_d = (_c = window.sf.accessibility) === null || _c === void 0 ? void 0 : _c.preferences) === null || _d === void 0 ? void 0 : _d.accessibleDisabledEditors(args.value);
                    }
                };
                return AccessibilitySettings;
            }());
            accessibility.AccessibilitySettings = AccessibilitySettings;
        })(accessibility = api.accessibility || (api.accessibility = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.api.accessibility.AccessibilitySettings;
    });
}
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
