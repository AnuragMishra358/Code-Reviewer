export const reviewCode = async (
  code: string,
  language: string = "JavaScript",
): Promise<string> => {
  try {
    const prompt = `
You are a senior software engineer and expert code reviewer.

IMPORTANT:
- Use emojis for section headings
- Keep output clean and well spaced
- Use bullet points
- Use markdown formatting
- Keep it concise and readable

Analyze the following ${language} code and provide:

### Bugs
- ...

### Improvements
- ...

### Best Practices
- ...

### Optimized Code
\`\`\`${language}
...
\`\`\`

Code:
${code}
`;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    const data = await res.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No feedback generated."
    );
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating review.";
  }
};
