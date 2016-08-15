const Server = require('./server.js');
// in prod, proxy should listen on 4040
const port = (process.env.PORT || 8080);
const app = Server.app();

app.listen(port);
console.log(`Listening at http://localhost:${port}`)