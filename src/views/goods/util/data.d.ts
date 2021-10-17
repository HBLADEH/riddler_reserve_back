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