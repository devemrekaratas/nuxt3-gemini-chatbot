<script setup lang="ts">
useHead({
  bodyAttrs: {
    class: 'bg-white dark:bg-[#131314] antialiased h-full font-custom'
  },
  htmlAttrs: {
    class: 'w-full h-full overflow-hidden'
  }
})
const store = useChatStore()
</script>

<template>
  <div class="flex xl:flex-row h-full">
    <!-- Desktop Menu -->
    <SidebarDesktopMenu />
    <!-- Mobile Menu -->
    <USlideover
      :ui="{ background: 'bg-[#f0f4f9] dark:bg-[#1e1f20]', overlay: { background: 'bg-[#f0f4f9]/50 dark:bg-[#1e1f20]/50' } }"
      v-model="store.isMobileMenu" side="left">
      <div class="flex flex-col h-full px-2 gap-y-4">
        <SidebarButtons isMobile />
        <SidebarChatList />
        <DarkMode />
      </div>
    </USlideover>
    <div class="flex flex-col w-full h-full">
      <Header />
      <div class="flex flex-col flex-1 h-[calc(100%-3.5rem)]">
        <div class="flex-1 chat-list overflow-y-auto">
          <div class="max-w-3xl mx-auto px-2">
            <div v-if="!store.activeChat?.id" class="flex items-center h-full">
              <Topics />
            </div>
            <div v-for="(message, index) in store.activeChat?.history" :key="index" class="chat-item mb-5">
              <div v-if="message.role === 'user'" class="flex md:flex-row flex-col items-start gap-4">
                <UIcon name="i-material-symbols-light:account-circle" class="w-8 h-8" />
                <div class="mt-1">{{ message.parts[0].text }}</div>
              </div>
              <div v-else-if="message.role === 'model'" class="flex md:flex-row flex-col items-start gap-4 overflow-hidden">
                <GeminiIcon />
                <MDC :value="message.parts[0].text" class="min-w-0" />
              </div>
            </div>
            <div v-if="store.loading || store.isStreaming">
              <div v-if="store.loading" class="flex items-center gap-4">
                <GeminiIcon animated />
                <UIcon name="i-svg-spinners:3-dots-bounce" class="w-5 h-5" />
              </div>
              <div v-else class="flex md:flex-row flex-col items-start gap-4">
                <GeminiIcon animated />
                <MDC :value="store.aiAnswer" class="min-w-0 w-full" />
              </div>
            </div>
          </div>
        </div>
        <QuestionBar />
      </div>
    </div>
  </div>
</template>

<style>
p,
ul {
  @apply first:mt-0 last:mb-0 mt-2 mb-2;
}
</style>