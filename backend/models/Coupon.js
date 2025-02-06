// 

//add limit --> 


// mysql> desc coupons;
// +-------------+-----------------+------+-----+---------+----------------+
// | Field       | Type            | Null | Key | Default | Extra          |
// +-------------+-----------------+------+-----+---------+----------------+
// | id          | bigint unsigned | NO   | PRI | NULL    | auto_increment |
// | name        | varchar(191)    | NO   |     | NULL    |                |
// | code        | varchar(191)    | NO   |     | NULL    |                |
// | discount    | decimal(15,2)   | NO   |     | 0.00    |                |
// | limit       | int             | NO   |     | 0       |                |
// | description | text            | YES  |     | NULL    |                |
// | is_active   | int             | NO   |     | 1       |                |
// | created_at  | timestamp       | YES  |     | NULL    |                |
// | updated_at  | timestamp       | YES  |     | NULL    |                |
// +-------------+-----------------+------+-----+---------+----------------+




// mysql> desc user_coupons;
// +------------+-----------------+------+-----+---------+----------------+
// | Field      | Type            | Null | Key | Default | Extra          |
// +------------+-----------------+------+-----+---------+----------------+
// | id         | bigint unsigned | NO   | PRI | NULL    | auto_increment |
// | user       | int             | NO   |     | NULL    |                |
// | coupon     | int             | NO   |     | NULL    |                |
// | serviceID  | id(191)    | YES  |     | NULL    |                |
// | created_at | timestamp       | YES  |     | NULL    |                |
// | updated_at | timestamp       | YES  |     | NULL    |                |
// +------------+-----------------+------+-----+---------+----------------+


// 


import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true }, // Unique coupon code
  name: { type: String, required: true }, // Name of the coupon
  description: { type: String, required: true }, // Description of the coupon
  discountType: { type: String, enum: ["percentage", "fixed"], required: true }, // Discount type
  discountValue: { type: Number, required: true }, // Discount amount or percentage
  expiryDate: { type: Date, required: true }, // Expiration date
  minBookingAmount: { type: Number, default: 0 }, // Minimum amount required to apply
  limit: { type: Number, default: 100 }, // Maximum times a coupon can be used
  usedCount: { type: Number, default: 0 }, // Track how many times it has been used
  is_active: { type: Boolean, default: true }, // Enable or disable coupon
}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);
