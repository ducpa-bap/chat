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
      <ChatInfo />

      <ChatList />

      <q-page-container class="bg-grey-2">
        <slot />
      </q-page-container>

      <ChatMessage />
    </q-layout>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

const $q = useQuasar()

const style = computed(() => ({
  height: $q.screen.height + 'px'
}))
</script>