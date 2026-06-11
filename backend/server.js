const express = require('express');
const cors = require('cors');
const securityRoutes = require('./routes/securityRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'AI Cyber Shield API running' }));
app.use('/api', securityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AI Cyber Shield backend running on port ${PORT}`));
