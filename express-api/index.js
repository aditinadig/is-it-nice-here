import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import OpenAI from 'openai';
import cors from 'cors'; // Import CORS middleware

dotenv.config();

const app = express();
const port = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.post('/api/check', async (req, res) => {
    const { location } = req.body;
  
    if (!location) {
      return res.status(400).json({ error: 'Location is required.' });
    }
  
    try {
      // Fetch weather data
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: location,
            units: 'imperial',
            appid: process.env.WEATHER_API_KEY,
          },
        }
      );
  
      const weatherDescription = weatherResponse.data.weather[0].description;
      const temperature = weatherResponse.data.main.temp;
  
      // Prepare prompt for OpenAI
      const prompt = `The weather in ${location} is '${weatherDescription}' with a temperature of ${temperature}°F. Is it considered nice? Respond in one sentence.`;
  
      // Fetch AI response
      const aiResponse = await openai.completions.create({
        model: 'text-davinci-003',
        prompt,
        max_tokens: 50,
      });
  
      const result = aiResponse.choices[0].text.trim();
  
      res.json({ result });
    } catch (error) {
      console.error('Error occurred:', error.message || error);
  
      // Log specific error details for debugging
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
  
      res.status(500).json({ error: 'Failed to process the request.' });
    }
  });

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});