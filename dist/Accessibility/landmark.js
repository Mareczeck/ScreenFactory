var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var landmark;
        (function (landmark) {
            var LandmarkModel = /** @class */ (function () {
                function LandmarkModel(params, componentInfo) {
                    this.Name = params.Name;
                    if (_.isUndefined(params.isVisible)) {
                        this.isVisible = ko.observable(true);
                    }
                    else {
                        this.isVisible = params.isVisible;
                    }
                    this.tagName = params.tagName || 'nav';
                    this.ariaLabel = params.ariaLabel || null;
                    this.ctx = params.$parentData;
                }
                return LandmarkModel;
            }());
            landmark.LandmarkModel = LandmarkModel;
        })(landmark = components.landmark || (components.landmark = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var landmark;
        (function (landmark) {
            if (ko && !ko.components.isRegistered('sffw-landmark')) {
                ko.components.register('sffw-landmark', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.landmark.LandmarkModel(params, componentInfo); }
                    },
                    template: "\n            <!-- ko if: tagName === 'nav' -->\n            <nav data-bind=\"visible: isVisible, attr: { 'aria-label': ariaLabel }\">\n                <!-- ko template: { nodes: $componentTemplateNodes, data: ctx } -->\n                <!-- /ko -->\n            </nav>\n            <!-- /ko -->\n            <!-- ko if: tagName === 'main' -->\n            <main data-bind=\"visible: isVisible, attr: { 'aria-label': ariaLabel }\">\n                <!-- ko template: { nodes: $componentTemplateNodes, data: ctx } -->\n                <!-- /ko -->\n            </main>\n            <!-- /ko -->\n            <!-- ko if: tagName !== 'nav' && tagName !== 'main' -->\n            <div data-bind=\"visible: isVisible, attr: { 'aria-label': ariaLabel }\">\n                <!-- ko template: { nodes: $componentTemplateNodes, data: ctx } -->\n                <!-- /ko -->\n            </div>\n            <!-- /ko -->"
                });
            }
        })(landmark = components.landmark || (components.landmark = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
