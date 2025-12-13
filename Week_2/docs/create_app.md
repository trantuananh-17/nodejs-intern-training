# Đổi version yarn

- Vào cmd admin:
- corepack enable
- corepack prepare yarn@4.9.1 --activate

# Chạy lệnh:

- avada app:create <name-app>

- yarn install

# Tạo firebase:

- chạy firebase login
- firebase use <firestore name>
- firebase deploy --only firestore

# Chạy

- set GOOGLE_APPLICATION_CREDENTIALS=serviceAccount.json && npm run dev
