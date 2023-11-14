[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)

[![Push Images to ECR and Deploy to EB.](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g09/actions/workflows/aws_deploy.yml/badge.svg)](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g09/actions/workflows/aws_deploy.yml)

# PeerPrep

PeerPrep is an online technical interview preparation platform where students can collaborate with their peers to practice coding interview questions together. 

## PeerPrep is deployed online
You can access the website at this [link](https://a34b5b20ab2724775b6deac2de10363b-f5e838cbca67e6d1.elb.ap-southeast-1.amazonaws.com/).

## Set up process for local testing:
Prerequisites: Docker
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g09.git
2. **Move into the development folder**
   ```bash
   cd development
3. **Run the development container**
   ```bash
   docker-compose up --build
4. **Access the website**
   ```bash
   http://localhost:3000
