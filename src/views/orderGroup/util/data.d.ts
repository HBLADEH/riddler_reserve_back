export interface FromData {
  goods: GoodsData
  packageList?: PackageListData[]
}

export interface GoodsData {
  name: string
  description: string
  playNum?: number
}

export interface PackageListData {
  name: string
  price?: number
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

interface PackageListRef {
  packageList: PackageListData[]
  resetPackage: () => {}
  setPackage: (data: PackageListData[]) => {}
}
