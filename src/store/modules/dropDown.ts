import { getAllDWGoods } from "@/api/orderGroup/list";
import { defineStore } from "pinia";

export interface DropDownItem {
  label: string
  value: object
}

export interface IDropDownState {
  goodsOptions: DropDownItem[]
  roomsOptions: DropDownItem[]
  roundsOptions: DropDownItem[]
}
export const useDropDownStore = defineStore({
  id: 'dropDown-data',
  state: (): IDropDownState => ({
    goodsOptions: [],
    roomsOptions: [],
    roundsOptions: [],
  }),
  // getters: {
  //   getGoodsOptions(): DropDownItem[] {
  //     return this.goodsOptions
  //   }
  // },
  actions: {
    setGoodsOptions(goodsOptions: DropDownItem[]) {
      this.goodsOptions = goodsOptions
    },
    async listGoodsOptions() {
      const res = await getAllDWGoods()
      this.setGoodsOptions(res)
      return res
    }
  }
})
