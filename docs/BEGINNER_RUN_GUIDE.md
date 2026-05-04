# Beginner Step-by-Step Run Guide

## Free local run in VS Code
1. Install VS Code, Docker Desktop, and Git.
2. Extract the ZIP.
3. Open `MarketPlus-DevOps` in VS Code.
4. Open Terminal in VS Code.
5. Run:

```powershell
copy .env.example .env
docker compose up --build
```

For Mac/Linux:

```bash
cp .env.example .env
docker compose up --build
```

6. Open `http://localhost:3000`.
7. Login with `admin@marketplus.com` and `Admin@123`.
8. Check backend: `http://localhost:5001/health`.
9. Check Prometheus: `http://localhost:9090`.
10. Check Grafana: `http://localhost:3001`, login `admin/admin123`.
11. Stop using:

```bash
docker compose down
```

## Jenkins setup
1. Open `http://localhost:8080`.
2. Get initial password:

```bash
docker exec marketplus-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

3. Install suggested plugins.
4. Create a Pipeline job.
5. Push this project to GitHub and select the included `Jenkinsfile`.
6. Add Docker Hub credentials in Jenkins with ID `dockerhub-credentials`.
7. Replace `yourdockerhubusername` in Kubernetes files with your Docker Hub username before cloud deployment.

## AWS warning
AWS EKS is not fully free for most accounts. For a free-version university demo, use local Docker Compose screenshots first. Stop or delete any AWS resources after use.
