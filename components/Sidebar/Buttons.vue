<script setup lang="ts">
const store = useChatStore()

const props = defineProps<{
    isMobile?: boolean
}>()
</script>

<template>
    <div class="flex items-center justify-between h-14">
        <UTooltip v-if="!props.isMobile" text="Collapse">
            <UButton @click="store.isDesktopMenu = true" icon="i-tabler:layout-sidebar-left-collapse" size="xl"
                color="black" variant="link" :padded="false" />
        </UTooltip>
        <UButton v-else @click="store.isMobileMenu = false" icon="i-pajamas:hamburger" size="xl" color="black"
        variant="link" :padded="false" />
        <UTooltip text="New Chat">
            <UButton @click="store.startChat" icon="i-mingcute:edit-line" size="xl" color="black" variant="link"
                :padded="false" />
        </UTooltip>
    </div>
</template>