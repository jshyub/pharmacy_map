"use strict";

// 1. 아이디 입력창 정보 가져오기
const joinId = document.getElementById('JOIN_ID');
// 2. 성공 메시지 정보 가져오기
let elSuccessMessage = document.querySelector('.success-message'); // div.success-message.hide
// 3. 실패 메시지 정보 가져오기 (글자수 제한 4~12글자)
let elFailureMessage = document.querySelector('.failure-message'); // div.failure-message.hide
// 4. 실패 메시지2 정보 가져오기 (영어 또는 숫자)
let elFailureMessageTwo = document.querySelector('.failure-message2'); // div.failure-message2.hide

// 1. 비밀번호 입력창 정보 가져오기
const joinPw = document.getElementById('JOIN_PW');
// 2. 비밀번호 확인 입력창 정보 가져오기
const joinCheckPw = document.getElementById('JOIN_CHECKPW');
// 3. 실패 메시지 정보 가져오기 (비밀번호 불일치)
let elMismatchMessage = document.querySelector('.mismatch-message'); // div.mismatch-message.hide
// 4. 실패 메시지 정보 가져오기 (8글자 이상, 영문, 숫자, 특수문자 미사용)
let elStrongPasswordMessage = document.querySelector('.strongPassword-message'); // div.strongPassword-message.hide

const joinEmail = document.getElementById('JOIN_EMAIL');
const joinBtn = document.getElementById('JOIN_BTN');


function idLength(joinId) {     // 아이디 유효성 검사
    return joinId.value.length >= 4 && joinId.value.length <= 12
}

function onlyNumberAndEnglish(joinPw) { // 비밀번호 유효성 검사
    return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(joinPw);
}

function strongPassword (joinCheckPw) { // 비번확인 유효성 검사
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(joinCheckPw);
}

function isMatch (joinPw, joinCheckPw) {    // 비번일치 유효성 검사
    return joinPw === joinCheckPw;
}

joinId.onkeyup = function () {
    // 값을 입력한 경우
    if (joinId.value.length !== 0) {
      // 영어 또는 숫자 외의 값을 입력했을 경우
      if(onlyNumberAndEnglish(joinId.value) === false) {
        elSuccessMessage.classList.add('hide');
        elFailureMessage.classList.add('hide');
        elFailureMessageTwo.classList.remove('hide'); // 영어 또는 숫자만 가능합니다
      }
      // 글자 수가 4~12글자가 아닐 경우
      else if(idLength(joinId .value) === false) {
        elSuccessMessage.classList.add('hide'); // 성공 메시지가 가려져야 함
        elFailureMessage.classList.remove('hide'); // 아이디는 4~12글자이어야 합니다
        elFailureMessageTwo.classList.add('hide'); // 실패 메시지2가 가려져야 함
      }
      // 조건을 모두 만족할 경우
      else if(idLength(joinId.value) || onlyNumberAndEnglish(elInputUsername.value)) {
        elSuccessMessage.classList.remove('hide'); // 사용할 수 있는 아이디입니다
        elFailureMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
        elFailureMessageTwo.classList.add('hide'); // 실패 메시지2가 가려져야 함
      }
    }
    // 값을 입력하지 않은 경우 (지웠을 때)
    // 모든 메시지를 가린다.
    else {
      elSuccessMessage.classList.add('hide');
      elFailureMessage.classList.add('hide');
      elFailureMessageTwo.classList.add('hide');
    }
}

joinPw.onkeyup = function () {

    // console.log(elInputPassword.value);
    // 값을 입력한 경우
    if (joinPw.value.length !== 0) {
      if(strongPassword(joinPw.value)) {
        elStrongPasswordMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
      }
      else {
        elStrongPasswordMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
      }
    }
    // 값을 입력하지 않은 경우 (지웠을 때)
    // 모든 메시지를 가린다.
    else {
      elStrongPasswordMessage.classList.add('hide');
    }
};

joinCheckPw.onkeyup = function () {
    // console.log(elInputPasswordRetype.value);
    if (joinCheckPw.value.length !== 0) {
      if(isMatch(joinPw.value, joinCheckPw.value)) {
        elMismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
      }
      else {
        elMismatchMessage.classList.remove('hide'); // 실패 메시지가 보여야 함
      }
    }
    else {
      elMismatchMessage.classList.add('hide'); // 실패 메시지가 가려져야 함
    }
};

function color() {  // 로그인 유효성 검사 후 로그인버튼 활성화
    if(joinId.value.length>0 && joinPw.value.length>=8 && joinEmail.value.indexOf("@")!==-1){    // 아이디의 길이가 1글자 이상이고, @가있어야하고, 패스워드가 5자리 이상일때
        joinBtn.style.backgroundColor = "#0095F6";
        joinBtn.disabled = false;
    }else{
        joinBtn.style.backgroundColor = "#C0DFFD";
        joinBtn.disabled = true;
    }
}

function moveToLogin(){  // 로그인후 이동경로
    if(joinId.value.length>0 && joinPw.value.length>=8 && joinEmail.value.indexOf("@")!==-1){    // 아이디의 길이가 1글자 이상이고, @가있어야하고, 패스워드가 5자리 이상일때
        location.replace("./login.html");
        alert("회원가입이 완료되었습니다.");
    }
      // 클릭후 로그인페이지
}

joinId.addEventListener('keyup', color);   // 입력후 버튼 활성화
joinPw.addEventListener('keyup', color);
joinEmail.addEventListener('keyup', color);
joinBtn.addEventListener('click',moveToLogin);  // 클릭후 로그인페이지