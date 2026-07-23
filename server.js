const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8000;
const root = process.cwd();

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

const server = http.createServer((req, res) => {
  const safeUrl = req.url.split('?')[0].replace(/\/\.\./g, '');
  let filePath = path.join(root, safeUrl === '/' ? 'index.html' : safeUrl);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('404 Not Found');
      return;
    }

    if (stats.isDirectory()) filePath = path.join(filePath, 'index.html');

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('500 Internal Server Error');
        return;
      }

      const contentType = mimeTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(content);
    });
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
