const validateNumber = (_rule, value) => value != null
export const rules = {
  coverImg: {
    required: true,
    message: '请添加封面图片',
    trigger: 'blur',
  },
  name: {
    required: true,
    message: '请输入商品名称',
    trigger: 'blur',
  },
  playNum: {
    validator: validateNumber,
    message: '请输入游玩人数',
    trigger: 'blur',

  }
};
