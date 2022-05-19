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
		    var appMenu, designLabel, paramsParts,
		        processBinding = componentGen.processBinding, menuItems, menuSubItems;

			if (isDesignTime) {
				designLabel = new componentGen.Tree('span');
				designLabel.content.push({ text: 'appname' + def.name });
				componentWrapperTree.content.push(designLabel);
			} else {
				appMenu = new componentGen.Tree('sffw-appmenu');

                paramsParts = [];
                
				if (def.Visible) {
					paramsParts.push('menuVisible: \'' + def.Visible + '\'');
				}

				if (def.IconClass) {
					paramsParts.push('menuIcon: \'' + def.IconClass.replace(/\"/g, '&quot;') + '\'');
				}
                
                if (def.MenuItems) {
					menuItems = _.map(def.MenuItems, function (c) {
						var resultParts = [];

						if (c.Caption) {
							if (c.Caption.Binding) {
                                resultParts.push('Caption: '+ componentGen.processBinding(c.Caption.Binding));
							} else {
								resultParts.push('Caption: \'' + c.Caption.replace(/\"/g, '&quot;') + '\'');
							}
						}

						if (typeof c.Enabled != 'undefined') {
							if (c.Enabled.Binding) {
                                resultParts.push('enabled: '+ componentGen.processBinding(c.Enabled.Binding));
							} else {
								resultParts.push('enabled: ' + c.Enabled);
							}
						} else {
							resultParts.push('enabled: ' + true);
						}

						if (typeof c.Visible != 'undefined') {
							if (c.Visible.Binding) {
                                resultParts.push('visible: '+ componentGen.processBinding(c.Visible.Binding));
							} else {
								resultParts.push('visible: ' + c.Visible);
							}
						} else {
							resultParts.push('visible: ' + true);
						}


						if (c.OnClick) {
							resultParts.push('onClick: ' + componentGen.processActionReference(c.OnClick));
						}


						if (c.SubMenuCollection) {
							menuSubItems = _.map(c.SubMenuCollection, function (subItem) {
								var optParts = [];
								if (subItem.MenuItemName) {
									if (subItem.MenuItemName.Binding) {
                                        optParts.push('menuItemName: '+ componentGen.processBinding(subItem.MenuItemName.Binding));
									} else {
										optParts.push('menuItemName: \'' + subItem.MenuItemName + '\'');
									}
								}

								if (typeof subItem.Enabled != 'undefined') {
									if (subItem.Enabled.Binding) {
										optParts.push('enabled: '+ componentGen.processBinding(subItem.Enabled.Binding));
									} else {
										optParts.push('enabled: '+ subItem.Enabled);
									}
								} else {
									optParts.push('enabled: ' + true);
								}
		
								if (typeof subItem.Visible != 'undefined') {
									if (subItem.Visible.Binding) {
										optParts.push('visible: '+ componentGen.processBinding(subItem.Visible.Binding));
									} else {
										optParts.push('visible: ' + subItem.Visible);
									}
								} else {
									optParts.push('visible: ' + true);
								}

                                if (subItem.OnClick) {
                                    optParts.push('onClick: ' + componentGen.processActionReference(subItem.OnClick));
                                }
								return '{' + optParts.join(', ') + '}';
							});

							resultParts.push('menuSubItems: [' + menuSubItems.join(', ') + ']');
						}

						return '{' + resultParts.join(', ') + '}';
					});

					paramsParts.push('menuItems: [' + menuItems.join(', ') + ']');
				}


				paramsParts.push('$parentData: $data');

				appMenu.attributes.params = paramsParts.join(', ');

				componentWrapperTree.content.push(appMenu);
			}
		}
	};
});