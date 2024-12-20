const cron = require('node-cron');
const axios = require('axios');

const pingServer = async () => {
    cron.schedule('*/14  * * * *', async () => {
        try {
            const url = `${process.env.HOST}:${process.env.PORT}`;
            const response = await axios.get(url);
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