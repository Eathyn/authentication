import Cookie from 'js-cookie'

export const key = 'Session-ID-Test'

export function getSessionId() {
  return Cookie.get(key)
}

export function setSessionId(sessionId) {
  return Cookie.set(key, sessionId)
}

export function removeSessionId() {
  return Cookie.remove(key)
}
