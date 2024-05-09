// import axios from 'axios';

// export default async function handler(request, response) {
//   if (request.method == 'POST') {
//     try {
//       const result = await axios.post(process.env.SLACK_WEBHOOK_URL, request.body,
//       {
//         headers: {
//           'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       response.status(200).json(result.data); // Return the data from the response
//     } catch (error) {
//       console.error('Error sending message to Slack:', error);
//       response.status(500).json({ error: error.message }); // Return the error message
//     }
//   } else {
//     response.status(405).json({ error: 'Method not allowed' });
//   }

//   // const { message } = request.body;

//   // try {
//   //   const result = await axios.post(process.env.SLACK_WEBHOOK_URL, {  text: message });
//   //   response.status(200).json(result.data); // Return the data from the response
//   // } catch (error) {
//   //   console.error('Error sending message to Slack:', error);
//   //   response.status(500).json({ error: error.message }); // Return the error message
//   // }
// }
