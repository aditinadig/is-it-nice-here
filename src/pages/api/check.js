import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function post({ request }) {
  const { location } = await request.json();

  // Example weather data (replace this with real API integration later)
  const weatherDescription = "clear skies";
  const temperature = "70°F";

  // Prepare prompt
  const prompt = `Given the weather conditions '${weatherDescription} with a temperature of ${temperature}', is it considered nice? Respond in a single sentence.`;

  // Fetch AI response
  const aiResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 50,
  });

  const aiResult = aiResponse.data.choices[0].text.trim();

  return new Response(JSON.stringify({ result: aiResult }), {
    headers: { "Content-Type": "application/json" },
  });
}