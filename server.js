const express = require('express');
const rootRouter = require('./routers');

const app = express();

app.use(express.json());
app.use(rootRouter);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});