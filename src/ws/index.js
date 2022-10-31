const URL = 'ws://localhost:9097/monitor'

export const socket = new WebSocket(URL)

socket.onmessage = function (event) {
  if (event.data) {
    const data = JSON.parse(event.data)
    console.log('onmessage', event, data)
  }
}
socket.onopen = function (event) {
  console.log('onopen', event)
}
socket.onclose = function (event) {
  console.log('onclose', event)
}
