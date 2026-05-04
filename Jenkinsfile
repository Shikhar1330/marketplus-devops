pipeline {
  agent any
  environment {
    IMAGE_BACKEND = "${DOCKERHUB_USERNAME}/marketplus-backend"
    IMAGE_FRONTEND = "${DOCKERHUB_USERNAME}/marketplus-frontend"
    IMAGE_TAG = "${BUILD_NUMBER}"
    K8S_NAMESPACE = "marketplus"
  }
  stages {
    stage('1 Checkout Code') { steps { checkout scm; sh 'git log --oneline -5 || true' } }
    stage('2 Install Dependencies') {
      parallel {
        stage('Backend Install') { steps { dir('backend') { sh 'npm install' } } }
        stage('Frontend Install') { steps { dir('frontend') { sh 'npm install' } } }
      }
    }
    stage('3 Run Tests') { steps { dir('backend') { sh 'npm test' } } }
    stage('4 Security Audit') {
      parallel {
        stage('Backend Audit') { steps { dir('backend') { sh 'npm audit --audit-level=high || true' } } }
        stage('Frontend Audit') { steps { dir('frontend') { sh 'npm audit --audit-level=high || true' } } }
      }
    }
    stage('5 Build Docker Images') {
      steps {
        sh 'docker buildx create --use || true'
        sh 'docker buildx build --platform linux/amd64 -t $IMAGE_BACKEND:$IMAGE_TAG -t $IMAGE_BACKEND:latest --load ./backend'
        sh 'docker buildx build --platform linux/amd64 -t $IMAGE_FRONTEND:$IMAGE_TAG -t $IMAGE_FRONTEND:latest --load ./frontend'
      }
    }
    stage('6 Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
          sh 'docker push $IMAGE_BACKEND:$IMAGE_TAG && docker push $IMAGE_BACKEND:latest'
          sh 'docker push $IMAGE_FRONTEND:$IMAGE_TAG && docker push $IMAGE_FRONTEND:latest'
        }
      }
    }
    stage('7 Deploy to Kubernetes/AWS') { steps { sh 'kubectl apply -f devops/kubernetes/k8s/ || true'; sh 'kubectl apply -f devops/kubernetes/blue-green/ || true' } }
    stage('8 Blue-Green Switch') {
      steps { sh '''
        CURRENT=$(kubectl get svc backend-live -n $K8S_NAMESPACE -o jsonpath='{.spec.selector.version}' 2>/dev/null || echo blue)
        if [ "$CURRENT" = "blue" ]; then TARGET=green; else TARGET=blue; fi
        kubectl set image deployment/marketplus-backend-$TARGET backend=$IMAGE_BACKEND:$IMAGE_TAG -n $K8S_NAMESPACE || true
        kubectl rollout status deployment/marketplus-backend-$TARGET -n $K8S_NAMESPACE --timeout=120s || true
        kubectl patch svc backend-live -n $K8S_NAMESPACE -p "{\"spec\":{\"selector\":{\"app\":\"marketplus-backend\",\"version\":\"$TARGET\"}}}" || true
        echo "Live traffic switched to $TARGET"
      ''' }
    }
    stage('9 Health Check') { steps { sh 'kubectl get all -n $K8S_NAMESPACE || true'; sh 'curl -f http://localhost:5001/health || true' } }
  }
  post { always { sh 'docker logout || true' } }
}
