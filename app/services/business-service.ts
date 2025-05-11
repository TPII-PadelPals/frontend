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

export async function getData(owner_id: string): Promise<Business[]> {
  const response = await fetch(`http://${process.env.BUSINESS_SERVICE_URL}:${process.env.BUSINESS_SERVICE_PORT}/api/v1/businesses/?owner_id=${owner_id}`, {
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
  const url = `http://${process.env.BUSINESS_SERVICE_URL}:${process.env.BUSINESS_SERVICE_PORT}/api/v1/padel-courts/` +
              `?user_id=${owner_id}&business_public_id=${business_public_id}`

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