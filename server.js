const express = require('express');
const rootRouter = require('./routers');

const app = express();

app.use(express.json());
app.use(rootRouter);

app.use(async (err, req, res, next) => {
  res.status(419).send(err);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});