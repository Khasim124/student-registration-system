📚 Student Registration System

A simple and clean Student Registration System built using React, TypeScript, Redux Toolkit, and Vite.
This project allows managing Course Types, Courses, Offerings, and Student Registrations, with all data stored in LocalStorage.

🌐 Live Demo

🔗 Vercel Deployment:
https://student-registration-system-phi-ten.vercel.app

🚀 Features Implemented
✅ Course Types

Add course types

Edit course types

Delete course types

Validation (no empty names, no short names)

✅ Courses

Add courses

Edit courses

Delete courses

Validation added

✅ Offerings

Combine Course Type + Course to create an offering

Edit offerings

Delete offerings

Prevent duplicate offerings

Filter offerings by course type

✅ Student Registrations

Register a student for a specific offering

Student email is optional

See full list of registrations

Filter registrations by offering

Validation for student name & email

✅ LocalStorage Persistence

All data is saved in the browser and survives page refresh.

✅ Toast Notifications

Added

Updated

Deleted

✅ Confirm Dialog

Delete confirmation popup for safety.

✅ Clean UI

Fully designed using custom CSS (no external UI frameworks).

🛠️ Tech Stack

React 19

TypeScript

Redux Toolkit

Vite

React Hook Form

Yup Validation

LocalStorage

CSS (custom styles)

📂 Project Structure
src/
 ├─ app/
 │   ├─ store.ts
 │   └─ localStorage.ts
 ├─ components/
 │   ├─ Layout.tsx
 │   ├─ EntitiesList.tsx
 │   └─ ConfirmDialog.tsx
 ├─ features/
 │   ├─ courseTypes/
 │   ├─ courses/
 │   ├─ offerings/
 │   └─ registrations/
 ├─ pages/
 ├─ hooks.ts
 ├─ types.ts
 ├─ App.tsx
 ├─ main.tsx
 └─ index.css

▶️ How to Run Locally
1️⃣ Clone the repo
git clone https://github.com/Khasim124/student-registration-system.git
cd student-registration-system

2️⃣ Install dependencies
npm install

3️⃣ Start development server
npm run dev


Runs at:
👉 http://localhost:5173/

4️⃣ Build for production
npm run build

📌 Deployment

Deployed using Vercel with:

Build command: npm run build

Output directory: dist/

👨‍💻 Developer

Peda Khasim Shaik
📧 Email: peddakhasimshaik162@gmail.com

🔗 GitHub: https://github.com/Khasim124

🔗 LinkedIn: https://www.linkedin.com/in/peda-khasim-shaik-b6040b257