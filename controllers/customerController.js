import Customer from '../models/model.js';

export const createCustomer = async (req, res) => {
    try {
        const customerData = req.body;

        const customer = new Customer(customerData);

        await customer.save();

        res.status(201).send(customer);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

export const createCustomerTimeBased = async (req, res) => {
    try {
        const customerData = req.body;
        const currentTime = new Date();

        if (currentTime.getDay() === 1) {
            return res.status(403).send({ message: "Please don't use this API on Monday" });
        }

        const currentHour = currentTime.getHours();
        if (currentHour >= 8 && currentHour <= 18) {
            return res.status(403).send({ message: "Please try after 3pm" });
        }

        const customer = new Customer(customerData);
        await customer.save();

        res.status(201).send(customer);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

export const searchCustomersByAge = async (req, res) => {
    const startTime = Date.now();

    try {
        const currentDate = new Date();
        const lowerBoundDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 25));
        const upperBoundDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 15));

        const customers = await Customer.find({
            dob: { $gte: lowerBoundDate, $lte: upperBoundDate }
        }).select('customer_name');

        const customerNames = customers.map(customer => customer.customer_name);

        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds

        res.status(200).json({ customerNames, timeTaken });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};