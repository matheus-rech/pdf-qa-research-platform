# 🚀 Deployment Guide

## Recommended: **Dual Deployment Strategy**

Deploy frontend and backend separately for optimal performance and scaling.

---

## 🎯 **Option 1: Vercel + Railway (Recommended)**

### **Step 1: Deploy Backend to Railway**

1. **Create Railway Account**: https://railway.app
2. **Connect GitHub**: Link your repository
3. **Create New Project**: 
   ```bash
   railway login
   railway init
   railway up
   ```
4. **Set Environment Variables**:
   ```bash
   railway variables set ANTHROPIC_API_KEY=sk-ant-your-key-here
   railway variables set NODE_ENV=production
   ```
5. **Deploy**: 
   ```bash
   railway deploy
   ```

### **Step 2: Deploy Frontend to Vercel**

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```
2. **Update Backend URL** in `index.html`:
   ```javascript
   const API_BASE_URL = 'https://your-railway-app.railway.app/api';
   ```
3. **Deploy**:
   ```bash
   vercel --prod
   ```

**Result**: 
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-app.railway.app`

---

## 🎯 **Option 2: Netlify + Render**

### **Step 1: Deploy Backend to Render**

1. **Create Render Account**: https://render.com
2. **New Web Service**: Connect GitHub repo
3. **Settings**:
   - **Build Command**: `cd backend-claude && npm install`
   - **Start Command**: `cd backend-claude && node index.js`
   - **Environment**: Add `ANTHROPIC_API_KEY`

### **Step 2: Deploy Frontend to Netlify**

1. **Drag & Drop**: Upload files to https://app.netlify.com/drop
2. **Or CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=.
   ```

**Result**:
- Frontend: `https://your-app.netlify.app`
- Backend: `https://your-app.onrender.com`

---

## 🐳 **Option 3: Single Container (Railway/Render)**

Deploy the entire application as one container:

```bash
# Use docker-compose.production.yml
railway up --file docker-compose.production.yml
```

---

## ☁️ **Option 4: Cloud Providers**

### **AWS (Advanced)**
- **Frontend**: S3 + CloudFront
- **Backend**: ECS/Lambda
- **Database**: RDS (if needed)

### **Google Cloud (Advanced)**
- **Frontend**: Cloud Storage + CDN
- **Backend**: Cloud Run
- **Database**: Cloud SQL

### **Azure (Advanced)**
- **Frontend**: Static Web Apps
- **Backend**: Container Instances
- **Database**: Cosmos DB

---

## 🎯 **Recommended Setup Process**

### **1. Railway Backend (5 minutes)**
```bash
# 1. Fork/clone repository
git clone your-repo
cd pdf-qa-app

# 2. Deploy to Railway
railway login
railway init
railway up

# 3. Set environment variables
railway variables set ANTHROPIC_API_KEY=sk-ant-your-key
railway variables set NODE_ENV=production

# 4. Get deployment URL
railway status
```

### **2. Vercel Frontend (2 minutes)**
```bash
# 1. Update API URL in index.html
# Replace: https://your-backend-url.railway.app/api

# 2. Deploy to Vercel
vercel --prod

# 3. Set custom domain (optional)
vercel domains add your-domain.com
```

### **3. Custom Domain Setup**
```bash
# Point your domain to:
# Frontend: CNAME -> your-app.vercel.app
# API: CNAME -> your-app.railway.app
```

---

## 🔧 **Configuration Updates Needed**

### **For Production Deployment:**

1. **Update API URL** in `index.html`:
   ```javascript
   const API_BASE_URL = 'https://your-actual-backend-url.com/api';
   ```

2. **Set CORS Origins** in `backend-claude/index.js`:
   ```javascript
   app.use(cors({
     origin: ['https://your-frontend-domain.com'],
     credentials: true
   }));
   ```

3. **Environment Variables**:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   NODE_ENV=production
   PORT=5002
   ```

---

## 📊 **Cost Comparison**

| Platform | Frontend | Backend | Total/Month |
|----------|----------|---------|-------------|
| **Vercel + Railway** | Free | $5-20 | $5-20 |
| **Netlify + Render** | Free | $7-25 | $7-25 |
| **GitHub Pages + Railway** | Free | $5-20 | $5-20 |
| **Full AWS** | $1-5 | $10-50 | $11-55 |

---

## 🎯 **Quick Deploy Commands**

### **Railway (Backend)**
```bash
railway up
railway variables set ANTHROPIC_API_KEY=your-key
```

### **Vercel (Frontend)**  
```bash
vercel --prod
```

### **Netlify (Frontend)**
```bash
netlify deploy --prod --dir=.
```

### **Full Docker**
```bash
docker-compose -f docker-compose.production.yml up -d
```

---

## 🚀 **Go Live Checklist**

- [ ] Backend deployed with API key
- [ ] Frontend updated with backend URL
- [ ] CORS configured for production
- [ ] SSL certificates active
- [ ] Health checks passing
- [ ] Custom domain configured (optional)
- [ ] Analytics/monitoring setup (optional)

**Your Research Platform is ready to serve users worldwide! 🌍**