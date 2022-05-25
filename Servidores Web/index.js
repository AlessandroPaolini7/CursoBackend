const http = require('http');
const PORT = 8080;

const server = http.createServer((request, response) => {
    const date = (new Date()).getHours();
    if (date >= 6 && date <= 12) {
        response.write('Buenos días');
    } else if (date >= 13 && date <= 18) { 
        response.write('Buenas tardes');
    } else {
        response.write('Buenas noches');
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});