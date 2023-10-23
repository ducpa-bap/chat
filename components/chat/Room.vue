<template>
  <q-item
    clickable
    v-ripple
    @click="setCurrentRoom()"
  >
    <q-item-section avatar>
      <q-avatar v-if="image">
        <img :src="image">
      </q-avatar>

      <q-skeleton
        type="QAvatar"
        v-else
      />
    </q-item-section>

    <q-item-section>
      <q-item-label
        lines="1"
        v-if="name"
      >
        {{ name }}
      </q-item-label>
      <q-skeleton
        type="text"
        v-else
      />
      <q-item-label
        class="conversation__summary"
        caption
        v-if="caption"
      >
        <q-icon
          name="check"
          v-if="room?.sent"
        />
        <q-icon
          name="not_interested"
          v-if="room?.deleted"
        />
        {{ caption }}
      </q-item-label>
      <q-skeleton
        type="text"
        v-else
      />
    </q-item-section>

    <q-item-section
      side
      v-if="createdAt"
    >
      <q-item-label caption>
        {{ createdAt }}
      </q-item-label>
      <q-icon name="keyboard_arrow_down" />
    </q-item-section>
  </q-item>
</template>

<script setup>

import { useChatStore } from '@/stores/chat'

const props = defineProps(['id'])

const chatStore = useChatStore()

const room = chatStore.findRoom(props.id)
const { id, name, image, caption, createdAt } = useRoomData(room)

const setCurrentRoom = () => {
  if (!id.value) {
    return
  }

  chatStore.setCurrentRoomId(id.value)
}
</script>