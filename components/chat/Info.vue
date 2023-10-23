<template>
  <q-header elevated>
    <q-toolbar class="bg-grey-3 text-black">
      <q-btn
        round
        flat
        icon="keyboard_arrow_left"
        class="WAL__drawer-open q-mr-sm"
        @click="layoutStore.toggleChatList"
      />

      <q-btn
        round
        flat
        v-if="image"
      >
        <q-avatar>
          <img :src="image">
        </q-avatar>
      </q-btn>

      <q-skeleton
        type="QAvatar"
        v-else
      />

      <span
        class="q-subtitle-1 q-pl-md"
        v-if="name"
      >
        {{ name }}
      </span>

      <q-skeleton
        type="text"
        v-else
      />

      <q-space />

      <q-btn
        round
        flat
        icon="search"
      />
      <q-btn
        round
        flat
      >
        <q-icon
          name="attachment"
          class="rotate-135"
        />
      </q-btn>
      <q-btn
        round
        flat
        icon="more_vert"
      >
        <q-menu
          auto-close
          :offset="[110, 0]"
        >
          <q-list style="min-width: 150px">
            <q-item clickable>
              <q-item-section>Contact data</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Block</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Select messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Silence</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Clear messages</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Erase messages</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useLayoutStore } from '@/stores/layout'
import { useChatStore } from '@/stores/chat'

const layoutStore = useLayoutStore()
const chatStore = useChatStore()

const { name, image } = useRoomData(chatStore.currentRoom)
</script>