var sffw;
(function (sffw) {
    // Matches DMS DmsCoordinates
    // http://regexpal.com/?flags=gim&regex=^%28-%3F\d%2B%28%3F%3A\.\d%2B%29%3F%29[%C2%B0%3Ad]%3F\s%3F%28%3F%3A%28\d%2B%28%3F%3A\.\d%2B%29%3F%29[%27%E2%80%B2%3A]%3F\s%3F%28%3F%3A%28\d%2B%28%3F%3A\.\d%2B%29%3F%29[%22%E2%80%B3]%3F%29%3F%29%3F\s%3F%28[NSEW]%29%3F&input=40%3A26%3A46N%2C79%3A56%3A55W%0A40%3A26%3A46.302N%2079%3A56%3A55.903W%0A40%C2%B026%E2%80%B247%E2%80%B3N%2079%C2%B058%E2%80%B236%E2%80%B3W%0A40d%2026%E2%80%B2%2047%E2%80%B3%20N%2079d%2058%E2%80%B2%2036%E2%80%B3%20W%0A40.446195N%2079.948862W%0A40.446195%2C%20-79.948862%0A40%C2%B0%2026.7717%2C%20-79%C2%B0%2056.93172%0A
    var dmsRe = /^(-?\d+(?:\.\d+)?)[°:d]?\s?(?:(\d+(?:\.\d+)?)['′ʹ:]?\s?(?:(\d+(?:\.\d+)?)["″ʺ]?)?)?\s?([NSEW])?/i;
    /**
     * Removes the decimal part of a number without rounding up.
     * @param {number} n
     * @returns {number}
     * @private
     */
    function truncate(n) {
        return n > 0 ? Math.floor(n) : Math.ceil(n);
    }
    var Dms = /** @class */ (function () {
        /**
         * @constructor module:dms.Dms
         * @param {number} dd
         * @param {string} longOrLat
         */
        function Dms(dd, longOrLat) {
            this._dd = dd;
            this._hemisphere = /^[WE]|(?:lon)/i.test(longOrLat) ? dd < 0 ? 'W' : 'E' : dd < 0 ? 'S' : 'N';
        }
        Object.defineProperty(Dms.prototype, "dd", {
            /**
             * Value in decimal degrees
             * @member {number}
             * @readonly
             */
            get: function () {
                return this._dd;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dms.prototype, "hemisphere", {
            /**
             * Hemisphere
             * @member {string}
             * @readonly
             */
            get: function () {
                return this._hemisphere;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Dms.prototype, "precision", {
            /**
             * Precision for formatting seconds
             * @member {number}
             */
            get: function () {
                return this._precision;
            },
            set: function (p) {
                this._precision = p;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns the DMS parts as an array.
         * The first three elements of the returned array are numbers:
         * degrees, minutes, and seconds respectively. The fourth
         * element is a string indicating the hemisphere: "N", "S", "E", or "W".
         * @returns {Array.<(number|string)>}
         * @deprecated
         */
        Dms.prototype.getDmsArray = function () {
            return this.dmsArray;
        };
        Object.defineProperty(Dms.prototype, "dmsArray", {
            /**
             * Returns the DMS parts as an array.
             * The first three elements of the returned array are numbers:
             * degrees, minutes, and seconds respectively. The fourth
             * element is a string indicating the hemisphere: "N", "S", "E", or "W".
             * @returns {Array.<(number|string)>}
             */
            get: function () {
                var absDD = Math.abs(this._dd);
                var degrees = truncate(absDD);
                var minutes = truncate((absDD - degrees) * 60);
                var seconds = (absDD - degrees - minutes / 60) * Math.pow(60, 2);
                if (!(isNaN(this._precision))) {
                    if (this._precision === 0) {
                        seconds = Math.round(seconds);
                    }
                    else if (this._precision > 0) {
                        var precFactor = Math.pow(10, this._precision);
                        seconds = Math.round(seconds * precFactor) / precFactor;
                    }
                }
                return [degrees, minutes, seconds, this._hemisphere];
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns the DMS value as a string.
         * @returns {string}
         */
        Dms.prototype.toString = function () {
            var dmsArray = this.getDmsArray();
            return dmsArray[0] + "\u00B0" + dmsArray[1] + "\u2032" + dmsArray[2] + "\u2033 " + dmsArray[3];
        };
        return Dms;
    }());
    sffw.Dms = Dms;
    /**
     * @typedef {Object} DmsArrays
     * @property {Array.<(number|string)>} longitude
     * @property {Array.<(number|string)>} latitude
     */
    var DmsCoordinates = /** @class */ (function () {
        /**
         * Represents a location on the earth in WGS 1984 coordinates.
         * @constructor module:dms.DmsCoordinates
         * @param {number} latitude - WGS 84 Y coordinates
         * @param {number} longitude - WGS 84 X coordinates
         * @throws {TypeError} - latitude and longitude must be numbers.
         * @throws {RangeError} - latitude must be between -180 and 180, and longitude between -90 and 90. Neither can be NaN.
         */
        function DmsCoordinates(lat, lon) {
            this.lat = lat;
            this.lon = lon;
            if (typeof lat !== 'number' || typeof lon !== 'number') {
                throw TypeError('The longitude and latitude parameters must be numbers.');
            }
            if (isNaN(lon) || lon < -180 || lon > 180) {
                throw RangeError('longitude must be between -180 and 180');
            }
            if (isNaN(lat) || lat < -90 || lat > 90) {
                throw RangeError('latitude must be between -90 and 90');
            }
            this._longitude = new Dms(lon, 'long');
            this._latitude = new Dms(lat, 'lat');
        }
        Object.defineProperty(DmsCoordinates.prototype, "longitude", {
            /**
             * Longitude
             * @type {module:dms.Dms} longitude - Longitude (X coordinate);
             */
            get: function () {
                return this._longitude;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DmsCoordinates.prototype, "latitude", {
            /**
             * Latitude
             * @type {module:dms.Dms} longitude - Latitude (y coordinate);
             */
            get: function () {
                return this._latitude;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns an object containing arrays containing degree / minute / second components.
         * @returns {DmsArrays}
         * @deprecated
         */
        DmsCoordinates.prototype.getDmsArrays = function () {
            return this.dmsArrays;
        };
        Object.defineProperty(DmsCoordinates.prototype, "dmsArrays", {
            /**
             * Returns an object containing arrays containing degree / minute / second components.
             * @type {DmsArrays}
             */
            get: function () {
                return {
                    longitude: this.longitude.getDmsArray(),
                    latitude: this.latitude.getDmsArray()
                };
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns the coordinates to a comma-separated string.
         * @returns {string}
         */
        DmsCoordinates.prototype.toString = function () {
            return [this.latitude, this.longitude].join(', ');
        };
        DmsCoordinates.prototype.setPrecision = function (precision) {
            this.latitude.precision = precision;
            this.longitude.precision = precision;
        };
        // Results of match will be [full coords string, Degrees, minutes (if any), seconds (if any), hemisphere (if any)]
        // E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
        // E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]
        /**
         * A regular expression matching DMS coordinate.
         * Example matches:
         * E.g., ["40:26:46.302N", "40", "26", "46.302", "N"]
         * E.g., ["40.446195N", "40.446195", undefined, undefined, "N"]
         * @type {RegExp}
         * @static
         */
        DmsCoordinates.dmsRe = dmsRe;
        return DmsCoordinates;
    }());
    sffw.DmsCoordinates = DmsCoordinates;
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var Options = /** @class */ (function () {
        function Options() {
        }
        return Options;
    }());
    sffw.Options = Options;
    var Geolocation = /** @class */ (function () {
        function Geolocation(datacontext, args) {
            this.options = new Options();
            if (_.isBoolean(args.enableHighAccuracy)) {
                this.options.enableHighAccuracy = args.enableHighAccuracy;
            }
            else {
                this.options.enableHighAccuracy = true;
            }
            if (_.isNumber(args.timeout)) {
                this.options.timeout = args.timeout;
            }
            else {
                this.options.timeout = Number.POSITIVE_INFINITY;
            }
            if (_.isNumber(args.maximumAge)) {
                if (args.maximumAge === -1) {
                    this.options.maximumAge = Number.POSITIVE_INFINITY;
                }
                else {
                    this.options.maximumAge = args.maximumAge;
                }
            }
            else {
                this.options.maximumAge = 0;
            }
        }
        Geolocation.prototype.getCurrentPositionAsync = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var geo = navigator.geolocation;
                if (geo) {
                    var ietimeout_1 = setTimeout(function () { clearTimeout(ietimeout_1); resolve(new sffw.GeoResult(null)); }, _this.options.timeout + 5000);
                    return geo.getCurrentPosition(function (position) {
                        clearTimeout(ietimeout_1);
                        var coords = position.coords;
                        var dmsCoords = new sffw.DmsCoordinates(coords.latitude, coords.longitude);
                        resolve(new sffw.GeoResult(dmsCoords));
                    }, function (err) {
                        clearTimeout(ietimeout_1);
                        resolve(new sffw.GeoResult(err));
                    }, _this.options);
                }
                else {
                    throw new Error(('Error: Your browser doesn\'t support geolocation.'));
                }
            }).then(function (res) { return res; });
        };
        return Geolocation;
    }());
    sffw.Geolocation = Geolocation;
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () {
        return sffw.Geolocation;
    });
}
var sffw;
(function (sffw) {
    var GeoResult = /** @class */ (function () {
        function GeoResult(result) {
            this.result = result;
            if (result) {
                if (result instanceof sffw.DmsCoordinates) {
                    this.dmsCoords = result;
                }
                else {
                    this.error = result;
                }
            }
        }
        GeoResult.prototype.getDmsString = function () {
            if (this.dmsCoords) {
                this.dmsCoords.setPrecision(null);
                return this.dmsCoords.toString();
            }
            else {
                return '';
            }
        };
        GeoResult.prototype.getDmsStringWithPrecision = function (args) {
            if (this.dmsCoords) {
                this.dmsCoords.setPrecision(args.precision);
                return this.dmsCoords.toString();
            }
            else {
                return '';
            }
        };
        GeoResult.prototype.isError = function () {
            if (this.error) {
                return true;
            }
            else if (this.dmsCoords) {
                return false;
            }
            return true;
        };
        GeoResult.prototype.getErrorMessage = function () {
            if (!this.isError()) {
                return '';
            }
            if (this.error) {
                return this.error.code + " - " + this.error.message;
            }
            else {
                return 'Unspecified error';
            }
        };
        GeoResult.prototype.getLatitude = function () {
            if (!this.isError()) {
                return this.dmsCoords.latitude.dd;
            }
        };
        GeoResult.prototype.getLongitude = function () {
            if (!this.isError()) {
                return this.dmsCoords.longitude.dd;
            }
        };
        return GeoResult;
    }());
    sffw.GeoResult = GeoResult;
})(sffw || (sffw = {}));
