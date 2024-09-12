import { GoogleGenerativeAI } from '@google/generative-ai'
import { AskRequest } from '../type/gemini'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const genAI = new GoogleGenerativeAI(config.apiKey)
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
     })
    const body:AskRequest = await readBody(event)
    const chat = model.startChat({
        history: body.history
    })

    const message = body.ask
        
    const result = await chat.sendMessageStream(message)

    const stream = new ReadableStream({

        async pull(controller) {
            for await (const chunk of result.stream) {
                const chunkText = chunk.text()
                controller.enqueue(chunkText)
            }
            controller.close()
        }
    })

    return sendStream(event, stream)

})
