var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var userInactivityTimer;
        (function (userInactivityTimer) {
            var UserInactivityTimer = /** @class */ (function () {
                function UserInactivityTimer(ctx, args) {
                    var _this = this;
                    // this is intentionally arrow function
                    this.restartTimer = function () {
                        if (_this.debugMode && console.log) {
                            console.log('UserInactivityTimer: resetting timer');
                        }
                        if (_this.timerHandle) {
                            window.clearTimeout(_this.timerHandle);
                        }
                        _this.timerHandle = setTimeout(function () { return _this.onTimeoutExpired(); }, _this.timerLengthInMinutes * 60000);
                    };
                    this.debugMode = args.debugMode === true;
                    this.onTimeoutEventFunc = sffw.extractEventHandlerFromApiArgs(ctx, args, 'OnTimeoutExpired');
                }
                UserInactivityTimer.prototype.dispose = function () {
                    this.disable();
                };
                UserInactivityTimer.prototype.onTimeoutExpired = function () {
                    if (this.onTimeoutEventFunc) {
                        this.onTimeoutEventFunc();
                    }
                };
                UserInactivityTimer.prototype.enable = function (args) {
                    this.timerLengthInMinutes = args.timerLengthInMinutes;
                    if (window && this.onTimeoutEventFunc) {
                        this.restartTimer();
                        $(document).on('click keydown', this.restartTimer);
                    }
                };
                UserInactivityTimer.prototype.disable = function () {
                    if (window) {
                        $(document).off('click keydown', this.restartTimer);
                        if (this.timerHandle) {
                            window.clearTimeout(this.timerHandle);
                        }
                    }
                };
                return UserInactivityTimer;
            }());
            userInactivityTimer.UserInactivityTimer = UserInactivityTimer;
        })(userInactivityTimer = api.userInactivityTimer || (api.userInactivityTimer = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.api.userInactivityTimer.UserInactivityTimer;
    });
}
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
