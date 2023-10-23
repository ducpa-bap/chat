
import { getCurrentUser, useFirestore } from 'vuefire'
import { getDoc, doc } from 'firebase/firestore'
import dayjs from 'dayjs'

export const useRoomData = room => {
  const db = useFirestore()

  const id = ref(null)
  const name = ref('')
  const image = ref('')
  const caption = ref('')
  const createdAt = ref('')

  const getRoomData = async () => {
    try {
      if (!room?.id) {
        return
      }

      const user = await getCurrentUser()
      const userDoc = doc(db, 'users', user.uid)
      const isDirectChat = !!room.guest
      const isOwner = room.owner === userDoc

      const guestData = isDirectChat ? await getDoc(room.guest) : null
      const ownerData = await getDoc(room.owner)
      const lastMessage = room.last_message ? await getDoc(room.last_message) : null

      id.value = room.id
      name.value = room.name || (isOwner ? guestData.data().name : ownerData.data().name)
      const firstLetter = Array.from(name.value)[0]
      image.value = `https://placehold.co/40x40?text=${firstLetter}`
      caption.value = lastMessage ? lastMessage.data().content : null
      createdAt.value = dayjs(room.created_at.toDate()).format('YYYY-MM-DD hh:mm:ss')
    } catch (e) {
      console.error(e)
    } finally {
    }
  }

  getRoomData()

  return {
    id,
    name,
    image,
    caption,
    createdAt
  }
}