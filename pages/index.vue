<template>
  <div
    class="WAL position-relative bg-grey-4"
    :style="style"
  >
    <q-layout
      view="lHh Lpr lFf"
      class="WAL__layout shadow-3"
      container
    >
      <ChatInfo v-if="chatStore.currentRoomId" />

      <ChatList />

      <q-page-container class="bg-grey-2">
        <div class="q-pa-md row justify-center">
          <div style="width: 100%; max-width: 400px">
            <q-chat-message
              :text="['Have you seen Quasar?']"
              sent
              text-color="white"
              bg-color="primary"
            >
              <template v-slot:name>me</template>
              <template v-slot:stamp>7 minutes ago</template>
              <template v-slot:avatar>
                <img
                  class="q-message-avatar q-message-avatar--sent"
                  src="https://cdn.quasar.dev/img/avatar4.jpg"
                >
              </template>
            </q-chat-message>

            <q-chat-message bg-color="amber">
              <template v-slot:name>Mary</template>
              <template v-slot:avatar>
                <img
                  class="q-message-avatar q-message-avatar--received"
                  src="https://cdn.quasar.dev/img/avatar2.jpg"
                >
              </template>

              <div>
                Already building an app with it...
                <img
                  src="https://cdn.quasar.dev/img/discord-qeart.png"
                  class="chat-emoji"
                >
              </div>

              <q-spinner-dots size="2rem" />
            </q-chat-message>
          </div>
        </div>
      </q-page-container>

      <ChatInput />
    </q-layout>
  </div>
</template>

<style lang="scss">
.chat-emoji {
  vertical-align: middle;
  height: 2em;
  width: 2em;
}
</style>

<script setup>
import { useQuasar } from 'quasar'
import { useChatStore } from '@/stores/chat'

definePageMeta({ middleware: ['auth'] })

const $q = useQuasar()
const chatStore = useChatStore()

const style = computed(() => ({
  height: $q.screen.height + 'px'
}))
</script>