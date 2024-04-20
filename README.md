
mediumSv

This project is a content platform that utilizes blockchain technology to ensure the authenticity and ownership of articles, blogs, research papers, and podcasts. It provides a secure and transparent environment where authors have full control and rights over their content.

Unique Selling Proposition (USP)
The uniqueness of this product lies in its utilization of blockchain technology. Every piece of content published on the platform is stored on the blockchain, ensuring that the author's rights are reserved. This ensures the authenticity and ownership of the content, as well as provides a transparent and immutable record of creative works.

Features
1. Content Types
Blog: Platform allows users to publish blog posts on various topics.
Article: Users can publish research articles on the platform.
Research: Research papers can be shared and accessed securely.
Podcast: Podcasts can be uploaded and shared with the audience.
2. Server Architecture
Blockchain Server: Contains stateful smart contracts and necessary APIs. Running on port 5000, it facilitates various operations including publishing articles (/mint), liking content (/like), and sending critical data (/senddata).
Backend Server: Communicates with the blockchain server for user authentication. Running on port 8000, it ensures secure interactions between users and the blockchain.
Client: Frontend interface of the project, providing users with access to published content and interaction features.
3. Starting the Application
To start the blockchain:

bash
Copy code
cd blockchainserver
npm i
npm run compile
npx ts-node server.ts
To start the backend server:

bash
Copy code
cd server
npm i
npm start
To start the client:

bash
Copy code
cd client 
npm i
npm run start
4. Wallet and Authentication
The project utilizes Neucron wallet for paying transaction fees and user authentication.

5. Testing Credentials
For testing purposes, use the following credentials:

Email: ss363757@gmail.com
Password: Shubham123
Note:
Ensure that MongoDB shell is running, as it stores side information and user data.

Contributing
Contributions are welcome! Feel free to open issues and pull requests to improve the project.

License
This project is licensed under the MIT License.
