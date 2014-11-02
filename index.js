module.exports = function (stylecow) {

	stylecow.addTask({
		//Use var() function
		"Function": {
			var: function (fn) {
				var arguments = fn.getContent();
				var value = fn.parent({type: 'Rule'}).getData(arguments[0]) || arguments[1];

				if (value) {
					fn.replaceWith(value);
				}

			}
		},

		//Save new --variables
		Declaration: function (declaration) {
			if (declaration.name.indexOf('--') === 0) {
				var rule = declaration.parent({type: 'Rule'});

				if (rule.hasChild({type: 'Selector', string: [':root', 'html']})) {
					rule.parent({type: 'Root'}).setData(declaration.name, declaration.value);
				} else {
					rule.setData(declaration.name, declaration.value);
				}

				declaration.remove();
			}
		}
	});
};
