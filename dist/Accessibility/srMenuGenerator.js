(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
	'use strict';
	var _ = (typeof window !== 'undefined' ? window._ : require('lodash'));

	return {
		generate: function (componentGen, def, componentWrapperTree, isDesignTime) {
		    var srMenu, designLabel, paramsParts,
		        processBinding = componentGen.processBinding, menuItems, menuSubItems;

			if (isDesignTime) {
				designLabel = new componentGen.Tree('span');
				designLabel.content.push({ text: 'ScreenreaderMenu ' + def.name });
				componentWrapperTree.content.push(designLabel);
			} else {
				srMenu = new componentGen.Tree('sffw-srmenu');

                paramsParts = [];

				if (def.Caption) {
                    if (def.Caption.Binding) {
                        paramsParts.push('caption: '+ componentGen.processBinding(def.Caption.Binding));
                    } else {
                        paramsParts.push('caption: \'' + def.Caption.replace(/\"/g, '&quot;') + '\'');
                    }
                }

			    if (def.AccessibilitySettings) {
					paramsParts.push('accessibilitySettings: ' + (def.AccessibilitySettings.IsGlobal ? '$root.$globals.$api[\'' : '$root.$api[\'') + def.AccessibilitySettings.Reference + '\']');
			    }

                if (def.MenuItems) {
					menuItems = _.map(def.MenuItems, function (item) {
						var itemsParts = [];

                        if (item.Caption) {
							if (item.Caption.Binding) {
                                itemsParts.push('caption: '+ componentGen.processBinding(item.Caption.Binding));
							} else {
								itemsParts.push('caption: \'' + item.Caption.replace(/\"/g, '&quot;') + '\'');
							}
						}

						if (item.AssistiveText) {
							if (item.AssistiveText.Binding) {
                                itemsParts.push('assistiveText: '+ componentGen.processBinding(item.AssistiveText.Binding));
							} else {
								itemsParts.push('assistiveText: \'' + item.AssistiveText.replace(/\"/g, '&quot;') + '\'');
							}
						}

						if (item.OnClick) {
							itemsParts.push('onClick: ' + componentGen.processActionReference(item.OnClick));
						}

						return '{' + itemsParts.join(', ') + '}';
					});

					paramsParts.push('menuItems: [' + menuItems.join(', ') + ']');
				}


				paramsParts.push('$parentData: $data');

				srMenu.attributes.params = paramsParts.join(', ');

				componentWrapperTree.content.push(srMenu);
			}
		}
	};
});