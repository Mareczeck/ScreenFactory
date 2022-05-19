var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var hermesAdapter;
        (function (hermesAdapter) {
            var HermesAdapter = /** @class */ (function () {
                function HermesAdapter(ctx, args) {
                    var _this = this;
                    this.buttonMap = {
                        AppTitle: 'home',
                        PortalTitle: 'portal',
                        Login: 'login',
                        Logout: 'logout',
                        Profile: 'profile',
                        Settings: 'settings',
                        Help: 'help'
                        // onLangClick: 'language'
                    };
                    this.handledButtons = [];
                    this.handledButtonNames = _(this.buttonMap)
                        .keys()
                        // .map((name: string) => `on${name}Click`)
                        .valueOf();
                    this.clickActions = {};
                    _.each(this.handledButtonNames, function (buttonName) {
                        var handler = sffw.extractEventHandlerFromApiArgs(ctx, args, _this.getClickActionName(buttonName));
                        if (handler) {
                            _this.clickActions[buttonName] = handler;
                        }
                    });
                    this.attachHandlersToButtons();
                }
                HermesAdapter.prototype.getClickActionName = function (buttonName) {
                    return "on" + buttonName + "Click";
                };
                HermesAdapter.prototype.attachHandlersToButtons = function () {
                    var _this = this;
                    var existingHandlers = _.keys(this.clickActions);
                    if (!window.CSCR_HermesMini_GetButton) {
                        console.error("Expecting Hermes to expose function CSCR_HermesMini_GetButton. It wasn't found.");
                        return;
                    }
                    _.each(existingHandlers, function (buttonAlias) {
                        var buttonId = _this.buttonMap[buttonAlias];
                        if (window) {
                            if (buttonId !== 'language') {
                                var el = window.CSCR_HermesMini_GetButton(buttonId);
                                $(el).on('click', function (ev) {
                                    var handler = _this.clickActions[buttonAlias];
                                    handler({}, ev);
                                    ev.preventDefault();
                                });
                                _this.handledButtons.push(el);
                            }
                            else {
                                // const langArr = window.CSCR_HermesMini_GetButton(buttonId) as HTMLElement[];
                                // TODO: Handle languages
                            }
                        }
                    });
                };
                HermesAdapter.prototype.detachHandlersFromButtons = function () {
                    _.each(this.handledButtons, function (b) {
                        $(b).off('click');
                    });
                };
                HermesAdapter.prototype.getUrl = function (buttonName) {
                    var el = window.CSCR_HermesMini_GetButton && window.CSCR_HermesMini_GetButton(this.buttonMap[buttonName]);
                    if (!el) {
                        // This should not normally happen unless the caller uses invalid buttonName (which should not be possible in API),
                        // hermes fails to honor the contract or just fails
                        return null;
                    }
                    return el.getAttribute('href');
                };
                HermesAdapter.prototype.getLangUrl = function (lang) {
                    // this array will not contain current language as that one does not have clickable button, only passive image and it is not retturned by hermes function
                    var langElements = window.CSCR_HermesMini_GetButton && window.CSCR_HermesMini_GetButton('language');
                    sffw.assert(lang);
                    var langLower = lang.toLowerCase();
                    if (!langElements || !langElements.length) {
                        // this should not happen as long as there is more than one language in the project and hermes honors it's contract
                        return null;
                    }
                    var correspondingLangElement = _(langElements).filter(function (el) {
                        var dataLang = el.getAttribute('data-language');
                        return !!(dataLang && dataLang.toLowerCase() === langLower);
                    }).first();
                    if (!correspondingLangElement) {
                        return null;
                    }
                    return correspondingLangElement.getAttribute('href');
                };
                HermesAdapter.prototype.dispose = function () {
                    this.detachHandlersFromButtons();
                    this.handledButtons = [];
                };
                return HermesAdapter;
            }());
            hermesAdapter.HermesAdapter = HermesAdapter;
        })(hermesAdapter = api.hermesAdapter || (api.hermesAdapter = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var hermesAdapter;
        (function (hermesAdapter) {
            var HermesAdapterApi = /** @class */ (function () {
                function HermesAdapterApi(ctx, args) {
                    this.adapter = new hermesAdapter.HermesAdapter(ctx, args);
                }
                HermesAdapterApi.prototype.getAppTitleUrl = function () {
                    return this.adapter.getUrl('AppTitle');
                };
                HermesAdapterApi.prototype.getPortalTitleUrl = function () {
                    return this.adapter.getUrl('PortalTitle');
                };
                HermesAdapterApi.prototype.getLoginUrl = function () {
                    return this.adapter.getUrl('Login');
                };
                HermesAdapterApi.prototype.getLogoutUrl = function () {
                    return this.adapter.getUrl('Logout');
                };
                HermesAdapterApi.prototype.getProfileUrl = function () {
                    return this.adapter.getUrl('Profile');
                };
                HermesAdapterApi.prototype.getSettingsUrl = function () {
                    return this.adapter.getUrl('Settings');
                };
                HermesAdapterApi.prototype.getHelpUrl = function () {
                    return this.adapter.getUrl('Help');
                };
                HermesAdapterApi.prototype.getLangUrl = function (arg) {
                    sffw.assert(arg);
                    return this.adapter.getLangUrl(arg.lang);
                };
                HermesAdapterApi.prototype.dispose = function () {
                    this.adapter.dispose();
                };
                return HermesAdapterApi;
            }());
            hermesAdapter.HermesAdapterApi = HermesAdapterApi;
        })(hermesAdapter = api.hermesAdapter || (api.hermesAdapter = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.api.hermesAdapter.HermesAdapterApi;
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
