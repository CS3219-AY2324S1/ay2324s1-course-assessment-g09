eval $(minikube docker-env)
docker compose build
kubectl apply -f .
