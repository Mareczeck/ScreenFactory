var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var navigationObserver;
        (function (navigationObserver) {
            var NavigationObserver = /** @class */ (function () {
                function NavigationObserver(datacontext, args) {
                    this.datacontext = datacontext;
                    var handler = sffw.extractEventHandlerFromApiArgs(datacontext, args, 'OnAfterFormActivate');
                    if (handler) {
                        this.onAfterFormActivateHandler = handler;
                    }
                }
                NavigationObserver.prototype.afterFormActivate = function (dc) {
                    sffw.assert(dc);
                    if (this.onAfterFormActivateHandler) {
                        this.onAfterFormActivateHandler(this, null, { formId: dc.$formId });
                    }
                };
                NavigationObserver.prototype.dispose = function () {
                    if (this.onAfterFormActivateHandler) {
                        this.onAfterFormActivateHandler = null;
                    }
                };
                return NavigationObserver;
            }());
            navigationObserver.NavigationObserver = NavigationObserver;
        })(navigationObserver = api.navigationObserver || (api.navigationObserver = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.api.navigationObserver.NavigationObserver;
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
