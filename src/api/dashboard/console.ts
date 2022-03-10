import http from '@/utils/http/axios';

//获取主控台信息
export function getConsoleInfo() {
  return http.request({
    url: '/getDashBoardData',
    method: 'get',
  });
}

//获取7天浏览量
export function getAfterViews() {
  return http.request({
    url: '/getAfterViews',
    method: 'get',
  });
}

