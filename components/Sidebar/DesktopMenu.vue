<script setup lang="ts">
const store = useChatStore()
const isOpen = ref(false)
</script>

<template>
    <div :class="[{ '-ml-80': store.isDesktopMenu }]"
        class="relative flex-shrink-0 w-80 h-full bg-[#f0f4f9] dark:bg-[#1e1f20] xl:block hidden transition-[margin-left] duration-200">
        <aside class="flex flex-col h-full px-2 gap-y-4">
            <SidebarButtons />
            <SidebarChatList />
            <DarkMode />
        </aside>
    </div>
</template>