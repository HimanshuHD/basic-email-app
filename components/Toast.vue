<template>
    <div class="toast-element">
      <div :class="['toast-container', { success: state === 'success', error: state === 'error' }]">
        <div class="icon">
          <svg
            v-if="state === 'success'"
            width="8"
            height="7"
            viewBox="0 0 8 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.96304 0.962891L2.88896 5.37647L1.03711 3.3703" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg
            v-else
            width="3"
            height="10"
            viewBox="0 0 3 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1.6665V4.99984" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 8.3335H1.00833" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <p>
          {{ message }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        toastIsVisible: false,
        message: '',
        state: ''
      }
    },
    mounted () {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'toast/showToast') {
          this.message = state.toast.content
          this.state = state.toast.state
          this.toastIsVisible = true
          document.querySelector('.toast-element').classList.add('enter')
          setTimeout(() => {
            if (this.toastIsVisible) {
              this.removeToast()
            }
          }, 3000)
        }
      })
    },
    methods: {
      removeToast () {
        document.querySelector('.toast-element').classList.replace('enter', 'leave')
        setTimeout(() => {
          this.toastIsVisible = false
        }, 240)
      }
    }
  }
  </script>
  
  <style scoped>
  .toast-element {
    position: fixed;
    top: -90px;
    left: 0;
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 7;
    opacity: 0;
    transition: all 240ms cubic-bezier(0, 0.0, 0.2, 1) 0s;
  }
  .enter {
    top: 20px;
    opacity: 1;
  }
  .leave {
    top: 20px;
    transform: scale(0.9);
  }
  .toast-container {
    width: fit-content;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 0.9375rem 1.875rem;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    column-gap: 0.9375rem;
    align-items: center;
  }
  .success {
    border-color: #037F10;
    background-color: #F4FFF6;
  }
  .error {
    border-color: #FF2525;
    background-color: #FFF4F4;
  }
  .icon {
    border-radius: 50%;
    display: flex;
  }
  .success .icon {
    padding: 6px;
    background-color: #037F10;
  }
  .error .icon {
    padding: 5px 8px 5px 9px;
    background-color: #FF2525;
  }
  p {
    width: max-content;
    font-size: 1.0625rem;
    font-weight: 400;
  }
  .success p {
    color: #037F10;
  }
  .error p {
    color: #FF2525;
  }
  </style>