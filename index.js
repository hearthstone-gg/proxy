var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');
var proxy = httpProxy.createProxy();
var cert = {
	key: fs.readFileSync(path.join(__dirname, '../auth/server/sslcert/localhost.key'), 'utf8'),
	cert: fs.readFileSync(path.join(__dirname, '../auth/server/sslcert/localhost.cert'), 'utf8')
};

var options = {
	'local-auth.hearthstone.gg': 'http://localhost:3002',
	'local-api.hearthstone.gg': 'http://localhost:3000',
	'local-socket.hearthstone.gg': 'http://localhost:3003',
	'local-app.hearthstone.gg': 'http://localhost:3001'
};

require('http').createServer(function(req, res) {
	var opt = {
		target: options[req.headers.host]
	};
	if (req.headers.host === 'local-socket.hearthstone.gg') {
		opt.ws = true;
	}

	proxy.web(req, res, opt, function(e) {
		console.log(e);
	});
}).listen(80);

require('https').createServer(cert, function(req, res) {
	if (req.headers.host === 'local-auth.hearthstone.gg') {
		proxy.web(req, res, {
			target: 'https://localhost:3004',
			ssl: cert,
			secure: false
		});
	} else {
		res.writeHead(404);
		res.end('Not found');
	}
}).listen(443);