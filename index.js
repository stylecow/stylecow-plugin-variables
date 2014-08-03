module.exports = {

	//Use var() function
	"Function": {
		var: function (fn) {
			var arguments = fn.content;
			var value = fn.ancestor('Rule').getData(arguments[0]) || arguments[1];

			if (value) {
				fn.replaceWith(value);
			}
		}
	},

	//Save new --variables
	Declaration: function (declaration) {
		if (declaration.name.indexOf('--') === 0) {
			var rule = declaration.ancestor('Rule');

			if (rule.hasChild('Selector', [':root', 'html'])) {
				rule.ancestor('Root').setData(declaration.name, declaration.value);
			} else {
				rule.setData(declaration.name, declaration.value);
			}

			declaration.remove();
		}
	}
};
