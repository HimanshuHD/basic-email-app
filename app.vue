<script setup>
    // definePageMeta({
    //     layout: false
    // })
  const emails = useEmails();
  const layout = ref('split');
  const { data } = await useFetch('/api/email');
  emails.addDataToStore(data.value);
  const mailCount = computed(() => {
    return {
      inbox: emails.inboxEmails.length,
      archived: emails.archivedEmails.length
    };
  });
</script>

<template>
  <div class="main-container">
    <!-- Show Nuxt progress indicator on page change -->
    <NuxtLoadingIndicator />
    <NuxtLayout class="layouts" :name="layout">
        <template #left>
          <LeftSidebar :mail-count="mailCount" />
        </template>
        <template #right>
            <NuxtPage />
        </template>
    </NuxtLayout>
  </div>
</template>
<style>
  body {
    background: rgba(18, 24, 41, 1);
    overflow: hidden;
  }
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(150, 150, 150, 0.3);
    border-radius: 10px;
  }

  .page-enter-active,
  .page-leave-active {
    transition: all 0.2s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(0.5rem);
  }
</style>

<style scoped>
  @font-face {
    font-family: 'PlusJakartaSans';
    src: url('./static/fonts/PlusJakartaSans-VariableFont_wght.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  .main-container {
    font-family: 'PlusJakartaSans';
    width: 1280px;
    height: 791px;
    background: #FFF;
    margin: 20px auto;
    position: relative;
    overflow: hidden;
  }
</style>