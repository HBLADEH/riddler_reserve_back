import { getAllDWGoods, getAllDWRoomds, getAllDWRounds } from "@/api/orderGroup/list";
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
    },
    setRoomsOptions(roomsOptions: DropDownItem[]) {
      this.roomsOptions = roomsOptions
    },
    async listRoomsOptions() {
      const res = await getAllDWRoomds()
      this.setRoomsOptions(res)
    },
    setRoundsOptions(roundsOptions: DropDownItem[]) {
      this.roundsOptions = roundsOptions
    },
    async listRoundsOptions() {
      const res = await getAllDWRounds()
      this.setRoundsOptions(res)
    }
  }
})
