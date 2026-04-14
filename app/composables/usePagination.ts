import { ref, computed, onMounted } from 'vue'

export interface PaginationState {
  currentPage: number
  perPage: number
  total: number
  lastPage: number
  from: number
  to: number
}

export function usePagination(initialPerPage: number = 10) {
  const pagination = ref<PaginationState>({
    currentPage: 1,
    perPage: initialPerPage,
    total: 0,
    lastPage: 1,
    from: 0,
    to: 0,
  })

  const perPageOptions = [10, 25, 50, 100]

  const goToPage = (page: number) => {
    pagination.value.currentPage = page
  }

  const changePerPage = (newPerPage: number) => {
    pagination.value.perPage = newPerPage
    pagination.value.currentPage = 1
  }

  const nextPage = () => {
    if (pagination.value.currentPage < pagination.value.lastPage) {
      pagination.value.currentPage++
    }
  }

  const prevPage = () => {
    if (pagination.value.currentPage > 1) {
      pagination.value.currentPage--
    }
  }

  const updateFromResponse = (data: any) => {
    pagination.value = {
      currentPage: data.current_page,
      perPage: data.per_page,
      total: data.total,
      lastPage: data.last_page,
      from: data.from,
      to: data.to,
    }
  }

  const canGoPrev = computed(() => pagination.value.currentPage > 1)
  const canGoNext = computed(() => pagination.value.currentPage < pagination.value.lastPage)

  return {
    pagination,
    perPageOptions,
    goToPage,
    changePerPage,
    nextPage,
    prevPage,
    updateFromResponse,
    canGoPrev,
    canGoNext,
  }
}
