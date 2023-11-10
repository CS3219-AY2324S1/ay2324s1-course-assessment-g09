import { io, Socket } from "socket.io-client";

class SocketManager {
	private socket: Socket | null = null;
	private socketId: string | null = null;
	private room: string | null = null;
	private qnsName: string | null = null;
	private qnsDesc: string | null = null;
	private difficulty: string | null = null;

	constructor() {
		this.socket = null;
	}

	// private initialize() {
	// 	this.socket = io({
	// 		path: "/collaboration_service/socket.io/",
	// 		autoConnect: false,
	// 	});

	// 	this.socket.on("connect", () => {
	// 		this.socketId = this.socket?.id || null;
	// 		console.log(`Connected with Socket ID: ${this.socketId}`);
	// 	});
	// }

	public connect() {
		this.socket = io({
			path: "/collaboration_service/socket.io/",
		});

		this.socket.on("connect", () => {
			this.socketId = this.socket?.id || null;
			console.log(`Connected with Socket ID: ${this.socketId}`);
		});
		console.log(this.room, this.difficulty, this.socket);
		this.socket.emit("joinRoom", {
			room: this.room,
			difficulty: this.difficulty,
		});
		return this.socket;
	}

	public disconnect() {
		this.socket?.disconnect();
	}

	public getSocket(): Socket | null {
		return this.socket;
	}

	public getSocketId(): string | null {
		return this.socketId;
	}

	public getRoom(): string | null {
		return this.room;
	}

	public getQnsName(): string | null {
		return this.qnsName;
	}

	public getQnsDesc(): string | null {
		return this.qnsDesc;
	}

	public getDifficulty(): string | null {
		return this.difficulty;
	}

	public setQnsName(qnsName: string | null) {
		this.qnsName = qnsName;
	}

	public setQnsDesc(qnsDesc: string | null) {
		this.qnsDesc = qnsDesc;
	}

	public setDifficulty(difficulty: string | null) {
		this.difficulty = difficulty;
	}

	public setRoom(r: string | null) {
		this.room = r;
	}

	public leaveRoom() {
		this.socket.emit("leaveRoom", this.room);
		this.room = null;
	}

	public subscribeToEvent(eventName: any, callback: any) {
		this.socket?.on(eventName, callback);
	}

	public emitEvent(eventName: any, data: any) {
		this.socket?.emit(eventName, data);
	}
}

const collabSocketManager = new SocketManager();
export default collabSocketManager;
