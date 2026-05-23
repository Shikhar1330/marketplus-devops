# MarketPlus: Real-Time News and Insights Web Application

This is a beginner-friendly full-stack DevOps project . It includes CI/CD pipeline, Docker, Jenkins, Prometheus, Grafana, AWS-ready Kubernetes deployment, Terraform starter files, and Blue-Green deployment.

**Free-version note:** run the complete project locally with Docker Compose. AWS/EKS can create charges, so use AWS only if you understand billing or only need screenshots for demo.

## Tools Used
Frontend: React 18, Vite, Tailwind CSS, Axios  
Backend: Node.js 20, Express.js, JWT, bcryptjs, Helmet, prom-client  
Database: PostgreSQL 16  
Testing: Jest, Supertest  
CI/CD: Jenkinsfile pipeline  
Containerization: Docker, Docker Compose  
Monitoring: Prometheus, Grafana  
Cloud/Orchestration: Kubernetes YAML, AWS-ready manifests, Terraform starter  
Deployment Strategy: Blue-Green deployment

## Local URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- Backend health: http://localhost:5001/health
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001  login: admin / admin123
- Jenkins: http://localhost:8080

## Demo Login
- admin@marketplus.com / Admin@123
- editor@marketplus.com / Editor@123
- analyst@marketplus.com / Analyst@123
- viewer@marketplus.com / Viewer@123

## Run in VS Code
```bash
copy .env.example .env
# or on Mac/Linux: cp .env.example .env
docker compose up --build
```

Open http://localhost:3000.

## Stop
```bash
docker compose down
```
