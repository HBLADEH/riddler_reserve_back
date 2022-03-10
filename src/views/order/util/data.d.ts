export interface FromData {
  data: {
    goodsId?: number | null
    roomId?: number | null
    roundId?: number | null
    packageName?: string | null
    packagePrice?: number | null
    playTime?: string | null
  }
  timeGroup: {
    playTime?: number | null
  }
  other: {
    packageId?: string | null
  }
}


export interface SearchParams {
  userName: string,
  startTime: string,
  endTime: string,
}

export interface SearchSchemas {
  userName: string,
  orderTime: number[] | null,
}
