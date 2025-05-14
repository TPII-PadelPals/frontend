export type Business = {
    business_public_id: string
    owner_id: string
    latitude: number
    longitude: number
    name: string
    location: string
}

export type Court = {
    court_public_id: string
    business_public_id: string
    name: string
    price_per_hour: string
}

const BUSINESS_BASE_URL = `http://${process.env.BUSINESS_SERVICE_URL}:${process.env.BUSINESS_SERVICE_PORT}`

export async function getData(ownerId: string | undefined): Promise<Business[]> {
  if (!ownerId) {
    throw new Error("Owner public ID missing");
  }
  const response = await fetch(`${BUSINESS_BASE_URL}/api/v1/businesses/?owner_id=${ownerId}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.BUSINESS_SERVICE_API_KEY}`,
    },
    cache: "no-store",
  })
  if (response.ok) {
    const data_json = await response.json()
    return data_json.data
  
  } else {
    console.log(response)
    return []
  }
}

export async function getCourts(owner_id: string, business_public_id: string): Promise<Court[]> {
  const url = `${BUSINESS_BASE_URL}/api/v1/padel-courts/?user_id=${owner_id}&business_public_id=${business_public_id}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": `${process.env.BUSINESS_SERVICE_API_KEY}`,
    },
    cache: "no-store",
  })

  if (response.ok) {
    const data_json = await response.json()
    return data_json.data

  } else {
    console.log(response)
    return []
  }
}

export async function createBusiness(name: string, location: string, ownerId: string | undefined): Promise<Business | null> {
  if (!ownerId) {
    throw new Error("Owner public ID missing");
  }
  const url = `/api/business-service/businesses?owner_id=${ownerId}`
  const payload = {
    name: name,
    location: location,
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    cache: "no-store",
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    return await response.json()
  }
  return null
}