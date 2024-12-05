import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set in the .env file
});

export async function post({ request }) {
  const { location } = await request.json();

  if (!location) {
    return new Response(
      JSON.stringify({ result: "Error: Location is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Mock weather data (replace with real weather API later)
  const weatherDescription = "clear skies";
  const temperature = "70°F";

  // Create a prompt for the AI
  const prompt = `Given the weather conditions '${weatherDescription} with a temperature of ${temperature}', is it considered nice? Respond in a single sentence.`;

  try {
    const aiResponse = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 50,
    });

    const result = aiResponse.choices[0].text.trim();

    return new Response(JSON.stringify({ result }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return new Response(
      JSON.stringify({ result: "Error: Unable to process request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}