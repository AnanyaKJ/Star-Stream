<h1 align="center">🌟 Star Stream Blog Platform</h1>
<h3 align="center">A Full-Stack Blogging Ecosystem with Role-Based Access</h3>

<p align="center">Empowering admins to create content and users to discover curated blogs — all wrapped in a secure, responsive interface with JWT authentication and Cloudinary media magic! ✨</p>

---

### 🔐 **Login & Authorization Flow**  
**Admins (Content Creators):**  
- **Dashboard Access:** Personalized workspace with analytics and quick actions.  
- **Content Control:** Create, edit, or delete blogs with real-time MongoDB updates.  
- **Category Management:** Organize content into dynamic categories (e.g., Tech, NIE Mysuru).  
- **Media Handling:** Upload high-resolution images via Cloudinary with automatic optimization.  

**Users (Readers):**  
- **Personalized Feed:** Browse trending, recent, and category-specific blogs.  
- **Interactive UI:** Like/save favorites (future scope) with responsive card layouts.  
- **Zero Clutter:** Clean reading mode with no admin controls visible.  

*(Shared login page dynamically redirects users/admins based on JWT role tokens!)*  

---

### 🖼️ **Project Showcase**  

<h2 align="left">1. Dashboard - Trending & New Blogs</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image1.png" alt="Star Stream Dashboard" width="600" />
</p>
<p align="left">
The <strong>admin dashboard</strong> combines functionality and aesthetics:  
- **Trending Blogs Section:** Algorithmically surfaces top-performing content based on engagement metrics.  
- **Newly Published Grid:** Auto-refreshes via React state management when admins add/update blogs.  
- **Quick-Action Toolbar:** Edit/Delete buttons trigger modal dialogs with confirmation steps to prevent accidental deletions.  
- **Responsive Design:** Adapts from desktop grids to mobile carousels using Tailwind’s breakpoints.  
</p>

<h2 align="left">2. NIE Section & Popular Creators</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image2.png" alt="NIE Blogs Section" width="600" />
</p>
<p align="left">
A tribute to <strong>NIE Mysuru</strong> with exclusive features:  
- **Dedicated Category:** Blogs tagged "NIE" auto-populate here, fetched via MongoDB aggregation pipelines.  
- **Creator Spotlight:** Displays top 3 admins by blog count, with:  
  - Profile photos (Cloudinary URLs)  
  - Social links (future scope)  
  - Stats like total posts and avg. reads  
- **SEO Optimized:** Semantic HTML tags and lazy loading for images.  
</p>

<h2 align="left">3. Contact Form (Web3Forms)</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image3.png" alt="Contact Form" width="600" />
</p>
<p align="left">
A fully functional <strong>contact system</strong> with:  
- **Web3Forms Integration:** Messages routed to my email without exposing my address.  
- **Client-Side Validation:** Checks for:  
  - Valid email formats  
  - Minimum message length  
  - Captcha integration (future)  
- **UX Feedback:** Success/error toasts appear after submission.  
</p>

<h2 align="left">4. Create Blog Interface</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image4.png" alt="Blog Creation" width="600" />
</p>
<p align="left">
The <strong>blog editor</strong> is a mini-CMS with:  
- **Category Selection:** Dropdown pulls live from MongoDB.  
- **Rich Text Editor:** Supports headings, lists, and inline styling.  
- **Image Uploader:** Drag-and-drop Cloudinary widget with:  
  - Auto-cropping  
  - Format conversion (WebP optimization)  
  - CDN delivery for fast loads  
- **Draft Mode:** Save unfinished blogs (future scope).  
</p>

<h2 align="left">5. Login Page</h2>
<p align="center">
<img src="https://github.com/AnanyaKJ/Star-Stream/blob/main/image5.png" alt="Login Page" width="600" />
</p>
<p align="left">
The <strong>authentication hub</strong> features:  
- **JWT Security:** Tokens stored in HTTP-only cookies to block XSS attacks.  
- **Role Detection:** Redirects admins to dashboard, users to blog feed.  
- **Error Handling:** Specific messages for:  
  - Invalid credentials  
  - Network issues  
  - Account locks (future)  
- **Password Recovery:** Link to reset flow (future scope).  
</p>

---

### 🛠️ **Tech Stack Deep Dive**  
**Frontend:**  
- **React + Vite:** Blazing-fast component rendering.  
- **Tailwind CSS:** Utility-first styling with custom animations.  
- **Axios:** Handles 200/400/500 responses with interceptors.  
- **Context API:** Manages global state (auth, blogs).  

**Backend:**  
- **Node.js/Express:** RESTful APIs with rate limiting.  
- **MongoDB:** Flexible schema for blogs/users.  
- **Mongoose:** Schema validations and middleware hooks.  

**Auth:**  
- **JWT:** Stateless sessions with 30-day expiry.  
- **Bcrypt:** Password hashing (10 rounds).  
- **Cookie-Parser:** Secure token storage.  

**Services:**  
- **Cloudinary:** Image transformations + CDN.  
- **Web3Forms:** Zero-backend contact forms.  

**DevOps:**  
- **Postman:** Automated API test suites.  
- **ESLint:** Code consistency (Airbnb rules).  

---

<p align="center">
✨ <strong>Explore the live demo or contribute to the codebase!</strong> Let’s make Star Stream even brighter. 🚀  
</p>
