const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

// Sample JWT token for demo purposes
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2l0ZVBvaW50IFJ' + 'lYWRlciJ9.sS4aPcmnYfm3PQlTtH14az9CGjWkjnsDyG_1ats4yYg';

// Use defaults middlewares (CORS, static, etc)
server.use(middlewares);

// Make sure JSON bodies are parsed correctly
server.use(bodyParser.json());

// Handle sign-in request
server.post('/sing-in', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'demo' && password === 'demo') {
        req.json({
            name: 'Demo user',
            token: jwtToken
        });
    }

    res.send(422, 'Invalid username and password');
});

// Protect other routes
server.use((req, res, next) => {
    if (isAuthorised(req)) {
        console.log('Access granged');
        next();
    } else {
        console.log('Access denied, invalid JWT');
        res.sendStatus(401);
    }
});

// API routes
server.use(router);

// Start server
server.listen(3000, () => {
    console.log('===> JSON (Auth) server is running <===');
});

// Check whether request is allowed
function isAuthorised(req) {
    let bearer = req.get('Authorization');
    if (bearer === 'Bearer ' + jwtToken) {
        return true;
    }

    return false;
}