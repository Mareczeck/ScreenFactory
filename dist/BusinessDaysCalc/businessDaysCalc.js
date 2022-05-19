var sffw;
(function (sffw) {
    var BusinessDaysCalc = /** @class */ (function () {
        function BusinessDaysCalc(datacontext, args) {
            this.datacontext = datacontext;
            this.holidays = [];
            this.countryCode = args.countryCode;
            var self = this;
        }
        BusinessDaysCalc.prototype.loadHolidays = function (args) {
            this.holidays = JSON.parse(args.holidaysJson, function (key, value) {
                if (key === 'date') {
                    return new Date(value);
                }
                else {
                    return value;
                }
            }).holidays;
            this.holidays = _.sortBy(this.holidays, 'date');
        };
        BusinessDaysCalc.prototype.isWorkDay = function (args) {
            if (args.date) {
                return !this.isWeekend(args.date) && !this.isHoliday(args.date);
            }
            return null;
        };
        BusinessDaysCalc.prototype.getNextWorkDay = function (args) {
            return this.getActualOrImmediateWorkDay(args.date, 1);
        };
        BusinessDaysCalc.prototype.getPrevWorkDay = function (args) {
            return this.getActualOrImmediateWorkDay(args.date, -1);
        };
        BusinessDaysCalc.prototype.getWorkDayShift = function (args) {
            if (!args.date) {
                return null;
            }
            if (typeof args.workdays === 'undefined' || args.workdays === null || args.workdays === 0) {
                return args.date;
            }
            var sign = this.sign(args.workdays);
            var startingWorkDay;
            if (sign === 1 || sign === -1) {
                startingWorkDay = this.getActualOrImmediateWorkDay(args.date, sign);
            }
            else {
                throw new Error('Invalid \"shiftWorkdays\" sign');
            }
            var tmpDay = new Date(+startingWorkDay);
            for (var d = 0; d < Math.abs(args.workdays); d++) {
                if (sign === 1 || sign === -1) {
                    tmpDay = this.skipWorkDay(tmpDay, sign);
                }
            }
            return tmpDay;
        };
        BusinessDaysCalc.prototype.getActualOrImmediateWorkDay = function (date, shiftDirection) {
            if (!date) {
                return null;
            }
            if (this.isWorkDay({ date: date })) {
                return date;
            }
            return this.skipWorkDay(date, shiftDirection);
        };
        BusinessDaysCalc.prototype.skipWorkDay = function (date, shiftDirection) {
            var tmpDay = new Date(+date);
            while (true) {
                tmpDay.setDate(tmpDay.getDate() + (1 * shiftDirection));
                if (this.isWorkDay({ date: tmpDay })) {
                    return tmpDay;
                }
            }
        };
        BusinessDaysCalc.prototype.sign = function (x) {
            return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
        };
        BusinessDaysCalc.prototype.isWeekend = function (date) {
            return date.getDay() === 0 || date.getDay() === 6;
        };
        BusinessDaysCalc.prototype.isHoliday = function (date) {
            var _this = this;
            if (this.holidays) {
                var result = _(this.holidays).find(function (holiday) {
                    return _this.datesEqual(holiday.date, date);
                });
                if (result) {
                    return true;
                }
            }
            return false;
        };
        BusinessDaysCalc.prototype.datesEqual = function (a, b) {
            return a.getFullYear() === b.getFullYear() &&
                a.getMonth() === b.getMonth() &&
                a.getDate() === b.getDate();
        };
        return BusinessDaysCalc;
    }());
    sffw.BusinessDaysCalc = BusinessDaysCalc;
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.BusinessDaysCalc;
    });
}
