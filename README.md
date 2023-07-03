<p align="center">
  <img alt="Simmer Eats" src="https://github.com/raquel-f/simmer-eats-api/blob/master/docs/logo-v2.png?raw=true" width="700" /> 
</p>
<h1 align="center">
  Simmer Eats API
</h1>
<p align="center">
  REST API that gets information from MongoDB cloud storage for e-commerce web applications. It is used in the <a href="https://github.com/raquel-f/simmer-eats">Simmer Eats</a> project. 
  It currently offers 3 different authorization levels: Basic Authentication, Business Authentication, and Admin Authentication.
</p>
<p align="center">
  <a href="https://simmer-eats-api.vercel.app/">
    <img alt="GitHub deployments" src="https://img.shields.io/github/deployments/raquel-f/simmer-eats-api/Production?logo=vercel&logoColor=white&label=Vercel&link=https%3A%2F%2Fsimmer-eats-api.vercel.app%2F">
  </a>
</p>

## 💻 Technology Stack

<div>
  <img alt="Static Badge" src="https://img.shields.io/badge/JavaScript-0D1117?logo=javascript">
  <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-0D1117?logo=nodedotjs">
  <img alt="Static Badge" src="https://img.shields.io/badge/Express-0D1117?logo=express">
  <img alt="Static Badge" src="https://img.shields.io/badge/MongoDB-0D1117?logo=mongodb">
  <img alt="Static Badge" src="https://img.shields.io/badge/Mongoose-0D1117?logo=mongoose">
  <img alt="Static Badge" src="https://img.shields.io/badge/Stripe-0D1117?logo=stripe">
  <img alt="Static Badge" src="https://img.shields.io/badge/JSON Web Tokens-0D1117?logo=jsonwebtokens">
  <img alt="Static Badge" src="https://img.shields.io/badge/Nodemon-0D1117?logo=nodemon">
  <img alt="Static Badge" src="https://img.shields.io/badge/Vercel-0D1117?logo=vercel">
  <img alt="Static Badge" src="https://img.shields.io/badge/bcryptjs-0D1117?logo=npm">
  <img alt="Static Badge" src="https://img.shields.io/badge/body--parser-0D1117?logo=npm">
  <img alt="Static Badge" src="https://img.shields.io/badge/cors-0D1117?logo=npm">
  <img alt="Static Badge" src="https://img.shields.io/badge/multer-0D1117?logo=npm">
</div>

## 🚀 Quick start

1.  **Local Development Mode**

```bash
# clone the repository
git clone https://github.com/raquel-f/simmer-eats-API.git

# install dependencies
npm install
```

2. **Setup Environment Variables**

```bash
# Mongo DB username
DB_USER=...

# Mongo DB password
DB_PASSWORD=...

# JSON Web Token Secret
JWT_SECRET=...

# Stripe Secret Key for payment integration
STRIPE_SECRET=...

# Stripe Secret Key for webhook events
STRIPE_WEBHOOK_SECRET=...
```

3. **Run the project**

```bash
# run the project
npm start
```

4.  **Usage**

    Connect to the API using Postman on port 5000.


5.  **Open the source code**

    The project auto-updates as you edit the files thanks to Nodemon. Don't forget to save the changes!

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see in this project.

    .
    ├── constants
    ├── controllers
    ├── docs
    ├── middleware
    ├── models
    ├── node_modules
    ├── routes
    ├── uploads
    ├── .env
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    ├── README.md
    └── vercel.json


## 🔌 API Endpoints (Most Used)
| HTTP Method | Authentication | Endpoint | Action |
| :---: | --- |--- | --- |
| `GET` | None | /food | Retrieve all food items |
| `GET` | None | /food/:id | Retrieve details of a single food item |
| `GET` | Admin | /user/:id | Retrieve details of a single user account |
| `GET` | Basic | /user/me | Retrieve details of the authenticated user's account |
| `POST` | None | /user/signup | Create a new user account |
| `POST` | None | /user/signin | Login with an existing user account |
| `PATCH` | Basic | /user/me | Update details of the authenticated user's account |
| `DELETE` | Basic | /user/me | Delete the authenticated user's account |
| `GET` | None | /image/:id | Retrieve details of a single image |
| `POST` | Business | /image | Create a new image |
| `GET` | Basic | /cart/me | Retrieve details of the authenticated user's shopping cart |
| `POST` | Basic | /stripe/createCheckout | Create a new Stripe payment checkout session |
| `POST` | None | /webhook | Handle Stripe webhook events |
| `GET` | Basic | /delivery/me | Retrieve details of the authenticated user's deliveries |
