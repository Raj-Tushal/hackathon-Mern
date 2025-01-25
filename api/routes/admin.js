import express from "express";
import {
  viewApplications,
  updateApplicationStatus,
  addTokenNumber,
  filterApplications,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/applications", viewApplications);
router.put("/applications/:id/status", updateApplicationStatus);
router.post("/applications/token", addTokenNumber);
router.get("/applications/filter", filterApplications);

export default router;
