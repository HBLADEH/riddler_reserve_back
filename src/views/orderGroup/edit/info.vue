<template>
  <n-card :bordered="false" :title="'组局编辑 编号:' + route.params.id" class="proCard">
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

          <n-form-item label="套餐名称" path="packageName">
            <n-input placeholder="请输入套餐名称" v-model:value="formValue.data.packageName" />
          </n-form-item>
          <n-form-item label="套餐价格" path="packagePrice">
            <n-input-number
              placeholder="请输入游玩人数"
              v-model:value="formValue.data.packagePrice"
              min="0"
            ></n-input-number>
          </n-form-item>

          <div style="margin-left: 80px">
            <n-space>
              <n-button type="primary" @click="formSubmit">编辑商品</n-button>
              <n-button @click="goBack">返回</n-button>
            </n-space>
          </div>
        </n-form>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { FromData } from '../util/data';
import { rules } from '../util/FormRules'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import { useTabsViewStore } from '@/store/modules/tabsView';
import { DropDownItem, useDropDownStore } from '@/store/modules/dropDown';
import { editOrderGroup, getOrderGroupById } from '@/api/orderGroup/list';

const route = useRoute()
const router = useRouter()
const tabsViewStore = useTabsViewStore();
const dropDownStore = useDropDownStore()

const message = useMessage();


const formRef: any = ref(null);

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
onMounted(() => {
  if (goodsOptions.value.length == 0) dropDownStore.listGoodsOptions()
  if (roomsOptions.value.length == 0) dropDownStore.listRoomsOptions()
  if (roundsOptions.value.length == 0) dropDownStore.listRoundsOptions()
  getOrderGroupById(route.params.id).then((res) => {
    // console.log(res);
    formValue.data = res
    formValue.timeGroup.playTime = new Date(res.playTime).getTime()
  })
});



let formValue: FromData = reactive(defaultValueRef());
const formSubmit = () => {
  formRef.value.validate((errors) => {
    if (!errors) {
      doEditOrderGroup()
    } else {
      message.error('验证失败，请填写完整信息');
    }
  });
}

const doEditOrderGroup = () => {
  editOrderGroup(formValue.data).then((_res) => {
    message.success('修改组局成功!');
    goBack()
  }).catch((error) => {
    console.error(error)
  })
}

const goBack = () => {
  tabsViewStore.closeCurrentTab(route);
  router.push("/orderGroup/list")
}

</script>

<style lang="less" scoped>
</style>
