"use strict";

module.exports = function (stylecow) {

	//Use var() function
	stylecow.addTask({
		filter: {
			type: 'Function',
			name: 'var'
		},
		fn: function (fn) {
			var name = fn.get('ExtensionName');

			if (name) {
				let value = fn.getData('@var-' + name.name);

				if (value) {
					replace(fn, value.clone());
				} else if (fn[1]) {
					replace(fn, fn[1].clone());
				}
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
				let rule = declaration.getAncestor('Rule');
				let name = '@var-' + declaration.name.substr(2);

				if (
					rule
					.getChild('Selectors')
					.hasChild({
						type: 'Selector',
						string: [':root', 'html']
					})
				) {
					rule.getAncestor('Root').setData(name, declaration.detach());
				} else {
					rule.setData(name, declaration.detach());
				}
			}
		}
	});

	function replace (fn, values) {
		var parent = fn.getParent();

		if (values.type === 'Declaration' && parent && parent.type === 'Value' && parent.length === 1) {
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
