const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');
const videoRoutes = require('./routes/videoRoutes');
const podcastRoutes = require('./routes/podcastRoutes');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    io.emit('visitorCount', 1000 + io.engine.clientsCount);

    socket.on('disconnect', () => {
        io.emit('visitorCount', 1000 + io.engine.clientsCount);
    });
});

app.use(cors());
app.use(express.json());

// Serve uploaded videos statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/podcasts', podcastRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
