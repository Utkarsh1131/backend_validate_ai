import { Client } from "@gradio/client";
export default async function PromptNew(prompt) {
  try {
    const client = await Client.connect("divyanshsaraswatoffical/mistralai-Mistral-7B-Instruct-v0.3",{hf_token:"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"});
    const result = await client.predict("/chat", { 		
        message: prompt, 
    });
    const out = await result.data;
    return {out};
  } catch (error) {
    console.error("Error in PromptNew:", error);
    throw error; // Optional: handle the error at this level or let it propagate
  }
}
