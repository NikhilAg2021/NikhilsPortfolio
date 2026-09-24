const TOKEN_HEADER = 'X-Admin-Token'

async function request(path, { token, ...options } = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers[TOKEN_HEADER] = token
  const res = await fetch(path, { ...options, headers })
  if (!res.ok) {
    let message = `Request failed (${res.status})`
    try {
      const body = await res.json()
      message = body.message || body.error || message
    } catch {
      /* non-JSON error body */
    }
    const err = new Error(message)
    err.status = res.status
    throw err
  }
  return res.status === 204 || res.status === 202 ? null : res.json()
}

export const api = {
  getPortfolio: () => request('/api/portfolio'),
  sendMessage: (msg) => request('/api/contact', { method: 'POST', body: JSON.stringify(msg) }),

  login: (token) => request('/api/admin/login', { method: 'POST', token }),
  savePortfolio: (token, data) =>
    request('/api/admin/portfolio', { method: 'PUT', token, body: JSON.stringify(data) }),
  getMessages: (token) => request('/api/admin/messages', { token }),
  deleteMessage: (token, id) => request(`/api/admin/messages/${id}`, { method: 'DELETE', token }),
}
