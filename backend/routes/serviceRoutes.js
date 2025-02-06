// routes/serviceRoutes.js
import express from "express";
import { 
  getAllServices, 
  getServiceById, 
  createService, 
  updateService, 
  deleteService 
} from "../controller/serviceController.js"; // Correct import

const router = express.Router();

// Route to get all services
router.get("/api/services", getAllServices);

// Route to get a single service by ID
router.get("/api/services/:id", getServiceById);

// Route to create a new service
router.post("/api/createservice", createService);

// Route to update a service by ID
router.patch("/api/services/:id", updateService);

// Route to delete a service by ID
router.delete("/api/services/:id", deleteService);

export default router;
