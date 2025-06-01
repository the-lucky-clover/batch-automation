const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Health check - just to make sure it's working
app.get('/', (req, res) => {
  res.json({ message: 'Batch automation service is running! 🚀' });
});

// Main endpoint for processing prompts
app.post('/process-prompts', (req, res) => {
  const { prompts } = req.body;
  
  // Check API key
  const apiKey = req.headers.authorization?.replace('Bearer ', '');
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  console.log(`Processing ${prompts?.length || 0} prompts...`);
  
  // For now, just simulate processing
  // We'll add real browser automation later
  setTimeout(() => {
    const results = prompts?.map((prompt, index) => ({
      index: index + 1,
      prompt: prompt.substring(0, 50) + '...',
      success: true,
      message: 'Simulated processing complete!',
      timestamp: new Date().toISOString()
    })) || [];
    
    res.json({
      success: true,
      processed: results.length,
      results: results
    });
  }, 2000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
