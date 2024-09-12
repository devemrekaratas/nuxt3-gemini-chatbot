<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
</script>

<template>
    <ClientOnly>
        <div class="flex items-center justify-between h-14">
            <label for="theme" class="text-sm">Dark Mode</label>
            <UToggle id="theme" on-icon="i-heroicons-moon-20-solid" off-icon="i-heroicons-sun-20-solid"
                v-model="isDark" :ui="{ active:'dark:bg-[#131314]', container:{ base:'dark:bg-[#1e1f20]'}, icon:{on:'dark:text-white'}}" size="md" />
        </div>
    </ClientOnly>
</template>