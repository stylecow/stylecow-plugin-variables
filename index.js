module.exports = function (stylecow) {

	//Use var() function
	stylecow.addTask({
		filter: {
			type: 'Function',
			name: 'var'
		},
		fn: function (fn) {
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
	});


	//Save new --variables
	stylecow.addTask({
		filter: {
			type: 'Declaration'
		},
		fn: function (declaration) {
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
