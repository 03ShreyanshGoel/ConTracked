# 🚀 CP Contest Tracker

A **MERN Stack** based web application that tracks competitive programming contests across **Codeforces**, **CodeChef**, and **LeetCode**, allowing users to bookmark contests, filter by platform, and view solutions via YouTube links.

---

## 📑 Features

- **Fetch Contest Data:**
  - Upcoming contests and past contests from **Codeforces**, **CodeChef**, and **LeetCode**.
  - Unified & homogenized schema for all platforms.
  - Contest data updates **every 6 hours** using `node-cron`.
  - Display contest start date, time, and time remaining.

- **Filtering:**
  - Filter contests by one or more platforms (e.g., Codeforces only or Codeforces + LeetCode).

- **Bookmark Contests:**
  - Authenticated users can bookmark contests to keep track of them.
  
- **Solution Links:**
  - Admins can upload YouTube solution links for past contests.
  - Form-based URL for admin to attach YouTube solution links.
  
- **Authentication:**
  - Secure login and registration system using **bcryptjs** and **JWT tokens**.

- **Responsive Frontend:**
  - Mobile and tablet-friendly UI.
  - Light and dark mode toggle available.

---

## 🖥️ Tech Stack

| Layer        | Technology            |
|-------------|------------------------|
| Frontend    | React.js               |
| Backend     | Node.js, Express.js     |
| Database    | MongoDB (via Mongoose)  |
| APIs Used   | Codeforces API, CodeChef API, LeetCode GraphQL |
| Auth        | JWT, bcryptjs           |
| Scheduling  | node-cron               |

---

## 📥 API Documentation

### Base URL: `/api`

---

### 🔑 **Authentication Routes:**

| Method | Endpoint            | Description               |
|-------|---------------------|---------------------------|
| POST  | `/auth/register`     | Register a new user       |
| POST  | `/auth/login`        | Login user & get JWT token|

---

### 📅 **Contests Routes:**

| Method | Endpoint                          | Description                                      |
|-------|-----------------------------------|--------------------------------------------------|
| GET   | `/contests`                       | Fetch all contests (upcoming & past)              |
| POST  | `/contests/:contestId/solution`   | Add YouTube solution link (admin only)            |

---

### 🔖 **Bookmarks Routes:**

| Method | Endpoint            | Description                            |
|-------|---------------------|----------------------------------------|
| GET   | `/bookmarks`         | Fetch all bookmarks of the logged-in user |
| POST  | `/bookmarks/:id`     | Add or remove bookmark by contest ID   |

---

## 📺 YouTube Playlists for Solutions:

- **LeetCode PCDs**
- **Codeforces PCDs**
- **CodeChef PCDs**

(Admins can upload links for specific contests manually via a form.)

---

## 📹 Demo Video

[🎥 **Click to Watch Video Demo**](https://drive.google.com/drive/folders/13ah1W_p9FoZMxyBt4J7xVhn7LE4is6je?usp=sharing)

---

## 📂 GitHub Repository

[🔗 **GitHub Repo - CP Contest Tracker**](https://github.com/03ShreyanshGoel/ConTracked)

---

## 🛠️ Setup Instructions:

1. **Clone Repository:**
```bash
git clone https://github.com/03ShreyanshGoel/ConTracked.git
```

2. **Backend Setup:**
```bash
cd backend
npm install
npm start
```

3. **Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

4. **Environment Variables:**
Create a `.env` file in `backend`:
```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
```

---

## 👥 Contributor

- **Shreyansh Goel**

---

## 📌 Future Improvements:

- Auto-sync YouTube video solutions
- Email alerts for bookmarked contests
- Admin dashboard UI enhancements

---

**Shall I save and format this as a `README.md` file and send you a download link?**
