var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var referenceComboPlus;
        (function (referenceComboPlus) {
            'use strict';
            var handlers = ko.bindingHandlers;
            handlers.refComboPlusAddGroupHeadings = handlers.refComboPlusAddGroupHeadings || {
                update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                    ko.unwrap(valueAccessor());
                    var $select = $(element);
                    var $firstPreferedOption = $select.children('option.option-prefered:first');
                    var $lastPreferedOption = $select.children('option.option-prefered:last');
                    var locF = bindingContext.$root.$localize;
                    if ($firstPreferedOption.length > 0) {
                        $("<option disabled value=\"null\">" + locF('ReferenceComboPlus$$favourites') + "</option>").insertBefore($firstPreferedOption);
                        $("<option disabled value=\"null\">" + locF('ReferenceComboPlus$$other') + "</option>").insertAfter($lastPreferedOption);
                    }
                }
            };
        })(referenceComboPlus = components.referenceComboPlus || (components.referenceComboPlus = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var referenceComboPlus;
        (function (referenceComboPlus) {
            'use strict';
            var extenders = ko.extenders;
            if (!extenders.refComboPlusItemSort) {
                extenders.refComboPlusItemSort = function (target, options) {
                    var result = ko.pureComputed(function () {
                        if (options.resultSorting === 'preferedTop') {
                            if (options.refList.isPreferedColumn(options.codelistPreferedAttName)) {
                                var preferedGroup = _.filter(ko.unwrap(target), function (item) {
                                    return item[options.codelistPreferedAttName] === true;
                                });
                                var othersGroup = _.filter(ko.unwrap(target), function (item) {
                                    return !(item[options.codelistPreferedAttName] === true);
                                });
                                var sortedResults = preferedGroup.concat(othersGroup);
                                return sortedResults;
                            }
                        }
                        return ko.unwrap(target);
                    });
                    return result;
                };
            }
        })(referenceComboPlus = components.referenceComboPlus || (components.referenceComboPlus = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
