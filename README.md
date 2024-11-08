<h1 align="center"> Ciphershare </h1>
<p align="center">
  <img src="./frontend/public/assets/project-Ciphershare.jpg" alt="Ciphershare">
</p>

CipherShare
CipherShare is a secure, user-friendly file-sharing web app built to streamline encrypted file sharing between users, with robust cloud storage integration for enhanced scalability. Developed using modern technologies like Vite, Tailwind CSS, TypeScript, and Radix UI, this app ensures that every upload and download is handled safely and seamlessly.

🚀 Technologies Used
Frontend: Vite, Tailwind CSS, TypeScript, Radix UI Components
Backend: Express.js
Cloud Storage: Azure Blob Storage
Authentication: JWT (JSON Web Tokens)
🔑 Features
Secure File Upload/Download: Files are encrypted before being uploaded to Azure Blob Storage, ensuring end-to-end security.
Authentication: JWT authentication for secure access and file sharing.
Easy File Management: Upload and download files directly from the app interface with ease.
Cross-Platform Support: Fully responsive for both desktop and mobile browsers.
📁 File Structure
lua
Copy code
├── controllers/
│   └── fileController.js
├── routes/
│   └── fileRoutes.js
├── config/
│   └── azureBlobConfig.js
├── app.js
└── package.json
🛠️ Setup & Installation
1. Clone the repository
bash
Copy code
git clone https://github.com/yourusername/ciphershare.git
cd ciphershare
2. Install dependencies
bash
Copy code
npm install
3. Set up environment variables
Create a .env file and add the following environment variables:

makefile
Copy code
AZURE_STORAGE_ACCOUNT_NAME=your_account_name
AZURE_STORAGE_ACCOUNT_KEY=your_account_key
JWT_SECRET=your_jwt_secret
4. Run the app
bash
Copy code
npm run dev
Your app will be running on http://localhost:5173.

⚡ Contributing
Feel free to fork the repository, submit issues, and make pull requests. We welcome any contributions that can improve the app!

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
