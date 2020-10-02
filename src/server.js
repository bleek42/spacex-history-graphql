const app = require('./app');
const { NODE_ENV, PORT } = require('./config');


app.listen(PORT, () =>
    // eslint-disable-next-line no-console
    console.info(
        `Server listening in ${NODE_ENV} mode at http://localhost:${PORT}`,
    ),
);
