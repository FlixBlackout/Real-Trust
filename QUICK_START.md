# 🚀 Quick Start Guide - Real Trust Application

Get the Real Trust application up and running in minutes!

## ⚡ Prerequisites Check

Before starting, ensure you have:
- [ ] Java 17 or higher installed (`java -version`)
- [ ] Maven installed (`mvn -version`)
- [ ] MongoDB installed and running
- [ ] A web browser (Chrome, Firefox, Edge, etc.)

## 📋 Step-by-Step Setup

### Step 1: Start MongoDB (2 minutes)

**Windows:**
```cmd
net start MongoDB
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

**Verify MongoDB is running:**
```bash
# Try connecting to MongoDB
mongo
# If successful, you'll see MongoDB shell. Type 'exit' to quit.
```

### Step 2: Start the Backend (3 minutes)

1. Open a terminal/command prompt
2. Navigate to backend directory:
   ```bash
   cd "d:\Real Trust (Assignment Task)\backend"
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

4. Wait for the message: **"Started RealTrustApplication in X seconds"**

5. Test backend is running:
   - Open browser to: http://localhost:8080/api/projects
   - You should see: `[]` (empty array)

✅ Backend is now running on http://localhost:8080

### Step 3: Start the Frontend (1 minute)

**Option A: Using VS Code (Recommended)**

1. Open `d:\Real Trust (Assignment Task)\frontend` folder in VS Code
2. Install "Live Server" extension (if not installed)
3. Right-click on `index.html`
4. Select "Open with Live Server"

**Option B: Using Python**

```bash
cd "d:\Real Trust (Assignment Task)\frontend"
python -m http.server 5500
```

**Option C: Using Node.js**

```bash
cd "d:\Real Trust (Assignment Task)\frontend"
npx http-server -p 5500
```

✅ Frontend is now running on http://localhost:5500

## 🎯 Access the Application

### Landing Page
👉 **URL**: http://localhost:5500/index.html

Test the landing page:
1. Contact form should appear on the right side
2. Newsletter subscription at the bottom
3. Projects and Clients sections (will be empty initially)

### Admin Panel
👉 **URL**: http://localhost:5500/admin.html

Test the admin panel:
1. Dashboard shows statistics (all zeros initially)
2. Navigate through sidebar: Projects, Clients, Contact Forms, Newsletter

## 📊 Quick Functionality Test

### Test 1: Add a Project (Admin)

1. Go to http://localhost:5500/admin.html
2. Click "Projects" in sidebar
3. Fill in the form:
   - Project Name: "Test Project"
   - Description: "This is a test project"
   - Upload any image
4. Click "Add Project"
5. You should see success message
6. Project appears in the table below

### Test 2: View Project (Landing Page)

1. Go to http://localhost:5500/index.html
2. Scroll to "Our Projects" section
3. You should see your test project displayed

### Test 3: Submit Contact Form

1. On landing page, scroll to top
2. Fill in the contact form on the right:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Mobile: "1234567890"
   - City: "New York"
3. Click "Get Quick Quote"
4. You should see success message

### Test 4: View Contact Form (Admin)

1. Go to admin panel
2. Click "Contact Forms" in sidebar
3. You should see John Doe's submission

### Test 5: Newsletter Subscription

1. On landing page, scroll to bottom
2. Enter email in newsletter field
3. Click "Subscribe"
4. Check admin panel → Newsletter section

## 🔧 Troubleshooting

### Problem: Backend won't start

**Error**: "Port 8080 already in use"
- **Solution**: Another application is using port 8080
- **Fix**: 
  1. Stop other application, or
  2. Change port in `backend/src/main/resources/application.properties`:
     ```properties
     server.port=8081
     ```
  3. Update frontend files (`app.js` and `admin.js`):
     ```javascript
     const API_BASE_URL = 'http://localhost:8081/api';
     ```

**Error**: "Failed to connect to MongoDB"
- **Solution**: MongoDB is not running
- **Fix**: Start MongoDB (see Step 1)

### Problem: Frontend can't connect to backend

**Error**: CORS or Network errors in console
- **Check**: Is backend running? Visit http://localhost:8080/api/projects
- **Check**: Is API_BASE_URL correct in `app.js` and `admin.js`?

### Problem: Images not displaying

**Error**: 404 errors for images
- **Check**: Backend is serving files from `/uploads/**`
- **Check**: Images were successfully uploaded to `backend/uploads/` folder
- **Fix**: Ensure uploads directory exists and has proper permissions

### Problem: Live Server not working

**Solution**: Use alternative method
- Try Python: `python -m http.server 5500`
- Try npx: `npx http-server -p 5500`
- Try opening `index.html` directly (may have CORS issues)

## 📱 Testing on Mobile/Network

Want to test on your phone or another device?

1. Find your computer's IP address:
   ```bash
   # Windows
   ipconfig
   
   # Linux/Mac
   ifconfig
   ```

2. Update frontend configuration:
   ```javascript
   // In app.js and admin.js
   const API_BASE_URL = 'http://YOUR_IP:8080/api';
   ```

3. Access from mobile:
   - Landing Page: `http://YOUR_IP:5500/index.html`
   - Admin Panel: `http://YOUR_IP:5500/admin.html`

## 🎓 Next Steps

Once everything is running:

1. **Explore Admin Panel**:
   - Add 5-6 projects with images
   - Add 5-6 client testimonials
   - Check dashboard statistics

2. **Test Landing Page**:
   - Verify all projects display
   - Verify all testimonials display
   - Submit multiple contact forms
   - Subscribe to newsletter

3. **Prepare for Deployment**:
   - Read `README.md` for deployment instructions
   - Consider MongoDB Atlas for production database
   - Deploy backend to Heroku/AWS
   - Deploy frontend to Netlify/Vercel

## 📞 Need Help?

Check these resources:
- `README.md` - Complete documentation
- `PROJECT_SUMMARY.md` - Feature overview
- Browser Console (F12) - Check for errors
- Backend logs in terminal

## ✅ Success Checklist

You know it's working when:
- [ ] Backend shows "Started RealTrustApplication" message
- [ ] Frontend opens in browser
- [ ] Can add projects in admin panel
- [ ] Projects appear on landing page
- [ ] Can submit contact forms
- [ ] Forms appear in admin panel
- [ ] Newsletter subscription works

---

**🎉 Congratulations!** Your Real Trust application is now running successfully!

**Time to complete**: 5-10 minutes
**Next**: Start adding your real projects and client testimonials!
