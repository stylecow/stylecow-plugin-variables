module.exports = function (stylecow) {

	stylecow.addTask({

		//Use var() function
		"Function": {
			var: function (fn) {
				var arguments = fn.getContent();
				var value = fn.parent({type: 'Rule'}).getData(arguments[0]);

				if (value) {
					if (fn.parent().is({type: ['Value', 'Argument']}) && (value.length > 1)) {
						return fn.parent().setContent(value.join(','));
					}

					return fn.replaceWith(value.join(' '));
				}

				if (arguments[1]) {
					fn.replaceWith(arguments[1]);
				}
			}
		},

		//Save new --variables
		Declaration: function (declaration) {
			if (declaration.name.indexOf('--') === 0) {
				var rule = declaration.parent({type: 'Rule'});

				if (rule.hasChild({type: 'Selector', string: [':root', 'html']})) {
					rule.parent({type: 'Root'}).setData(declaration.name, declaration.getContent());
				} else {
					rule.setData(declaration.name, declaration.getContent());
				}

				declaration.remove();
			}
		}
	});
};
