<A> Start server
step-1 : open folder.
step-2 : enter mongoDB connection url in .env file in server folder.
step-3 : run "npm i" for install all dependency.
step-4 : run "npm start" for start the server

--------------

three routes are protected
1> add_folder
2> add_file
3> all_file

test this route from postman

1> create a user ( http://localhost/3000/register ) meathod - POST and pass the json data in body like
    {
    "name":"abhishek",
    "email":"abhi@gmail",
    "password":"1234"
}

2> you get a token 

for use protected route 

set this token in request header 

as x-access-token : "token_recived_when_register_or_signup"

