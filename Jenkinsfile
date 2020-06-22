pipeline {
	agent any
	stages {
		stage('Build') {
			agent { dockerfile true }
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
