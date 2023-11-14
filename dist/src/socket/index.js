"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlipRoomDats = exports.socket = void 0;
const History_1 = __importDefault(require("../models/History"));
const Users_1 = __importDefault(require("../models/Users"));
const axios_1 = __importDefault(require("axios"));
const uuid_1 = require("uuid");
const room_list = [];
const addHistory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newHistory = new History_1.default({
        userId: data.id,
        name: data.name,
        content: data.message,
        avatar: data.avatar
    });
    yield newHistory.save();
});
const CloseRoom = ({ creatorId, joinerId }) => __awaiter(void 0, void 0, void 0, function* () {
    const index = room_list.map((item) => item.creatorId).indexOf(creatorId);
    if (index !== -1 && room_list[index]['joinerId'] === joinerId) {
        room_list.splice(index, 1);
    }
});
const UpdateStatus = ({ creatorId, joinerId }) => __awaiter(void 0, void 0, void 0, function* () {
    const index = room_list.map((item) => item.creatorId).indexOf(creatorId);
    if (index !== -1 && room_list[index]['joinerId'] === joinerId) {
        room_list[index].status = 2;
    }
});
const joinRoom = (row, user) => __awaiter(void 0, void 0, void 0, function* () {
    const index = room_list
        .map((item) => item.creatorId)
        .indexOf(row.creatorId);
    room_list[index]['joiner'] = user.name;
    room_list[index]['joinerId'] = user.userId;
    room_list[index]['joinerAvatar'] = user.avatar;
    room_list[index]['status'] = 1;
    const uid = (0, uuid_1.v4)();
    const request = {
        jsonrpc: '2.0',
        method: 'generateSignedDecimalFractions',
        params: {
            apiKey: '1bff8401-139b-4b4f-a58b-d985347cd64b',
            n: 1,
            decimalPlaces: 1
        },
        id: uid
    };
    const rnd_data = yield axios_1.default.post('https://api.random.org/json-rpc/2/invoke', request);
    room_list[index]['api_data'] = rnd_data.data;
    if (rnd_data.data.result.random.data[0] === 1) {
        room_list[index]['c_result'] = true;
        if (room_list[index]['side'] === true) {
            room_list[index]['result'] = true;
            yield Users_1.default.updateOne({ userId: row.creatorId }, { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } });
            yield Users_1.default.updateOne({ userId: user.userId }, { $inc: { balance: -1 * row.betAmount } });
        }
        else {
            room_list[index]['result'] = false;
            yield Users_1.default.updateOne({ userId: user.userId }, { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } });
            yield Users_1.default.updateOne({ userId: row.creatorId }, { $inc: { balance: -1 * row.betAmount } });
        }
    }
    else {
        room_list[index]['c_result'] = false;
        if (room_list[index]['side'] === false) {
            room_list[index]['result'] = true;
            yield Users_1.default.updateOne({ userId: row.creatorId }, { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } });
            yield Users_1.default.updateOne({ userId: user.userId }, { $inc: { balance: -1 * row.betAmount } });
        }
        else {
            room_list[index]['result'] = false;
            yield Users_1.default.updateOne({ userId: user.userId }, { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } });
            yield Users_1.default.updateOne({ userId: row.creatorId }, { $inc: { balance: -1 * row.betAmount } });
        }
    }
});
const joinRoomViewer = (row, user) => __awaiter(void 0, void 0, void 0, function* () {
    const index = room_list
        .map((item) => item.creatorId)
        .indexOf(row.creatorId);
    if (index !== -1) {
        if (room_list[index]['viewer'].map((k) => k.id).indexOf(user.userId) ===
            -1) {
            room_list[index]['viewer'].push({
                name: user.name,
                id: user.userId,
                avatar: user.avatar
            });
        }
    }
});
const createNewRoom_flip = (data) => __awaiter(void 0, void 0, void 0, function* () {
    room_list.push({
        roomId: data.roomId,
        betAmount: data.betAmount,
        creator: data.name,
        creatorAvatar: data.avatar,
        creatorId: data.userId,
        side: data.side,
        joiner: '',
        joinerId: 0,
        joinerAvatar: '',
        viewer: [],
        status: 0
    });
});
exports.default = (io) => {
    io.on('connection', (socket) => {
        if (socket) {
            console.log('New User Connected : ', socket.id);
        }
        socket.on('disconnect', () => {
            console.log('User Disconnected : ', socket.id);
        });
        socket.on('chat message', (data) => {
            addHistory(data);
            io.emit('chat message', data); //sending message to all except the sender
        });
        socket.on('new_room_f', (data) => {
            createNewRoom_flip(data);
            io.emit('new_room_f', room_list); //sending message to all except the sender
        });
        socket.on('join-room', ({ user, row }) => __awaiter(void 0, void 0, void 0, function* () {
            yield joinRoom(row, user);
            io.emit('new_room_f', room_list); //sending message to all except the sender
        }));
        socket.on('join-room-viewer', ({ user, row }) => {
            joinRoomViewer(row, user);
            io.emit('new_room_f', room_list); //sending message to all except the sender
        });
        socket.on('close-room', ({ creatorId, joinerId }) => {
            CloseRoom({ creatorId, joinerId });
            io.emit('new_room_f', room_list); //sending message to all except the sender
        });
        socket.on('update-status', ({ creatorId, joinerId }) => {
            UpdateStatus({ creatorId, joinerId });
            io.emit('new_room_f', room_list); //sending message to all except the sender
        });
    });
    exports.socket = io;
};
const getFlipRoomDats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(room_list);
});
exports.getFlipRoomDats = getFlipRoomDats;
//# sourceMappingURL=index.js.map