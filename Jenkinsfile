
pipeline {
    agent any

    environment {
        NODE_VERSION = '18' // Specify the Node.js version you want to use
    }

    tools {
        nodejs "${NODE_VERSION}" // Assumes Node.js is configured in Jenkins Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'YOUR_GIT_REPOSITORY_URL' // Replace with your actual Git repo URL
                // or use: checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Type Check') {
            steps {
                sh 'npm run typecheck'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        // Optional: Add stages for testing, deployment, etc.
        // stage('Test') {
        //     steps {
        //         sh 'npm test' // If you have tests configured
        //     }
        // }

        // stage('Deploy to Staging') {
        //     when {
        //         branch 'develop' // Example: only deploy develop branch to staging
        //     }
        //     steps {
        //         // Add your deployment script/commands here
        //         echo 'Deploying to Staging...'
        //     }
        // }

        // stage('Deploy to Production') {
        //     when {
        //         branch 'main' // Example: only deploy main branch to production
        //     }
        //     input {
        //         message "Deploy to Production?"
        //         ok "Yes"
        //     }
        //     steps {
        //         // Add your deployment script/commands here
        //         echo 'Deploying to Production...'
        //     }
        // }
    }

    post {
        always {
            echo 'Pipeline finished.'
            // Clean up workspace, send notifications, etc.
            // cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
            // mail to: 'team@example.com', subject: 'SUCCESS: Jenkins Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}'
        }
        failure {
            echo 'Pipeline failed.'
            // mail to: 'team@example.com', subject: 'FAILURE: Jenkins Pipeline ${env.JOB_NAME} - Build #${env.BUILD_NUMBER}'
        }
    }
}
