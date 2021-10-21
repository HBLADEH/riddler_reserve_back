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
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" class="mr-1" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          添加
        </n-button>

        <n-popconfirm @positive-click="deleteGoods">
          <template #trigger>
            <n-button type="error">
              <template #icon>
                <n-icon>
                  <DeleteOutlined />
                </n-icon>
              </template>批量删除
            </n-button>
          </template>
          确定要删除已经勾选的数据吗？
        </n-popconfirm>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { NPopconfirm, useDialog, useMessage } from 'naive-ui';
import { BasicTable, TableAction } from '@/components/Table';
import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
import { getTableList } from '@/api/orderGroup/list';
import { columns } from './columns';
import { PlusOutlined, DeleteOutlined } from '@vicons/antd';
import { useRouter } from 'vue-router';
import { deleteGoodsByIds } from '@/api/goods/list';
import { SearchParams, SearchSchemas } from '../util/data';
import { format } from 'date-fns'

const schemas: FormSchema[] = [
  {
    field: 'goodsName',
    component: 'NInput',
    label: '商品名称',
    componentProps: {
      placeholder: '请输入商品名称',
    },
  },
  {
    field: 'playTime',
    component: 'NDatePicker',
    label: '游玩时间',
    componentProps: {
      type: "daterange",
      placeholder: '请输入游玩起始时间',
    },
  },
  //  {
  //   field: 'playTimeEnd',
  //   component: 'NDatePicker',
  //   label: '游玩时间',
  //   componentProps: {
  //     placeholder: '请输入游玩结束时间',
  //   },
  // },
];

const router = useRouter();
const message = useMessage();
const actionRef = ref();



let formParams = reactive<SearchParams>({
  goodsName: '',
  playTimeStart: '',
  playTimeEnd: '',
});

const params = ref({
  pageSize: 5,
});

const actionColumn = reactive({
  width: 220,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '编辑',
          onClick: handleEdit.bind(null, record),
          ifShow: () => {
            return true;
          },
          auth: ['goods_edit'],
        },
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['goods_delete'],
        },

      ],
      dropDownActions: [
        {
          label: '启用',
          key: 'enabled',
          // 根据业务控制是否显示: 非enable状态的不显示启用按钮
          ifShow: () => {
            return true;
          },
        },
        {
          label: '禁用',
          key: 'disabled',
          ifShow: () => {
            return true;
          },
        },
      ],
      select: (key) => {
        message.info(`您点击了，${key} 按钮`);
      },
    });
  },
});

const [register, { }] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:3 2xl:3' },
  labelWidth: 80,
  schemas,
});

function addTable() {
  router.push("/orderGroup/add")
}

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

function handleEdit(record: Recordable) {
  // console.log('点击了编辑', record);
  router.push({ name: 'orderGroup-info', params: { id: record.id } });
}
const dialog = useDialog()
function handleDelete(record: Recordable) {
  const id = record.id
  dialog.warning({
    title: '警告',
    content: '是否删除 编号 为 ' + id + ' 的数据？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      doDeleteGoods([id])
    }
  })
}

function handleSubmit(values: SearchSchemas) {
  formParams.goodsName = values.goodsName
  if (values.playTime != null) {
    formParams.playTimeStart = format(values.playTime[0], "yyyy-MM-dd")
    formParams.playTimeEnd = format(values.playTime[1], "yyyy-MM-dd")
  }
  reloadTable();
}

function handleReset(_values: Recordable) {
  formParams.playTimeStart = ""
  formParams.playTimeEnd = ""
}

const deleteGoods = () => {
  doDeleteGoods(checkRow)
}

const doDeleteGoods = (ids: number[]) => {
  if (ids.length > 0) {
    deleteGoodsByIds(ids).then((_res) => {
      message.success('删除商品成功!');
      reloadTable()
    }).catch((error) => {
      console.error(error)
    })
  } else {
    message.warning("请先勾选数据！")
  }
}

</script>

<style lang="less" scoped>
</style>
