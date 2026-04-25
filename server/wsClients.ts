import type WebSocket from "ws";

const wsClients = new Map<string, WebSocket>();

export function setWsClient(userId: string, ws: WebSocket) {
  wsClients.set(userId, ws);
}

export function removeWsClient(userId: string) {
  wsClients.delete(userId);
}

export function getWsClient(userId: string): WebSocket | undefined {
  return wsClients.get(userId);
}

export function getWsClients(): Map<string, WebSocket> {
  return wsClients;
}

export function sendWsNotification(userId: string, data: Record<string, any>) {
  const client = wsClients.get(userId);
  if (client && client.readyState === 1) {
    client.send(JSON.stringify(data));
  }
}
