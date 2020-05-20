import request from '@/utils/arch-request'

export function fetchList(query) {
  return request({
    url: '/api/v1/namespaces/default/blocks',
    method: 'get',
    params: query
  })
}
