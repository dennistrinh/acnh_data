pipeline {
	agent {
		label 'docker'
	}
	stages {
		stage('Prep') {
			steps {
				sh 'docker rm test'
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
