<script setup>
    const props = defineProps(['mailCount']);
</script>

<template>
    <div class="left-sidebar left-sidebar--upper-container">
        <div class="logo-container">
            <img src="../static/images/logo.png" alt="Page Logo" />
        </div>
        <div class="links-container">
            <NuxtLink to="/inbox" class="main-link">
                <div class="link-content-left">
                    <img src="../static/images/inbox.png" alt="Inbox Logo" />
                    <span class="link-text">Inbox</span>
                </div>
                <div class="link-content-right">
                    <span class="link-text">{{ mailCount.inbox }}</span>
                </div>
            </NuxtLink>
            <NuxtLink to="/archived" class="main-link">
                <div class="link-content-left">
                    <img src="../static/images/archive.png" alt="Archive Logo" />
                    <span class="link-text">Archive</span>
                </div>
                <div class="link-content-right">
                    <span class="link-text">{{ mailCount.archived }}</span>
                </div>
            </NuxtLink>
        </div>
    </div>
    <div class="left-sidebar left-sidebar--lower-container">
        <div class="links-container links-container--no-padding">
            <NuxtLink to="/logout" class="main-link">
                <div class="link-content-left">
                    <img src="../static/images/logout.png" alt="Logout Logo" />
                    <span class="link-text">Logout</span>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<style scoped>
.layouts .left-sidebar--upper-container {
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.layouts .left-sidebar--upper-container .logo-container {
    padding: 0px 24px;
}

.layouts .left-sidebar--upper-container .logo-container img {
    width: 40px;
    height: 20px;
}

.layouts .left-sidebar .links-container {
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.layouts .left-sidebar--lower-container .links-container--no-padding {
    padding: 0;
}

.layouts .left-sidebar .links-container .main-link {
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

.layouts .left-sidebar .links-container .main-link.router-link-active {
    background: rgba(214, 226, 251, 1);
}

.layouts .left-sidebar .links-container .main-link .link-content-left {
    width: 79px;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 12px;
}

.layouts .left-sidebar .links-container .main-link span.link-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 20.7px;
}

.layouts .left-sidebar .links-container .main-link .link-content-left img {
    width: 20px;
    height: 16px;
}
</style>