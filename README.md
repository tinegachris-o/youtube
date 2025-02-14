
# youtube
it is simple version of youtube
Test the app https://youtube-clone-tinega.netlify.app/
# youtube
it is simple version of youtube

<a href=" https://youtube-clone-tinega.netlify.app/"># VidX 🎥#youtube
</a>
![VidX Logo](./YouTube.png)

VidX is a full-stack **video-sharing platform** built with **React (Vite)**, **Node.js (Express.js)**, and **MongoDB**. Users can **upload, watch, and interact** with videos.

---

## 🚀 Features
- 🔐 **User Authentication** (JWT & Cookies)
- 📹 **Video Upload & Streaming** (Cloudinary + HLS.js)
- 🎵 **Music & Mux Integration**
- 💬 **Comments & Likes System**
- 🎨 **Responsive UI** with Material UI
- ⚡ **State Management** (Redux Toolkit + Persist)

---

## 🛠 Tech Stack

### **Frontend (Vite + React)**
- React 18
- Redux Toolkit & Redux Persist
- React Router DOM
- Material UI & Styled Components
- Axios (API Calls)

### **Backend (Node.js + Express.js)**
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (Media Uploads)
- Multer (File Handling)

### **Deployment & Hosting**
- **Frontend** → Vercel
- **Backend** → Render
- **Database** → MongoDB Atlas

---

## 📂 Project Structure
```bash
VidX/
│── Api/            # Backend (Express.js & MongoDB)
│── client/         # Frontend (React Vite)
│── .env            # Environment variables
│── package.json    # Backend dependencies
│── README.md       # Project documentation
│── YouTube.png     # Project logo
```

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/tinegachris-o/VidX.git
cd VidX
```

### **2️⃣ Install Dependencies**
#### **Backend:**
```sh
cd Api
yarn install
```
#### **Frontend:**
```sh
cd client
yarn install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file in the **`Api/`** folder:
```ini
PORT=8080
MONGODB_URI=your-mongodb-uri
CLOUDINARY_URL=your-cloudinary-url
JWT_SECRET=your-secret-key
```

For **Frontend (`client/.env`)**, add:
```ini
VITE_ENV=development
```

### **4️⃣ Start the Development Server**
#### **Run Backend:**
```sh
cd Api
yarn dev
```
#### **Run Frontend:**
```sh
cd client
yarn dev
```

---

## 🚀 Deployment

### **🖥 Backend (Render)**
1. Push code to GitHub
2. Deploy to Render: [https://render.com](https://render.com)
3. Add environment variables in Render
4. Set **Start Command**: `node index.js`

### **🌍 Frontend (Vercel)**
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   cd client
   vercel
   ```

---

## 🔥 API Endpoints

| Method | Endpoint          | Description              |
|--------|------------------|--------------------------|
| POST   | `/api/auth`      | Register/Login User      |
| GET    | `/api/videos`    | Fetch All Videos        |
| POST   | `/api/upload`    | Upload Video to Cloudinary |
| GET    | `/api/comments`  | Get Comments for Video   |
| POST   | `/api/comments`  | Add a Comment           |

---

## 👨‍💻 Author
- **Tinega Chrisantus**  
  📧 [tinegachris797@gmail.com](mailto:tinegachris797@gmail.com)  
  🔗 [GitHub](https://github.com/tinegachris-o)

---

### 🎉 **Enjoy using VidX!** 🚀

