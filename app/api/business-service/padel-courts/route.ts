export async function POST(req: Request) {
    const body = await req.json()
  
    const BUSINESS_BASE_URL = `http://${process.env.BUSINESS_SERVICE_URL}:${process.env.BUSINESS_SERVICE_PORT}/api/v1/padel-courts/` 
    
    const response = await fetch(`${BUSINESS_BASE_URL}?owner_id=${process.env.NEXT_PUBLIC_OWNER_ID}&business_public_id=${body.businessPublicId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.BUSINESS_SERVICE_API_KEY}`,
      },
      cache: "no-store",
      body: JSON.stringify(body.formValues),
    })
  
    const data = await response.json()
    return new Response(JSON.stringify(data), { status: response.status })
  }
