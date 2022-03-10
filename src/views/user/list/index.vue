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
        <n-popconfirm @positive-click="deleteRoom">
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
import { deleteUserByIds, getTableList } from '@/api/user/list';
import { columns } from './columns';
import { DeleteOutlined } from '@vicons/antd';

const schemas: FormSchema[] = [
  {
    field: 'username',
    component: 'NInput',
    label: '用户名',
    componentProps: {
      placeholder: '请输入用户名',
    },
  }, {
    field: 'nickname',
    component: 'NInput',
    label: '昵称',
    componentProps: {
      placeholder: '请输入昵称',
    },
  }
];

const message = useMessage();
const actionRef = ref();


const params = ref({
  username: '',
  nickname: '',
});

const actionColumn = reactive({
  width: 136,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['room_delete'],
        },
      ],
    });
  },
});

const [register, { }] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas,
});


const loadDataTable = async (res) => {
  return await getTableList({ ...params.value, ...res });
};

let checkRow = reactive([])

function onCheckedRow(rowKeys) {
  checkRow = rowKeys
}

function reloadTable() {
  actionRef.value.reload();
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
      doDeleteUsers([id])
    }
  })
}


function handleSubmit(values: Recordable) {
  params.value.username = values.username
  params.value.nickname = values.nickname
  reloadTable();
}

function handleReset(values: Recordable) {
  console.log(values);
}

const deleteRoom = () => {
  doDeleteUsers(checkRow)
}
const doDeleteUsers = (ids: number[]) => {
  if (ids.length > 0) {
    deleteUserByIds(ids).then((_res) => {
      message.success('删除用户成功!');
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
