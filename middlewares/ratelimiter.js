const customerRequestHistory = {};
const customerRequestsQueue = [];

export const ratelimiter = (req, res, next) => {
    const { customer_name } = req.body;
    if(!customer_name){
        return res.status(400).json({message:'customer_name is required'})
    }
    const currentTime = Date.now();
    // console.log(`current time is ${currentTime}`);

    if(!customerRequestHistory.hasOwnProperty(customer_name)) {
        console.log(customerRequestsQueue.length,currentTime - customerRequestsQueue[0]);
        if(customerRequestsQueue.length >= 2 && currentTime - customerRequestsQueue[0] <= 5 * 60 * 1000){
            // console.log("maximum limit exceeded");
            return res.status(429).json({ message: 'maximum limit exceeded' });
        }
        else{
            if(customerRequestsQueue.length > 1 && currentTime - customerRequestsQueue[0] >= 5 * 60 * 1000){
                customerRequestsQueue.shift();
            }
            // console.log("will add new customer");
            customerRequestsQueue.push(currentTime);
            customerRequestHistory[customer_name] = currentTime;
        }
        
    }
    else{
        const timestamp = customerRequestHistory[customer_name]
        // console.log(`time stamp is ${timestamp}`);
        console.log(currentTime - timestamp);
        if(currentTime - timestamp <= 2 * 60 * 1000){
            return res.status(429).json({ message: 'maximum limit exceeded for same user' });
        }
        else{
            if(customerRequestsQueue.length >= 2 && currentTime - customerRequestsQueue[0] <= 5 * 60 * 1000){
                return res.status(429).json({ message: 'maximum limit exceeded' });
            }
            else{
                if(customerRequestsQueue.length>1 && currentTime - customerRequestsQueue[0] >= 5 * 60 * 1000){
                    customerRequestsQueue.shift();
                }
                customerRequestsQueue.push(currentTime);
                customerRequestHistory[customer_name] = currentTime;
            }
        }
    }

    next();
};