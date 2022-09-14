import app from "./app";

import createConfig from "./config/load";

const config = createConfig();

const { port } = config;

app.listen(port, async () => {
  console.log(`Server Running at Port ${port}`);
});
