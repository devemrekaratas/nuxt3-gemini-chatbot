<script setup lang="ts">
import { useChatStore } from '~/stores/chat';

const store = useChatStore()
const selectedTopic = ref<Number | null>(null)

const { data: topics, status } = await useLazyFetch('/api/suggestion', { server: false })

const sendPrompt = (index: number, description: string) => {
    if (selectedTopic.value === index) {
        selectedTopic.value = null
        store.question = ''
    } else {
        selectedTopic.value = index
        store.question = description
    }
}
</script>

<template>
    <ClientOnly>
        <div class="flex flex-col gap-y-10 justify-center w-full xl:mt-20 mt-10">
            <div class="md:text-5xl sm:text-4xl text-2xl md:leading-10">
                <div class="bg-gradient-to-r from-blue-500 to-red-400 inline-block text-transparent bg-clip-text font-semibold mb-2">
                    Hello,</div>
                <div class="text-[#444746] font-semibold">How can I help you today?</div>
            </div>
            <div v-if="status === 'pending'">
                <div class="flex overflow-x-auto gap-x-4 scrollbar-none -ms-2 -me-2">
                    <USkeleton v-for="i in 3" :key="i" class="first:ms-2 sm:w-60 w-44 h-40 shrink-0" />
                </div>
            </div>
            <div v-else class="flex gap-x-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none -ms-2 -me-2 scroll-p-2">
                <div v-for="topic, index in topics" :key="index" class="snap-always snap-start touch-pan-x shrink-0 first:ms-4">
                    <div role="button" @click="sendPrompt(index, topic.description)" :class="[selectedTopic === index ? 'bg-[#dde3ea] dark:bg-[#333537]' : 'bg-[#f0f4f9] dark:bg-[#1e1f20]']"
                    class="flex flex-col justify-between hover:bg-[#dde3ea] dark:hover:bg-[#333537] rounded-xl sm:w-60 w-44 h-40 cursor-pointer md:text-md">
                        <div class="p-4">{{ topic.queryTopic }}</div>
                        <div class="p-2"><UIcon :name="`i-${topic.icon}`" class="self-end w-7 h-7 rounded-full" /></div>
                    </div>
                </div>
            </div>
        </div>
    </ClientOnly>
</template>