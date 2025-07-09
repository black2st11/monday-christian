import React, { useState } from 'react';
import logo from './logo.png';
import mainImg from './main-illust.png';
import question1Img from './question_1.png';
import question2Img from './question_2.png';
import question3Img from './question_3.png';
import question4Img from './question_4.png';
import question5Img from './question_5.png';
import question6Img from './question_6.png';
import question7Img from './question_7.png';
import question8Img from './question_8.png';
import question9Img from './question_9.png';
import question10Img from './question_10.png';
import question11Img from './question_11.png';

const names = {
  PETER: 0,
  JOHN: 1,
  JAMES_BIG: 2,
  ANDREW: 3,
  PHILIP: 4,
  NATHANIEL: 5,
  MATTHEW: 6,
  THOMAS: 7,
  SIMON: 8,
  JAMES_SMALL: 9,
  THADDAEUS: 10,
  JUDAH: 11
}

// 12개의 대질문(각각 4개의 소질문/선택지), 각 대질문마다 이미지, 질문, 4개 선택지(한 줄 텍스트)
const surveyData = [
  {
    image: question1Img,
    question: '1. 누군가 실수를 저질렀을 때 당신의 반응은?',
    options: [
      '흠.. 그런 실수는 안하는 것이 좋았을 것 같은',
      '너 왜 실수했어 그러면 안돼',
      '그럴 수 있지, 나도 실수하는데',
      '왜 실수한거야? 이유를 말해줄 수 있을까?'
    ],
  },
  {
    image: question2Img,
    question: '2. 당신이 팀을 이끌어야 한다면?',
    options: [
      '남들이 하는 것보다는 내가 하는게 낫다',
      '아무도 할 사람이 없으면 제가 할게요.',
      '제가 굳이 해야할까요? 다른 사람이 하는 것이 괜찮을 것 같은데',
      '뭐 시켜주면 해보기는 할게요.'
    ],
  },
  {
    image: question3Img,
    question: '3. 당신이 추구하는 가장 중요한 가치는?',
    options: [
      '신념과 정의',
      '사랑과 이해',
      '진실과 근거',
      '변화와 회복'
    ],
  },
  {
    image: question4Img,
    question: '4. 새로운 것을 시작할 때 당신의 태도는?',
    options: [
      '일단 해보자. 그래야 뭐라도 나올테니',
      '일단 확신이 들때까지 기다리고 확신이 들 때 시도',
      '일단 저는 그냥 지켜만볼게요.',
      '이거는 왜 하는거죠?'
    ],
  },
  {
    image: question5Img,
    question: '5. 친구가 힘들어할 때 당신은?',
    options: [
      '괜찮지 않은 것을 알기에 괜찮다는 말을 안하고 공감한다.',
      '무슨 일 있어? 말해줄 수 있을까?',
      '이렇게 하는 것이 좋을 것 같아 하고 해결책 제시',
      '슬퍼할 시간은 없어 우리같이 해결하자'
    ],
  },
  {
    image: question6Img,
    question: '6. 당신의 신념에 대한 태도는?',
    options: [
      '신념은 곧 행동으로 나타낸다.',
      '의심이 생기면 끝까지 검증한다',
      '다들 믿어도 나는 확인해보고 믿는다',
      '믿음도 유연해야 한다'
    ],
  },
  {
    image: question7Img,
    question: '7. 문제 해결 방식은?',
    options: [
      '직감과 용기로 돌파한다',
      '논리와 증거로 설득한다',
      '조용히 배려하며 중재한다',
      '모든 가능성을 고민한다'
    ],
  },
  {
    image: question8Img,
    question: '8. 팀 내에서의 역할은?',
    options: [
      '에너지와 추진력 담당',
      '중재자와 지지자',
      '아이디어 뱅크',
      '조용한 관찰자'
    ],
  },
  {
    image: question9Img,
    question: '9. 당신이 두려워하는 것은?',
    options: [
      '열심히 했던 것이 아무런 성과가 없을 때',
      '나라는 사람을 아무도 기억하지 못할 때',
      '나라는 사람의 쓸모가 사라졌을 때',
      '진심을 다해서 말하지만 아무에게도 전해지지 않을 때'
    ],
  },
  {
    image: question10Img,
    question: '10. 당신이 되고 싶은 사람은?',
    options: [
      '강하고 용감한 리더',
      '모두를 품는 따뜻한 조력자',
      '이성과 진실을 탐구하는 학자',
      '변화와 회복의 증인'
    ],
  },
  {
    image: question11Img,
    question: '11. 사경회가 8월 8일에 있습니다.',
    options: [
      '오실거죠?',
      '당연히 오실거라고 믿고있습니다.',
      '설마 안온다구요?',
      '그렇다면...'
    ],
  }
];

