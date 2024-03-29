import React, { useEffect, useRef, useState } from 'react';
import slotBoxImg from '../img/slot_box.png';
import handleImg from '../img/handle.png';
import slotArrowImg from '../img/slot_arrow.png';
import previewBoxImg from '../img/preview_box.png';
import resultCurtainImg from '../img/result_curtain.png';
import btnClsBlackImg from '../img/btn_cls_black.png';

// 캡처 라이브러리
import html2canvas from 'html2canvas';

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
            ㄴ class="round_1" roundCount++ 반영 (✔)

        - 멈춘 위치에 따른 선택 결과 값(percent 기준) 저장 (✔)

        - preview 영역에 저장한 선택 값 노출 (✔)

    ------------------------------------------------

    3. 결과 화면

        - 커튼 애니메이션 추가 (✔)

        - 결과 노출 (✔)

        - 결과 저장 하기
            ㄴ 원하는 부분만 캡처 후 저장 (✔)

        - 처음부터 다시 하기
            ㄴ 버튼 클릭 이벤트 생성 (✔)
            ㄴ 값 reset (✔)

        - 처음 화면으로 돌아가기
            ㄴ 버튼 클릭 이벤트 생성 (✔)
            ㄴ 값 reset (✔)
*/

const Game = () => {
    // start_zone
    const startZoneRef = useRef<HTMLDivElement>(null);
    const howToPopUpRef = useRef<HTMLDivElement>(null);
    // game_zone
    const gameZoneRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLDivElement>(null);
    const slotHandleRef = useRef<HTMLButtonElement>(null);
    const previewDiv = document.querySelectorAll('.game_zone .preview > div') as NodeListOf<HTMLDivElement>;

    // result_zone
    const resultZoneRef = useRef<HTMLDivElement>(null);

    const resultViewDiv = document.querySelectorAll('.result_zone .result_view > div') as NodeListOf<HTMLDivElement>;;

    const gameRoundRef = useRef<HTMLDivElement>(null);

    // 라운드 카운트
    const [roundCount, setRoundCount] = useState<number>(0);

    // 미리보기 이미지 & 결과 페이지 가기 전 카운트
    const [resultShowCount, setResultShowCount] = useState<number>(0);

    // 화살표 초기값
    const [buttonAct, setButtonAct] = useState<boolean>(false);
    const [arrDirection, setArrDirection] = useState<string>('right');
    const [persent, setPersent] = useState<number>(0);
    const [speed, setSpeed] = useState<number>(10);
    const [resultPersent, setResultPersent] = useState<number>(0);// 화살표 결과 위치 값 (%)
    let animationId: number | undefined;// 화살표 애니메이션

    // 화살표 결과값 배열로 저장
    let [resultArr, setResultArr] = useState<number[]>([]);

    // preview 결과 배경 이미지 배열로 저장
    let [bgImgArr, setBgImgArr] = useState<string[]>([]);

    // 게임 시작
    const gameStartBtnEvent = () => {
        if(startZoneRef.current){
            startZoneRef.current.classList.remove('on');
        }
        if(gameZoneRef.current){
            gameZoneRef.current.classList.add('on');
            setButtonAct(true);
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
    
    // 화살표 위치값 변경
    useEffect(() => {
        setResultPersent(persent);//결과 위치값 전달
        animationId = requestAnimationFrame(moveArr);
        if (arrowRef.current) {
            arrowRef.current.style.left = `${persent}%`;
        }
    }, [persent, buttonAct, arrDirection]);

    // round class 변경 useState로는 즉시 반영이 안됨 ..
    useEffect(() => {
        roundChange();

        // resultPersent 갱신 후 결과 값 저장
        if(roundCount !== 0){
            stopSlot();
        }
    }, [roundCount, resultShowCount])

    useEffect(() => {
        if (bgImgArr.length > 0 && resultArr.length > 0) {
            // 미리보기 영역 bg Img style 업데이트
            previewDiv[resultArr.length - 1].style.backgroundImage = `url(${bgImgArr[resultArr.length - 1]})`;
            previewDiv[resultArr.length - 1].style.display = 'block';
            
            // 결과 페이지 bg Img style 업데이트
            resultViewDiv[resultArr.length - 1].style.backgroundImage = `url(${bgImgArr[resultArr.length - 1]})`;
        }
        console.log('resultArr',resultArr)
        console.log('bgImgArr',bgImgArr)
    }, [bgImgArr, resultArr, resultShowCount]);

    // bgImgArr update
    useEffect(() => {
        if(resultArr.length > 0){
            bgImageChange();
        }
    }, [resultArr])
    
    const moveArr = () => {
        if (buttonAct) {
            if (arrDirection === 'right') {
                if (persent >= 100) {
                    setArrDirection('left');
                } else {
                    setPersent((prev) => prev + speed);
                }
            } else {
                if (persent <= 0) {
                    setArrDirection('right');
                } else {
                    setPersent((prev) => prev - speed);
                }
            }
        }
    };

    const roundChange = () => {
        // round 변경
        if (gameRoundRef.current) {
            gameRoundRef.current.className = `round_${roundCount}`;
        }
    }

    // priview bg-image 변경
    const bgImageChange = () => {
        console.log('resultArr.length',resultArr.length)
        const lastIndex = resultArr.length - 1;
        const imageUrl = `${process.env.PUBLIC_URL}/image/slot_item_${resultArr[lastIndex]}_${resultShowCount-1}.png`;
        setBgImgArr(prevBgImgArr => [...prevBgImgArr, imageUrl]);
    };

    const stopArrowBtnEvent = () => {
        if(buttonAct){
            // 슬롯 클릭시 바로 멈추기
            setButtonAct(false);
            console.log('최종이랑 같아야하는 percent', persent)
            if(animationId !== undefined){
                cancelAnimationFrame(animationId);
            }

            // 모바일 핸들 애니메이션 추가
            if(slotHandleRef.current){
                slotHandleRef.current.classList.add('on');
            }

            if(roundCount < 4 && resultShowCount < 5){
                setTimeout(() => {// round_ 클래스 카운트 변경
                    setRoundCount((prev) => prev + 1);
                    setResultShowCount((prev) => prev + 1);

                    reStartSlot();// 슬롯 다시 시작
                    if(slotHandleRef.current){
                        slotHandleRef.current.classList.remove('on');// 핸들 애니메이션 제거
                    }
                }, 1000)
            }else{
                // 마지막 라운드 priview bg-image 변경
                setResultShowCount((prev) => prev + 1);

                if(animationId !== undefined){
                    cancelAnimationFrame(animationId);
                }
                setButtonAct(false);
                setTimeout(() => {// 결과 화면 show
                    if(gameZoneRef.current){
                        gameZoneRef.current.classList.remove('on');    
                    }
                    if(resultZoneRef.current){
                        resultZoneRef.current.classList.add('on'); 
                    }
                }, 3000);
                return false;
            }
        }
    }

    // 화살표 멈춘 후 결과 값 배열로 저장
    const stopSlot = () => {
        if (resultPersent < 20) {
            setResultArr((prev) => [...prev, 1]);
        } else if (resultPersent >= 20 && resultPersent < 40) {
            setResultArr((prev) => [...prev, 2]);
        } else if (resultPersent >= 40 && resultPersent < 60) {
            setResultArr((prev) => [...prev, 3]);
        } else if (resultPersent >= 60 && resultPersent < 80) {
            setResultArr((prev) => [...prev, 4]);
        } else if(resultPersent >= 80){
            setResultArr((prev) => [...prev, 5]);
        }
    }

    // 화살표 재시작
    const reStartSlot = () => {
        moveArr();
        setButtonAct(true);
    }

    // 다시하기 - 게임 초기화
    const resetBtnEvent = () => {
        console.log('다시하기 버튼 클릭')
        if(resultZoneRef.current){
            resultZoneRef.current.classList.remove('on');
        }
        if(gameZoneRef.current){
            gameZoneRef.current.classList.add('on');
        }
        setPersent(0);// 화살표 위치 초기화
        if(arrowRef.current){
            arrowRef.current.style.left = `0%`;
        }
        setArrDirection('right'); // 화살표 방향 초기화
        reStartSlot();
        allResetEvent();
        setResultPersent(0);
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

    // 캡처 기능
    const handleDownload = async () => {// 비동기
        const elementToCapture = document.getElementById('capture');// 캡처할 대상
        if (elementToCapture) {
            html2canvas(elementToCapture).then(canvas => {// 라이브러리 사용하여 영역 캡처
            // 캡처 후 실행할 작업
            const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
            const link = document.createElement('a');
            link.download = 'screenshot.png';
            link.href = image;
            link.click();
            });
        } else {
            console.error('Element to capture not found');
        }
    };

    // 초기화 기능
    const allResetEvent = () => {
        setRoundCount(0);
        setResultShowCount(0);
        previewDiv.forEach((e, i) => {
            e.style.removeProperty('background-image');
            e.style.display = 'none';
        })
        if(gameRoundRef.current){
            gameRoundRef.current.className = `round_${roundCount}`;
        }
        setResultArr([]);
        setBgImgArr([]);
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
                    <div ref={gameRoundRef} className="round_1">
                        <h3 className="tit">규의 슬롯머신</h3>
                        {/* <!--배경색, 머리, 눈, 코, 입--> */}
                        <div className="slot_area">
                            <img className="slot_mask" src={slotBoxImg} alt="슬롯 머신"/>
                            <ul className="slot_box">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
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
                        <button className="custom_btn capture_btn" onClick={handleDownload}>저장하기</button>
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