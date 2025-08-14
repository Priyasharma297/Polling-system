# 🗳️ Intervue Polling Assignment

A real-time polling application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with Socket.IO to facilitate live polls between teachers and students during interactive sessions.

## 🚀 Live Preview

- Public Link: https://intervue-polling-assignment.vercel.app
- Github Link: https://github.com/Amritkumar01/Intervue-polling-assignment


## 📌 Features

- 👨‍🏫 Teachers can create and launch live polls
- 🧑‍🎓 Students can join and submit responses
- ⏲️ Real-time countdown timer for each poll
- 📊 Live results display with animated percentage bars
- ⚡ Instant feedback using Socket.IO
- 🎨 Clean and responsive UI with Tailwind CSS


## 🏗️ Tech Stack

| Layer      | Technology           |
|------------|----------------------|
| Frontend   | React, Tailwind CSS  |
| Backend    | Node.js, Express     |
| Real-time  | Socket.IO            |
| Database   | MongoDB, Mongoose    |


## 📂 Folder Structure

```

intervue-poiling-assignment/
├── frontend/             # React frontend
│   ├── components/       # UI Components
│   ├── pages/            # Teacher and Student pages
│   └── socket.js         # Frontend socket configuration
├── backend/              # Node.js backend
│   ├── models/           # Mongoose schemas
│   ├── socket.js         # Socket.IO event handlers
│   └── server.js         # Server entry point
└── README.md

````

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Amritkumar01/Intervue-polling-assignment
cd Intervue-polling-assignment
````

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `server` directory:

```
PORT=5000
MONGODB_URI=your_mongo_connection_string
```

Then run the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```


## 🧪 How It Works

1. **Teacher Dashboard**: Enter a question, options, and time limit.
2. **Student View**: Students join and vote on live polls.
3. **Live Results**: Once time ends, percentage results are shown live to both users.


## 📈 Future Improvements

* ✅ Authentication (teacher & student login)
* ✅ Joining Polls using generated code


## 🙋‍♂️ Author

**Amrit Kumar**
🔗 [GitHub](https://github.com/Amritkumar01)

```
Let me know if you want help with deployment instructions, or a screenshot section.
```
