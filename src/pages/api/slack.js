import axios from 'axios';

export default async function handler(request, response) {
  if (request.method == 'POST') {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const text = `
    New Contact Form Message ${date} ${time}:
    \n name: ${request.body.name}
    \n email: ${request.body.email}
    \n number: ${request.body.number}
    \n message: ${request.body.message}`

    try {
      const result = await axios.post(process.env.SLACK_WEBHOOK_URL, {text},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }, );
      response.status(200).json(result.data); // Return the data from the response
    } catch (error) {
      console.error('Error sending message to Slack:', error);
      response.status(500).json({ error: error.message }); // Return the error message
    }
  } else {
    response.status(405).json({ error: 'Method not allowed' });
  }
}
