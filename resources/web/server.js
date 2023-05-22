const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const args = require('yargs').argv;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
	key: fs.readFileSync('./cert-key.pem'),
	cert: fs.readFileSync('./cert.pem')
};

app.prepare().then(() => {
	const port = args?.port ? args?.port : 3001;
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	}).listen(port, err => {
		if (err) throw err;
		console.log(`HTTPS server started on https://localhost:${port}`);
	});
});
