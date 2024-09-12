import { defineStore } from 'pinia'
import { Role, type IChat, type IChatList, type IHistory } from '~/models/chat';

export const useChatStore = defineStore('chatStore', {
    state: () => ({
        chatList: [] as IChat[],
        activeChat: {
            id: '',
            answer: '',
            question: '',
            history: [] as IHistory[]
        } as IChat,
        question: '',
        loading: false,
        aiAnswer: '',
        isDesktopMenu: false,
        isMobileMenu: false,
        isStreaming: false,
        controller: null as AbortController | null
    }),
    actions: {
        async ask() {
            if (this.loading && this.question === '') return
            this.aiAnswer = ''

            if (!this.chatList.includes(this.activeChat)) {
                const newChat: IChat = {
                    ...this.activeChat,
                    question: this.question,
                    id: Math.random().toString(36).substring(2, 10),
                }
                this.chatList.push(newChat)
                this.activeChat = newChat
            }

            this.activeChat.history.push({
                role: Role.user,
                parts: [{ text: this.question }],
            })

            nextTick(() => {
                const list = document.querySelector(".chat-list")
                const items = document.querySelectorAll(".chat-item")

                if (list && items.length > 1) {
                    const secondLastChild = items[items.length - 2]

                    if (secondLastChild) {
                        const scrollHeight = list.scrollHeight
                        const itemHeight = secondLastChild.clientHeight

                        if (scrollHeight > itemHeight) {
                            list.scrollTo({
                                top: scrollHeight - itemHeight
                            })
                        }
                    }
                }
            })

            this.loading = true
            this.isStreaming = true
            this.controller = new AbortController()
            const signal = this.controller.signal
            this.question = ''
            try {
                const response = await $fetch<ReadableStream>('/api/chat', {
                    method: 'POST',
                    signal: signal,
                    body: { history: this.activeChat.history, ask: this.question },
                    responseType: 'stream',
                })
                const reader = response.pipeThrough(new TextDecoderStream()).getReader()
                while (true) {
                    const { value, done } = await reader.read()
                    if (done) {
                        this.activeChat.history.push({
                            role: Role.model,
                            parts: [{ text: this.aiAnswer }]
                        })
                        this.loading = false
                        this.isStreaming = false
                        this.aiAnswer = ''
                        break
                    }
                    if (this.loading) this.loading = false
                    this.aiAnswer += value
                }

            } catch (error: any) {
                if (error.name === 'AbortError') {
                    console.log('Request has been aborted')
                } else {
                    console.error('Fetch error:', error)
                }
                this.isStreaming = false
                this.loading = false
            }
        },
        startChat() {
            this.activeChat = {
                id: '',
                question: '',
                answer: '',
                history: [],
            }
            this.question = ''
        },
        deleteChat(chatId: string) {
            this.chatList = this.chatList.filter(chat => chat.id !== chatId)
            if (this.activeChat?.id === chatId) {
                this.activeChat = {
                    id: '',
                    answer: '',
                    question: '',
                    history: [] as IHistory[]
                } as IChat
            }
        },
        abortRequest() {
            if (this.controller) {
                this.isStreaming = false
                this.loading = false
                this.controller.abort()

                if (this.aiAnswer) {
                    this.activeChat.history.push({
                        role: Role.model,
                        parts: [{ text: this.aiAnswer }]
                    })
                    this.aiAnswer = ''
                }
            }
        },
        setActiveChat(chatId: string) {
            const chat = this.chatList.find(chat => chat.id === chatId)
            if (chat) {
                this.activeChat = chat
            }
        }
    }
})