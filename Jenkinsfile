pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
               checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: 'github-token', url: 'https://github.com/dmmuralitharan/simple-node-express-microservices.git']])
            }
        }
        stage('sonarqube') {
            environment {
                scannerHome = tool 'sonar-scanner'
            }
            steps {
                withSonarQubeEnv(
                    credentialsId: 'NEW-SONARQUBE-TOKEN',
                    installationName: 'SonarQube'
                ) {
                    sh '''
                    ${scannerHome}/bin/sonar-scanner \
                    -Dsonar.projectKey=my-backend \
                    -Dsonar.projectName=my-backend \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=http://localhost:9000
                    '''
                }
            }
        }
        stage('quality gate') {
            steps {
                  waitForQualityGate abortPipeline: false, credentialsId: 'NEW-SONARQUBE-TOKEN'
            }
        }
        stage('build and push docker images') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-credentials', passwordVariable: 'DOCKER_TOKEN', usernameVariable: 'DOCKER_USER')]) {
                sh ''' echo "$DOCKER_TOKEN" | docker login --username "$DOCKER_USER" --password-stdin
                docker compose -f docker-compose.yml build
                docker compose -f docker-compose.yml push
                docker logout
                '''
}
            }
        }
    }
}
