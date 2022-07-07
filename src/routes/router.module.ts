import express = require("express");
import { Response, Request} from "express";
export const routerTemplate = express.Router();

import {
  quizController,
} from "../controllers/controllers.module";


routerTemplate.get(
  "/quiz",
  function (req : Request, res : Response)  {
    quizController.getQuiz(req, res);
  }
);

routerTemplate.get(
    "/stats",
    function (req : Request, res : Response)  {
      quizController.getAverageAndNbUsers(req, res);
    }
  );

  routerTemplate.post(
    "/stats",
    function (req : Request, res : Response)  {
      quizController.addAverageAndNbUsers(req, res);
    }
  );