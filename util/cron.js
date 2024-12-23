const cron = require('node-cron');
const axios = require('axios');
const pool = require('../config/db.js');

const pingServer = async () => {
    cron.schedule('*/10 * * * *', async () => {
        try {

            // ping home route
            const HOST_URL = process.env.HOST_URL;
            const response = await axios.get(HOST_URL);
            if (response.status === 200) {
                console.log('Home route pinged successfully.');
            } else {
                console.error('Failed to ping home route.');
            }

            try {
                await pool.query('SELECT 1');
                console.log('Database pinged successfully.');
            } catch (err) {
                console.error('Database, Keep-alive query failed \n', err);
            }

        } catch (error) {
            console.error('Error pinging home route:\n', error);

        }
    });
};

pingServer();
console.log('Cron job started.');
