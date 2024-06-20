import { Injectable } from "@nestjs/common";
import type { CreateRoomDto } from "../dto/create-room.dto";
import type { JoinRoomDto } from "../dto/join-room-dto";
import type { Room } from "../interfaces/room.interface";

@Injectable()
export class LiveService {
    private rooms: Room[] = [];
    createRoom(createRoomDto: CreateRoomDto): Room {

        const newRoom = {
            id: Date.now().toString(),
            name: createRoomDto.roomName,
            users: []
        };
        this.rooms.push(newRoom);
        return newRoom;
    }

    joinRoom(joinRoomDto: JoinRoomDto) {
        const room = this.rooms.find(room => room.id === joinRoomDto.roomId);
        if (room) {
            room.users.push(joinRoomDto.username);
        }
    }
}