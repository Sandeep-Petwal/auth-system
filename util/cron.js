const cron = require('node-cron');
const axios = require('axios');

const pingServer = async () => {
    cron.schedule('*/4 * * * *', async () => {
        try {
            const HOST_URL = process.env.HOST_URL;
            const response = await axios.get(HOST_URL);
            if (response.status === 200) {
                console.log('Home route pinged successfully.');
            } else {
                console.error('Failed to ping home route.');
            }
        } catch (error) {
            console.error('Error pinging home route:', error);
        }
    });
};

pingServer();
console.log('Cron job started.');
