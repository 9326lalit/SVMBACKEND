import Coupon from "../models/Coupon.js";

// ✅ Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, name, description, discountType, discountValue, expiryDate, minBookingAmount, limit } = req.body;

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) return res.status(400).json({ message: "Coupon code already exists" });

    const coupon = new Coupon({ code, name, description, discountType, discountValue, expiryDate, minBookingAmount, limit });
    await coupon.save();
    
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// ✅ Get all coupons
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error });
  }
};

// ✅ Get a single coupon by ID
export const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupon", error });
  }
};

// ✅ Update a coupon
export const updateCoupon = async (req, res) => {
  try {
    const { name, description, discountType, discountValue, expiryDate, minBookingAmount, limit, is_active } = req.body;

    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      { name, description, discountType, discountValue, expiryDate, minBookingAmount, limit, is_active },
      { new: true }
    );

    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.status(200).json({ message: "Coupon updated successfully", coupon });
  } catch (error) {
    res.status(500).json({ message: "Error updating coupon", error });
  }
};

// ✅ Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
};

// ✅ Apply a coupon
export const applyCoupon = async (req, res) => {
  try {
    const { code, bookingAmount } = req.body;
    const coupon = await Coupon.findOne({ code });

    if (!coupon) return res.status(404).json({ message: "Invalid coupon code" });

    // Check if coupon is expired
    if (new Date(coupon.expiryDate) < new Date()) return res.status(400).json({ message: "Coupon expired" });

    // Check if booking amount meets the minimum requirement
    if (bookingAmount < coupon.minBookingAmount) return res.status(400).json({ message: `Minimum booking amount should be ₹${coupon.minBookingAmount}` });

    // Check usage limit
    if (coupon.usedCount >= coupon.limit) return res.status(400).json({ message: "Coupon usage limit reached" });

    // Calculate Discount
    let discountAmount = coupon.discountType === "percentage"
      ? (bookingAmount * coupon.discountValue) / 100
      : coupon.discountValue;
    let finalAmount = bookingAmount - discountAmount;

    // Increase coupon usage count
    await Coupon.findByIdAndUpdate(coupon._id, { $inc: { usedCount: 1 } });

    res.status(200).json({ message: "Coupon applied", discountAmount, finalAmount });
  } catch (error) {
    res.status(500).json({ message: "Error applying coupon", error });
  }
};

// ✅ Validate a Coupon
export const validateCoupon = async (req, res) => {
  try {
    const { code, bookingAmount } = req.body;

    // Check if coupon exists
    const coupon = await Coupon.findOne({ code });
    if (!coupon) return res.status(404).json({ message: "Invalid coupon code" });

    // Check if coupon is expired
    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    // Check if booking amount meets the minimum requirement
    if (bookingAmount < coupon.minBookingAmount) {
      return res.status(400).json({
        message: `Minimum booking amount should be ₹${coupon.minBookingAmount}`,
      });
    }

    // Check usage limit
    if (coupon.usedCount >= coupon.limit) return res.status(400).json({ message: "Coupon usage limit reached" });

    // Calculate Discount
    let discountAmount = coupon.discountType === "percentage"
      ? (bookingAmount * coupon.discountValue) / 100
      : coupon.discountValue;
    let finalAmount = bookingAmount - discountAmount;

    res.status(200).json({
      message: "Coupon is valid",
      discountAmount,
      finalAmount,
    });
  } catch (error) {
    res.status(500).json({ message: "Error validating coupon", error });
  }
};