// 결과 데이터 (선택지 조합에 따른 결과)
const getResult = (answers) => {
  // 예시: 0,1,2,3번 선택지 중 가장 많이 선택한 타입으로 결과 분기
  const answersMap = [
    [[names.JUDAH], [names.SIMON], [names.MATTHEW], [names.THADDAEUS]],
    [[names.JAMES_BIG], [names.NATHANIEL], [names.JAMES_SMALL], [names.JUDAH]],
    [[names.JAMES_BIG, names.SIMON], [names.JOHN], [names.THOMAS], [names.MATTHEW]],
    [[names.JAMES_BIG], [names.NATHANIEL], [names.JAMES_SMALL], [names.JUDAH]],
    [[names.NATHANIEL], [names.THADDAEUS], [names.JUDAH], [names.SIMON]],
    [[names.PETER, names.SIMON], [names.THOMAS], [names.PHILIP], [names.THADDAEUS, names.MATTHEW]],
    [[names.PETER], [names.THOMAS, names.PHILIP], [names.JOHN, names.ANDREW], [names.JUDAH]],
    [[names.PETER, names.SIMON], [names.JOHN, names.ANDREW], [names.PHILIP], [names.NATHANIEL, names.JAMES_SMALL]],
    [[names.JAMES_BIG], [names.JAMES_SMALL], [names.ANDREW], [names.THADDAEUS]],
    [[names.PETER], [names.JOHN, names.ANDREW], [names.PHILIP, names.THOMAS], [names.MATTHEW]],
    [[], [], [], []],
  ]
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  answers.forEach((v, i, a)=>{
    const answer = answersMap[i][v]
    if(answer) {
      answer.forEach(name => {
        counts[name]++;
      })
    }
  })
  const maxIdx = counts.indexOf(Math.max(...counts));
  const results = [
    {
      image: logo,
      title: '베드로',
      description: `충동적이지만 진심과 용기로 가득 찬 리더\n실수도 많지만 언제나 다시 일어서는 사람`,
      bible: '내 양을 먹이라. (요한복음 21:17)'
    },
    {
      image: logo,
      title: '요한',
      description: `사랑과 공감의 화신\n온유하고 깊은 영성을 지닌 중재자`,
      bible: '하나님은 사랑이시라. (요한일서 4:16)'
    },
    {
      image: logo,
      title: '야고보(큰)',
      description: '열정적이고 정의감이 강하며 불같은 성격의 개척자.',
      bible: '큰 자는 섬기는 자가 되어야 하리라. (마태복음 20:26)'
    },
    {
      image: logo,
      title: '안드레',
      description: `조용히 다른 사람을 주님께 인도하는 연결자.\n섬김의 자세로 기회를 만드는 사람.`,
      bible: '이 사람을 예수께 데리고 오니. (요한복음 1:42)'
    },
    {
      image: logo,
      title: '빌립',
      description: `분석적이고 논리적인 질문자.\n확신하기 전 철저히 검증하는 스타일.`,
      bible: '주여 아버지를 우리에게 보여 주옵소서. (요한복음 14:8)'
    },
    {
      image: logo,
      title: '나다나엘',
      description: `정직하고 순수한 신앙의 사람.\n숨김없이 진솔하게 사는 겸손한 제자.`,
      bible: '보라 이는 참으로 이스라엘 사람이라 그 속에 간사함이 없도다. (요한복음 1:47)'
    },
    {
      image: logo,
      title: '마태',
      description: `과거의 실수를 딛고 변화한 증인.\n새로운 시작을 삶으로 보여주는 회심자.`,
      bible: '나를 따르라 하시니 일어나 따르니라. (마태복음 9:9)'
    },
    {
      image: logo,
      title: '도마',
      description: '이성적이고 신중하며, 확실한 증거를 원하는 진리탐구자.',
      bible: '내 손가락을 그 못자국에 넣어보지 않고는 믿지 아니하겠노라. (요한복음 20:25)'
    },
    {
      image: logo,
      title: '시몬',
      description: `열정적인 신념가.\n급진적인 마음으로 진리를 이루려는 행동가.`,
      bible: '주의 뜻이 하늘에서 이루어진 것 같이 땅에서도 이루어지이다. (마태복음 6:10)'
    },
    {
      image: logo,
      title: '야고보(작은)',
      description: '눈에 잘 띄지 않지만 꾸준히 충성하는 조용한 헌신자.',
      bible: '먼저 된 자로서 나중 되고 나중 된 자로서 먼저 될 자가 많으니라 (마태복음 19:30)'
    },
    {
      image: logo,
      title: '다대오',
      description: '질문과 호기심이 많으며 진리에 대한 갈망이 큰 사람.',
      bible: '주여 어찌하여 자기를 우리에게는 나타내시고 세상에는 아니하려 하시나이까. (요한복음 14:22)'
    },
    {
      image: logo,
      title: '가룟 유다',
      description: `복잡한 내면의 갈등으로 인해 실수를 저지른 비극적 인물.\n그러나 누구에게나 회복의 길은 열려 있음을 상기시킴.`,
      bible: '회개하라 천국이 가까이 왔느니라. (마태복음 4:17)'
    },
  ];
  return results[maxIdx];
};

