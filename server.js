const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/alerts', async (req, res) => {
    try {
        const response = await axios.get('https://www.tzofar.co.il/alerts');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching alerts');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
