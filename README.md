<h1 align="center">🌟 Star Stream Blog Platform</h1>
<h3 align="center">A Full-Stack Blogging Ecosystem with Role-Based Access</h3>

<p align="center">Empowering admins to create content and users to discover curated blogs — all wrapped in a secure, responsive interface with JWT authentication and Cloudinary media magic! ✨</p>

---

### 🔐 **Login & Authorization Flow**  
**Admins** (Content Creators):  
- Special access to dashboard 🛠️  
- Can create/edit/delete blogs 📝🗑️  
- Manage blog categories 🏷️  

**Users** (Readers):  
- Browse all blogs 📚  
- Filter by categories 🔍  
- No content modification rights 🚫  

*(Both roles share the same login page but see different UIs post-auth!)*  

---

### 🖼️ **Project Showcase**  

<h2 align="left">1. Dashboard - Trending & New Blogs</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image1.png" alt="Star Stream Dashboard" width="600" />
</p>
<p align="left">
The admin dashboard displays <strong>trending blogs</strong> (based on views) and <strong>newly published content</strong> in a responsive grid. Admins get quick actions like "Edit" or "Delete" on their posts. Built with React state management for real-time updates! 🔄
</p>

<h2 align="left">2. NIE Section & Popular Creators</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image2.png" alt="NIE Blogs Section" width="600" />
</p>
<p align="left">
Exclusive <strong>NIE Mysuru category</strong> for college-related content! Below it, meet the <strong>top creators</strong> with their profiles — data fetched from MongoDB and styled with Tailwind CSS cards. 🎓✨
</p>

<h2 align="left">3. Contact Form (Web3Forms)</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image3.png" alt="Contact Form" width="600" />
</p>
<p align="left">
Users can send queries that land directly in my inbox! Integrated with <strong>Web3Forms API</strong> for spam-free submissions. Form validation ensures no empty messages slip through. 📩✅
</p>

<h2 align="left">4. Create Blog Interface</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image4.png" alt="Blog Creation" width="600" />
</p>
<p align="left">
Admins craft blogs here! Features:  
✅ <strong>Category dropdown</strong> (Tech, NIE, etc.)  
✅ <strong>Rich text editor</strong> for content  
✅ <strong>Image upload</strong> via Cloudinary  
✅ <strong>Live preview</strong> before publishing 🎨
</p>

<h2 align="left">5. Login Page</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image5.png" alt="Login Page" width="600" />
</p>
<p align="left">
The gateway to Star Stream! Includes:  
🔒 <strong>JWT authentication</strong>  
📱 <strong>Mobile-responsive design</strong>  
⚠️ <strong>Error handling</strong> for invalid credentials  
Built with React hooks and CSS transitions for smooth interactions. 🚪🔑
</p>

---

### 🛠️ **Tech Stack**  
**Frontend:** React, Vite, Tailwind CSS, Axios, Context API  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JWT, Bcrypt, HTTP-only cookies  
**Services:** Cloudinary (Image Storage), Web3Forms (Contact API)  
**Tools:** Postman (API Testing), ESLint (Code Quality)  

---

<p align="center">
✨ <strong>Deployed and fully functional!</strong> Dive into the code or try the live demo below. Contributions welcome! 🌍  
</p>
