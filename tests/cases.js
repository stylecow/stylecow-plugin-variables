var assert = require('assert');
var stylecow = require('stylecow-core');

var tests = new stylecow.Test(__dirname + '/cases');
var tasks = (new stylecow.Tasks())
	.use(require('../index'))
	.minSupport({
		"explorer": 0,
		"edge": 0,
		"firefox": 0,
		"chrome": 0,
		"safari": 0,
		"opera": 0,
		"android": 0,
		"ios": 0
	});

tests.run(function (test) {
	tasks.run(test.css);

	describe('cases/' + test.name, function() {
		it('should match output.css', function() {
			//test.writeString()
			test.assertString();
		});

		it('should match ast.json', function() {
			//test.writeAst()
			test.assertAst();
		});
	});
});
