var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var accessibility;
        (function (accessibility) {
            var AriaLiveRegion = /** @class */ (function () {
                function AriaLiveRegion(datacontext, args) {
                    this.subscriptions = [];
                    this.ariaRelevant = args.ariaRelevant || "additions";
                    this.ariaLive = args.ariaLive || "polite";
                    // inject region
                    this.$ariaLiveRegion = $("<div class=\"sffw-aria-live-region\" role=\"region\" aria-relevant=\"" + this.ariaRelevant + "\" aria-live=\"" + this.ariaLive + "\"></div>");
                    this.$ariaLiveRegion.insertAfter("#mainFormHolder");
                }
                //#region manifest api methods
                AriaLiveRegion.prototype.appendMessage = function (args) {
                    this.append(args.message);
                };
                AriaLiveRegion.prototype.clearAllMessages = function () {
                    this.clearAll();
                };
                //#endregion
                AriaLiveRegion.prototype.append = function (message) {
                    this.$ariaLiveRegion.append("<p>" + ko.unwrap(message) + "</p>");
                };
                AriaLiveRegion.prototype.clearAll = function () {
                    this.$ariaLiveRegion.html('');
                };
                AriaLiveRegion.prototype.dispose = function () {
                    _.each(this.subscriptions, function (sub) { return sub.dispose(); });
                    this.$ariaLiveRegion.remove();
                };
                return AriaLiveRegion;
            }());
            accessibility.AriaLiveRegion = AriaLiveRegion;
        })(accessibility = api.accessibility || (api.accessibility = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.api.accessibility.AriaLiveRegion;
    });
}
