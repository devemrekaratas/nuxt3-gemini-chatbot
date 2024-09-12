<script setup lang="ts">
import { useChatStore } from '~/stores/chat';

const store = useChatStore()
const promptLabel = ref<HTMLLabelElement | null>(null)

watch(() => store.question, (newValue) => {
    if (promptLabel.value && newValue !== '') {
        promptLabel.value.click()
    }
})

defineShortcuts({
    meta_enter: {
        usingInput: true,
        handler: () => {
            if(store.question !== '') {
                store.ask()
            }
        }
    }
})
</script>

<template>
        <div class="relative w-full bg-white dark:bg-[#131314] max-w-3xl mx-auto xl:px-0 px-2">
            <div
                class="bg-[#f0f4f9] focus:outline-none focus-within:ring-2 focus-within:ring-black dark:focus-within:ring-white dark:bg-[#1e1f20] rounded-xl w-full mb-2">
                <label ref="promptLabel" class="left-0 w-full h-full sr-only" for="prompt" />
                <div class="flex items-end gap-2 p-1.5 rounded-full">
                    <div class="flex flex-1 flex-col min-w-0">
                        <UTextarea id="prompt" v-model="store.question" autofocus :disabled="store.loading" autoresize
                            :rows="1" :maxrows="5" variant="none" :padded="false" placeholder="Send a message"
                            class="ps-2 py-1.5" />
                    </div>
                    <div>
                        <UTooltip v-if="!store.isStreaming" text="Send" :shortcuts="['⌘', '⏎']">
                            <UButton @click="store.ask" :disabled="store.question === ''" icon="i-mingcute:send-fill" size="sm"
                                :ui="{ rounded: 'rounded-full' }" color="blue" variant="solid" />
                        </UTooltip>
                        <UButton v-else @click="store.abortRequest" icon="i-mingcute:pause-circle-fill" size="sm"
                                :ui="{ rounded: 'rounded-full' }" color="blue" variant="solid" />
                    </div>
                </div>
            </div>
            <div class="w-full text-xs text-center pb-2">Gemini can give inaccurate responses</div>
        </div>
</template>