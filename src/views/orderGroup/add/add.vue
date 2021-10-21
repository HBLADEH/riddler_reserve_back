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

          <!-- <n-form-item label="游玩房间" path="playNum">
            <n-input-number
              placeholder="请输入游玩人数"
              v-model:value="formValue..playNum"
              min="0"
              max="100"
            >
              <template #suffix>人</template>
            </n-input-number>
          </n-form-item>
          <n-form-item label="商品描述" path="description">
            <n-input
              placeholder="请输入商品描述"
              type="textarea"
              v-model:value="formValue.goods.description"
            />
          </n-form-item>-->

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
  }
});

const goodsOptions = computed<DropDownItem[]>(() => dropDownStore.$state.goodsOptions)
const roomsOptions = computed<DropDownItem[]>(() => dropDownStore.$state.roomsOptions)
const roundsOptions = computed<DropDownItem[]>(() => dropDownStore.$state.roundsOptions)

onMounted(() => {
  dropDownStore.listGoodsOptions()
  dropDownStore.listRoomsOptions()
  dropDownStore.listRoundsOptions()
})

let formValue: FromData = reactive(defaultValueRef());
const formSubmit = () => {

  formRef.value.validate((errors) => {
    if (!errors) {
      if (formValue.timeGroup.playTime != null) formValue.data.playTime = format(formValue.timeGroup.playTime, "yyyy-MM-dd")
      console.log(formValue);
      doAddGoods()
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
}

const doAddGoods = () => {
  // addGoods(formValue).then((_res) => {
  //   message.success('添加商品成功!');
  // }).catch((error) => {
  //   console.error(error)
  // })
}

const resetForm = () => {
  formRef.value.restoreValidation();
  formValue = Object.assign(unref(formValue), defaultValueRef());
}

</script>
