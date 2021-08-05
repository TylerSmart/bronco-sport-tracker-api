import express from "express";
import { vehicleController } from "../controllers";

export const vehicleRouter = express.Router({
  strict: true,
});

vehicleRouter.get(
  "/tracker",
  vehicleController.trackerInfo.bind(vehicleController)
);

vehicleRouter.get("/etis", vehicleController.etisInfo.bind(vehicleController));
