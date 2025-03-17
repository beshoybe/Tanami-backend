import "reflect-metadata";
import localeMiddleware from "i18next-http-middleware";

import express, { urlencoded, json } from "express";
import router from "./app.router";
import initializeDatabase from "./config/dbInit";
import i18next from "./i18";
import { errorHandler } from "./middlewares/error.middleware";

const port = process.env.PORT ?? 3000;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(localeMiddleware.handle(i18next));

app.use("/api", router);
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

app.use(errorHandler);

app.listen(port, () => {
    initializeDatabase();
  console.log(`Server is listening at port ${port}`);
});