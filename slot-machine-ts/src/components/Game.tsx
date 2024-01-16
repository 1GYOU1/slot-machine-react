import React, { useRef } from 'react';
import slotBoxImg from '../img/slot_box.png';
import handleImg from '../img/handle.png';
import slotArrowImg from '../img/slot_arrow.png';
import previewBoxImg from '../img/preview_box.png';
import resultCurtainImg from '../img/result_curtain.png';
import btnClsBlackImg from '../img/btn_cls_black.png';

/*
    1. 시작 화면 
        - start 버튼 클릭 시 게임 화면 진입 (✔)
        - 게임 방법 
            ㄴ 게임 방법 버튼 클릭 시 게임 방법 팝업 노출 (✔)
            ㄴ 팝업 배경 클릭 시 팝업 닫기 (✔)
            ㄴ 팝업 닫기 버튼 클릭 시 팝업 닫기 (✔)

    2. 게임 화면
        - 화살표 좌우로 움직이는 기능 (✔)

        - stop 버튼 클릭 이벤트
            ㄴ 화살표 멈추기 (✔)
            ㄴ class="round_1" roundCount++ 반영 ()

        - 멈춘 위치에 따른 선택 결과 값(percent 기준) 저장 ()

        - preview 영역에 저장한 선택 값 노출 ()

    ------------------------------------------------

    3. 결과 화면

        - 커튼 애니메이션 추가 (✔)

        - 결과 노출 (✔)

        - 결과 저장 하기
            ㄴ 원하는 부분만 캡처 후 저장 ()

        - 처음부터 다시 하기
            ㄴ 버튼 클릭 이벤트 생성 (✔)
            ㄴ 값 reset ()

        - 처음 화면으로 돌아가기
            ㄴ 버튼 클릭 이벤트 생성 (✔)
            ㄴ 값 reset ()
*/

