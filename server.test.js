const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("my project", () => {
  let io, serverSocket, clientSocket;
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });


  test("sending/recieving message to server", (done) => {

    clientSocket.emit("send-chat-message", "hey")
    serverSocket.on("send-chat-message", message => {
        expect(message).toBe("hey")
        serverSocket.emit('chat-message', message)
        done()
      })
    clientSocket.on('chat-message', data => {
      expect(data).toBe("hey")
      done()
    })

  })



})