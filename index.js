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
				var val = fn.parent('Value');
				var parent = val.parent();
				var index = val.index();
				val.remove();

				value.forEach(function (v, i) {
					parent.splice(index + i, 0, v.clone());
				});
			} else if (fn[1]) {
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
};
