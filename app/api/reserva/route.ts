import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const sheetsUrl = process.env.GOOGLE_SHEETS_URL;
    const sheetsToken = process.env.GOOGLE_SHEETS_TOKEN;
    
    if (!sheetsUrl) {
      return NextResponse.json(
        { error: "Google Sheets Webhook URL is not configured on the server." },
        { status: 500 }
      );
    }
    
    // Forward the payload with the server-side secure token
    const payload = {
      ...data,
      token: sheetsToken || ""
    };
    
    const response = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Sheets API failed:", errorText);
      return NextResponse.json(
        { error: "Failed to record entry in Google Sheets" },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal Server Error in /api/reserva:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
