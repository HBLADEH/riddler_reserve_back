const validateNumber = (_rule, value) => {
  return value != null
}
export const rules = {
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
