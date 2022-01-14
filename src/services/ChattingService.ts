import {Args, InputAndBroadcast, IO, Nsp, Socket, SocketService, SocketSession} from "@tsed/socketio";
import * as SocketIO from "socket.io";

@SocketService("/Chat")
export class ChattingService {

    @Nsp nsp: SocketIO.Namespace;

    public clients: Map<string, SocketIO.Socket> = new Map();

    constructor(@IO private io: SocketIO.Server) {
    }


    /**
     * 소켓 접속하게 되면 해당 이벤트 발생
     * @param socket
     * @param session
     */
    $onConnection(@Socket socket: SocketIO.Socket, @SocketSession session: SocketSession) {
        console.log('Socket 연결 되었습니다.')
        console.log(`Socket ID: ${socket.id}`);

        this.clients.set(socket.id, socket);
        socket.emit('chat','서버에서 보내는 메시지입니다!!');
        const yourId: string | undefined = socket.handshake.query.yourId?.toString();
        if (yourId) this.clients.set(yourId, socket);
    }

    /**
     * 소켓 접속을 종료하게 되면 해당 이벤트 발생
     * @param socket
     */
    $onDisconnect(@Socket socket: SocketIO.Socket) {
        this.clients.delete(socket.id);
    }


    /**
     * 소켓 네임스페이스 추가생성시 해당 이벤트 발생
     * @param nsp
     */
    $onNamespaceInit(nsp: SocketIO.Namespace) {
    //
    }


    /**
     * 메시지 전체발송
     * @param someData 보낼 데이터~
     */
    broadcast(data: any): void {
        // 전체 socket 발송~~ 이벤트명 변경 필요
        this.nsp.emit('broadcast', data);
    }


    /**
     * 브라우저 에서 보내는 이벤트를 받기위해 정의하여 사용
     * @param data
     * @param socket
     */
    @InputAndBroadcast("message")
    async myMethod(@Args(0) data: any,@Nsp socket: Socket) {
        console.log("========================")
        console.log('[브라우저 -> 서버]:',data);
        console.log("========================")
        return {data: "data"};
    }


    /**
     *
     * @param idToSendTo 받을 상대방 socket ID
     * @param someData 보낼 데이터
     */
    sendToSingleClient(idToSendTo: string, data: any): void {
        const socket = this.clients.get(idToSendTo);
        if (!socket) {
            // 받을 대상이 socket 에 존재 하지 않을때~
            return;
        }
        // 이벤트명 변경필요
        socket.emit('eventName', data);
    }

}