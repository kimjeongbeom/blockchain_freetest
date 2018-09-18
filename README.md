# freetest_blockchain #
<i>geth의 --dev 플래그를 사용하여 디버그 및 로그 플래그가 활성화된 개인 네트워크를 rpc 및 채굴이 활성화된 상태에서 실행하여 아래의 애플리케이션을 개발하시오. </i>

프론트엔드 동작 
  1. 먼저 사용자가 파일을 선택할 수 있도록 부트스트렙의 파일 입력 필드를 표시한다. 
  2. 그리고 소유자의 상세 정보를 입력할 수 있도록 테스트 필드를 표시한다. 
  3. 두개의 버튼이 있는데 
      - submit 버튼은 파일 해시와 소유자의 상세 정보를 컨트랙트 내에 저장하는 버튼이고 클릭하면 submit() 메소트가 트리거된다. 
      
      output:
        
        Transaction hash:
        
        0x8XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      - getInfo 버튼은 컨트랙트로부터 파일의 정보를 얻기 위한 버튼이며 클릭하면 getInfo() 멘소드가 호출된다. 
      
      output:
        
        transaction hash:
        
        0x8XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        
        owner : jeongbeom kim 
        
        file hash: 066XXXXXXXXXXXXXXXXXXXXXXXx
  4. 메시지를 표시하기 위한 alert box가 표시된다. 
  5. 사용자가 페이지에 있는 동안 채굴된 컨트랙트의 목록을 정리해서 보여준다. 
  
백엔드 동작 
  1. submit() 함수 정의 
      - 파일이 선택되었는지 확인하고 택스트필드가 공백인지 확인한다. 
      - 파일이 있다면 파일의 내용을 array buffer방식으로 읽어 sha1() 메소드에 배열 버퍼로 전달하고 이에 대한 해시값을 리턴 받는다. 
      - 해시를 얻은 이후 /submit 경로로 요청을 보내고 트랜잭션 해시를 경고창에 출력한다. 
  2. getInfo() 함수 정의 
      - 먼저 파일이 선택되었는지 확인한다. 
      - submit()과 동일하게 해시를 생성하고 파일에 대한 정보를 얻기 위해 /getInfo에 요청한다. 
  3. socket.io 라이브러리에서 제공하는 io() 함수를 사용하여 socket.io연결을 맺는다. 연결이 맺어지면 연결 이벤트가 트리거 되기를 기다린다. 
     연결이 맺어지면 서버로부터의 메시지를 리스닝하고 사용자에게 트랜잭션 정보를 표시한다. 

