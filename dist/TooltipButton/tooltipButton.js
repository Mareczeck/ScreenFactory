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
        var tooltipButton;
        (function (tooltipButton) {
            var TooltipButtonModel = /** @class */ (function () {
                function TooltipButtonModel(params, _componentInfo) {
                    this.tooltip = params.tooltip;
                    this.tooltipButtonAriaLabel = params.tooltipButtonAriaLabel;
                    this.tooltipIconClass = params.iconClass || 'icon icon-tulli-help';
                    this.ctx = params.$parentData;
                }
                return TooltipButtonModel;
            }());
            tooltipButton.TooltipButtonModel = TooltipButtonModel;
        })(tooltipButton = components.tooltipButton || (components.tooltipButton = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var tooltipButton;
        (function (tooltipButton) {
            if (ko && !ko.components.isRegistered('sffw-tooltipbutton')) {
                ko.components.register('sffw-tooltipbutton', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new tooltipButton.TooltipButtonModel(params, componentInfo); }
                    },
                    template: "" + sffw.SFFW_TOOLTIPBUTTON_TEMPLATE
                });
            }
        })(tooltipButton = components.tooltipButton || (components.tooltipButton = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
