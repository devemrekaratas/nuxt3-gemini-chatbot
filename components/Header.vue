<script setup lang="ts">
const store = useChatStore()
</script>


<template>
    <div class="flex items-center xl:justify-start justify-between p-2 h-14">
        <UTooltip v-if="store.isDesktopMenu" text="Expand" class="xl:flex hidden">
            <UButton @click="store.isDesktopMenu = false"
                icon="i-tabler:layout-sidebar-right-collapse" size="xl" color="black" variant="link" :padded="false" />
        </UTooltip>
        <UButton @click="store.isMobileMenu = true" class="xl:hidden" icon="i-pajamas:hamburger" size="xl" color="black"
            variant="link" :padded="false" />
        <div class="lg:text-lg text-md ms-4">Nuxt Gemini</div>
        <UButton @click="store.startChat" class="xl:hidden flex" icon="i-mingcute:edit-line" size="xl" color="black" variant="link"
            :padded="false" />
    </div>
</template>