"use strict";
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var plainObject;
        (function (plainObject) {
            var PlainObject = /** @class */ (function () {
                function PlainObject() {
                    this.obj = {};
                }
                PlainObject.prototype.init = function (args) {
                    try {
                        if (args.contentAsJson === '') {
                            this.obj = {};
                        }
                        this.obj = JSON.parse(args.contentAsJson);
                        return true;
                    }
                    catch (err) {
                        console.error(err);
                        return false;
                    }
                };
                PlainObject.prototype.set = function (args) {
                    try {
                        var path = plainObject.ObjectPath.fromALangNotation(args.path).toObjectNotation();
                        var value = JSON.parse(args.valueAsJson);
                        _.set(this.obj, path, value);
                        return true;
                    }
                    catch (err) {
                        console.error(err);
                        return false;
                    }
                };
                PlainObject.prototype.get = function (args) {
                    var value = this.getValue(args.path);
                    return JSON.stringify(value);
                };
                PlainObject.prototype.getString = function (args) {
                    var value = this.getValue(args.path);
                    return _.isString(value) ? value : null;
                };
                PlainObject.prototype.getInteger = function (args) {
                    var value = this.getValue(args.path);
                    return _.isInteger(value) ? value : null;
                };
                PlainObject.prototype.getBool = function (args) {
                    var value = this.getValue(args.path);
                    return _.isBoolean(value) ? value : null;
                };
                PlainObject.prototype.remove = function (args) {
                    var op = plainObject.ObjectPath.fromALangNotation(args.path);
                    if (op.isArrayItem()) {
                        var lastItemArrayPath = op.lastItemArrayPath();
                        _.get(this.obj, lastItemArrayPath.toObjectNotation()).splice(op.lastPartZeroBasedIndex(), 1);
                        return true;
                    }
                    else {
                        return _.unset(this.obj, op.toObjectNotation());
                    }
                };
                PlainObject.prototype.toJson = function () {
                    return JSON.stringify(this.obj);
                };
                PlainObject.prototype.toJsonOmitUnderscore = function () {
                    return JSON.stringify(this.obj, function (key, value) {
                        if (key && key[0] === '_') {
                            return undefined;
                        }
                        return value;
                    });
                };
                PlainObject.prototype.formatJson = function () {
                    return JSON.stringify(this.obj, null, 4);
                };
                PlainObject.prototype.isEqual = function (args) {
                    var poObj = this.obj;
                    if (args.path && args.path.length > 0) {
                        var path = plainObject.ObjectPath.fromALangNotation(args.path);
                        poObj = _.get(this.obj, path.toObjectNotation());
                    }
                    var jsonObj = JSON.parse(args.json);
                    return _.isEqual(poObj, jsonObj);
                };
                /**
                 * Removes recursivelly all elements with attribute isvalid=false
                 */
                PlainObject.prototype.removeInvalidCodelistValues = function () {
                    var invalidElementName = 'isvalid';
                    return new plainObject.CodelistCleanup(invalidElementName)
                        .removeInvalidCodelistValues(this.obj);
                };
                /**
                 * Removes objects without any own properties from arrays (recursivelly)
                 */
                PlainObject.prototype.removeEmptyCollectionItems = function (args) {
                    var filter = new sffw.api.plainObject.EmptyItemsFilter(this.obj, args.ignoreUnderscored);
                    filter.run();
                    return filter.wereObjectsRemoved;
                };
                PlainObject.prototype.getValue = function (aLangPath) {
                    var path = plainObject.ObjectPath.fromALangNotation(aLangPath);
                    return _.get(this.obj, path.toObjectNotation());
                };
                return PlainObject;
            }());
            plainObject.PlainObject = PlainObject;
        })(plainObject = api.plainObject || (api.plainObject = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
if (typeof define !== 'undefined') {
    define([], function () { return sffw.api.plainObject.PlainObject; });
}
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var plainObject;
        (function (plainObject) {
            var ObjectPath = /** @class */ (function () {
                function ObjectPath(parts) {
                    this.parts = parts;
                }
                ObjectPath.fromALangNotation = function (path) {
                    var parts = path.split('/').map(function (s) {
                        return new ObjectPathPart(s, false);
                    });
                    return new ObjectPath(parts);
                };
                ObjectPath.fromObjectNotation = function (path) {
                    var parts = path.split('.').map(function (s) {
                        return new ObjectPathPart(s, true);
                    });
                    return new ObjectPath(parts);
                };
                ObjectPath.prototype.isArrayItem = function () {
                    return this.parts[this.parts.length - 1].hasIndex();
                };
                ObjectPath.prototype.lastPartZeroBasedIndex = function () {
                    return this.parts[this.parts.length - 1].zeroBasedIndex;
                };
                ObjectPath.prototype.toActionLangNotation = function () {
                    return this.parts.map(function (p) {
                        return p.toString(false);
                    }).join('/');
                };
                ObjectPath.prototype.toObjectNotation = function () {
                    return this.parts.map(function (p) {
                        return p.toString(true);
                    }).join('.');
                };
                ObjectPath.prototype.parentPath = function () {
                    if (this.parts.length === 1) {
                        return null;
                    }
                    else {
                        return new ObjectPath(this.parts.slice(0, this.parts.length - 1));
                    }
                };
                ObjectPath.prototype.lastItemArrayPath = function () {
                    if (!this.isArrayItem()) {
                        throw new Error("ObjectPath.lastItemArrayPath expects to be called only if it is ArrayItem (" + this.parts + ")");
                    }
                    var arrayParts = this.parts.slice(0, this.parts.length - 1);
                    arrayParts.push(new ObjectPathPart(this.parts[this.parts.length - 1].text, true));
                    return new ObjectPath(arrayParts);
                };
                return ObjectPath;
            }());
            plainObject.ObjectPath = ObjectPath;
            var ObjectPathPart = /** @class */ (function () {
                function ObjectPathPart(path, zeroBased) {
                    var matches = path.match(/^(\w+)\[(\d+)\]$/);
                    if (matches && matches.length === 3) {
                        this.text = matches[1];
                        this.zeroBasedIndex = zeroBased ? Number(matches[2]) : Number(matches[2]) - 1;
                    }
                    else {
                        this.text = path;
                        this.zeroBasedIndex = null;
                    }
                }
                ObjectPathPart.prototype.hasIndex = function () {
                    return _.isNumber(this.zeroBasedIndex);
                };
                ObjectPathPart.prototype.toString = function (zeroBased) {
                    if (this.hasIndex()) {
                        return this.text + "[" + ((this.zeroBasedIndex || 0) + (zeroBased ? 0 : 1)) + "]";
                    }
                    else {
                        return this.text;
                    }
                };
                return ObjectPathPart;
            }());
            plainObject.ObjectPathPart = ObjectPathPart;
        })(plainObject = api.plainObject || (api.plainObject = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var plainObject;
        (function (plainObject) {
            var EmptyItemsFilter = /** @class */ (function () {
                function EmptyItemsFilter(data, ignoreUnderscored) {
                    this.data = data;
                    this.ignoreUnderscored = ignoreUnderscored;
                    this.wereObjectsRemoved = false;
                }
                EmptyItemsFilter.prototype.run = function () {
                    this.filterObject(this.data);
                };
                EmptyItemsFilter.prototype.filterCollection = function (arr) {
                    var _this = this;
                    var itemsToRemove = [];
                    _.each(arr, function (item) {
                        // if the array corresponds to collection there should always be plain object inside array
                        // but as there is no guarantee the objects did not come from outside sf, we check it anyway.
                        // if the array contains anything else (primitive types or arrays directly) we ignore them
                        if (_.isPlainObject(item)) {
                            if (_this.isEmptyObject(item)) {
                                itemsToRemove.push(item);
                            }
                            else {
                                _this.filterObject(item);
                            }
                        }
                    });
                    if (itemsToRemove.length) {
                        _.each(itemsToRemove, function (item) {
                            arr.splice(arr.indexOf(item), 1);
                        });
                        this.wereObjectsRemoved = true;
                    }
                };
                EmptyItemsFilter.prototype.isEmptyObject = function (obj) {
                    if (this.ignoreUnderscored) {
                        return _(obj).keys()
                            .filter(function (key) { return key.length > 0 && key[0] !== '_'; })
                            .value()
                            .length === 0;
                    }
                    else {
                        return _(obj).keys()
                            .value()
                            .length === 0;
                    }
                };
                EmptyItemsFilter.prototype.filterObject = function (obj) {
                    var _this = this;
                    _.forOwn(obj, function (value) {
                        if (_.isArray(value)) {
                            _this.filterCollection(value);
                        }
                        else {
                            if (_.isPlainObject(value)) {
                                _this.filterObject(value);
                            }
                        }
                    });
                };
                return EmptyItemsFilter;
            }());
            plainObject.EmptyItemsFilter = EmptyItemsFilter;
        })(plainObject = api.plainObject || (api.plainObject = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var plainObject;
        (function (plainObject) {
            var CodelistCleanup = /** @class */ (function () {
                function CodelistCleanup(invalidElementName) {
                    this.invalidElementName = invalidElementName;
                }
                CodelistCleanup.prototype.removeInvalidCodelistValues = function (obj) {
                    var result = new plainObject.CodelistCleanupResult();
                    this.removeInvalidElementsOnChildren(obj, [], result);
                    return result;
                };
                /**
                 * Removes recursivelly all elements with attribute <invalidElementName>=false.
                 * The method expects the object structure to be based on data exchange format from CIC,
                 * ie. no circular links etc.
                 */
                CodelistCleanup.prototype.removeInvalidElementsOnChildren = function (obj, objectPathParts, result) {
                    var _this = this;
                    if (_.isObject(obj)) {
                        _.forOwn(obj, function (el, childName) {
                            if (_.isArray(el)) {
                                // apply the method on all elements of the array
                                _.each(el, function (item, index) {
                                    var itemPart = new plainObject.ObjectPathPart(childName + "[" + index + "]", true);
                                    var pathParts = objectPathParts.concat([itemPart]);
                                    return _this.removeInvalidElementsOnChildren(item, pathParts, result);
                                });
                            }
                            else {
                                if (_.isObject(el)) {
                                    var elPathParts = objectPathParts.concat([new plainObject.ObjectPathPart(childName, true)]);
                                    if (el.hasOwnProperty(_this.invalidElementName) && (el[_this.invalidElementName]) === false) {
                                        result.addRemovedPath(new plainObject.ObjectPath(elPathParts));
                                        delete obj[childName];
                                    }
                                    else {
                                        _this.removeInvalidElementsOnChildren(el, elPathParts, result);
                                    }
                                }
                            }
                        });
                    }
                };
                return CodelistCleanup;
            }());
            plainObject.CodelistCleanup = CodelistCleanup;
        })(plainObject = api.plainObject || (api.plainObject = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var api;
    (function (api) {
        var plainObject;
        (function (plainObject) {
            var CodelistCleanupResult = /** @class */ (function () {
                function CodelistCleanupResult() {
                    this.removedElementsPaths = [];
                }
                CodelistCleanupResult.prototype.addRemovedPath = function (path) {
                    this.removedElementsPaths.push(path.toActionLangNotation());
                };
                CodelistCleanupResult.prototype.isSomethingRemoved = function () {
                    return this.removedElementsPaths.length > 0;
                };
                CodelistCleanupResult.prototype.isSomethingRemovedInPath = function (args) {
                    if (!args || !args.aLangPath) {
                        return false;
                    }
                    return _.some(this.removedElementsPaths, function (elPath) { return elPath.indexOf(args.aLangPath) === 0; });
                };
                return CodelistCleanupResult;
            }());
            plainObject.CodelistCleanupResult = CodelistCleanupResult;
        })(plainObject = api.plainObject || (api.plainObject = {}));
    })(api = sffw.api || (sffw.api = {}));
})(sffw || (sffw = {}));
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
