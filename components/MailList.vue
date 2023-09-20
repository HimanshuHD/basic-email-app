<script setup>
    const emailStore = useEmails();
    const route = useRoute();
    
    let selectedEmails = ref([]);
    const isAllSelected = ref(false);
    let clickedMail = ref(null);
    
    const getMailList = () => {
        return route.name === 'archived' ? emailStore.archivedEmails : emailStore.inboxEmails;
    }
    let emailTypeList = getMailList();
    let emails = ref(emailTypeList.map(email => ({
        ...email,
        isSelected: false
    })));

    nextTick(() => {
        document.onkeydown = (ev) => {
            if (ev.code === 'KeyR') mailAction('isRead');
            else if (ev.code === 'KeyA') mailAction('isArchived');
        }
    });


    const mailSelected = (emailId) => {
        emails.value = emails.value.map(email => {
            if (email.id === emailId) {
                email.isSelected = !email.isSelected;
            }
            return email;
        });
    };

    const allMailSelected = (ev) => {
        selectedEmails.value = [];
        emails.value = emails.value.map(email => {
            email.isSelected = ev.target.checked;
            return email;
        });

        if (ev.target.checked) {
            for (const email of emails.value) {
                selectedEmails.value.push(email.id);
            }
        }
    };

    const mailAction = (type) => {
        if (selectedEmails.value.length === 0) alert('No item select to act upon!');
        const updatedData = emails.value.filter(email => {
            if (email.isSelected) {
                email[type] = true;
                return email;
            }
        });
        emailStore.updateData(updatedData);
        refreshList();
    }

    const refreshList = () => {
        emails.value = [];
        isAllSelected.value = false;
        selectedEmails.value = [];
        nextTick(() => {
            emailTypeList = getMailList();
            emails.value = emailTypeList.map(email => ({
                ...email,
                isSelected: false
            }));
        });
    }

    const openEmail = (email) => {
        clickedMail.value = email;
    }
</script>

<template>
  <div class="main-page-container">
    <div class="page-header">
        <p>{{ route.name }}
        </p>
    </div>
    <div class="page-main-content">
        <div class="page-content-top-nav">
            <div class="mail-selection">
                <input type="checkbox" v-model="isAllSelected"  @change="allMailSelected($event)" />
                <span>Email Selected ({{ selectedEmails.length }})</span>
            </div>
            <div class="mail-action">
                <button class="mail-action-buttons" @click="mailAction('isRead')">
                    <img src="../static/images/mark-read.png" alt="Mark Read Icon" />
                    <span>Mark as read (r)</span>
                </button>
                <button v-if="route.name !== 'archived'" class="mail-action-buttons" @click="mailAction('isArchived')">
                    <img src="../static/images/mark-archived.png" alt="Mark Read Icon" />
                    <span>Archive (a)</span>
                </button>
            </div>
        </div>
        <div class="page-content-list">
            <template v-if="emails.length === 0">
                <p class="page-content-list-item">No data to display!</p>
            </template>
            <template v-else>
                <div v-for="(email, index) in emails" :key="index" class="page-content-list-item" :class="{ 'is-read': email.isRead }" @click="openEmail(email)">
                    <input type="checkbox" :value="email.id" v-model="selectedEmails" @change="mailSelected(email.id)" @click="$event.stopPropagation()" />
                    <span>{{ email.title }}</span>
                </div>
            </template>
        </div>
    </div>
    <MailPopup v-if="clickedMail" :mail-details="clickedMail" @close-popup="clickedMail = null" @refresh-list="refreshList()" />
  </div>
</template>

<style scoped>
    .main-page-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
    }
    .page-header {
        height: 41px;
        padding: 0px 24px;
    }

    .page-header p {
        font-size: 32px;
        line-height: 41.41px;
        margin: 0;
        text-transform: capitalize;
    }

    .page-main-content {
        height: 694px;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .page-main-content .page-content-top-nav {
        height: 20px;
        padding: 0 24px;
        display: flex;
        justify-content: space-between;
    }

    .page-main-content .page-content-top-nav .mail-selection {
        width: 170px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
    }

    .page-main-content .page-content-top-nav .mail-selection input,
    .page-main-content .page-content-list-item input {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        margin: 0;
    }

    .page-main-content .page-content-top-nav .mail-selection span,
    .page-main-content .page-content-top-nav .mail-action-buttons span,
    .page-main-content .page-content-list-item span {
        font-size: 14px;
        line-height: 18.12px;
        color: rgba(0, 0, 0, 1);
    }

    .page-main-content .page-content-top-nav .mail-action {
        width: 274px;
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        gap: 40px;
    }

    .page-main-content .page-content-top-nav .mail-action-buttons {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        background: transparent;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    .page-main-content .page-content-top-nav .mail-action-buttons:nth-child(1) {
        width: 132px;
    }

    .page-main-content .page-content-top-nav .mail-action-buttons:nth-child(2) {
        width: 102px;
    }

    .page-main-content .page-content-top-nav .mail-action-buttons img {
        width: 19px;
        height: 19px;
    }

    .page-main-content .page-content-top-nav .mail-action-buttons span {
        color: rgba(75, 85, 99, 1);
    }

    .page-main-content .page-content-list {
        height: 650px;
        overflow: auto;
    }

    .page-main-content .page-content-list-item {
        box-sizing: border-box;
        height: 60px;
        padding: 0 24px;
        border: 1px solid rgba(229, 231, 235, 1);
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: center;
        cursor: pointer;
        margin: 0;
    }

    .page-main-content .page-content-list-item.is-read {
        opacity: 0.5;
    }

    .page-main-content .page-content-list-item:nth-child(2n) {
        background: rgba(243, 246, 251, 1);
    }

    .page-main-content .page-content-list-item:hover {
        background: rgba(209, 226, 255, 1);
        border: 1px solid rgba(202, 214, 228, 1);
    }
    
</style>