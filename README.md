This Express controller provides various endpoints for different functionalities. Below is a brief description of each endpoint and its functionality:

Endpoints

1. Home Route
   Endpoint: GET /
   Description: Returns a simple "hello world" message.
   Usage: curl https://townhall-ten.vercel.app/

2. Create OTP
   Endpoint: GET /create/otp
   Description: Generates a One-Time Password (OTP) using the otp.otpCreate() function.
   Usage: https://townhall-ten.vercel.app/create/otp

3. Create UUID
   Endpoint: GET /create/uuid
   Description: Generates a Universally Unique Identifier (UUID) using the uuid.generateUUID() function.
   Usage: https://townhall-ten.vercel.app/create/uuid

4. Sort String
   Endpoint: POST /sort/string
   Description: Sorts a string using the sort.write() function. Expects JSON payload with a data property.
   Usage: https://townhall-ten.vercel.app/sort/string

5. Store Data
   Endpoint: POST /store
   Description: Stores binary data in a file using the locker.createBinaryFile() function. Expects JSON payload with data and name properties.
   Usage: https://townhall-ten.vercel.app/store

6. Generate Random Data
   Endpoint: POST /random
   Description: Generates random data using the data.create() function. Expects JSON payload with length and type properties.
   Usage: https://townhall-ten.vercel.app/random

Installation and Setup

Clone the repository: git clone https://github.com/yourusername/your-repo.git

Install dependencies: npm install

Start the server: npm start

The server should now be running at http://localhost:your-port.
