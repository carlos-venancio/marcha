import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => {
  res
    .status(200)
    .json({
      nome: "API MARCHA",
      version: "0.0.1",
      description: "Api de gerenciamento de produto do marketplace",
    })
  });

export default routes;
