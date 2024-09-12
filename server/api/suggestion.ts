import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai'

export default eventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const genAI = new GoogleGenerativeAI(config.apiKey)

    const schema = {
        description: "List of popular AI queries",
        type: SchemaType.ARRAY,
        items: {
            type: SchemaType.OBJECT,
            properties: {
                queryTopic: {
                    type: SchemaType.STRING,
                    description: "The topic of the query must be maximum 3 words",
                    nullable: false,
                },
                description: {
                    type: SchemaType.STRING,
                    description: "A detailed description of the topic must be maximum 30 words",
                    nullable: false,
                },
                icon: {
                    type: SchemaType.STRING,
                    description: "Give me an icon from the Google Material Icons package for a related topic, like this: ic:baseline-desktop-mac. Icon names do not have underscore use it with '-'",
                    nullable: false,
                }
            },
            required: ["queryTopic", "description", "icon"],
        },
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema,
        },
    })

    const prompt = `
        Generate a diverse list of popular AI query topics covering a broad range of categories. Include, but do not limit to, the following categories:
        - Travel recommendations (destinations, itineraries, travel tips)
        - Personal development (self-improvement strategies, goal setting, productivity tips)
        - Programming (languages, tools, best practices, tutorials)
        - Recipe ideas (cooking methods, cuisine types, dietary preferences)
        - Tech news (latest gadgets, software updates, tech industry trends)
        - Finance (investment advice, budgeting tips, economic trends)
        - Daily life tips and hacks (organization, health tips, time management)

        From this extensive list, randomly select and provide only 3 unique and diverse topics, each with a detailed description. Ensure that the selected topics cover different categories and are representative of the broad range of interests.
    `

    const result = await model.generateContent(prompt);

    return JSON.parse(result.response.text())

})