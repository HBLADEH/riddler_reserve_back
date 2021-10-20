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
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          添加
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="添加房间">
      <n-form
        :model="formParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="房间名称" path="name">
          <n-input placeholder="请输入房间名称" v-model:value="formParams.name" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { useDialog, useMessage } from 'naive-ui';
import { BasicTable, TableAction } from '@/components/Table';
import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
import { addRoom, deleteRoomByIds, getTableList } from '@/api/room/list';
import { columns } from './columns';
import { PlusOutlined } from '@vicons/antd';
import { useRouter } from 'vue-router';

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入房间名称',
  },
};

const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '房间名称',
    componentProps: {
      placeholder: '请输入房间名称',

    },
  },
];

const router = useRouter();
const formRef: any = ref(null);
const message = useMessage();
const actionRef = ref();

const showModal = ref(false);
const formBtnLoading = ref(false);
const formParams = reactive({
  name: '',
});

const params = ref({
  name: '',
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
          auth: ['room_edit'],
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
          auth: ['room_delete'],
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
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas,
});

function addTable() {
  showModal.value = true;
}

const loadDataTable = async (res) => {
  return await getTableList({ ...params.value, ...res });
};

function onCheckedRow(rowKeys) {
  console.log(rowKeys);
}

function reloadTable() {
  actionRef.value.reload();
}

function confirmForm(e) {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors) => {
    if (!errors) {
      doAddRoom()
      setTimeout(() => {
        showModal.value = false;
        reloadTable();
      });
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
}

const doAddRoom = () => {
  addRoom(formParams).then((_res) => {
    message.success('添加房间成功!');
  }).catch((error) => {
    console.error(error)
  })
}

function handleEdit(record: Recordable) {
  console.log('点击了编辑', record);
  router.push({ name: 'basic-info', params: { id: record.id } });
}
const dialog = useDialog()
function handleDelete(record: Recordable) {
  const id = record.id
  dialog.warning({
    title: '警告',
    content: '是否删除 id 为 ' + id + ' 的数据？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      doDeleteRooms([id])
    }
  })
}


function handleSubmit(values: Recordable) {
  params.value.name = values.name
  reloadTable();
}

function handleReset(values: Recordable) {
  console.log(values);
}

const doDeleteRooms = (ids: number[]) => {
  if (ids.length > 0) {
    deleteRoomByIds(ids).then((_res) => {
      message.success('删除房间成功!');
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