const Game = () => {
    // start_zone
    const startZoneRef = useRef<HTMLDivElement>(null);
    const howToPopUpRef = useRef<HTMLDivElement>(null);
    // game_zone
    const gameZoneRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const slotHandleRef = useRef<HTMLButtonElement>(null);

    const priviewDiv = document.querySelectorAll('.game_zone .preview > div') as NodeListOf<HTMLDivElement>;

    // result_zone
    const resultZoneRef = useRef<HTMLDivElement>(null);
    
    const resultView = document.querySelectorAll('.result_zone .result_view > div') as NodeListOf<HTMLDivElement>;;

    const gameRoundRef = useRef<HTMLDivElement>(null);

    let roundCount = 1;

    // 화살표 초기값
    let buttonAct = true;
    let Arrdirection = 'right';
    let persent = 0;
    let speed = 7;
    let resultPersent = 0;// 화살표 결과 위치 값 (%)
    let animationId: number | undefined;// 화살표 애니메이션

    // 화살표 결과
    let resultArr: number[] = [];

    // 게임 시작
    const gameStartBtnEvent = () => {
        if(startZoneRef.current){
            startZoneRef.current.classList.remove('on');
        }
        if(gameZoneRef.current){
            gameZoneRef.current.classList.add('on');
            moveArr();
        }
    }
    // 게임 방법 팝업 열기
    const howToBtnBtnEvent = () => {
        if(howToPopUpRef.current){
            howToPopUpRef.current.classList.add('on');
        }
    }
    // 게임 방법 팝업 닫기
    const popUpCloseEvent = () => {
        if(howToPopUpRef.current){
            howToPopUpRef.current.classList.remove('on');
        }
    }

    // 화살표
    const moveArr = () => {
        // 화살표 방향
        if(Arrdirection == 'right'){
            if(persent >= 100){
                Arrdirection = 'left';
            }else{
                persent += speed;
            }
        }else{
            if(persent <= 0){
                Arrdirection = 'right';
            }else{
                persent -= speed;
            }
        }
        if(arrowRef.current){
            arrowRef.current.style.left = `${persent}%`;
        }
        resultPersent = persent;// 결과 위치 값 전달
        console.log(persent)
        //프레임을 스케줄링
        animationId = requestAnimationFrame(moveArr);
    }

    const stopArrowBtnEvent = () => {
        if(buttonAct){
            stopSlot();// 슬롯 멈추기
            if(slotHandleRef.current){
                slotHandleRef.current.classList.add('on');// 핸들 애니메이션 추가
            }
            if(roundCount < 5){
                setTimeout(() => {
                    // round_ 클래스 카운트 변경
                    let currentClass = 'round_' + roundCount.toString();
                    let currentRoundNumber = parseInt(currentClass.split('_')[1]);// 현재 라운드 번호 추출
                    roundCount = currentRoundNumber + 1;// 다음 라운드 번호 계산 및 클래스 업데이트
                    if(gameRoundRef.current){
                        gameRoundRef.current.classList.replace(currentClass, 'round_' + roundCount.toString())
                    }

                    reStartSlot();// 슬롯 다시 시작
                    if(slotHandleRef.current){
                        slotHandleRef.current.classList.remove('on');// 핸들 애니메이션 제거
                    }
                }, 1000)
            }else{
                if(animationId !== undefined){
                    cancelAnimationFrame(animationId);
                }
                buttonAct = false;
                setTimeout(() => {// 결과 화면 show
                    if(gameZoneRef.current){
                        gameZoneRef.current.classList.remove('on');    
                    }
                    if(resultZoneRef.current){
                        resultZoneRef.current.classList.add('on'); 
                    }
                }, 1500);
                return false;
            }
        }
    }

    // 화살표 멈추기
    const stopSlot = () => {
        if(animationId !== undefined){
            cancelAnimationFrame(animationId);
        }
        buttonAct = false;

        // 결과 값 배열로 저장
        if(resultPersent < 20){
            resultArr.push(1);
        }else if(20 <= resultPersent && resultPersent < 40){
            resultArr.push(2);
        }else if(40 <= resultPersent && resultPersent < 60){
            resultArr.push(3);
        }else if(60 <= resultPersent && resultPersent < 80){
            resultArr.push(4);
        }else{
            resultArr.push(5);
        }

        // 선택한 요소의 스타일 가져오기
        let choiceElement = document.querySelector(`.game_zone .round_${roundCount} .slot_box li:nth-of-type(${resultArr[roundCount-1]})`);
        if (choiceElement) {
            let choiceStyle = getComputedStyle(choiceElement).backgroundImage;

            // 결과 priview show
            priviewDiv.forEach((e, i)=>{
                if(resultArr.length == i+1){
                    priviewDiv[i].style.display = 'block';
                    priviewDiv[i].style.backgroundImage = choiceStyle;// 게임 진행 preview 화면에 background-image 넣어주기 
                    resultView[i].style.backgroundImage = choiceStyle;// 결과 화면에도 background-image 넣어주기 
                }
            });
        }else{
            // choiceElement가 null인 경우
            console.error("stopSlot() choiceElement not found !");
        }
    }

    // 화살표 포지션 초기화, 재시작
    const reStartSlot = () => {
        persent = 0;
        resultPersent = 0;
        if(arrowRef.current){
            arrowRef.current.style.left = `0%`;
        }
        Arrdirection = 'right';
        moveArr();
        buttonAct = true;
    }

    // 다시하기 - 게임 초기화
    const resetBtnEvent = () => {
        console.log('다시하기 버튼 클릭')
        if(resultZoneRef.current){
            resultZoneRef.current.classList.remove('on');
        }
        if(gameZoneRef.current){
            gameZoneRef.current.classList.remove('on');
        }
        reStartSlot();
        allResetEvent();
    }

    // 처음 화면으로
    const startShowEvent = () => {
        if(resultZoneRef.current){
            resultZoneRef.current.classList.remove('on');
        }
        if(startZoneRef.current){
            startZoneRef.current.classList.add('on');
        }
        allResetEvent();
    }

    const allResetEvent = () => {
        roundCount = 1;
        priviewDiv.forEach((e, i) => {
            e.style.removeProperty('background-image');
            e.style.display = 'none';
        })
        if(gameRoundRef.current){
            gameRoundRef.current.classList.replace('round_5', 'round_1');
        }
        resultArr = [];
    }

    return (
        <>
            {/* 시작 화면 */}
            <div ref={startZoneRef} className="start_zone on">
                <div className="inner">
                    <h2 className="tit">규의 슬롯머신</h2>
                    <div className="btn_area">
                        <button className="custom_btn start_btn" onClick={gameStartBtnEvent}>게임 시작</button>
                        <button className="custom_btn howto_btn" onClick={howToBtnBtnEvent}>게임 방법</button>
                    </div>
                </div>
            </div>
            {/* //시작 화면 */}
            {/* 게임 화면 */}
            <div ref={gameZoneRef} className="game_zone">
                <div className="inner">
                    <div className="round_1">
                        <h3 className="tit">규의 슬롯머신</h3>
                        {/* <!--배경색, 머리, 눈, 코, 입, 악세사리--> */}
                        <div className="slot_area">
                            <img className="slot_mask" src={slotBoxImg} alt="슬롯 머신"/>
                            <ul className="slot_box">
                                <li><span></span></li>
                                <li><span></span></li>
                                <li><span></span></li>
                                <li><span></span></li>
                                <li><span></span></li>
                            </ul>
                            <button ref={slotHandleRef} className="handle" onClick={stopArrowBtnEvent}>
                                <img src={handleImg} alt="슬롯 핸들"/>
                            </button>
                        </div>
                    </div>  
                    <div className="arrow_area">
                        <span ref={arrowRef}>
                            <img src={slotArrowImg} alt="슬롯 화살표"/>
                        </span>
                    </div>
                    <div className="preview">
                        <img className="preview_box" src={previewBoxImg} alt="슬롯 미리보기"/>
                        <div className="result_1"></div>
                        <div className="result_2"></div>
                        <div className="result_3"></div>
                        <div className="result_4"></div>
                        <div className="result_5"></div>
                    </div>
                </div>
            </div>
            {/* //게임 화면 */}
            {/* 결과 화면 */}
            <div ref={resultZoneRef} className="result_zone">
                <img className="curtain" src={resultCurtainImg} alt="커튼"/>
                <div className="inner">
                    <h2 className="tit">결과는 ?</h2>
                    <div id="capture" className="result_view">
                        <div className="result_1"></div>
                        <div className="result_2"></div>
                        <div className="result_3"></div>
                        <div className="result_4"></div>
                        <div className="result_5"></div>
                    </div>
                    <div className="btn_area">
                        <button className="custom_btn capture_btn">저장하기</button>
                        <button className="custom_btn reset_btn" onClick={resetBtnEvent}>다시하기</button>
                        <button className="custom_btn start_show_btn" onClick={startShowEvent}>처음으로</button>
                    </div>
                </div>
            </div>
            {/* //결과 화면 */}
            <div ref={howToPopUpRef} className="howto_pop">
                <div className="bg" onClick={popUpCloseEvent}></div>
                <div className="cont">
                    <button className="close" onClick={popUpCloseEvent}>
                        <img src={btnClsBlackImg} alt="닫기" />
                    </button>
                    게임 시작을 누른 후 
                    <br /> 슬롯 핸들을 클릭해서 캐릭터를 만들어주세요 !
                    <br />
                    <br /><span>※ 본 게임은 PC chrome 브라우저에 최적화 되어있습니다.</span>
                </div>
            </div>
        </>
    );
};

export default Game;
