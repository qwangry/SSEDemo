require('dotenv').config(); // 加载 .env 文件中的环境变量

const OpenAI = require('openai');
const http = require('http');
const url = require('url');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 从环境变量中读取 API Key
    baseURL: 'https://api.chatanywhere.tech/v1',
});

let currentQuestion = "";

const server = http.createServer(async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); // 或指定域名
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    const parsedUrl = url.parse(req.url, true);
    const {
        pathname
    } = parsedUrl;

    if (pathname === '/ask') {
        const {
            question
        } = parsedUrl.query;

        currentQuestion = question; // 保存问题

        res.statusCode = 200;
        res.end();

    } else if (pathname === '/stream') {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        if (!currentQuestion) {
            res.write(`data: ${JSON.stringify({ error: 'No question provided' })}\n\n`);
            res.end();
            return;
        }

        try {
            // 调用 OpenAI 接口
            const response = await client.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{
                    role: "user",
                    content: currentQuestion
                }],
                temperature: 0,
                stream: true, // 启用流式返回
            });

            for await (const chunk of response) {
                const content = chunk.choices[0]?.delta?.content || "";
                if (content) {
                    res.write(`data: ${JSON.stringify({ message: content })}\n\n`); // 按 SSE 格式返回
                }
            }
            res.end();
        } catch (error) {
            res.write(`data: ${JSON.stringify({ error: 'Failed to fetch response' })}\n\n`);
            res.end();
        }
    } else {
        res.statusCode = 404;
        res.end('Not Found');
    }
})

server.listen(8888, function () {
    console.log('Server is running on http://localhost:8888...');
});