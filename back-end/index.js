// const dns = require("node:dns");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectdb = require('./Config/db');
const app = require('./app');

const PORT = 5000;

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  });