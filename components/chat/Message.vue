<template>
  <q-footer>
    <q-toolbar class="bg-grey-3 text-black row">
      <q-btn
        round
        flat
        icon="insert_emoticon"
        class="q-mr-sm"
      />
      <q-input
        rounded
        outlined
        dense
        class="WAL__field col-grow q-mr-sm"
        bg-color="white"
        v-model="message"
        placeholder="Type a message"
      />
      <q-btn
        round
        flat
        icon="mic"
      />
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
const { message } = storeToRefs(chatStore)
</script>