var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var ScreenreaderMenu;
        (function (ScreenreaderMenu) {
            var ScreenreaderMenuModel = /** @class */ (function () {
                function ScreenreaderMenuModel(params) {
                    this.menuItems = [];
                    this.caption = params.caption;
                    this.menuItems = params.menuItems;
                    this.accessibilitySettings = params.accessibilitySettings;
                    if (this.accessibilitySettings) {
                        this.disableScreenreaderMenu = this.accessibilitySettings.isDisabledScreenreaderMenu;
                    }
                    else {
                        this.disableScreenreaderMenu = ko.observable();
                    }
                }
                return ScreenreaderMenuModel;
            }());
            ScreenreaderMenu.ScreenreaderMenuModel = ScreenreaderMenuModel;
        })(ScreenreaderMenu = components.ScreenreaderMenu || (components.ScreenreaderMenu = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var ScreenreaderMenu;
        (function (ScreenreaderMenu) {
            var ScreenreaderMenuItemModel = /** @class */ (function () {
                function ScreenreaderMenuItemModel() {
                }
                return ScreenreaderMenuItemModel;
            }());
            ScreenreaderMenu.ScreenreaderMenuItemModel = ScreenreaderMenuItemModel;
        })(ScreenreaderMenu = components.ScreenreaderMenu || (components.ScreenreaderMenu = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var ScreenreaderMenu;
        (function (ScreenreaderMenu) {
            if (ko && !ko.components.isRegistered('sffw-srmenu')) {
                ko.components.register('sffw-srmenu', {
                    viewModel: {
                        createViewModel: function (params) { return new sffw.components.ScreenreaderMenu.ScreenreaderMenuModel(params); }
                    },
                    synchronous: true,
                    template: "\n<!-- ko ifnot: disableScreenreaderMenu -->\n<div class=\"accessibility-links-container\">\n    <p data-bind=\"text: caption\"></p>\n    <ul data-bind=\"foreach: menuItems\">\n        <li>\n            <a href=\"#\" data-bind=\"text: caption, attr: { 'aria-description': assistiveText }, click: onClick\"></a>\n        </li>\n    </ul>\n</div>\n<!-- /ko -->"
                });
            }
        })(ScreenreaderMenu = components.ScreenreaderMenu || (components.ScreenreaderMenu = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
