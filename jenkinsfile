pipeline {
    agent any

    environment {
        FLY_API_TOKEN = credentials('FLY_API_TOKEN_TEST')
    }

    tools {
        nodejs "nodejs18" // Cambia aquí según el nombre correcto en Jenkins
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Install Fly.io') {
            steps {
                echo 'Installing Fly.io...'
                sh '''
                    if ! [ -x "$(command -v flyctl)" ]; then
                        echo "Flyctl no encontrado. Instalando..."
                        curl -L https://fly.io/install.sh | sh
                    fi
                    export FLYCTL_INSTALL="/var/jenkins_home/.fly"
                    export PATH="$FLYCTL_INSTALL/bin:$PATH"
                    fly auth token ${FLY_API_TOKEN}
                '''
            }
        }

        stage('Install dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run test') {
            steps {
                echo 'Running tests...'
                sh 'npm run test'
            }
        }

        stage('Deploy to Fly.io') {
            steps {
                echo 'Deploying the project to Fly.io...'
                sh '/var/jenkins_home/.fly/bin/flyctl deploy --app curso-devops-jenkins --remote-only'
            }
        }
    }
}
