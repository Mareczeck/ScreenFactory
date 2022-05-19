var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var AppMenu;
        (function (AppMenu) {
            var AppMenuItemModel = /** @class */ (function () {
                function AppMenuItemModel() {
                    this.menuSubItems = [];
                }
                return AppMenuItemModel;
            }());
            AppMenu.AppMenuItemModel = AppMenuItemModel;
        })(AppMenu = components.AppMenu || (components.AppMenu = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var AppMenu;
        (function (AppMenu) {
            var AppMenuSubItemModel = /** @class */ (function () {
                function AppMenuSubItemModel() {
                }
                return AppMenuSubItemModel;
            }());
            AppMenu.AppMenuSubItemModel = AppMenuSubItemModel;
        })(AppMenu = components.AppMenu || (components.AppMenu = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var AppMenu;
        (function (AppMenu) {
            var AppMenuViewModel = /** @class */ (function () {
                function AppMenuViewModel(params) {
                    this.menuItems = [];
                    this.menuItems = params.menuItems;
                    this.menuVisible = params.menuVisible;
                    if (!_.isUndefined(params.menuIcon)) {
                        this.menuIcon = params.menuIcon;
                    }
                    else {
                        this.menuIcon = 'fa fa-caret-down';
                    }
                    var that = this;
                    this.clickHandler = function (e) {
                        if (!$(e.target).hasClass('menu-caption-span') && !$(e.target).hasClass('menu-item')) {
                            that.clearClickSelection();
                        }
                    };
                    $(document).on('click', this.clickHandler);
                }
                AppMenuViewModel.prototype.clearClickSelection = function () {
                    $('.sub-menu').css('display', 'none');
                    $('.menu-item').removeClass('highlight-menu-item');
                    return true;
                };
                AppMenuViewModel.prototype.menuItemClick = function (_data, event) {
                    this.clearClickSelection();
                    $(event.delegateTarget.children[1]).css('display', 'block');
                    $(event.delegateTarget).addClass('highlight-menu-item');
                };
                AppMenuViewModel.prototype.dispose = function () {
                    $(document).off('click', this.clickHandler);
                    this.clickHandler = null;
                };
                return AppMenuViewModel;
            }());
            AppMenu.AppMenuViewModel = AppMenuViewModel;
        })(AppMenu = components.AppMenu || (components.AppMenu = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var AppMenu;
        (function (AppMenu) {
            if (ko && !ko.components.isRegistered('sffw-appmenu')) {
                ko.components.register('sffw-appmenu', {
                    viewModel: {
                        createViewModel: function (params) { return new sffw.components.AppMenu.AppMenuViewModel(params); }
                    },
                    synchronous: true,
                    template: "\n<ul class=\"sffw-appmenu\">\n    <!-- ko foreach: menuItems -->\n    <li data-bind=\"event: { 'keyup' : function (data,event) { if (event.keyCode === 13) { if (typeof $data.onClick !== 'undefined') { $data.onClick(); } else { $parent.menuItemClick(data, event); } }}},valueUpdate: 'afterkeydown',click: function(data, event) {if(typeof $data.onClick != 'undefined') { $parent.clearClickSelection(); $data.onClick(); } else { $parent.menuItemClick(data, event); } }, visible: $data.visible\" class=\"menu-item\" tabindex=\"0\">\n        <span data-bind=\"text: $data.Caption\" class=\"menu-caption-span\"></span>\n        <!-- ko if: typeof $data.menuSubItems !== 'undefined' && $data.menuSubItems.length > 0 -->\n            <ul class=\"sub-menu\">\n            <!-- ko foreach: $data.menuSubItems -->\n                <li data-bind=\"event: { 'keyup' : function (data, event) { if (event.keyCode === 13) { $parents[1].clearClickSelection(); document.activeElement.blur(); if (typeof $data.onClick !== 'undefined') { $data.onClick(); } } return true; } }, valueUpdate: 'afterkeydown',click: function () { $parents[1].clearClickSelection(); if (typeof $data.onClick != 'undefined') { $data.onClick(); } return true; }, keyupBubble: false, clickBubble: false, text: $data.menuItemName, visible: $data.visible\" tabindex=\"0\" class=\"sub-menu-item\">\n                </li>\n            <!-- /ko -->\n            </ul>\n            <span><i data-bind=\"class: $parents[0].menuIcon\"></i></span>\n        <!-- /ko -->\n    </li>\n    <!-- /ko -->\n</ul>"
                });
            }
        })(AppMenu = components.AppMenu || (components.AppMenu = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
