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
        v-model="name"
        label="Name"
      ></q-input>
      <q-input
        dense
        outlined
        class="q-mt-md"
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
      <q-input
        dense
        outlined
        class="q-mt-md"
        v-model="confirmPassword"
        type="password"
        label="Password Confirm"
      ></q-input>
    </q-card-section>
    <q-card-section>
      <q-btn
        style="border-radius: 8px;"
        color="dark"
        rounded
        size="md"
        label="Sign up"
        no-caps
        class="full-width"
        @click="register"
      ></q-btn>
    </q-card-section>
    <q-card-section class="text-center q-pt-none">
      <div class="text-grey-8">Don't have an account yet?
        <nuxt-link
          to="login"
          class="text-dark text-weight-bold"
          style="text-decoration: none"
        >
          Login
        </nuxt-link>
      </div>
    </q-card-section>

  </q-card>
</template>

<script setup>
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { getDoc, setDoc, doc } from 'firebase/firestore'
import { useFirebaseAuth, useFirestore } from 'vuefire'

definePageMeta({
  layout: 'guest',
  middleware: ['guest']
})

const auth = useFirebaseAuth()
const db = useFirestore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const register = async () => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const docSnap = await getDoc(doc(db, 'users', user.uid))
    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: name.value,
        email: user.email
      })
    }
    navigateTo('/')
  } catch (error) {
    console.error(error)
  }
}
</script>