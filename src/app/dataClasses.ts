export class Office {
    constructor(
        city: string,
        irodaId: number
    ) { }
}

export class Agent {
    constructor(
        agentId: number,
        agentName: string,
        email?: string,
        phone?: string
    ) { }
}

export class LandLord {
    constructor(
        landlordId: number,
        name: string,
        realEstateId: number,
        phone?: string
    ) { }
}

export class RealEstate {
    constructor(
        address: string,
        agentId: number,
        area: number,
        id: number,
        margin: number,
        price: number,
        status: string
    ) { }
}

export class DatabaseCl implements Office, Agent, LandLord, RealEstate {
    constructor(
    
    ) { }
}