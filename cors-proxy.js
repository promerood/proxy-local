// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8081;

const corsAnywhere = require('cors-anywhere');
const server = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: [
    'cookie',
    'cookie2',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
    xfwd: false,
  },
});

console.log(`CORS Anywhere proxy server started on ${host}:${port}`);
server.listen(port, host); 


