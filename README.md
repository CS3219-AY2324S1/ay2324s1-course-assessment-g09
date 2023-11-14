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
   
# Local Kubernetes Setup
Dependencies: Minikube, Docker, Kubectl
- Relevant Links:
	- Minikube (https://minikube.sigs.k8s.io/docs/start/)
		- Use Docker Driver (https://minikube.sigs.k8s.io/docs/drivers/docker/)
	- Kubectl (https://kubernetes.io/docs/tasks/tools/)


Steps to Setup Project:
1. Start Minikube in cmd
	- Run `minikube start`
2. Ensure Metrics-Server is enabled in Minikube
	- Run ` minikube addons enable metrics-server`
3. Change directory to: `/development/kube_developement`
   > Ensure `config.yaml` and `secret.yaml` is in this directory
4. Depending on your operating system run the following command: (https://minikube.sigs.k8s.io/docs/handbook/pushing/)
   - Linux / MacOS:
      - `eval $(minikube docker-env)`
   - Windows: 
      - Powershell: `& minikube -p minikube docker-env --shell powershell | Invoke-Expression`
      - CMD: `@FOR /f "tokens=*" %i IN ('minikube -p minikube docker-env --shell cmd') DO @%i`
   > switch Docker client's context to interact with Docker daemon within Minikube  
5.  - `docker compose build` - build the images (available to minikube due to previous command)
6. Run `kubectl create namespace eks-peerprep` to create namespace
7. `kubectl apply -f .` - Apply manifest in current directory to Kubernetes cluster
8. Verify that all deployments are running 
	- `kubectl get all -n eks-peerprep`
9. Run `minikube service gateway-service -n eks-peerprep` 
