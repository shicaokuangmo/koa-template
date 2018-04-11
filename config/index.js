var developmentConfig = require('./development');
var productionConfig = require('./production');
var testConfig = require('./test');

module.exports = {
	development:developmentConfig,
	production:productionConfig,
	test:testConfig
}['development']

