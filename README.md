# ExploreLocal - Monorepo

This workspace contains two folders: `backend/` and `frontend/`.

Start backend:
```powershell
cd "d:\Full Stack project\backend"
cp .env.example .env
# edit .env
npm install
npm run dev
```

Start frontend:
```powershell
cd "d:\Full Stack project\frontend"
npm install
npm run dev
```

Next steps:
- Configure MongoDB and JWT secret
- Add Cloudinary credentials for image uploads
- Implement admin panel and more detailed frontend flows
