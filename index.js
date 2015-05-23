var httpProxy = require('http-proxy');
var argv = require('yargs').argv;
var http = require('http');
var https = require('https');

var servicesConfig = require('hs.gg-config');
var config = servicesConfig.get(argv.env || 'local');
var cert = config.cert;

var proxy = httpProxy.createProxy();

function notFound(res) {
	res.writeHead(404);
	res.end('Not found');
}
//proxy a request to a service
//also proxies websockets if service.proxySocket is true
function proxyHttp(req, res) {
	var service = config.findByDomain(req.headers.host);
	var opt = {
		target: service.serviceAddress
	};
	if (service.proxySocket) {
		opt.ws = true;
	}
	console.log(service)
	proxy.web(req, res, opt, function(e) {
		console.log(e);
	});
}

//if service.https is true, proxy all http requests to https for the service
function proxyHttps(req, res) {
	var service = config.findByDomain(req.headers.host);
	if (!service) { return notFound(res); }

	if (service.https) {
		proxy.web(req, res, {
			target: service.redirectTo,
			ssl: cert,
			secure: false
		});
	} else {
		notFound(res);
	}
}
//bind to ports
http.createServer(proxyHttp).listen(config.services.port);
https.createServer(cert, proxyHttps).listen(config.services.httpsPort);