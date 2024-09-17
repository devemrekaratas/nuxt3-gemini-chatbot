<script setup lang="ts">
const store = useChatStore()
</script>

<template>
    <div class="flex flex-col gap-y-2 flex-1">
        <div class="flex items-center gap-x-2 text-medium ms-2">
            <UIcon name="i-material-symbols:history-rounded" class="w-5 h-5" />
            Chat history
        </div>
        <UDivider />
        <div v-for="chat in store.chatList" :key="chat.id"
            :class="[{ 'bg-blue-500 dark:bg-blue-900 text-white': store.activeChat?.id === chat.id }]"
            class="flex items-center justify-between rounded-md">
            <UButton @click="store.setActiveChat(chat.id)" truncate class="flex-1 capitalize" :label="chat.question"
                color="black" variant="ghost" />
            <UButton @click="store.deleteChat(chat.id)" icon="i-material-symbols:delete" size="xs" color="rose"
                variant="link" />
        </div>
    </div>
</template>