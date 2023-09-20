<template>
  <div class="main-page-container">
    <p>Click the links in Left Sidebar to start!</p>
    <p>Default redirection is not implemented yet...</p>
  </div>
</template>

<style scoped>
    .main-page-container {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        flex-direction: column;
    }

    .layouts .upper-container {
        width: 100%;
        height: 160px;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .layouts .upper-container .logo-container {
        padding: 0px 24px;
    }

    .layouts .upper-container .logo-container img {
        width: 40px;
        height: 20px;
    }

    .layouts .left-sidebar-container .links-container {
        padding: 0px 10px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .layouts .left-sidebar-container.lower-container .links-container {
        padding: 0;
    }

    .layouts .left-sidebar-container .links-container .main-link {
        height: 48px;
        border-radius: 54px;
        padding: 12px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        text-decoration: none;
        color: rgba(18, 24, 41, 1);
    }

    .layouts .left-sidebar-container .links-container .main-link.router-link-active {
        background: rgba(214, 226, 251, 1);
    }

    .layouts .left-sidebar-container .links-container .main-link .link-content-left {
        width: 79px;
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: 12px;
    }

    .layouts .left-sidebar-container .links-container .main-link span.link-text {
        font-size: 16px;
        font-weight: 500;
        line-height: 20.7px;
    }

    .layouts .left-sidebar-container .links-container .main-link .link-content-left img {
        width: 20px;
        height: 16px;
    }

    
</style>