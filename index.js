module.exports = function (stylecow) {

	stylecow.addTask({

		//Use var() function
		"Function": {
			var: function (fn) {
				var value = fn.parent({type: 'Rule'}).getData(fn[0].toString());

				if (value) {
					var parent = fn.parent();
					var index = fn.index();
					fn.remove();

					value.forEach(function (v, i) {
						parent.splice(index + i, 0, v.clone());
					});
				}

				if (fn[1]) {
					fn.replaceWith(fn[1]);
				}
			}
		},

		//Save new --variables
		Declaration: function (declaration) {
			if (declaration.name.indexOf('--') === 0) {
				var rule = declaration.parent({type: 'Rule'});
				var value = declaration.detach();

				if (rule.firstChild({type: 'Selectors'}).hasChild({type: 'Selector', string: [':root', 'html']})) {
					rule.parent({type: 'Root'}).setData(declaration.name, value);
				} else {
					rule.setData(declaration.name, value);
				}
			}
		}
	});
};
