export interface FromData {
  goodsId?: number
  roomId?: number
  roundId?: number
  packageName: string
  packagePrice?: number
  playTime: string
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
