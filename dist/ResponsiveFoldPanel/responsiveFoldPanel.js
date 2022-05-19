var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var responsiveFoldPanel;
        (function (responsiveFoldPanel) {
            var ResponsiveFoldPanelModel = /** @class */ (function () {
                function ResponsiveFoldPanelModel(params, componentInfo) {
                    this.isUnfolded = ko.observable(false);
                    this.Name = params.Name;
                    if (_.isUndefined(params.isVisible)) {
                        this.isVisible = ko.observable(true);
                    }
                    else {
                        this.isVisible = params.isVisible;
                    }
                    this.ctx = params.$parentData;
                    this.showContent = ko.pureComputed(this.getShowContent, this);
                }
                ResponsiveFoldPanelModel.prototype.getShowContent = function () {
                    return ko.unwrap(this.isVisible) && ko.unwrap(this.isUnfolded);
                };
                ResponsiveFoldPanelModel.prototype.toggleFoldState = function () {
                    var state = ko.unwrap(this.isUnfolded);
                    this.isUnfolded(!state);
                };
                return ResponsiveFoldPanelModel;
            }());
            responsiveFoldPanel.ResponsiveFoldPanelModel = ResponsiveFoldPanelModel;
        })(responsiveFoldPanel = components.responsiveFoldPanel || (components.responsiveFoldPanel = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var responsiveFoldPanel;
        (function (responsiveFoldPanel) {
            if (ko && !ko.components.isRegistered('sffw-responsive-foldpanel')) {
                ko.components.register('sffw-responsive-foldpanel', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.responsiveFoldPanel.ResponsiveFoldPanelModel(params, componentInfo); }
                    },
                    template: "\n            <div class=\"sffw-responsive-foldpanel-turnedon\" data-bind=\"visible: isVisible\">\n                <div class=\"sffw-responsive-foldpanel-toggle\" role=\"button\" data-bind=\"attr: { 'aria-label': $root.$localize('ResponsiveFoldPanel$$buttonText'), 'aria-expanded' : ko.unwrap(showContent) === true ? 'true' : 'false' }\">\n                    <!--    Some spans to act as a hamburger. -->\n                    <button data-bind=\"click: toggleFoldState, attr: { 'aria-label': ko.unwrap(showContent) === true ? $root.$localize('ResponsiveFoldPanel$$buttonCollapseText') : $root.$localize('ResponsiveFoldPanel$$buttonExpandText')}\">\n                        <span aria-hidden='true'></span>\n                        <span aria-hidden='true'></span>\n                        <span aria-hidden='true'></span>\n                    </button>\n                    <div data-bind=\"visible: showContent\" class=\"sffw-responsive-foldpanel-content\">\n                        <!-- ko template: { nodes: $componentTemplateNodes, data: ctx } --><!-- /ko -->\n                    </div>\n                </div>\n            </div>\n            <div class=\"sffw-responsive-foldpanel-turnedoff\" data-bind=\"visible: isVisible\">\n                <!-- ko template: { nodes: $componentTemplateNodes, data: ctx } --><!-- /ko -->\n            </div>"
                });
            }
        })(responsiveFoldPanel = components.responsiveFoldPanel || (components.responsiveFoldPanel = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
