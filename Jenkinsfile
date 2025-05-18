// Jenkinsfile (Declarative Pipeline)
pipeline {
    agent any // You might specify a Node.js agent in a real setup, e.g., agent { node { nodejs 'node18' } }

    environment {
        // Environment variables can be set here
        // CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                // This step assumes Jenkins checks out the code from your version control system (e.g., Git)
                // If your Jenkins job is configured to checkout SCM, this step might just be:
                script {
                    echo "Code checkout typically handled by Jenkins SCM configuration."
                    // For a self-contained example if not using SCM checkout:
                    // git url: 'YOUR_GIT_REPOSITORY_URL', branch: 'main'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs project dependencies using npm
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                // Runs the linter
                sh 'npm run lint'
            }
        }

        stage('Type Check') {
            steps {
                // Runs TypeScript type checking
                sh 'npm run typecheck'
            }
        }

        stage('Build Application') {
            steps {
                // Builds the Next.js application for production
                sh 'npm run build'
            }
        }

        // Optional: Add a 'Test' stage if you have automated tests
        // stage('Run Tests') {
        //     steps {
        //         // Example: sh 'npm test'
        //     }
        // }

        // Optional: Add a 'Deploy' stage
        // stage('Deploy') {
        //     steps {
        //         script {
        //             echo "Deploying application..."
        //             // Add your deployment commands here
        //             // e.g., sh './deploy-script.sh'
        //         }
        //     }
        // }
    }

    post {
        always {
            echo 'Pipeline finished.'
            // Perform cleanup actions if necessary
            // cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
            // Send success notifications, etc.
        }
        failure {
            echo 'Pipeline failed.'
            // Send failure notifications, etc.
        }
    }
}
