export interface FromData {
  goods: GoodsData
  packageList?: PackageListData[]
}

export interface GoodsData {
  name: string
  description: string
  playNum?: number
  coverImg: string
}

export interface PackageListData {
  name: string
  price?: number
}

interface PackageListRef {
  packageList: PackageListData[]
  resetPackage: () => {}
  setPackage: (data: PackageListData[]) => {}
}