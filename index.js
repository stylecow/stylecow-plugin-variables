module.exports = function (stylecow) {

	//Use var() function
	stylecow.addTask({
		filter: {
			type: 'Function',
			name: 'var'
		},
		fn: function (fn) {
			var value = fn.parent('Rule').getData(fn[0].toString());

			if (value) {
				replace(fn, value.clone());
			} else if (fn[1]) {
				replace(fn, fn[1].clone());
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
				var rule = declaration.parent('Rule');
				var value = declaration.detach();

				if (
					rule
					.firstChild('Selectors')
					.hasChild({
						type: 'Selector', 
						string: [':root', 'html']
					})
				) {
					rule.parent('Root').setData(declaration.name, value);
				} else {
					rule.setData(declaration.name, value);
				}
			}
		}
	});

	function replace (fn, values) {
		var value = values.shift();
		var first = value.shift();

		fn.replaceWith(first);

		value.forEach(function (child) {
			first.after(child);
		});

		var parent = fn.parent();

		if (parent && parent.is('Value')) {
			values.forEach(function (child) {
				parent.after(child);
			});
		}
	}
};
