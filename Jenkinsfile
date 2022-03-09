pipeline {
    agent any

    //깃을 1분 주기로 끌어온다
    triggers {
        pollSCM('*/1 * * * *')
    }

    environment {
      HOME = './home/MJ/ydpsns/YDP-SNS' // Avoid npm root owned
    }

    stages {
        // 레포지토리를 다운로드 받음
        stage('Prepare') {
            agent any
            // 이 스텝을 통해 pull 하는 것
            steps {
                echo 'Clonning Repository'

                git url: 'https://github.com/mang0206/YDP-SNS.git',
                    branch: 'MJ',
                    credentialsId: 'snsMJ'
            }

            post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                success {
                    echo 'Successfully Cloned Repository'
                }

                always {
                  echo "i tried..."
                }
                // cleanup은 post가 끝났을때 진행할 내용 여기서는 로그만 찍어줬다
                cleanup {
                  echo "after all other post condition"
                }
            }
        }
        
        stage('Bulid Backend') {
          agent any
          steps {
            echo 'Build Backend'

            dir ('./home/MJ/ydpsns/YDP-SNS'){
                sh """
                source /tmp/ydpsns/bin/activate
                """
            }
          }

          post {
            // 작업 실패 시 pipe line을 종료한다.
            failure {
              error 'This pipeline stops here...'
            }
          }
        }
        
        stage('Deploy Backend') {
          agent any

          steps {
            echo 'Build Backend'
            // 만약 처음 시작이 아니라면 docker run 전에 docker rm -f $(docker ps -aq) 이 코드 필요  
            dir ('./home/MJ/ydpsns/YDP-SNS'){
                sh '''
                python3 main.py
                '''
            }
          }

          post {
            success {
              mail  to: 'alswosp0206@gmail.com',
                    subject: "Deploy Success",
                    body: "Successfully deployed!"
                  
            }
          }
        }
    }
}
