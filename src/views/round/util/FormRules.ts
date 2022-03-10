const validateNumber = (_rule, value) => value != null
const validateNumber2 = (_rule, value) => {
  console.log(value);

  return value != null
}

export const rules = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入场次名称',
  },
  startTime: {
    validator: validateNumber,
    trigger: ['blur', 'input'],
    message: '请选择开始时间',
  },
  endTime: {
    validator: validateNumber,
    trigger: ['blur', 'input'],
    message: '请选择结束时间',
  }
};