Rentify App- Where Renting Meets Simplicity

Overview:

Rentify is a web application developed to help property owners find the right tenants and tenants to find the right homes based on their requirements. As the world recovers from the pandemic and people return to their routines, the demand for real estate has surged. Rentify aims to bridge the gap in the rental market by providing a platform that simplifies the process of renting properties.

Challenge Overview:

The development of Rentify was divided into three parts:

1. Basic Application Development
2. Adding Advanced features
3. Deployment of App 

Tech Stack used for implementing the project:

1.Front-end: React.js
2.Back-end*: Node.js with Express.js
3.Database*: MongoDB
4.Authentication: JWT (JSON Web Tokens)


Features :

Account Creation & Login
 
  * Users can register as either a seller or a buyer by providing required data.

  * Seller Login :
    
      ---> Post Property : Sellers can post their properties by providing essential details such as location, area, number of bedrooms, bathrooms etc.

      ---> View Property : Sellers can view the properties they have posted.

      ---> Update/Delete Property: Sellers can update or delete their listed properties.

  * Buyer Login :

      ---> View Property : Buyers can view all posted rental properties without login.

      ---> Apply Filters: Buyers can apply filters based on property details like location, area, number of bedrooms, etc.

      ---> Express Interest : Buyers can click the "I'm Interested" button on a property widget to view the seller's details.



Pagination and Form Validation:

  ---> Implemented pagination to handle large lists of properties.
  ---> Proper form validation to ensure data integrity.

Mandate Login for Buyer Actions:

 ---> Buyers must log in to view seller details.
 ---> Unauthorized users attempting to access seller information are redirected to the login screen.

Like Button:

 ---> Added a Like button to each property.
 ---> Tracked the like count live.

Email Notifications:

 ---> When a buyer clicks the "I'm Interested" button:
      - The buyer receives an email with the seller's contact details.
      - The seller receives an email with the interested buyer's details.

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB

### Steps
1. Clone the Repository
    bash
    git clone https://github.com/yourusername/rentify.git
    cd rentify
    

2. Install Dependencies
    - For the server:
        bash
        cd server
        npm install
        
    - For the client:
        bash
        cd client
        npm install
        

3. Environment Variables
    - Create a .env file in the server directory and add the following variables:
        
        MONGO_URL=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        

4. Run the Application
    - Start the server:
        bash
        cd server
        npm start
        
    - Start the client:
        bash
        cd client
        npm start
        

5. Access the Application
    Open your browser and navigate to http://localhost:3000.


## Conclusion
Rentify is a robust platform that addresses the challenges of finding rental properties in a high-demand market. By utilizing the MERN stack, the application ensures a seamless and efficient experience for both property owners and tenants.