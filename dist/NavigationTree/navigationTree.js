var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var navigationTree;
        (function (navigationTree) {
            var Model = /** @class */ (function () {
                function Model(params, componentInfo) {
                    var _this = this;
                    this.root = null;
                    this.generateAriaCurrent = null;
                    this.ctrl = params.controller;
                    if (params.generateAriaCurrent) {
                        this.generateAriaCurrent = params.generateAriaCurrent;
                    }
                    this.ariaLabel = params.ariaLabel || null;
                    this.generatedNodesKind = params.generatedNodesKind || 'button';
                    this.onNodeActivated = params.OnNodeActivated;
                    if (this.ctrl) {
                        this.root = this.ctrl.rootNode;
                        if (this.onNodeActivated) {
                            this.ctrl.onNodeActivatedCallback = function (id, activatedByUser) {
                                return _this.onNodeActivated(id, null, { id: id, activatedByUser: activatedByUser });
                            };
                        }
                    }
                    else {
                        console.error('Controller param not provided to NavigationTree');
                    }
                }
                Model.prototype.dispose = function () {
                    this.ctrl.onNodeActivatedCallback = null;
                    this.ctrl = null;
                };
                return Model;
            }());
            navigationTree.Model = Model;
        })(navigationTree = components.navigationTree || (components.navigationTree = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var navigationTree;
        (function (navigationTree) {
            var NodeModel = /** @class */ (function () {
                function NodeModel(params, componentInfo) {
                    var _this = this;
                    this.ariaCurrentValue = null;
                    this.node = params.node;
                    this.css = ko.pureComputed(function () {
                        var classes = [
                            'sffw-navigation-tree-node',
                            "sffw-navigation-tree-node-indent-" + _this.node.indent()
                        ];
                        if (_this.node.isActive && _this.node.isActive()) {
                            classes.push('sffw-navigation-tree-node-selected');
                        }
                        if (_this.node.isAnyChildNodeActive()) {
                            classes.push('sffw-navigation-tree-any-child-node-active');
                        }
                        if (_this.node.isSelfOrChildShowingError()) {
                            classes.push('sffw-navigation-tree-node-error');
                        }
                        switch (_this.node.type) {
                            case navigationTree.NodeType.Basic:
                                classes.push('sffw-navigation-tree-node-type-basic');
                                break;
                            case navigationTree.NodeType.Collection:
                                classes.push('sffw-navigation-tree-node-type-collection');
                                break;
                            case navigationTree.NodeType.CollectionItem:
                                classes.push('sffw-navigation-tree-node-type-collection-item');
                                break;
                            case navigationTree.NodeType.Previous:
                                classes.push('sffw-navigation-tree-node-type-previous');
                                break;
                            case navigationTree.NodeType.Next:
                                classes.push('sffw-navigation-tree-node-type-next');
                                break;
                        }
                        return classes.join(' ');
                    });
                    this.markerCss = ko.pureComputed(function () {
                        if (_this.node.marker && _this.node.marker()) {
                            return 'sffw-navigation-tree-node-marker sffw-navigation-tree-node-marker-' + _this.node.marker();
                        }
                        return null;
                    });
                    this.markerText = ko.pureComputed(function () {
                        return _this.node.markerText && _this.node.markerText();
                    });
                    this.ariaCurrentValue = params.ariaCurrentValue;
                    this.generatedNodesKind = params.generatedNodesKind;
                }
                NodeModel.prototype.onClick = function () {
                    this.node.activateNode(true);
                };
                return NodeModel;
            }());
            navigationTree.NodeModel = NodeModel;
        })(navigationTree = components.navigationTree || (components.navigationTree = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var navigationTree;
        (function (navigationTree) {
            if (ko && !ko.components.isRegistered('sffw-navigation-tree-node')) {
                ko.components.register('sffw-navigation-tree-node', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.navigationTree.NodeModel(params, componentInfo); }
                    },
                    template: "\n<!-- ko if: !node.isNodeTextHidden() -->\n<div>\n    <!-- ko if: generatedNodesKind === \"button\" -->\n        <button data-bind=\"text: node.caption, css: css, click: onClick, clickBubble: false\">\n        </button>\n    <!-- /ko -->\n    <!-- ko if: generatedNodesKind === \"hyperlink\" -->\n        <a href=\"#\" data-bind=\"text: node.caption, css: css, click: onClick, clickBubble: false\">\n        </a>\n    <!-- /ko -->\n    <!-- ko if: markerText --><span class=\"sffw-navigation-tree-node-marker-text\" data-bind=\"text: markerText\"></span><!-- /ko -->\n    <!-- ko if: markerCss --><span data-bind=\"css: markerCss\"></span><!-- /ko -->\n</div>\n<!-- /ko -->\n<!-- ko if: !node.isCollapsed() -->\n<ul>\n    <!-- ko foreach: node.children -->\n    <li data-bind=\"attr: { 'aria-current': $data.isActive() === true ? $parent.ariaCurrentValue : null }, component: { name: 'sffw-navigation-tree-node',\n        params: { node: $data, ariaCurrentValue: $parent.ariaCurrentValue, generatedNodesKind: $parent.generatedNodesKind } }\">\n    </li>\n    <!-- /ko -->\n</ul>\n<!-- /ko -->"
                });
            }
        })(navigationTree = components.navigationTree || (components.navigationTree = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var navigationTree;
        (function (navigationTree) {
            if (ko && !ko.components.isRegistered('sffw-navigation-tree')) {
                ko.components.register('sffw-navigation-tree', {
                    viewModel: {
                        createViewModel: function (params, componentInfo) { return new sffw.components.navigationTree.Model(params, componentInfo); }
                    },
                    template: "\n<!-- ko if: root -->\n<nav data-bind=\"attr: { 'aria-label': ariaLabel }\">\n    <!-- ko if: (root.children().length > 0) -->\n    <ul>\n        <!-- ko foreach: root.children -->\n        <li data-bind=\"attr: { 'aria-current': $data.isActive() === true ? $parent.generateAriaCurrent : null }, component: { name: 'sffw-navigation-tree-node',\n            params: { node: $data, ariaCurrentValue: $parent.generateAriaCurrent, generatedNodesKind: $parent.generatedNodesKind } }\">\n        </li>\n        <!-- /ko -->\n    </ul>\n    <!-- /ko -->\n</nav>\n<!-- /ko -->\n<!-- ko if: !root -->\n<nav data-bind=\"attr: { 'aria-label': ariaLabel }\">Navigation tree</nav>\n<!-- /ko -->\n"
                });
            }
        })(navigationTree = components.navigationTree || (components.navigationTree = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
var sffw;
(function (sffw) {
    var components;
    (function (components) {
        var navigationTree;
        (function (navigationTree) {
            var NodeType;
            (function (NodeType) {
                NodeType[NodeType["Basic"] = 0] = "Basic";
                NodeType[NodeType["Collection"] = 1] = "Collection";
                NodeType[NodeType["CollectionItem"] = 2] = "CollectionItem";
                NodeType[NodeType["Previous"] = 3] = "Previous";
                NodeType[NodeType["Next"] = 4] = "Next";
            })(NodeType = navigationTree.NodeType || (navigationTree.NodeType = {}));
            var SetupStage;
            (function (SetupStage) {
                SetupStage[SetupStage["None"] = 0] = "None";
                SetupStage[SetupStage["Initiated"] = 1] = "Initiated";
                SetupStage[SetupStage["Finished"] = 2] = "Finished";
            })(SetupStage = navigationTree.SetupStage || (navigationTree.SetupStage = {}));
        })(navigationTree = components.navigationTree || (components.navigationTree = {}));
    })(components = sffw.components || (sffw.components = {}));
})(sffw || (sffw = {}));
