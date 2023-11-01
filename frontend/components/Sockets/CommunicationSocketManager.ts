import { io, Socket } from "socket.io-client";

class SocketManager {
	private socket: Socket | null = null;
	private socketId: string | null = null;
	private matchedSocketId: string | null = null;
	constructor() {
		this.initialize();
	}

	private initialize() {
		this.socket = io({
			path: "/communication_service/socket.io/"
		});

		this.socket.on("connect", () => {
			this.socketId = this.socket?.id || null;
			console.log(`Connected with Socket ID: ${this.socketId}`);
		});
	}

	public getSocket(): Socket | null {
		return this.socket;
	}

	public getSocketId(): string | null {
		return this.socketId;
	}
	public getMatchedSocketId(): string | null {
		return this.matchedSocketId;
	}

	public setMatchedSocketId(id: string | null) {
		console.log("setMatchedSocketId", id);
		this.matchedSocketId = id;
	}

	public subscribeToEvent(eventName: any, callback: any) {
		this.socket.on(eventName, callback);
	}

	public emitEvent(eventName: any, data: any) {
		this.socket.emit(eventName, data);
	}
}

const socketManager = new SocketManager();
export default socketManager;
