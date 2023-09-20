export const useToast = defineStore('toast', {
    state: () => ({
        content: '',
        state: ''
    }),
  
    actions: {
        showToast(payload) {
            this.content = payload.content
            this.state = payload.state
        }
    },
  })
  
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useToast, import.meta.hot))
  }