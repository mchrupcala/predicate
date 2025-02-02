export default async function handler(req, res) {
  const externalApiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(`${externalApiUrl}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const rawText = await response.text();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data", details: rawText });
    }

    return res.status(200).send(rawText);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
