var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var perfMeter;
        (function (perfMeter) {
            var PerfMeter = /** @class */ (function () {
                function PerfMeter(datacontext, args) {
                }
                PerfMeter.prototype.timelineLabel = function (args) {
                    if (console && console.timeStamp) {
                        console.timeStamp(args.name);
                    }
                };
                PerfMeter.prototype.time = function (args) {
                    if (console && console.time) {
                        console.time(args.name);
                    }
                };
                PerfMeter.prototype.timeEnd = function (args) {
                    if (console && console.timeEnd) {
                        console.timeEnd(args.name);
                    }
                };
                return PerfMeter;
            }());
            perfMeter.PerfMeter = PerfMeter;
        })(perfMeter = api.perfMeter || (api.perfMeter = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.api.perfMeter.PerfMeter;
    });
}
