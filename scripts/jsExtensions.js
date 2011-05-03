// Generally useful type augmentations
define(function()
{
	return function() {
		// Allows a function to be added to any given type. Usage below.
		Function.prototype.method = function(name, func) {
			if (!this.prototype[name]) {
				this.prototype[name] = func;
				return this;
			}
		};
		
		Number.method('integer', function() {
			return Math[this < 0 ? 'ceil' : 'floor'](this);
		});
		
		Number['randomInteger'] = function(upperBound) {
			return (Math.random() * upperBound).integer();
		};
	};
});