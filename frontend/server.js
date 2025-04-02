const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser); // Needed to parse POST request bodies

server.post('/login', (req, res) => {
  const { email } = req.body;
  const users = router.db.get('users').value(); // Returns the user object
  const user = users.find(
    (u) => u.email === email
  );
  if (user) {
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: `mock-token-${user.id}`,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});
