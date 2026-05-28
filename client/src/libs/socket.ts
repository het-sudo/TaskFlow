import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

export function connectSocket(token: string) {
  if (!token) return null

  if (socket?.connected) return socket

  socket = io(import.meta.env.VITE_API_URL || "http://localhost:9000", {
    autoConnect: true,
    auth: { token },
    transports: ["websocket"],
    withCredentials: true,
  })
  const s = socket
  if (!s) return

  s.on("connect", () => {
    console.log("CONNECT EVENT FIRED")
    console.log("SOCKET ID:", s.id)
  })
  return socket
}

export function getSocket() {
  return socket
}

export function disconnectSocket() {
  socket?.disconnect()
  socket = null
}
