<script setup lang="ts">

const props = defineProps<{
    animated?: boolean
}>()

</script>

<template>
    <div class="flex items-center shrink-0 justify-center h-8 w-8">
        <img src="/gemini.svg" class="w-full h-full" :class="[{ 'animate-spin-slow': props.animated }]" alt="gemini icon">
    </div>
</template>