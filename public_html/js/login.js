"use strict";

const loginId = document.getElementById('LOGIN_ID');
const loginPw = document.getElementById('LOGIN_PW');
const loginBtn = document.getElementById('LOGIN_BTN');
const joinBtn = document.getElementById('JOIN_BTN');

function color() {  // 로그인 유효성 검사 후 로그인버튼 활성화
    if((loginId.value.length>0 && loginId.value.indexOf("@")!==-1) 
        && loginPw.value.length>=5){    // 아이디의 길이가 1글자 이상이고, @가있어야하고, 패스워드가 5자리 이상일때
        loginBtn.style.backgroundColor = "#0095F6";
        loginBtn.disabled = false;
    }else{
        loginBtn.style.backgroundColor = "#C0DFFD";
        loginBtn.disabled = true;
    }
}

function moveToMain(){  // 로그인후 이동경로
    if((loginId.value.length>0 && loginId.value.indexOf("@")!==-1) 
        && loginPw.value.length>=5){    // 아이디의 길이가 1글자 이상이고, @가있어야하고, 패스워드가 5자리 이상일때
        location.replace("./simpleShop.html");  // 클릭후 메인페이지
        alert(loginId.value + "님 방문을 환영합니다.");
    }  
}

function moveToJoin(){
    location.replace("./join.html");
}
loginId.addEventListener('keyup', color);   // 입력후 버튼 활성화
loginPw.addEventListener('keyup', color);
loginBtn.addEventListener('click',moveToMain);  // 클릭후 메인페이지
joinBtn.addEventListener('click',moveToJoin);   // 클릭후 회원가입 페이지


