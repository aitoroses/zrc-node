zr-node
=============

Node.js Application for ZRC

#MODULES

- api
	- mongodb
		- Database connection
		- User model (bcrypt)
	- controllers
		- auth: Authorization API module
		- user: user API module
- config
	- Express configuration
	- Passport configuration


#API ROUTES

- ###AUTHORIZATION

	- GET __/login__
		- def: Login via get verb
		- params: username, password
	- POST __/login__
		- def: Login via post verb
		- params: username, password
	- GET __/logout__
		- def: Logout action
	- GET __/account__
		- def: Needs auth to access
		
- ###RESTful resources
	- Users
	
		- GET __/API/user/get__
			- def: Get JSON with user count and User array
		- POST __/API/user__
			- def: Create a user on the database 
			- params: username, password
		

		
