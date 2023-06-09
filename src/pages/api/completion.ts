// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  content: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const path = req.body.path ?? "index.html";

  let content = "";

  const prompt = `
You are a website explorer. You are exploring a website called "Infinite Website". You are exploring the page "${path}".
Your goal is to render an HTML page that looks like the page you are exploring.
You can use any HTML, CSS, or JavaScript you want.
Links on the page should work as expected. 
All links must be relative links and not be index.html.
A page should always have multiple links to other pages.

the current page is "${path}"
Render the above page using HTML, CSS, Javascript and images.
  `;

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
    });

    const completionText = completion.data.choices[0].text;

    content = completionText ?? "";
  } catch (e) {
    content = "An error occured, please try again later";
  }

  res.status(200).json({ content });
}
