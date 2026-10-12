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

// Moonshot 2026 (QR shirt) signups live in their own "Moonshot" tab, kept apart from the
// main waitlist. Set GOOGLE_MOONSHOT_SHEET_ID if that tab is in a separate spreadsheet.
const MOONSHOT_SHEET = "Moonshot";
const MOONSHOT_HEADERS = [
  "First name",
  "Email",
  "WhatsApp",
  "Current apps",
  "Contact consent",
  "Source",
  "Submitted at",
];

let moonshotTitle: string | null = null;

/** Finds the Moonshot tab (any capitalisation), creating it and its header row if needed. */
async function getMoonshotSheet() {
  const { email, privateKey, spreadsheetId: defaultId } = getCredentials();
  const spreadsheetId = process.env.GOOGLE_MOONSHOT_SHEET_ID || defaultId;
  const sheets = getSheetsClient(email, privateKey);

  if (!moonshotTitle) {
    const meta = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties.title",
    });
    const existing = meta.data.sheets
      ?.map((sheet) => sheet.properties?.title ?? "")
      .find((title) => title.trim().toLowerCase() === MOONSHOT_SHEET.toLowerCase());

    const title = existing ?? MOONSHOT_SHEET;
    if (!existing) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: { requests: [{ addSheet: { properties: { title } } }] },
      });
    }

    const header = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `'${title}'!A1:G1`,
    });
    if (!header.data.values?.length) {
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `'${title}'!A1`,
        valueInputOption: "RAW",
        requestBody: { values: [MOONSHOT_HEADERS] },
      });
    }

    moonshotTitle = title;
  }

  return { sheets, spreadsheetId, title: moonshotTitle };
}

export async function findMoonshotEmail(email: string): Promise<boolean> {
  const { sheets, spreadsheetId, title } = await getMoonshotSheet();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${title}'!B:B`,
  });

  const rows = res.data.values ?? [];
  return rows.some((row) => row[0]?.toLowerCase() === email.toLowerCase());
}

export async function appendMoonshotRow(row: {
  firstName: string;
  email: string;
  whatsapp: string;
  apps: string[];
  consent: boolean;
  source: string;
}): Promise<void> {
  const { sheets, spreadsheetId, title } = await getMoonshotSheet();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${title}'!A:G`,
    // RAW so a "+234…" number isn't parsed as a formula or number
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          row.firstName,
          row.email,
          row.whatsapp,
          row.apps.join(", "),
          row.consent ? "Yes" : "No",
          row.source,
          new Date().toISOString(),
        ],
      ],
    },
  });
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
