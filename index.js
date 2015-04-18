module.exports = function (stylecow) {

	//Use var() function
	stylecow.addTask({
		filter: {
			type: 'Function',
			name: 'var'
		},
		fn: function (fn) {
			var value = fn.getData(fn[0].toString());

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
				var rule = declaration.getParent('Rule');

				if (
					rule
					.getChild('Selectors')
					.hasChild({
						type: 'Selector',
						string: [':root', 'html']
					})
				) {
					rule.getParent('Root').setData(declaration.name, declaration.detach());
				} else {
					rule.setData(declaration.name, declaration.detach());
				}
			}
		}
	});

	function replace (fn, values) {
		var parent = fn.getParent();

		if (parent && parent.type === 'Value' && parent.length === 1) {
			while (values.length) {
				parent.after(values.pop());
			}

			parent.detach();
		} else {
			while (values.length) {
				fn.after(values.pop());
			}

			fn.detach();
		}
	}
};
