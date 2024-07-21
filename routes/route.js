import express from 'express';
import { ratelimiter } from '../middlewares/ratelimiter.js';
import { createCustomer, createCustomerTimeBased, searchCustomersByAge } from '../controllers/customerController.js';

const router = express.Router();

router.post('/db-save', ratelimiter, createCustomer);
router.post('/time-based-api', ratelimiter, createCustomerTimeBased);
router.get("/db-search", ratelimiter, searchCustomersByAge);

export default router;
