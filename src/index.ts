// All the imports whole project is dependent on to work smoothly.
import {
    createExpressServer,
    useContainer,
    useExpressServer,
  } from "routing-controllers";
  import "reflect-metadata";
  import { Container } from "typedi";
  import { Settings } from "luxon";

  useContainer(Container);
  var compression = require("compression");
  var morgan = require("morgan");
  require("dotenv").config();
  Settings.defaultZone = "utc";
  // creates express app, registers all controller routes and returns you express app instance
  export const app = createExpressServer({
    cors: {
      maxAge: 7200,
  },
    defaultErrorHandler: false,
  });
  
  useExpressServer(app, {
  });
  
  app.use(morgan(process.env.LOG_FORMAT || "common"));
  app.use(compression());
  
  
  app.listen(process.env.PORT, () => {
    console.log(`started server at port ${process.env.PORT}`);
  });

  