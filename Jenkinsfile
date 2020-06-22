pipeline {
	parameters {
		choice(name: 'TEST_EXISTS', choices: ['true', 'false'], description: 'Does test image exist?')
	}
	agent any
	stages {
		stage('Prep') {
			when {
				params.TEST_EXISTS == "true"
			}
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
