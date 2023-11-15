# Assignment 1 Demo Instruction

## Tech Stack Used

The tech stack used in the implementation of Question Service includes:

- Next.js
- Chakra UI
- MongoDB

## Setting Up

Step 1: Download the source code from Assignment 1 release tag and unzip the file.
![Alt text](image.png)
![Alt text](image-1.png)

Step 2: Go to the directory:
.\ay2324s1-course-assessment-g09-Assignment-1\ay2324s1-course-assessment-g09-Assignment-1\backend\question_service
![Alt text](image-2.png)

Step 3: Open Docker Desktop
![Alt text](image-3.png)

Step 4: Run the docker compose command `docker-compose up --build`
![Alt text](image-4.png)

When the docker compose is complete, you should see this:
![Alt text](image-5.png)
Step 5: After the build is completed, navigate to the folder: .\ay2324s1-course-assessment-g09-Assignment-1\ay2324s1-course-assessment-g09-Assignment-1\frontend
![Alt text](image-6.png)

Step 6: Run the following command: `npm install` and `npm run dev`. Verify that frontend is running on port 3000
![Alt text](image-7.png)

Step 7: Go to: `http://localhost:3000`. You'll see a landing page with input field to enter the questions.
![Alt text](image-8.png)

## Demonstration

The demonstration for Assignment 1 will officially start here.

The requirements are as follows:

- A landing page which can display basic information about all the questions in the
  current state of the application (e.g., title, complexity).
- Functionality to add question with the aforementioned attributes.
- Functionality to display details of each question on selecting (e.g., by clicking) the
  question.
- Functionality to delete a question
- Use style sheets to make the page usable.
- Persist data using JS cookies, localStorage or any other mechanism that you deem
  appropriate.
- Error handling (e.g., basic error handling like checking for duplicate questions).

### Performing Create (C):

A sample test case is as follows:

- ID: 1
- Title: Reverse a String
- Categories: Strings, Algorithm
- Complexity: Easy
- Description:

```<div class="xFUwe" data-track-load="description_content"><p>Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.</p>

<p>You must do this by modifying the input array <a href="https://en.wikipedia.org/wiki/In-place_algorithm" target="_blank">in-place</a> with <code>O(1)</code> extra memory.</p>

<p>&nbsp;</p>
<p><strong class="example">Example 1:</strong></p>
<pre><strong>Input:</strong> s = ["h","e","l","l","o"]
<strong>Output:</strong> ["o","l","l","e","h"]
</pre><p><strong class="example">Example 2:</strong></p>
<pre><strong>Input:</strong> s = ["H","a","n","n","a","h"]
<strong>Output:</strong> ["h","a","n","n","a","H"]
</pre>
<p>&nbsp;</p>
<p><strong>Constraints:</strong></p>

<ul>
	<li><code>1 &lt;= s.length &lt;= 10<sup>5</sup></code></li>
	<li><code>s[i]</code> is a <a href="https://en.wikipedia.org/wiki/ASCII#Printable_characters" target="_blank">printable ascii character</a>.</li>
</ul>
</div>
```

The result is as shown:
![Alt text](image-9.png)

### Performing Read(R):

As shown in the same image, all the information, except for Description can be seen. To see the description, click on the question title. You will see a clicker cursor and a cyan bolded text.
![Alt text](image-11.png)

Click on the title to see the full details as shown:
![Alt text](image-12.png)

### Performing Update (U):

To update the question, click on the edit button as shown
![Alt text](image-13.png)

Update the field as required. Note that since ID is being used as a key, we **do not allow the ID to be edited**. Once the update is completed, click on the update button.
![Alt text](image-15.png)

You will be able to see the updated value reflected.
![Alt text](image-16.png)

### Error Handling - Duplicate Questions

The detection of duplicate questions will be done via duplicated question ID.

To test for error handling, enter a new question with the same question ID. An example is as shown below:
![Alt text](image-17.png)

When you click on the Create button, there will be an error message stating ID is already in use.

![Alt text](image-18.png)

This test will show that it fulfils the error handling requirement.

### Persistant Data Testing:

To test for persistant data, we will need to start everything from scratch.

This test is started by stopping the frontend and backend. This can be achieve by typing `CTRL+C`. Enter `Y` to confirm if required.
![Alt text](image-20.png)
![Alt text](image-21.png)

Also delete the container from Docker Desktop as follows:
![Alt text](image-22.png)

Try to rebuild everything by following Step 4 to Step 7 of the Set Up section.

Once everything is setup and functional, go back to `http://localhost:3000` and this is what you'll see.
![Alt text](image-23.png)

This test simulates a fresh boot where data is retained. This data persistency is succssful because MongoDB is used. Even in the event where the frontend and container stop working, the MongoDB retains the data.

### Performing Delete (D):

To perform deletion, user can click on the Delete button as shown below.
![Alt text](image-24.png)

After the Delete button is clicked, the question will be removed and this is how it'll look like.
![Alt text](image-25.png)

---