function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0: 메인, 1~12: 설문, 13: 결과
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // 뒤로가기 핸들러
  const handleBack = () => {
    if (currentStep === 1) {
      setCurrentStep(0);
      setAnswers([]);
      setResult(null);
    } else if (currentStep > 1 && currentStep <= 12) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleOptionSelect = (optionIdx) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);
    if (currentStep === 11) {
      const finalResult = getResult(newAnswers);
      setResult(finalResult);
      setCurrentStep(12);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '설문 결과',
        text: `나의 설문 결과: ${result?.title} - ${result?.description}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`나의 설문 결과: ${result?.title} - ${result?.description}`);
      alert('결과가 클립보드에 복사되었습니다!');
    }
  };

  const handleGoMain = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  // 헤더 컴포넌트
  const Header = ({ showBack }) => (
    <header className="header">
      {showBack && (
        <button className="back-btn" onClick={handleBack} aria-label="뒤로가기">
          ← <span className="back-text">뒤로</span>
        </button>
      )}
      <span className="header-title">Hessed</span>
    </header>
  );

  // 설문 헤더(타이틀, 진행률)
  const SurveyHeader = ({ step }) => (
    <div className="survey-header">
      <span className="survey-progress">{step} / 12</span>
    </div>
  );

  // 메인 페이지
  if (currentStep === 0) {
    return (
      <div className="app-bg">
        <Header showBack={false} />
        <main className="main-section">
          <img src={mainImg} alt="메인 일러스트" className="main-illust" />
          <div className="main-big-title">나는 어떤 제자?</div>
          <div className="main-title">나와 가장 가까운 제자는</div>
          <div className="main-desc">도대체 이 사람은 누구일까?</div>
          <button className="main-start-btn" onClick={handleStart}>
            테스트 시작!
          </button>
        </main>
      </div>
    );
  }

  // 설문 페이지
  if (currentStep >= 1 && currentStep <= 11) {
    const currentQuestion = surveyData[currentStep - 1];
    return (
      <div className="app-bg">
        <Header showBack={true} />
        <div className="survey-progress-bar">
          <div className="survey-progress-fill" style={{ width: `${(currentStep/12)*100}%` }} />
        </div>
        <SurveyHeader step={currentStep} />
        
        <main className="survey-section">
          <div className='survey-image-container'>
            <img src={currentQuestion.image} alt="질문 이미지" className="survey-q-image" />
          </div>
          <div className="survey-q-title">{currentQuestion.question}</div>
          <div className="survey-options-col">
            {currentQuestion.options.map((opt, idx) => (
              <button
                key={idx}
                className="survey-option-btn"
                onClick={() => handleOptionSelect(idx)}
              >
                <span className="survey-option-main">{opt}</span>
              </button>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // 결과 페이지
  if (currentStep === 12) {
    return (
      <div className="app-bg">
        <Header showBack={false} />
        <main className="main-section">
          <img src={result?.image} alt="결과 이미지" className="result-image" width={200} height={200} />
          <div className="result-title">{result?.title}</div>
          <div className="result-description">{result?.description}</div>
          <div className="result-description">{result?.bible}</div>
          <button className="button share-btn" onClick={handleShare}>
            공유하기
          </button>
          <button className="button go-main-btn" onClick={handleGoMain}>
            메인으로
          </button>
        </main>
      </div>
    );
  }

  return null;
}

export default App; 