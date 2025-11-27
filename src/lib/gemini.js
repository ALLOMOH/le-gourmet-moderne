
//USES VERIABLE FROM .ENV FILE
const apiKey = process.env.API;

export async function callGemini(prompt = " Hello ", systemInstruction = " ") {
    try {
        const reposne = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: [{ parts: [{ text: prompt }] }],
                    systemInstruction: { parts: [{ text: systemInstruction }] }
                })
            }
        );

        if (!reposne.ok) throw new Error("Error in Gemini API call");
        const data = await reposne.json();
        return data.condidate[0].content.part[0].text;

    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Service Ai Indisponible.";
    }
}