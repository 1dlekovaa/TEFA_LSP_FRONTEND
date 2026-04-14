import { ref } from 'vue'

export function useModal() {
  const isOpen = ref(false)
  const title = ref<string>('')
  const type = ref<'create' | 'edit' | 'delete' | 'reset-password'>('create')

  const open = (modalTitle: string, modalType: 'create' | 'edit' | 'delete' | 'reset-password' = 'create') => {
    title.value = modalTitle
    type.value = modalType
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    title.value = ''
  }

  return {
    isOpen,
    title,
    type,
    open,
    close,
  }
}
