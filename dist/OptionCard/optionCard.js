var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var sffw;
(function (sffw) {
    sffw.SFFW_TOOLTIPBUTTON_TEMPLATE = "\n<div class=\"sffw-tooltip-button-wrapper\">\n    <button class=\"tooltip-button\" data-bind=\"attr: { tabindex: (ko.unwrap(window.sf.accessibility.preferences.focusTooltipButtons) === false ? -1 : 0), 'aria-label': tooltipButtonAriaLabel, 'aria-pressed': 'false' }, tooltipButton: true\">\n        <span data-bind=\"css: tooltipIconClass\" aria-hidden=\"true\" ></span>\n    </button>\n    <div class=\"tooltip-popover-container\" role=\"status\">\n        <div class=\"tooltip-popover\" role=\"tooltip\" style=\"display: none\">\n            <div class=\"popover-arrow\" style=\"left: 50%;\"></div>\n            <div class=\"popover-content\" data-bind=\"text: tooltip\"></div>\n        </div>\n    </div>\n</div>\n";
    var handlers = ko.bindingHandlers;
    handlers.tooltipButton = handlers.tooltipButton || {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = ko.unwrap(valueAccessor());
            var $element = $(element);
            var eventNamesBind = 'click touch';
            var $tooltipPopover = $element.parent().find('.tooltip-popover-container .tooltip-popover');
            $element.on(eventNamesBind, function () {
                $tooltipPopover.toggle();
                var elemOffset = $element.offset();
                var parentOffset = $element.offsetParent().offset();
                var padding = 0;
                var topPos = elemOffset.top - parentOffset.top - $tooltipPopover.outerHeight() - padding;
                var leftPos = elemOffset.left - parentOffset.left + ($element.outerWidth() / 2) - ($tooltipPopover.outerWidth() / 2);
                topPos = (topPos < 0 && parentOffset.top === 0) ? 0 : topPos;
                leftPos = leftPos < 0 ? 0 : leftPos;
                $tooltipPopover.css({ 'top': topPos + 'px', 'left': leftPos + 'px' });
                $element.attr('aria-pressed', $tooltipPopover.is(':visible') ? 'true' : 'false');
            });
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $element.off(eventNamesBind);
            });
        }
    };
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            var CardRepeaterModel = /** @class */ (function () {
                function CardRepeaterModel(params, componentInfo) {
                    if (params.Data) {
                        this.items = params.Data.$items;
                    }
                    this.isVisible = typeof params.IsVisible === 'undefined' ? true : params.IsVisible;
                    this.cardItemsClassNumber = params.CardItemsClassNumber;
                    this.itemCountClass = ko.pureComputed(this.getItemsCount, this);
                }
                CardRepeaterModel.prototype.getItemsCount = function () {
                    var count = this.cardItemsClassNumber ? ko.unwrap(this.cardItemsClassNumber)
                        : ko.unwrap(this.items).length;
                    if (count > 1) {
                        return "card-items-" + count;
                    }
                    ;
                };
                return CardRepeaterModel;
            }());
            optionCard.CardRepeaterModel = CardRepeaterModel;
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard_1) {
            var OptionCardModelBase = /** @class */ (function () {
                function OptionCardModelBase(params, componentInfo) {
                    var _this = this;
                    this.subscriptions = [];
                    this.componentElement = componentInfo.element;
                    this.name = params.OptionGroupName;
                    this.icon = params.Icon;
                    this.heading = params.Heading;
                    this.tooltip = params.Tooltip;
                    this.tooltipButtonAriaLabel = params.TooltipButtonAriaLabel;
                    this.tooltipIconClass = params.TooltipIcon || 'icon icon-tulli-help';
                    ;
                    this.title = params.Title;
                    this.description = params.Description;
                    this.optionValue = params.OptionValue;
                    this.isEnabled = typeof params.IsEnabled === 'undefined' ? true : params.IsEnabled;
                    this.isVisible = typeof params.IsVisible === 'undefined' ? true : params.IsVisible;
                    this.selectedValue = params.SelectedValue;
                    if (this.isVisible === false) {
                        this.setCardWrapperVisibility(false, this.componentElement);
                    }
                    else if (ko.isObservable(this.isVisible)) {
                        this.setCardWrapperVisibility(ko.unwrap(this.isVisible), this.componentElement);
                        this.subscriptions.push(this.isVisible.subscribe(function (newValue) {
                            _this.setCardWrapperVisibility(newValue, _this.componentElement);
                        }));
                    }
                }
                OptionCardModelBase.prototype.setCardWrapperVisibility = function (isVisible, optionCard) {
                    var $node = $(optionCard);
                    var isInRepeater = $node.closest('.sffw-card-container.card-repeater').length > 0;
                    var isInGroup = $node.closest('.sffw-card-container.card-group').length > 0;
                    var $parents;
                    var $parentToHide;
                    if (isInRepeater) {
                        $parents = $node.parentsUntil('.sffw-card-container.card-repeater');
                        $parentToHide = $parents.last();
                    }
                    if (isInGroup) {
                        $parentToHide = $node.parent();
                    }
                    if ($parentToHide && $parentToHide.get(0).nodeName.toLowerCase() !== 'html') {
                        $parentToHide.toggle(isVisible);
                    }
                };
                OptionCardModelBase.prototype.dispose = function () {
                    _.each(this.subscriptions, function (sub) {
                        sub.dispose();
                    });
                };
                return OptionCardModelBase;
            }());
            optionCard_1.OptionCardModelBase = OptionCardModelBase;
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            var OptionCardSimpleModel = /** @class */ (function (_super) {
                __extends(OptionCardSimpleModel, _super);
                function OptionCardSimpleModel(params, componentInfo) {
                    return _super.call(this, params, componentInfo) || this;
                }
                OptionCardSimpleModel.prototype.onKeyDown = function (data, event) {
                    switch (event.key) {
                        case 'ArrowDown':
                        case 'ArrowLeft':
                        case 'ArrowRight':
                        case 'ArrowUp':
                            var $radio = $(event.target).closest('.sffw-option-card').find('input[type=radio]');
                            if ($radio.length > 0 && $radio[0] !== event.target) {
                                $radio.trigger('focus');
                                return false;
                            }
                            break;
                        default:
                            break;
                    }
                    return true;
                };
                return OptionCardSimpleModel;
            }(optionCard.OptionCardModelBase));
            optionCard.OptionCardSimpleModel = OptionCardSimpleModel;
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            var CardGroupModel = /** @class */ (function () {
                function CardGroupModel(params, componentInfo) {
                    this.ctx = params.$parentData;
                    this.isVisible = typeof params.IsVisible === 'undefined' ? true : params.IsVisible;
                    this.cardItemsClassNumber = params.CardItemsClassNumber;
                }
                CardGroupModel.prototype.getItemCountClass = function (rootPanelNode) {
                    var count = this.cardItemsClassNumber ? ko.unwrap(this.cardItemsClassNumber)
                        : $(rootPanelNode).find('sffw-optioncard-simple, sffw-optioncard-content').length;
                    if (count > 1) {
                        return "card-items-" + count;
                    }
                };
                return CardGroupModel;
            }());
            optionCard.CardGroupModel = CardGroupModel;
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            var OptionCardContentModel = /** @class */ (function (_super) {
                __extends(OptionCardContentModel, _super);
                function OptionCardContentModel(params, componentInfo) {
                    var _this = _super.call(this, params, componentInfo) || this;
                    _this.ctx = params.$parentData;
                    return _this;
                }
                OptionCardContentModel.prototype.onKeyDown = function (data, event) {
                    var _a;
                    switch (event.key) {
                        case 'ArrowDown':
                        case 'ArrowLeft':
                        case 'ArrowRight':
                        case 'ArrowUp':
                            var targetElement = event.target;
                            if (targetElement) {
                                // do not break select or ReferenceLookup keyboard functionality
                                if (targetElement.tagName.toLowerCase() === 'select' ||
                                    (targetElement.tagName.toLowerCase() === 'input' && ((_a = targetElement.attributes['aria-expanded']) === null || _a === void 0 ? void 0 : _a.value) === 'true')) {
                                    return true;
                                }
                                else {
                                    // focus the whole option card with arrow keys when we are inside on inner component
                                    var $radio = $(event.target).closest('.sffw-option-card').find('input[type=radio]');
                                    if ($radio.length > 0 && $radio[0] !== event.target) {
                                        $radio.trigger('focus');
                                        return false;
                                    }
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    return true;
                };
                return OptionCardContentModel;
            }(optionCard.OptionCardModelBase));
            optionCard.OptionCardContentModel = OptionCardContentModel;
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            if (ko && !ko.components.isRegistered('sffw-card-repeater')) {
                ko.components.register('sffw-card-repeater', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.optionCard.CardRepeaterModel(params, componentInfo); }
                    },
                    template: "\n<div data-bind=\"visible: isVisible, class: itemCountClass\" class=\"sffw-card-container card-repeater\" role=\"application\">\n    <!-- ko foreach: items -->\n        <!-- ko template: { nodes: $componentTemplateNodes, data: $data } --><!-- /ko -->\n    <!-- /ko -->\n</div>"
                });
            }
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            if (ko && !ko.components.isRegistered('sffw-optioncard-simple')) {
                ko.components.register('sffw-optioncard-simple', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.optionCard.OptionCardSimpleModel(params, componentInfo); }
                    },
                    template: "\n<!-- ko if: isVisible -->\n<label class=\"sffw-option-card\" data-bind=\"css: { 'option-checked': ko.unwrap(selectedValue) === ko.unwrap(optionValue) }, event: { keydown: onKeyDown }\">\n    <input type=\"radio\" class=\"option-card-radio\" data-bind=\"enable: isEnabled, checked: selectedValue, value: optionValue, attr: { name: name, 'data-checked': ko.unwrap(selectedValue) === ko.unwrap(optionValue) }\">\n    <div class=\"option-card-wrap\">\n        <div class=\"option-card-heading\">\n            <div class=\"heading-icon\" data-bind=\"css: icon\" aria-hidden=\"true\"></div>\n            <span class=\"heading-text\" data-bind=\"text: heading\"></span>\n            <!-- ko if: ko.unwrap(tooltip) -->\n                <!-- ko template: { name: '$tooltipTemplate', data: $data } --><!-- /ko -->\n            <!-- /ko -->\n        </div>\n        <div class=\"option-card-body\">\n            <div class=\"option-card-title\" data-bind=\"text: title\"></div>\n            <div class=\"option-card-description\" data-bind=\"text: description\"></div>\n        </div>\n    </div>\n</label>\n\n<script type=\"text/html\" id=\"$tooltipTemplate\">" + sffw.SFFW_TOOLTIPBUTTON_TEMPLATE + "</script>\n<!-- /ko -->"
                });
            }
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            if (ko && !ko.components.isRegistered('sffw-card-group')) {
                ko.components.register('sffw-card-group', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.optionCard.CardGroupModel(params, componentInfo); }
                    },
                    template: "\n<div data-bind=\"visible: isVisible, class: getItemCountClass($componentTemplateNodes[0])\" class=\"sffw-card-container card-group\" role=\"application\">\n    <!-- ko template: { nodes: $componentTemplateNodes, data: ctx } --><!-- /ko -->\n</div>"
                });
            }
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var optionCard;
        (function (optionCard) {
            if (ko && !ko.components.isRegistered('sffw-optioncard-content')) {
                ko.components.register('sffw-optioncard-content', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.optionCard.OptionCardContentModel(params, componentInfo); }
                    },
                    template: "\n<!-- ko if: isVisible -->\n<label class=\"sffw-option-card\" data-bind=\"css: { 'option-checked': ko.unwrap(selectedValue) === ko.unwrap(optionValue) }, event: { keydown: onKeyDown }\">\n    <input type=\"radio\" class=\"option-card-radio\" data-bind=\"enable: isEnabled, checked: selectedValue, value: optionValue, attr: { name: name, 'data-checked': ko.unwrap(selectedValue) === ko.unwrap(optionValue) }\">\n    <div class=\"option-card-wrap\">\n        <div class=\"option-card-heading\">\n            <div class=\"heading-icon\" data-bind=\"css: icon\" aria-hidden=\"true\"></div>\n            <span class=\"heading-text\" data-bind=\"text: heading\"></span>\n            <!-- ko if: ko.unwrap(tooltip) -->\n                <!-- ko template: { name: '$tooltipTemplate', data: $data } --><!-- /ko -->\n            <!-- /ko -->\n        </div>\n        <div class=\"option-card-body\">\n            <!-- ko template: { nodes: $componentTemplateNodes, data: ctx } --><!-- /ko -->\n        </div>\n    </div>\n</label>\n\n<script type=\"text/html\" id=\"$tooltipTemplate\">" + sffw.SFFW_TOOLTIPBUTTON_TEMPLATE + "</script>\n<!-- /ko -->\n"
                });
            }
        })(optionCard = components.optionCard || (components.optionCard = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
