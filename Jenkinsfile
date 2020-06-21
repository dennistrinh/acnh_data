pipeline {
	agent any
	stages {
		stage('Prep') {
			steps {
				sh 'docker rmi test'
			}
		}
		stage('Build') {
			agent {
				dockerfile {
					args '-t test'
				}
			}
			steps {
				sh 'node -v' 
			}
		}
	}
	post {
		always {
			cleanWs()
		}
	}
}
