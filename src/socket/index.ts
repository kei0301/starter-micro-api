import { Socket } from 'socket.io';
import Historys from '../models/History';
import CoinHistorys from '../models/CoinFlip';
import Users from '../models/Users';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export let socket: Socket;

const room_list: any = [];

const addHistory = async (data: any) => {
  const newHistory = new Historys({
    userId: data.id,
    name: data.name,
    content: data.message,
    avatar: data.avatar
  });
  await newHistory.save();
};

const CloseRoom = async ({ creatorId, joinerId }: any) => {
  const index = room_list.map((item: any) => item.creatorId).indexOf(creatorId);
  if (index !== -1 && room_list[index]['joinerId'] === joinerId) {
    room_list.splice(index, 1);
  }
};

const UpdateStatus = async ({ creatorId, joinerId }: any) => {
  const index = room_list.map((item: any) => item.creatorId).indexOf(creatorId);
  if (index !== -1 && room_list[index]['joinerId'] === joinerId) {
    room_list[index].status = 2;
  }
};

const joinRoom = async (row: any, user: any) => {
  const index = room_list
    .map((item: any) => item.creatorId)
    .indexOf(row.creatorId);
  room_list[index]['joiner'] = user.name;
  room_list[index]['joinerId'] = user.userId;
  room_list[index]['joinerAvatar'] = user.avatar;
  room_list[index]['status'] = 1;

  const uid = uuidv4();
  const request = {
    jsonrpc: '2.0',
    method: 'generateSignedDecimalFractions',
    params: {
      apiKey: '1bff8401-139b-4b4f-a58b-d985347cd64b',
      n: 1,
      decimalPlaces:1
    },
    id: uid
  };

  const rnd_data = await axios.post(
    'https://api.random.org/json-rpc/2/invoke',
    request
  );

  room_list[index]['api_data'] = rnd_data.data;
  if (rnd_data.data.result.random.data[0] === 1) {
    room_list[index]['c_result'] = true;
    if (room_list[index]['side'] === true) {
      room_list[index]['result'] = true;
      await Users.updateOne(
        { userId: row.creatorId },
        { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } }
      );
      await Users.updateOne(
        { userId: user.userId },
        { $inc: { balance: -1 * row.betAmount } }
      );
    } else {
      room_list[index]['result'] = false;
      await Users.updateOne(
        { userId: user.userId },
        { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } }
      );
      await Users.updateOne(
        { userId: row.creatorId },
        { $inc: { balance: -1 * row.betAmount } }
      );
    }
  } else {
    room_list[index]['c_result'] = false;
    if (room_list[index]['side'] === false) {
      room_list[index]['result'] = true;
      await Users.updateOne(
        { userId: row.creatorId },
        { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } }
      );
      await Users.updateOne(
        { userId: user.userId },
        { $inc: { balance: -1 * row.betAmount } }
      );
    } else {
      room_list[index]['result'] = false;
      await Users.updateOne(
        { userId: user.userId },
        { $inc: { balance: Number((row.betAmount * 0.98).toFixed(2)) } }
      );
      await Users.updateOne(
        { userId: row.creatorId },
        { $inc: { balance: -1 * row.betAmount } }
      );
    }
  }
};

const joinRoomViewer = async (row: any, user: any) => {
  const index = room_list
    .map((item: any) => item.creatorId)
    .indexOf(row.creatorId);
  if (index !== -1) {
    if (
      room_list[index]['viewer'].map((k: any) => k.id).indexOf(user.userId) ===
      -1
    ) {
      room_list[index]['viewer'].push({
        name: user.name,
        id: user.userId,
        avatar: user.avatar
      });
    }
  }
};

const createNewRoom_flip = async (data: any) => {
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
};

export default (io: any) => {
  io.on('connection', (socket: Socket) => {
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

    socket.on('join-room', async ({ user, row }) => {
      await joinRoom(row, user);
      io.emit('new_room_f', room_list); //sending message to all except the sender
    });

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
  socket = io;
};

export const getFlipRoomDats = async (req: any, res: any) => {
  res.json(room_list);
};
