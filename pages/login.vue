<template>
  <q-card
    class="q-pa-md shadow-2 auth-card"
    bordered
  >
    <q-card-section class="text-center">
      <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
      <div class="text-grey-8">Sign in below to access your account</div>
    </q-card-section>
    <q-card-section>
      <q-input
        dense
        outlined
        v-model="email"
        label="Email Address"
      ></q-input>
      <q-input
        dense
        outlined
        class="q-mt-md"
        v-model="password"
        type="password"
        label="Password"
      ></q-input>
    </q-card-section>
    <q-card-section>
      <q-btn
        style="border-radius: 8px;"
        color="dark"
        rounded
        size="md"
        label="Sign in"
        no-caps
        class="full-width"
        @click="login"
      ></q-btn>
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">Don't have an account yet?
        <nuxt-link
          to="register"
          class="text-dark text-weight-bold"
          style="text-decoration: none"
        >
          Sign up.
        </nuxt-link>
      </div>
    </q-card-section>

  </q-card>
</template>

<script setup>
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

const auth = useFirebaseAuth()

const email = ref('')
const password = ref('')

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    navigateTo('/')
  } catch (error) {
    console.error(error)
  }
}
</script>