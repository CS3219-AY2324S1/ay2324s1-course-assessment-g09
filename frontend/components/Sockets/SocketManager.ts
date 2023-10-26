import { io, Socket } from "socket.io-client";

class SocketManager {
	private socket: Socket | null = null;
	private socketId: string | null = null;
	private matchedSocketId: string | null = null;
	constructor() {
		this.initialize();
	}

	private initialize() {
		this.socket = io("http://localhost:5000/");

		this.socket.on("connect", () => {
			this.socketId = this.socket?.id || null;
			console.log(`Connected with Socket ID: ${this.socketId}`);

			// You can store the socket ID or use it as needed
			// For example, you can store it in a state variable or use it for interactions
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

	public setMatchedSocketId(matchedSocketId: string | null) {
		console.log("setMatchedSocketId", matchedSocketId);
		this.matchedSocketId = matchedSocketId;
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
