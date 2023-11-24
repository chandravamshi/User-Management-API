// All the imports whole project is dependent on to work smoothly.
import {
    createExpressServer,
    useContainer,
    useExpressServer,
  } from "routing-controllers";
  import "reflect-metadata";
  import { Container } from "typedi";
import { UserController } from "./controllers/userController";
import { AuthMiddleware } from "./middelware/authMiddelware";
import { UserVechilePreferencesController } from "./controllers/userVechilePreferenceController";

  useContainer(Container);
  var compression = require("compression");
  var morgan = require("morgan");
  require("dotenv").config();
  // creates express app, registers all controller routes and returns you express app instance
  export const app = createExpressServer({
    cors: {
      maxAge: 7200,
  },
    defaultErrorHandler: false,
  });
  app.use(morgan(process.env.LOG_FORMAT || "common"));
  app.use(compression());
  
  
  useExpressServer(app, {
    controllers: [UserController,UserVechilePreferencesController],
    middlewares:[AuthMiddleware]
  });
  

  
  app.listen(process.env.PORT, () => {
    console.log(`started server at port ${process.env.PORT}`);
  });

  