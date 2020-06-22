pipeline {
	agent any
	stages {
		stage('Build') {
			agent {dockerfile}
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
