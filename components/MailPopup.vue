<script setup>
    const props = defineProps(['mailDetails']);
    const emits = defineEmits(['closePopup', 'refreshList']);
    const emailStore = useEmails();
    const route = useRoute();
    const popupOverlay = ref();
    const popupContent = ref();
    nextTick(() => {
        popupOverlay.value.classList.remove('no-transition');
        setTimeout(() => {
            popupContent.value.classList.remove('no-transition');
        }, 300);
    });

    document.onkeydown = (ev) => {
        if (ev.code === 'Escape') popupAction('close');
        else if (ev.code === 'KeyR') popupAction('isRead');
        else if (ev.code === 'KeyA') popupAction('isArchived');
    }

    let emailList = route.name === 'archived' ? emailStore.archivedEmails : emailStore.inboxEmails;

    const popupAction = (type) => {
        if (type === 'close') {
            popupContent.value.classList.add('no-transition');
            setTimeout(() => {
                popupOverlay.value.classList.add('no-transition');
                setTimeout(() => {
                    emits('closePopup');
                }, 300);
            }, 500);
        } else {
            props.mailDetails[type] = true;
            emailStore.updateData([props.mailDetails]);
            emits('refreshList');
        }
    }
</script>

<template>
  <div class="mail-popup">
    <div class="mail-popup-overlay no-transition" ref="popupOverlay" @click="popupAction('close')"></div>
    <div class="mail-popup-main-container no-transition" ref="popupContent">
        <div class="mail-popup-top-navigation">
            <div class="mail-popup-close">
                <button class="mail-action-buttons" @click="popupAction('close')">
                    <img src="../static/images/close-popup.png" alt="Close Popup Icon" />
                    <span>Close (Esc)</span>
                </button>
            </div>
            <div class="mail-action">
                <button class="mail-action-buttons" @click="popupAction('isRead')">
                    <img src="../static/images/mark-read.png" alt="Mark Read Icon" />
                    <span>Mark as read (r)</span>
                </button>
                <button v-if="route.name !== 'archived'" class="mail-action-buttons" @click="popupAction('isArchived')">
                    <img src="../static/images/mark-archived.png" alt="Mark Read Icon" />
                    <span>Archive (a)</span>
                </button>
            </div>
        </div>
        <div class="mail-popup-main-content">
            <h3>{{ mailDetails.title }}</h3>
            <p>{{ mailDetails.body }}</p>
        </div>
    </div>
  </div>
</template>

<style scoped>
    .mail-popup-overlay {
        opacity: 1;
        background: rgba(76, 87, 100, 0.8);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transition: all 0.3s;
    }
    .mail-popup-overlay.no-transition {
        opacity: 0;
    }
    .mail-popup-main-container {
        box-sizing: border-box;
        background: #FFF;
        position: absolute;
        width: 752px;
        height: 100%;
        top: 0;
        right: 0;
        border: 1px solid rgba(229, 231, 235, 1);
        padding: 32px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        transition: all 0.5s;
    }

    .mail-popup-main-container.no-transition {
        transform: translateX(762px);
    }

    .mail-popup-main-container .mail-popup-top-navigation {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 19px;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-popup-close .mail-action-buttons {
        width: 105px;
        display: flex;
        flex-direction: row;
        gap: 12px;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-popup-close .mail-action-buttons img {
        padding: 3px;
        box-sizing: border-box;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-popup-close .mail-action-buttons,
    .mail-popup-main-container .mail-popup-top-navigation .mail-action .mail-action-buttons {
        background: transparent;
        border: none;
        padding: 0;
        align-items: center;
        cursor: pointer;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-action-buttons img {
        width: 15px;
        height: 15px;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-action-buttons span {
        font-size: 14px;
        line-height: 18.12px;
    } 

    .mail-popup-main-container .mail-popup-top-navigation .mail-action {
        width: 274px;
        display: flex;
        flex-direction: row;
        gap: 40px;
        justify-content: flex-end;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-action .mail-action-buttons {
        display: flex;
        flex-direction: row;
        gap: 12px;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-action .mail-action-buttons:nth-child(1) {
        width: 132px;
    }

    .mail-popup-main-container .mail-popup-top-navigation .mail-action .mail-action-buttons:nth-child(2) {
        width: 102px;
    }

    .mail-popup-main-container .mail-popup-main-content {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 100%;
    }

    .mail-popup-main-container .mail-popup-main-content h3 {
        font-size: 20px;
        line-height: 25.88px;
        color: rgba(18, 24, 41, 1);
        margin: 0;
    }

    .mail-popup-main-container .mail-popup-main-content p {
        font-size: 14px;
        line-height: 18.12px;
        color: rgba(75, 85, 99, 1);
        margin: 0;
    }
</style>