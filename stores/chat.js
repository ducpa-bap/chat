import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => {
    return {
      message: '',
      search: '',
      rooms: [],
      currentRoomId: null
    }
  },
  getters: {
    currentRoom: state => state.currentRoomId !== null ? state.rooms.find(item => item.id === state.currentRoomId) : null
  },
  actions: {
    setCurrentRoomId(roomId) {
      this.currentRoomId = roomId
    },
    setRooms(rooms) {
      this.rooms = rooms
    },
    addRoom(room) {
      this.rooms.push(room)
    },
    findRoom(roomId) {
      return this.rooms.find(item => item.id === roomId)
    },
    updateRoom(roomId, room) {
      const index = this.rooms.findIndex(item => item.id === roomId)
      if (index !== -1) {
        this.rooms[index] = room
      }
    },
    removeRoom(roomId) {
      this.rooms = this.rooms.filter(item => item.id !== roomId)
    }
  }
})