import request from '@/utils/arch-request'

export function fetchList(query) {
  return request({
    url: '/api/v1/namespaces/default/blocks',
    method: 'get',
    params: query
  })
}

export function createBlock(data) {
  return request({
    url: '/api/v1/namespaces/default/blocks',
    method: 'post',
    data
  })
}

export function fetchBlock(name) {
  return request({
    url: '/api/v1/namespaces/default/blocks/' + name,
    method: 'get',
    params: { name }
  })
}

export function updateBlock(name, data) {
  return request({
    url: '/api/v1/namespaces/default/blocks/' + name,
    method: 'put',
    params: { name },
    data
  })
}