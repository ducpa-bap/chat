<template>
  <q-drawer
    v-model="isChatListOpen"
    show-if-above
    bordered
    :breakpoint="690"
  >
    <q-toolbar class="bg-grey-3">
      <q-avatar class="cursor-pointer">
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
      </q-avatar>

      <q-space />

      <q-btn
        round
        flat
        icon="message"
      />
      <q-btn
        round
        flat
        icon="more_vert"
      >
        <q-menu
          auto-close
          :offset="[110, 8]"
        >
          <q-list style="min-width: 150px">
            <q-item clickable>
              <q-item-section>New group</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Profile</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Archived</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Favorites</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="logout()"
            >
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-btn
        round
        flat
        icon="close"
        class="WAL__drawer-close"
        @click="layoutStore.toggleChatList"
      />
    </q-toolbar>

    <q-toolbar class="bg-grey-2">
      <q-input
        rounded
        outlined
        dense
        class="WAL__field full-width"
        bg-color="white"
        v-model="search"
        placeholder="Search or start a new room"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-toolbar>

    <q-scroll-area style="height: calc(100% - 100px)">
      <q-list v-if="rooms.length">
        <ChatRoom
          v-for="room in rooms"
          :key="room.id"
          :id="room.id"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { useFirebaseAuth, useFirestore, getCurrentUser } from 'vuefire'
import { signOut } from 'firebase/auth'
import { query, collection, where, doc, onSnapshot } from 'firebase/firestore'

import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'
import { useLayoutStore } from '@/stores/layout'

const auth = useFirebaseAuth()
const db = useFirestore()
const chatStore = useChatStore()
const layoutStore = useLayoutStore()
const { rooms, currentRoomIndex, search } = storeToRefs(chatStore)
const { isChatListOpen } = storeToRefs(layoutStore)
let unsubscribe = null

onMounted(async () => {
  const user = await getCurrentUser()
  const userDoc = doc(db, 'users', user.uid)

  chatStore.setRooms([])
  unsubscribe = onSnapshot(
    query(collection(db, 'groups'), where('members', 'array-contains', userDoc)),
    snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          chatStore.addRoom({
            id: change.doc.id,
            ...change.doc.data()
          })
        }
        if (change.type === 'modified') {
          chatStore.updateRoom(change.doc.id, {
            id: change.doc.id,
            ...change.doc.data()
          })
        }
        if (change.type === 'removed') {
          chatStore.removeRoom(change.doc.id)
        }
      })
    })
})

onUnmounted(() => {
  if (unsubscribe && typeof unsubscribe === 'function') {
    unsubscribe()
  }
})

const logout = async () => {
  try {
    await signOut(auth)
    navigateTo('/login')
  } catch (e) {
    // Do nothing
  }
}
</script>