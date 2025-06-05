import axios from 'axios';

const NOTION_DATABASE_ID = process.env.NOTION_DB_ID;
const NOTION_TOKEN = process.env.NOTION_TOKEN;

const SHEET_URL = process.env.SHEET_WEBHOOK_URL; // Ex: webhook Make/Zapier vers Google Sheets

// 🔃 Log vers Notion
export async function logToNotion(title, content) {
  const url = 'https://api.notion.com/v1/pages';
  try {
    await axios.post(
      url,
      {
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          Name: {
            title: [{ text: { content: title } }]
          }
        },
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [{ type: 'text', text: { content } }]
            }
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (err) {
    console.error("❌ Erreur Notion :", err.message);
  }
}

// 🔃 Log vers Google Sheets via Webhook
export async function logToGoogleSheets(payload) {
  try {
    await axios.post(SHEET_URL, payload);
  } catch (err) {
    console.error("❌ Erreur Google Sheets :", err.message);
  }
}
