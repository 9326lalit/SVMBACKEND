// import express from 'express';
// import { createCoupon, getCoupons, getCouponById, deleteCoupon, applyCoupon, validateCoupon } from '../controller/couponController.js';

// const router = express.Router();

// // Route to create a new coupon
// router.post('/createcoupon', createCoupon);

// // Route to get all coupons
// router.get('/coupons', getCoupons);

// // Route to get a specific coupon by ID
// router.get('/coupon/:id', getCouponById);

// // Route to delete a coupon
// router.delete('/coupon/:id', deleteCoupon);

// // Route to apply a coupon
// router.post('/applycoupon', applyCoupon);

// // ✅ Validate a Coupon
// router.post('/coupons/validate', validateCoupon);


// export default router;

























import express from 'express';
import { createCoupon, getCoupons, getCouponById, updateCoupon, deleteCoupon, applyCoupon, validateCoupon } from '../controller/couponController.js';

const router = express.Router();

// ✅ Create a new coupon
router.post('/createcoupon', createCoupon);

// ✅ Get all coupons
router.get('/coupons', getCoupons);

// ✅ Get a specific coupon by ID
router.get('/coupon/:id', getCouponById);

// ✅ Update a coupon
router.put('/coupon/:id', updateCoupon);

// ✅ Delete a coupon
router.delete('/coupon/:id', deleteCoupon);

// ✅ Apply a coupon (Discount Calculation)
router.post('/apply-coupon', applyCoupon);

// ✅ Validate a Coupon
router.post('/coupons/validate', validateCoupon);

export default router;
