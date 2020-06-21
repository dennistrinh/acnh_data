pipeline {
	agent {
		dockerfile true
	}
	stages {
		stage('Build') {
			steps {
				sh 'node --version'
			}
		}
	}
	post {
		always {
			cleanWs()
		}
	}
}
