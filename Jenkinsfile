pipeline {
	agent {
		dockerfile {
			label "docker"
		}
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
