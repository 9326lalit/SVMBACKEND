import Service from '../models/Service.js';

// Create a new service
export const createService = async (req, res) => {
  try {
    const { name, price, description, duration, availableDates } = req.body;
    
    if (!name || !description || !price || !duration || !availableDates || !Array.isArray(availableDates)) {
      return res.status(400).json({ message: 'All required fields must be filled and availableDates should be an array' });
    }

    const formattedDates = availableDates.map(date => new Date(date));
    
    const newService = new Service({
      name,
      price: Number(price),
      description,
      duration: Number(duration),
      availableDates: formattedDates
    });

    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a service
export const updateService = async (req, res) => {
  try {
    const { name, price, description, duration, availableDates } = req.body;
    
    const formattedDates = availableDates ? availableDates.map(date => new Date(date)) : undefined;
    
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, price, description, duration, availableDates: formattedDates },
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
