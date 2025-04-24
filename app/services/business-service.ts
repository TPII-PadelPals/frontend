export type Business = {
    business_public_id: string
    owner_id: string
    latitude: number
    longitude: number
    name: string
    location: string
}

export async function getData(): Promise<Business[]> {
    // TODO: Hacer el fetch de datos con owner_id mockeado.
    return [
      {
        business_public_id: "728ed52f",
        owner_id:"44124ff8-34a8-4e7a-9ea9-fb069b092a98",
        latitude: 123.33,
        longitude: 123.44,
        name: "PadelYa",
        location: "Paseo Colon 850, CABA",
      },
      {
        business_public_id: "728ed52f",
        owner_id: "44124ff8-34a8-4e7a-9ea9-fb069b092a98",
        latitude: 123.33,
        longitude: 123.44,
        name: "Chumastaiger",
        location: "Mario bravo 323, CABA",
      },
      {
        business_public_id: "728ed52f",
        owner_id:"44124ff8-34a8-4e7a-9ea9-fb069b092a98",
        name: "100",
        location: "pending",
        latitude: 123.33,
        longitude: 123.44,
      },
      {
        business_public_id: "728ed52f",
        owner_id: "44124ff8-34a8-4e7a-9ea9-fb069b092a98",
        name: "100",
        location: "pending",
        latitude: 123.33,
        longitude: 123.44,
      },
    ]
  }