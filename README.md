# General Assembly Project 4 - Console Logs

### Table of Contents 

- [Code Installation](#code-installation)
- [Build-time](#build-time)
- [Brief](#brief)
- [Technologies Used](#technologies-used)
- [Development Process](#development-process)
    - [Planning & Wireframing](#planning-and-wireframing)
    - [Back-end](#back-end)
        - [Apps](#apps)
        - [Models](#models)
        - [Serializers](#serializers)
        - [Views](#views)
        - [URLs](#urls)
        - [Authentication](#authentication)
        - [Media View Counter](#media-view-counter)
    - [Front-end](#front-end)
        - [Authentication (Front-end)](#authentication-on-the-front-end)
        - [Game Detail](#game-detail)
        - [Media Upload](#media-upload)
        - [Home Page](#home-page)
- [Challenges](#challenges)
- [Wins](#wins)
- [Bugs](#bugs)
- [Key Learnings](#key-learnings)
- [Future Improvements](#future-improvements)

# Console Logs
Console Logs is a social media site where users can upload, browse and comment on their favorite video game clips. Gaming has been a central passion of mine as long as I can remember, and throughout this time sites like Twitch.tv and Youtube have been influential in inspiring others to join in on this passion - so we wanted to emulate them.

A full-stack app, Console Logs was built with Django REST Framework and React by a team of three: Thor Refoy, Peter Bid and Ali Ali. 

![homepage](https://user-images.githubusercontent.com/87788714/161673511-1cc87f93-f88b-45b3-889e-83475df7c8ff.gif)

![gamedetail](https://user-images.githubusercontent.com/87788714/161673522-d3fcb64f-56c0-436b-9ee3-13b2426f2823.gif)

![mediadetail](https://user-images.githubusercontent.com/87788714/161673699-5515b241-ea8d-4c5c-a1ac-5d9e8ca0d6a5.gif)


### Code Installation 

* Clone or download the repo
* Install the back-end dependencies: 
    run **pipenv** in the terminal 
* Enter the project shell: 
    run **pipenv shell**
* Make Migrations:
    **python manage.py makemigrations**
* Migrate:
    **python manage.py migrate**
* Load Seed data for Genres:
    **python manage.py loaddata genres/seeds.json**
* Load Seed data for Games:
    **python manage.py loaddata games/seeds.json**
*  Load Seed data for Users:
    **python manage.py loaddata jwt_auth/seeds.json**
* Load Seed data for Medias:
    **python manage.py loaddata medias/seeds.json**
* Load Seed data for Comments:
    **python manage.py loaddata comments/seeds.json**
* Start the back-end server: 
    **python manage.py runserver**
* Move into the front-end directory: 
    run **cd client**
* Install the front-end dependencies: 
    run **yarn** 
* Start the front-end server: 
    run **yarn start**

**All users are welcome to use the login details below:**

Email: ali4@email.com | Password: sei61-pass

### Build-time
*8 days*

### Brief 
Design and build a full-stack CRUD (Create, Read, Update, Delete) application using Python, Django and PostgreSQL. 

### Technologies Used

#### Front-end
* React
* Cloudinary
* React Router DOM
* Axios
* SASS
* React Bootstrap 
* CSS3

#### Back-end
* Python
* Django
* Django REST Framework 
* PostgreSQL 
* PyJWT
* Axios
* Psycopg2

#### Development Tools
* VScode
* Git 
* GitHub
* Heroku
* Insomnia
* Figma
* Canva

## Development Process

### Planning and Wireframing

This was my final project at General Assembly and I wanted to make sure it would be both challenging and representative of my interests. After talking with Pete and Ali we realized we had a similar vision for project 4 so decided to team up.  

To aid in time and error handling we planned to code the backend together via VScode’s live sharing feature. Then we used FigJam to wireframe the apps we needed, their structure and relationships. 

<img width="1576" alt="Screen Shot 2022-03-31 at 3 02 23 AM" src="https://user-images.githubusercontent.com/87788714/161670899-b4530bc4-39eb-4e7a-81f4-00f6e13836af.png">


We decided to make genres its own app, although this was not necessary and we could have included it as a field on the game model we wanted to add complexity to our backend by having a many-to-many relationship. 

## Back-end 

We first created our file structure with a **project.py** folder at the root. We used **psycopg2** as our engine. 

![Screen Shot 2022-03-31 at 6 20 15 PM](https://user-images.githubusercontent.com/87788714/161670976-da3ffcb0-d937-4b4f-931c-63762ac99bd0.png)

### Apps

Our backend is comprised of 5 apps:

* The **genres app** has a **many-to-many** relationship with the games 
* The **games app** has a **many-to-many** relationship to genres and a **one-to-many** with medias 
* The **medias** app has a **one-to-many** relationship with games, comments and users  
* The **jwt_auth** app has a **one-to-many relationship** with medias and comments
* The **comments** app holds **one-to-many** relationships with medias and jwt_auth(Users)

Each app consists of 4 key files:

### Models

The **models.py** file is where a model is defined with its required/non-required fields. The foreign keys are a reference used to create relationships between models in different apps. Both the medias model and the comments model used two foreign keys. 

![Screen Shot 2022-03-31 at 7 59 35 PM](https://user-images.githubusercontent.com/87788714/161671043-32b996b1-1356-439a-8721-91d4c9e26623.png)


### Serializers

**Serializers.py** where we specify what seeded data objects are to be read by JavaScript on the front-end. In the medias app we used both a common serializer and a populated serializer to allow us to specify exactly what fields we wanted to render into JSON depending on the request.

![Screen Shot 2022-03-31 at 7 59 56 PM](https://user-images.githubusercontent.com/87788714/161671058-e88c6ae6-7b14-4315-8f1e-138dd39df0a4.png)
![Screen Shot 2022-03-31 at 8 00 06 PM](https://user-images.githubusercontent.com/87788714/161671069-1d154a06-e5da-4462-8914-5fed81d7d7fe.png)

### Views

A **views.py** file where we define functions that make various CRUD requests to our database. This is where we use the serializers, converting the data returned. 

![Screen Shot 2022-03-31 at 8 01 24 PM](https://user-images.githubusercontent.com/87788714/161671086-d353efc3-2543-42b5-a99c-dabeec50b2ab.png)

### URLs

Then a **urls.py** where we define the endpoints for each view. 

![Screen Shot 2022-03-31 at 8 00 38 PM](https://user-images.githubusercontent.com/87788714/161671106-33ecba19-f5f3-4f61-856d-d5af6d3d3e77.png)

### Authentication 

To add authentication we added a **authentication.py** file inside the jwt_auth app. Here we defined a function that extended **Django REST framework’s** ‘BasicAuthentication’ . This function takes the token from the authorization header then using **jsonwebtoken** decodes it using the **HS256** algorithm, then, finally finds the user by extracting the sub from the token. 

![Screen Shot 2022-04-01 at 12 42 35 AM](https://user-images.githubusercontent.com/87788714/161671145-aedaf2fd-3092-46ca-884c-4d0a8e377304.png)

With this function we were able to add authorization to any route that passes through a view in the views.py file.

The User serializer was slightly different to the other apps, it needed a method inside for validating the User. This involved checking the password and password confirmation match - we used Django’s **password_validation**. Then hashing the password and reattaching it to the request body. 

![Screen Shot 2022-04-01 at 12 55 30 AM](https://user-images.githubusercontent.com/87788714/161671171-c45d2730-98ed-4daf-b12f-37cabcfb97ff.png)

### Media View Counter

A crucial part of the project is being able to see how many ‘views’ each video clip has. I did this by returning to the medias model and giving it a ‘views’ - an ‘IntegerField’ that starts at 0. 

![Screen Shot 2022-04-01 at 1 05 18 AM](https://user-images.githubusercontent.com/87788714/161671200-c069f2d2-ec9e-499a-ae66-913b0f610034.png)

Next, to make it functional I made an adjustment to the individual media GET request. I declared a variable equal to the media object with its unique id. I then used dot notation to increment the value of the media views by +1 each time a GET request was sent to that individual media. 

![Screen Shot 2022-04-01 at 1 13 00 AM](https://user-images.githubusercontent.com/87788714/161671227-32f05b9c-ccbd-4105-aed9-6258f9758b7d.png)

The last step in the back-end was to seed our database, we did this via Django’s admin site.

![Screen Shot 2022-04-01 at 3 09 46 AM](https://user-images.githubusercontent.com/87788714/161671249-ab0d2b44-08e2-426d-9594-393e48a71f93.png)

## Front-end

We created the client-side React app inside the Django project folder, this made it easier for us to consolidate our work and easily reference the back-end when we needed to. 

We started the front-end by adding the routes we intended to use into the App.js - we used BrowserRouter, from **React Router DOM**
Once we had this done we divided up the responsibility of the front-end by components, with each person tackling different aspects of each. 

**My main tasks were:**
 * Get Authentication working on the front-end enabling register and login. 
* Create the image upload component using cloudinary to enable users to upload their own video clips. 
* Access the video clips stored in our back-end display them then arrange them in a grid. 
* Display the top 5 most viewed video clips on the homepage and style them. 

### Authentication on the Front-end

First I created an auth.js file that uses local storage to get the login token. It then checks if the token is in the correct format and returns the token as JSON. Finally it checks to see if the payload exists and compares it to the expiry date on the token. 

I also had to install and import the **Buffer**, I found that without this the user could login but wouldn’t stay logged-in as they navigated the site. 

![Screen Shot 2022-04-01 at 2 46 01 AM](https://user-images.githubusercontent.com/87788714/161671278-91d3992b-3d36-496d-bae1-4d061b6d61a8.png)

I then moved onto the Register and Login components. I created their forms using React Bootstrap - this saved time on styling. In both forms I defined a **useState** object to handle the form values and used handleChange functions that set the form data based on the event target value. 

![Screen Shot 2022-04-01 at 2 59 38 AM](https://user-images.githubusercontent.com/87788714/161671301-f2489951-f41e-40ad-a5fe-e53b1e8adc0a.png)
![Screen Shot 2022-04-01 at 3 04 52 AM](https://user-images.githubusercontent.com/87788714/161671315-db1f1158-2ad7-4c35-9f28-fe2170c1a4aa.png)

To submit the forms I used async functions that make POST requests to our database passing in the relevant endpoint and the form data. In the login component the token had to be set to local storage at this point. 

![Screen Shot 2022-04-01 at 3 07 59 AM](https://user-images.githubusercontent.com/87788714/161671333-d79f63d2-d419-493a-8d60-a8ac196413fd.png)

### Game Detail 

This page uses two **useEffect** functions that make async, axios GET requests to our database. One to return the individual game, this is done by calling **useParams** to return an object from the endpoint of the request, then populating a piece of state with the data returned. The second **useEffect** makes a GET request to the medias endpoint and populates a piece of state with the data returned. 

![Screen Shot 2022-04-01 at 4 02 57 PM](https://user-images.githubusercontent.com/87788714/161671355-cba7fb38-0ccf-4c5c-8a64-43924c78efab.png)

We then use the combined data in the return to map through and display both the Game itself and its related media. 

![Screen Shot 2022-04-01 at 4 08 53 PM](https://user-images.githubusercontent.com/87788714/161671375-a162b2e6-29cf-477f-b2ca-0c684e724c1f.png)

I had to use a video tag to display the clips, inside the tag I added a default size for every clip and gave them basic controls. 
    
![Screen Shot 2022-04-01 at 4 11 49 PM](https://user-images.githubusercontent.com/87788714/161671585-669ef4c3-ebee-49ef-b5a7-c74527471488.png)

<img width="1567" alt="Screen Shot 2022-04-01 at 4 19 23 PM" src="https://user-images.githubusercontent.com/87788714/161671600-4287e90f-c38c-4a6e-a4be-72a2d88b1622.png">

### Media Upload 


To enable users to upload their own clips we used cloudinary as a third party host. The first step in setting this up was to create a new component called **ImageUploadField**. Inside here I wrote an async function that takes the target file and the unique upload preset from cloudinary and makes a POST request to our API environment variable and sets a URL for the newly hosted media. Then in the return I placed a video tag to make sure the clip displays and called the upload function I defined above. 
    
![Screen Shot 2022-04-01 at 5 09 30 PM](https://user-images.githubusercontent.com/87788714/161671754-8eea5efc-e7f5-41fe-a023-8c823bedb41b.png)

![Screen Shot 2022-04-01 at 5 09 39 PM](https://user-images.githubusercontent.com/87788714/161671774-6bc5197a-3612-4b3b-9887-e10ad8fe1626.png)

    
I also had to create a companion component for the upload form. Here is where I defined the function that spreads in the form data and sets the URL which I passed in as a prop and used in the component above. 

![Screen Shot 2022-04-01 at 5 15 39 PM](https://user-images.githubusercontent.com/87788714/161671901-3c1f5fe1-19ef-43bd-9846-0207a98075f8.png)

To make the form I used a state object to set the form data and passed in the ImageUploadField as a prop. 

![Screen Shot 2022-04-01 at 5 17 13 PM](https://user-images.githubusercontent.com/87788714/161671923-ab4c69d4-b9a2-4b86-8773-6738301e8ec1.png)

To finish the upload I wrote the function that is called when the submit button is clicked. This function makes a POST requests to our medias table passing in the authorization token and the data from the form. 

![Screen Shot 2022-04-01 at 5 19 34 PM](https://user-images.githubusercontent.com/87788714/161671940-66da404b-60c8-401f-ac95-2b3aba5a8c23.png)

### Home Page 

To display the top 5 medias on the homepage I made another axios GET request to our database to return all the medias stored. I tried to write a function that sorted the media based on their views in ascending order but I couldn’t get it to work. By this point it was the last full day working on the project so I settled on just returning any 5 medias to the homepage - I will add the proper functionality in a V2 of the site.  

I finished off this task by using Flexbox to style the video clips. 

![Screen Shot 2022-04-01 at 4 30 59 PM](https://user-images.githubusercontent.com/87788714/161671959-d2e224a4-d480-425a-b785-e157e4ffd6fe.png)
<img width="1687" alt="Screen Shot 2022-04-01 at 4 32 13 PM" src="https://user-images.githubusercontent.com/87788714/161671972-27d44887-b2e3-476e-983d-a50eac4e9110.png">

## Challenges 
This was both our first time using Django and Django in a group. This added a layer of complexity when merging our branches via Git. We found ourselves spending a great deal of time having to delete/makemigrations and re-seed the database. However the benefit of this was that by the end of the project we all had a much more thorough understanding of Django’s best practices and quirks. 

Also when writing the back-end we initially struggled to grasp the nuance between common and populated serializers, and on which model we needed to add a foreign key when creating a complex many-to-many relationship like there is with our genres app. 

## Wins

#### Teamwork 
Working with Ali and Pete was a pleasure, not least because we had a similar vision for the project but we found that we had complimentary skills that sped up both development and error handling. In the end we found that while we learned Python and Django together we also learned by seeing the best part of each other's skill-set applied to the project. 

#### Styling

Our thematic approach to the styling was to take the essence of what makes a site like Twitch.tv interactive and easy to navigate but to make ours cleaner and more minimalistic. I am very happy with what we managed to achieve in the time allowed. I think we achieved the right balance between stark and information-rich creating a visually appealing user experience.

#### Cloudinary 
When proposing the concept for the site I had not worked with cloudinary before and was not sure whether their video upload capabilities would be compatible with what we needed. Luckily adapting the Cloudinary API environment variable to handle video instead of images was straightforward - getting this to work was a break-through moment in the project's development. 

## Bugs
Currently, to add a comment you need to specify the id of the game that the comment will attach to. We got the ID fields placeholder as the current game ID but the User still had to either click to confirm. What we ended up with was essentially two clicks to add a comment - one to set the ID field and the other to submit the comment. To get around this I used CSS to make both buttons the same size and on top of each other. I then set the handleChange function for the ID field to ‘onMouseEnter’ and make its opacity 0. The result was that the user seemingly adds a comment with one mouse click but in fact they are triggering a submit on hover then triggering the second submit with the click. This was a buggy way to handle the problem. The proper solution will come with a V2 of this site. 

## Key Learnings 
Python: It was tremendously motivating to see that I could use existing knowledge of another C based language (JavaScript) and adapt it to lessen the learning curve when learning Python. 

PostgreSQL (relational database): Having already worked with a non-relational database it was extremely helpful to learn the contrary and work with Django. After initial frustrations with the strict pre-defined relationships I found that I had a firm understanding of the fundamental template needed to write a backend using Django. 

Building this Full-Stack project in a relatively short time period has given me the confidence to tackle new projects extremely exciting to consider what I might build moving forward into the industry. 

## Future Improvements 

* Write a function that converts each medias ‘created at’ timestamp into a more legible format.
* Make the like/dislike buttons functional using local storage.
* Finish the User profile page populating it with their clips, comments and liked clips. Also add a   video upload link to this page.
* Make the site fully mobile responsive.
* Add the Delete and Edit media functionality. 
* Enable the top 5 most viewed clips display on the homepage. 
* Change the upload form to select from a dropdown list of game names rather than having to enter the game ID. 

