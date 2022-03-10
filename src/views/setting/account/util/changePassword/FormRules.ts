const validateNumber = (_rule, value) => value != null

export const rules = {
  goodsId: {
    validator: validateNumber,
    message: '请选择游玩商品',
    trigger: 'blur',
  },
  roomId: {
    validator: validateNumber,
    message: '请选择游玩房间',
    trigger: 'blur',
  },
  roundId: {
    validator: validateNumber,
    message: '请选择游玩场次',
    trigger: 'blur',
  },

};
