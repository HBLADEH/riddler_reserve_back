// const validateNumber = (_rule, value) => value != null
export const rules = {
  goodsId: {
    required: true,
    message: '请选择游玩商品',
    trigger: 'blur',
  }
};
