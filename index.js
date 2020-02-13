// code away!
const server = require("./server");

const port = 5500;

server.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})