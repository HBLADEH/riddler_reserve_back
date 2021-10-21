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

        <n-popconfirm @positive-click="deleteRound">
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

    <n-modal v-model:show="showAddModal" :show-icon="false" preset="dialog" title="添加场次">
      <n-form
        :model="formAddParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="场次名称" path="name">
          <n-input placeholder="请输入场次名称" v-model:value="formAddParams.name" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showAddModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmAddForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
    <n-modal v-model:show="showEditModal" :show-icon="false" preset="dialog" title="修改场次">
      <n-form
        :model="formEditParams"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="场次名称" path="name">
          <n-input placeholder="请输入场次名称" v-model:value="formEditParams.name" />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showEditModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmEditForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { NPopconfirm, useDialog, useMessage } from 'naive-ui';
import { BasicTable, TableAction } from '@/components/Table';
import { BasicForm, FormSchema, useForm } from '@/components/Form/index';
import { addRound, deleteRoundByIds, editRound, getRoundById, getTableList } from '@/api/round/list';
import { columns } from './columns';
import { PlusOutlined, DeleteOutlined } from '@vicons/antd';

const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入场次名称',
  },
};

const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'NInput',
    label: '场次名称',
    componentProps: {
      placeholder: '请输入场次名称',

    },
  },
];

const formRef: any = ref(null);
const message = useMessage();
const actionRef = ref();

const showAddModal = ref(false);
const showEditModal = ref(false);
const formBtnLoading = ref(false);
const formAddParams = reactive({
  name: '',
});
const formEditParams = reactive({
  id: 0,
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
          auth: ['round_edit'],
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
          auth: ['round_delete'],
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
  showAddModal.value = true;
}

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

function confirmAddForm(e) {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors) => {
    if (!errors) {
      doAddRound()
      setTimeout(() => {
        showAddModal.value = false;
        reloadTable();
      });
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
}

const confirmEditForm = (e) => {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors) => {
    if (!errors) {
      doEditRound()
      setTimeout(() => {
        showEditModal.value = false;
        reloadTable();
      });
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
}

const doAddRound = () => {
  addRound(formAddParams).then((_res) => {
    message.success('添加场次成功!');
  }).catch((error) => {
    console.error(error)
  })
}

const doEditRound = () => {
  editRound(formEditParams).then((_res) => {
    message.success('修改场次成功!');
  }).catch((error) => {
    console.error(error)
  })
}

function handleEdit(record: Recordable) {
  getRoundById(record.id).then((res) => {
    const { id, name } = res
    formEditParams.id = id
    formEditParams.name = name
  })
  showEditModal.value = true
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
      doDeleteRounds([id])
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

const deleteRound = () => {
  doDeleteRounds(checkRow)
}
const doDeleteRounds = (ids: number[]) => {
  if (ids.length > 0) {
    deleteRoundByIds(ids).then((_res) => {
      message.success('删除场次成功!');
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
