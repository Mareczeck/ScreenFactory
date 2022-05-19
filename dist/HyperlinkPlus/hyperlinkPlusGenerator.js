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

	return {
		generate: function (componentGen, def, componentWrapperTree, isDesigntime) {
		    var processBinding = componentGen.processBinding,
		        aTree;

            aTree = new componentGen.Tree('a');
            aTree.cssClass['sffw-hyperlinkplus'] = true;
            if (def.Href) {
                if (def.Href.Binding) {
                    aTree.attrBinding.href = componentGen.processBindingPreferAsString(def.Href.Binding);
                } else {
                    aTree.attributes.href = def.Href;
                }
            } else {
                aTree.attributes.href = '#';
            }

            if (def.Data) {
                if (def.Data.Binding) {
                    aTree.databind.text = componentGen.processBindingPreferAsString(def.Data.Binding);
                } else {
                    aTree.content.push({ text: def.Data });
                }
            } else {
                aTree.content.push({ text: def.Name });
            }

            if (def.Target) {
                aTree.attributes.target = def.Target;
            }

            if (def.AriaLabel) {
                if (def.AriaLabel.Binding) {
                    aTree.attrBinding['aria-label'] = componentGen.processBindingPreferAsString(def.AriaLabel.Binding);
                } else {
                    aTree.attributes['aria-label'] = def.AriaLabel;
                }
            }

            if (!isDesigntime) {
                componentGen.mixinOnClick(def, aTree);
		    }

            componentGen.mixinAccessibilityAttributes(def, aTree);

            componentWrapperTree.content.push(aTree);
		}
	};
});