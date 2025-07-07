// 1. Install dependencies: npm install googleapis
// 2. Place your credentials file (credentials.json) in the same folder as this script
// 3. Replace SPREADSHEET_ID with your Google Sheet ID

const fs = require('fs');
const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = 'credentials.json';
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // <-- Replace with your sheet ID
const SHEET_NAME = 'Sheet1'; // Change if your sheet/tab name is different

// Load client secrets from a local file.
fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), appendRow);
});

function authorize(credentials, callback) {
  const { client_email, private_key } = credentials;
  const auth = new google.auth.JWT(
    client_email,
    null,
    private_key,
    SCOPES
  );
  callback(auth);
}

// Example data to append
const projectData = [
  new Date().toLocaleString(), // Timestamp
  'Project Name',
  'Task Description',
  '2 hours' // Duration
];

function appendRow(auth) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [projectData],
    },
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log('Row appended:', res.data.updates.updatedRange);
  });
}

// To run the script, use the command: node google-sheets-upload.js
