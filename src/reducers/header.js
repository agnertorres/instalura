export function notify( state = '', action) {
  if(action.type === 'NOTIFY') {
    return action.message
  }

  return state
}