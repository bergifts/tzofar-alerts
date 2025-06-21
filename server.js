const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('✅ tzofar-alerts: השרת פועל בהצלחה.');
});

// ✅ נתיב חדש שמחזיר את ההתראות
app.get('/alerts', async (req, res) => {
  try {
    const rssUrl = 'https://www.oref.org.il/WarningMessages/alerts.xml';
    const { data } = await axios.get(rssUrl);
    xml2js.parseString(data, (err, result) => {
      if (err) return res.status(500).json({ error: 'Parsing failed' });
      const messages = result?.alerts?.alert || [];
      res.json({ success: true, alerts: messages });
    });
  } catch (error) {
    res.status(500).json({ error: 'Fetching failed', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
