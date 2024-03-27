# slot-machine-react

- Typescript 기반 React.js 라이브러리 사용하여 프로필 만들기 슬롯 머신 게임 구현                      
    - 다양한 캐릭터를 만들어주는 슬롯 머신 형식의 게임으로, 배경색, 머리, 눈, 코, 입 등 5가지 요소를 빠른 속도의 슬롯 머신을 멈추면 화살표가 가리키는 이미지가 단계별로 조합하여 캐릭터를 완성합니다.`
    게임이 종료된 후에는 결과 페이지에서 만든 캐릭터를 캡처하여 이미지로 저장할 수 있도록 구현하였습니다. 이를 통해 사용자들이 자신이 만든 캐릭터를 손쉽게 저장하고 공유할 수 있도록 했습니다.
                    
<br>

### 👀 MainPage View

![slot-machine-ts-1-ezgif com-speed](https://github.com/1GYOU1/slot-machine-react/assets/90018379/bcf0064b-224c-4cdd-aaf8-9f36aa90f91b)

<br>

### 📌 주요 기술 스택
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-F68212?style=flat-square&logo=CSS3&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-2d79c7?style=flat-square&logo=TypeScript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>

<img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/>

<img src="https://img.shields.io/badge/Adobe Photoshop-31A8FF?style=flat-square&logo=Adobe Photoshop&logoColor=white"/>
<img src="https://img.shields.io/badge/Adobe Illustrator-FF9A00?style=flat-square&logo=Adobe Illustrator&logoColor=white"/>

<br>

### 📌 주요 기능
- 게임 방법
- 슬롯머신 애니메이션
- 결과 미리보기
- 결과 화면 부분 캡처, 저장
- 게임 다시하기
- 처음화면으로 돌아가기

<br>

### Github Pages
https://1gyou1.github.io/slot-machine-react/


<br>

### slot-machine-react App을 사용하기 전 행동 수칙

>$ npm install react-router-dom

>$ npm install html2canvas

>$ npm start 

<br>

### work flow

1. 시작 화면 
    - start 버튼 클릭 시 게임 화면 진입 (✔)
    - 게임 방법 
        <br>ㄴ 게임 방법 버튼 클릭 시 게임 방법 팝업 노출 (✔)
        <br>ㄴ 팝업 배경 클릭 시 팝업 닫기 (✔)
        <br>ㄴ 팝업 닫기 버튼 클릭 시 팝업 닫기 (✔)

2. 게임 화면
    - 화살표 좌우로 움직이는 기능 (✔)

    - stop 버튼 클릭 이벤트
        <br>ㄴ 화살표 멈추기 (✔)
        <br>ㄴ class="round_1" roundCount++ 반영 (✔)

    - 멈춘 위치에 따른 선택 결과 값(percent 기준) 저장 (✔)

    - preview 영역에 저장한 선택 값 노출 (✔)

3. 결과 화면

    - 커튼 애니메이션 추가 (✔)

    - 결과 노출 (✔)

    - 결과 저장 하기
        <br>ㄴ 원하는 부분만 캡처 후 저장 (✔)

    - 처음부터 다시 하기
        <br>ㄴ 버튼 클릭 이벤트 생성 (✔)
        <br>ㄴ 값 reset (✔)

    - 처음 화면으로 돌아가기
        <br>ㄴ 버튼 클릭 이벤트 생성 (✔)
        <br>ㄴ 값 reset (✔)