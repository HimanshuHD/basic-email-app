export const useEmails = defineStore('emails', {
    state: () => ({
        data: []
    }),
  
    getters: {
        inboxEmails: (state) => state.data.filter(email => !email.isArchived),
        archivedEmails: (state) => state.data.filter(email => email.isArchived),
    },
  
    actions: {
        addDataToStore(emailData) {
            this.data = emailData;
        },
        updateData(emailData) {
            for (const updateEmail of emailData) {
                const index = this.data.findIndex(email => email.id === updateEmail.id);
                if (index !== -1) this.data[index] = updateEmail;
            }
        },
    },
  })
  
  if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useEmails, import.meta.hot))
  }