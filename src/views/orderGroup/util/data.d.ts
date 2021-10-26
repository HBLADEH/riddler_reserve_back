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
  goodsName: string,
  playTimeStart: string,
  playTimeEnd: string,
}

export interface SearchSchemas {
  goodsName: string,
  playTime: number[] | null,
}
