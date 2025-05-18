
pipeline {
    agent any // Or specify a specific agent (e.g., agent { label 'node' })

    environment {
        // Define any environment variables needed for your build
        // e.g., CI = 'true'
        // NODE_VERSION = '18' // Example, if using nvm or similar in Jenkins
    }

    tools {
        // If you have NodeJS configured globally in Jenkins
        // nodejs 'NameOfYourNodeJSInstallation' // Replace with your NodeJS tool name in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the source code from your SCM (e.g., Git)
                // This step is usually handled by Jenkins SCM configuration
                // but can be explicit: git url: 'YOUR_GIT_REPOSITORY_URL', branch: 'main'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Recommended: Use a specific Node.js version if your agent doesn't have it by default
                    // sh '''
                    //   # Example for nvm, if installed on the agent
                    //   export NVM_DIR="$HOME/.nvm"
                    //   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    //   nvm use ${NODE_VERSION} || nvm install ${NODE_VERSION} && nvm use ${NODE_VERSION}
                    // '''
                    sh 'npm install' // Or 'yarn install' if you use Yarn
                }
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint' // Or 'yarn lint'
            }
        }

        stage('Type Check') {
            steps {
                sh 'npm run typecheck' // Or 'yarn typecheck'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build' // Or 'yarn build'
            }
        }

        // Optional: Add a stage for running tests if you have them
        // stage('Test') {
        //     steps {
        //         sh 'npm test' // Or 'yarn test'
        //     }
        // }

        // Optional: Add a stage for deploying the application
        // stage('Deploy') {
        //     when {
        //         branch 'main' // Example: Only deploy from the main branch
        //     }
        //     steps {
        //         echo 'Deploying application...'
        //         // Add your deployment scripts here
        //         // e.g., scp -r .next/* user@your-server:/path/to/app
        //         // or using a specific Jenkins plugin for deployment
        //     }
        // }
    }

    post {
        always {
            echo 'Build finished.'
            // Clean up workspace, send notifications, etc.
            // cleanWs() // Jenkins built-in function to clean workspace
        }
        success {
            echo 'Build Succeeded!'
            // mail to: 'team@example.com', subject: 'Build Succeeded: ${JOB_NAME} #${BUILD_NUMBER}'
        }
        failure {
            echo 'Build Failed!'
            // mail to: 'team@example.com', subject: 'Build Failed: ${JOB_NAME} #${BUILD_NUMBER}'
        }
    }
}
