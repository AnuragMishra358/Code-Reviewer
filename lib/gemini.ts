import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Main function to review code
export const reviewCode = async (
  code: string,
  language: string = "JavaScript",
): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // fast + free tier
    });

    // 🔥 Strong prompt (important for quality output)
    const prompt = `
You are a senior software engineer and expert code reviewer.

Analyze the following ${language} code and provide a structured response.

Follow this format strictly:

### Bugs
- List any errors or potential bugs

### Improvements
- Suggest improvements for readability, performance, or structure

### Best Practices
- Mention best practices that are missing or violated

### Optimized Code
Provide an improved version of the code:
\`\`\`${language}
...
\`\`\`

Code:
${code}
`;

    const result = await model.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text || "No feedback generated.";
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return "Error generating review. Please try again later.";
  }
};
