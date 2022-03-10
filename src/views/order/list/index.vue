<template>
  <n-card :bordered="false" class="proCard">
    <BasicForm
      @register="register"
      @submit="handleSubmit"
      @reset="handleReset"
      :showAdvancedButton="false"
    >
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm>

    <BasicTable
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { BasicTable } from '@/components/Table';
import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
import { getTableList } from '@/api/order/order';
import { columns } from './columns';
import { SearchParams, SearchSchemas } from '../util/data';
import { format } from 'date-fns'

const schemas: FormSchema[] = [
  {
    field: 'userName',
    component: 'NInput',
    label: '用户名称',
    componentProps: {
      placeholder: '请输入用户名称',
    },
  },
  {
    field: 'orderTime',
    component: 'NDatePicker',
    label: '游玩时间',
    componentProps: {
      type: "daterange",
      placeholder: '请输入游玩起始时间',
    },
  },
];

const actionRef = ref();



let formParams = reactive<SearchParams>({
  userName: '',
  startTime: '',
  endTime: '',
});

const params = ref({
  pageSize: 5,
});

const [register, { }] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:3 2xl:3' },
  labelWidth: 80,
  schemas,
});

const loadDataTable = async (res) => {
  return await getTableList({ ...formParams, ...params.value, ...res });
};
let checkRow = reactive([])

function onCheckedRow(rowKeys) {
  checkRow = rowKeys
}

function reloadTable() {
  actionRef.value.reload();
}


function handleSubmit(values: SearchSchemas) {
  formParams.userName = values.userName
  if (values.orderTime != null) {
    formParams.startTime = format(values.orderTime[0], "yyyy-MM-dd")
    formParams.endTime = format(values.orderTime[1], "yyyy-MM-dd")
  }
  reloadTable();
}

function handleReset(_values: Recordable) {
  formParams.startTime = ""
  formParams.endTime = ""
}

</script>

<style lang="less" scoped>
</style>
