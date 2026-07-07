import { google } from "googleapis";

const SHEET_NAME = "Waitlist";

function getCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets credentials. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID."
    );
  }

  return { email, privateKey, spreadsheetId };
}

function getSheetsClient(email: string, privateKey: string) {
  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

export async function findWaitlistEmail(email: string): Promise<boolean> {
  const { email: saEmail, privateKey, spreadsheetId } = getCredentials();
  const sheets = getSheetsClient(saEmail, privateKey);

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!B:B`,
  });

  const rows = res.data.values ?? [];
  return rows.some((row) => row[0]?.toLowerCase() === email.toLowerCase());
}

export async function appendWaitlistRow(row: {
  name: string;
  email: string;
  phone: string;
}): Promise<void> {
  const { email: saEmail, privateKey, spreadsheetId } = getCredentials();
  const sheets = getSheetsClient(saEmail, privateKey);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_NAME}!A:D`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[row.name, row.email, row.phone, new Date().toISOString()]],
    },
  });
}
