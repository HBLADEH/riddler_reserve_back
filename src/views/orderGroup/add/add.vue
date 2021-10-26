<template>
  <n-card :bordered="false" title="添加组局" class="proCard">
    <n-grid cols="1 s:1 m:3 l:3 xl:3 2xl:3" responsive="screen">
      <n-grid-item offset="0 s:0 m:1 l:1 xl:1 2xl:1">
        <n-form
          :label-width="80"
          :model="formValue"
          :rules="rules"
          label-placement="left"
          ref="formRef"
          class="py-8"
        >
          <n-form-item label="游玩商品" path="data.goodsId">
            <n-select
              v-model:value="formValue.data.goodsId"
              filterable
              clearable
              placeholder="请选择游玩商品"
              :options="goodsOptions"
              @update:value="updateGoodsOptions"
            />
          </n-form-item>
          <n-form-item label="游玩套餐" path="other.packageId">
            <n-select
              v-model:value="formValue.other.packageId"
              filterable
              clearable
              placeholder="请选择游玩套餐"
              :options="packagesOptions"
            />
          </n-form-item>
          <n-form-item label="游玩时间" path="timeGroup.playTime">
            <n-date-picker
              class="w-full"
              v-model:value="formValue.timeGroup.playTime"
              type="date"
              clearable
            />
          </n-form-item>
          <n-form-item label="游玩房间" path="data.roomId">
            <n-select
              v-model:value="formValue.data.roomId"
              filterable
              clearable
              placeholder="请选择游玩房间"
              :options="roomsOptions"
            />
          </n-form-item>
          <n-form-item label="游玩场次" path="data.roundId">
            <n-select
              v-model:value="formValue.data.roundId"
              filterable
              clearable
              placeholder="请选择游玩场次"
              :options="roundsOptions"
            />
          </n-form-item>
          <div style="margin-left: 80px">
            <n-space>
              <n-button type="primary" @click="formSubmit">添加商品</n-button>
              <n-button @click="resetForm">重置</n-button>
            </n-space>
          </div>
        </n-form>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, unref, reactive, onMounted, computed } from 'vue';
import { useMessage } from 'naive-ui';
import { FromData } from '../util/data';

import { rules } from '../util/FormRules'
import { DropDownItem, useDropDownStore } from '@/store/modules/dropDown';
import { format } from 'date-fns'
import { addOrderGroup } from '@/api/orderGroup/list';


const formRef: any = ref(null);
const message = useMessage();
const dropDownStore = useDropDownStore()
const defaultValueRef = () => ({
  data: {
    goodsId: null,
    roomId: null,
    roundId: null,
    packageName: null,
    packagePrice: null,
    playTime: null,
  }, timeGroup: {
    playTime: null,
  }, other: {
    packageId: null,
  }
});

const goodsOptions = computed<DropDownItem[]>(() => dropDownStore.$state.goodsOptions)
const roomsOptions = computed<DropDownItem[]>(() => dropDownStore.$state.roomsOptions)
const roundsOptions = computed<DropDownItem[]>(() => dropDownStore.$state.roundsOptions)
const packagesOptions = computed<DropDownItem[]>(() => dropDownStore.$state.packagesOptions)

onMounted(() => {
  if (goodsOptions.value.length == 0) dropDownStore.listGoodsOptions()
  if (roomsOptions.value.length == 0) dropDownStore.listRoomsOptions()
  if (roundsOptions.value.length == 0) dropDownStore.listRoundsOptions()
})

const updateGoodsOptions = (value: number) => {
  if (value) dropDownStore.listPackageOptionsByGoodsId(value)
  formValue.other.packageId = null
}

let formValue: FromData = reactive(defaultValueRef());
const formSubmit = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      if (formValue.timeGroup.playTime != null) formValue.data.playTime = format(formValue.timeGroup.playTime, "yyyy-MM-dd")
      let packageData = formValue.other.packageId?.split(",")
      if (packageData != null) {
        formValue.data.packageName = packageData[0]
        formValue.data.packagePrice = Number(packageData[1])
      }
      doAddorderGroup()
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
}

const doAddorderGroup = () => {
  addOrderGroup(formValue.data).then((_res) => {
    message.success('添加场次成功!');
  }).catch((error) => {
    console.error(error)
  })
}

const resetForm = () => {
  formRef.value.restoreValidation();
  formValue = Object.assign(unref(formValue), defaultValueRef());
}

</script>
