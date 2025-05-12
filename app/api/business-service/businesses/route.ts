export async function POST(req: Request) {
    const BUSINESS_BASE_URL = `http://${process.env.BUSINESS_SERVICE_URL}:${process.env.BUSINESS_SERVICE_PORT}/api/v1/businesses/` 
    const urlObj = new URL(req.url);
    const url = `${BUSINESS_BASE_URL}?${urlObj.searchParams.toString()}`
    const payload = await req.json()
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.BUSINESS_SERVICE_API_KEY}`,
      },
      cache: "no-store",
      body: JSON.stringify(payload),
    })

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: response.status })
  }