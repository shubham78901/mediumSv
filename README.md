
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












impt blockchain endpoint:
API Endpoints
1. Minting Articles
Endpoint: POST /custom/mint

Description
Minting articles endpoint is used to publish articles on the blockchain through a smart contract.

Request
Method: POST
Content-Type: application/json
Body Parameters:
Provide article data in the request body.
Response
Status Code: 200 OK on success.
Response Body:
JSON object confirming successful minting of the article.
2. Sending Files
Endpoint: POST /custom/sendfile

Description
Sending files endpoint is used to upload files to the blockchain.

Request
Method: POST
Content-Type: multipart/form-data
Body Parameters:
File to be uploaded.
Response
Status Code: 200 OK on success.
Response Body:
JSON object confirming successful file upload.
3. Getting Data
Endpoint: GET /custom/data

Description
Getting data endpoint is used to retrieve data from the blockchain.

Request
Method: GET
Response
Status Code: 200 OK on success.
Response Body:
JSON object containing requested data.
4. Liking Content
Endpoint: POST /custom/like

Description
Liking content endpoint is used to donate money to the author of the content.

Request
Method: POST
Content-Type: application/json
Body Parameters:
Provide necessary data for liking the content in the request body.
Response
Status Code: 200 OK on success.
Response Body:
JSON object confirming successful liking of the content.
5. Health Check
Endpoint: GET /health

Description
Health check endpoint is used to verify the status of the server.

Request
Method: GET
Response
Status Code: 200 OK if the server is running.
Response Body:
JSON object with status information.

Contributing
Contributions are welcome! Feel free to open issues and pull requests to improve the project.

License
This project is licensed under the MIT License.



![Uploading image.png…]()
![image](https://github.com/shubham78901/mediumSv/assets/70124011/9b3e8c09-a03f-4770-9826-4d5eecebdffd)
![image](https://github.com/shubham78901/mediumSv/assets/70124011/eb82d586-39c3-4412-a1bb-ad53daae3d7e)

![image](https://github.com/shubham78901/mediumSv/assets/70124011/256282e3-e486-4469-83a3-1b157e02c09f)
![image](https://github.com/shubham78901/mediumSv/assets/70124011/a1d8bab8-8f90-4ba9-8df1-b61c97780ab0)



![image](https://github.com/shubham78901/mediumSv/assets/70124011/21974d62-40a3-44a3-9ec9-ffc5f81847b8)





