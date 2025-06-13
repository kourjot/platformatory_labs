# platformatory_labs

## 📂 Project Structure

# 🧠 OIDC Profile Editor with Temporal (Node.js + TypeScript)

This full-stack project allows users to log in via GitHub (OIDC), view and edit their profile (First Name, Last Name, Phone Number, City, Pincode), and uses **Temporal** to handle and persist the updates with a 10-second delay, sending the data to [CrudCrud](https://crudcrud.com).

---

## 📦 Tech Stack

- 👤**Frontend:** HTML,CSS ,Vanilla JS
- 🗄️**Backend:** Node.js + Express
- 🧠**Temporal:** TypeScript SDK
- 🌐**Database:** Simulated + [CrudCrud](https://crudcrud.com)
- 🔐**OIDC:** GitHub OAuth
- 🐳**Containerization:** Docker + Docker Compose

---

## 🚀 Features

- GitHub OAuth login
- Profile editing UI
- Save updates via Temporal workflows
- Delay of 10s before sending data to [CrudCrud](https://crudcrud.com)
- TypeScript-based Temporal worker
- Docker Compose setup for running Temporal locally

---

## 🔧 Setup Instructions


```bash
1️⃣ Clone the repo

git clone https://github.com/kourjot/platformatory_labs.git
cd platformatory_labs

2️⃣ Start Temporal (Docker Compose)

cd docker-compose
docker-compose up

3️⃣ Install Backend Dependencies
  
  cd backend
npm install

4️⃣ Configure GitHub OAuth

Visit: https://github.com/settings/developers
Create a new OAuth App:
Homepage: http://localhost:3001
Callback URL: http://localhost:3001/auth/github/callback
Paste the generated CLIENT_ID and CLIENT_SECRET into backend/app.js.
const CLIENT_ID = 'your-client-id';
const CLIENT_SECRET = 'your-client-secret';


5️⃣ Compile TypeScript Code

If you’re only writing Temporal logic in TS:

npx tsc
backend/temporal/worker.ts ➝ dist/worker.js

6️⃣ Run the Temporal Worker


node dist/worker.js

7️⃣ Run Backend Server

node app.js

8️⃣ Open Frontend in Browser

http://127.0.0.1:5500/frontend/index.html

## 🔥 Preview Screens

### 🖥️ Login Page
![Login Page](screenshots/login.png)

### 👤 Profile Editor
![Profile Page](screenshots/profile.png)

### 🧠 Temporal Worker in Action
![Temporal Worker](screenshots/temporal-worker.png)


📂 Folder Structure

platformatory_labs/
│
├── backend/
│   ├── app.js
│   ├── tsconfig.json
│   └── temporal/
│       ├── activities.ts
│       ├── workflows.ts
│       └── worker.ts
│
├── frontend/
│   ├── login.html
│   └── profile.html


