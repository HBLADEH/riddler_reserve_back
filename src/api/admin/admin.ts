import { ContentTypeEnum } from '@/enums/httpEnum';
import http from '@/utils/http/axios';
import qs from 'qs'
//修改管理员信息
export function changeInfo(params) {
  return http.request({
    url: '/admin/changeInfo',
    method: 'post',
    params
  });
}
// 修改管理员密码
export function changePassword(params) {
  return http.request({
    url: '/admin/changePassword',
    method: 'post',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(params)
  });
}
