import { GoogleGenerativeAI } from "@google/generative-ai";

  const apiKey ="AIzaSyCv7IHYnpxaCF_UxVbwW57gILcoMXbFv9s";

  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-pro-exp-03-25",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseModalities: ["text"],
    responseMimeType: "application/json",
  };
  

 export const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
