import express from "express";
import { getAllTVSeries } from "../controllers/tvSeriesController.js";

const router = express.Router();

router.get("/", getAllTVSeries);

export default router;