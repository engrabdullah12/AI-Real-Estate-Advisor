import { GoogleGenAI, Type } from "@google/genai";
import { RealEstateReport, UserPreferences } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is missing");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateRealEstateAdvice = async (
  prefs: UserPreferences
): Promise<RealEstateReport> => {
  const ai = getAIClient();

  const prompt = `
    Act as a world-class Real Estate Investment Advisor specializing in the Pakistan market.
    Analyze the following user request:
    - Budget: ${prefs.budget}
    - Location/City: ${prefs.location}
    - Property Type: ${prefs.propertyType}
    - Payment Mode: ${prefs.paymentMode}
    - Investment Horizon: ${prefs.duration}

    Context for Pakistan Real Estate:
    - "File": Refers to an unallocated land file in a society. Crucial to check for "Balloting" status (allocated vs unallocated).
    - "Own" or "Profit": The premium amount paid above the official booking price for high-demand files/plots.
    - "Installments": Usually implies booking a new plot/file in a developing society (e.g., Blue World, Capital Smart City, Bahria projects).
    - "Possession": Whether the land is ready for construction or still under development.
    - "NOC": (No Objection Certificate) from authorities (LDA, CDA, KDA, RDA, SBCA) is critical for safety.
    - Currency: Prices are often quoted in "Crore" (10 Million) or "Lac" (100,000).

    Provide a detailed investment report in JSON format:
    1. **Best Areas/Societies**: Identify specific societies (e.g., DHA, Bahria, Smart Cities) or projects in/near ${prefs.location} that fit the budget.
       - If "Installments" is selected, mention the typical down payment percentage in the description.
    2. **Financial Projections**: Estimate 5-year value growth based on Pakistan's inflation and real estate trends.
    3. **Hidden Costs**: List costs specific to this region (e.g., Transfer fees, CVT, Stamp duty, TMA taxes, Membership fees, Agent commission).
    4. **Pros & Cons**: Provide honest risks (e.g., "File" trading risks, development delays, litigation) and benefits.
    
    Return the data in strict JSON format matching the schema.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { 
            type: Type.STRING, 
            description: "A concise executive summary of the investment potential, mentioning key societies." 
          },
          adviceForBudget: {
            type: Type.STRING,
            description: "Specific advice: Is the budget realistic? Does it require 'Own' payment? Is it enough for a possession plot?"
          },
          bestAreas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING, description: "Include details like Possession status, Balloting status, or Down Payment req." },
                averagePrice: { type: Type.STRING },
                growthRating: { type: Type.STRING, enum: ["High", "Moderate", "Stable", "Risky"] }
              }
            }
          },
          hiddenCosts: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          pros: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          cons: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          investmentPlan: {
            type: Type.ARRAY,
            description: "Projected value of the property over the next 5 years starting from current year.",
            items: {
              type: Type.OBJECT,
              properties: {
                year: { type: Type.STRING },
                estimatedValue: { type: Type.NUMBER, description: "Estimated value in local currency numbers (e.g. 5000000)" }
              }
            }
          }
        },
        required: ["summary", "bestAreas", "hiddenCosts", "pros", "cons", "investmentPlan", "adviceForBudget"]
      }
    }
  });

  if (!response.text) {
    throw new Error("No data returned from AI");
  }

  return JSON.parse(response.text) as RealEstateReport;
};