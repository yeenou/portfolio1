class Validation{
    constructor(el, arr){
        this.form = document.querySelector(el); 
        this.btnSubmit = this.form.querySelector("input[type=submit"); 
        
        arr.forEach(opt =>{
            //btnSubmit버튼을 클릭했을 때 
            this.btnSubmit.addEventListener("click", e=>{
                
                if(opt.type === "text"){
                    if(!this.isTxt(opt.name, opt.len)) e.preventDefault(); 
                }                
                if(opt.type === "email"){                    
                    if(!this.isEmail(opt.name)) e.preventDefault(); 
                }
                if(opt.type === "check"){
                    if(!this.isCheck(opt.name)) e.preventDefault();
                }
                if(opt.type === "select"){
                    if(!this.isSelect(opt.name)) e.preventDefault(); 
                }
                if(opt.type === "password"){
                    if(!this.isPwd(opt.name[0], opt.name[1], opt.len)) e.preventDefault(); 
                } 
                 
 
            }); 
        })
        
    }

  isTxt(name, len){

    //만약 입력받은 글자수가 없다면 5로 지정 
    if(len === undefined ) len = 5; 

    //해당 name값의 input요소를 찾음 
    let input = this.form.querySelector(`[name=${name}]`); 
    //해당 input요소의 value값 구함 
    let txt = input.value; 

    //입력받은 value값의 글자수가 len이상이라면 
    if(txt.length >= len){
        //일단 에러메시지 p요소가 있는지 판별 
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        //p요소가 있다면 제거하고 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove(); 

        //true값 반환하여 인증통과 
        return true; 

    //입력받은 value값의 글자수가 len개이상이 아닐경우
    }else{
        //일단 에러메시지 p요소가 있는지 판별 
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        //p요소가 있다면 제거하고 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove(); 

        //p태그로 에러메시지 새로 생성하여 해당 input요소의 부모 td의 뒤쪽에 삽입
        const errMsg = document.createElement("p"); 
        errMsg.append(`입력항목을 ${len}글자 이상 입력하세요`); 
        input.closest("td").append(errMsg); 

        //false값 반환하여 인증 막음 
        return false; 
    }
}


 isEmail(name){

    let input = this.form.querySelector(`[name=${name}]`); 
    let txt = input.value; 

    if(/@/.test(txt)){
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

        return true; 
    }else{
        const errMsgs = input.closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) input.closest("td").querySelector("p").remove();

        const errMsg = document.createElement("p"); 
        errMsg.append("@를 포함한 전체 이미일 주소를 입력하세요."); 
        input.closest("td").append(errMsg); 

        return false; 
    }
}



//check 인증함수 
  isCheck(name){
    //input갯수가 여러개이므로 유사배열로 받는다 
    let inputs = this.form.querySelectorAll(`[name=${name}]`); 
    //일단 isCheck 변수값을 false로 지정하고 
    let isCheck = false; 

    //input의 갯수만큼 반복을 돌면서 
    for(let el of inputs){
        //하나라도 체크되어있는 것이 있다면 isCheck 값을 true로 변경 
        if(el.checked) isCheck = true; 
    }

    //isCheck가 true라면 인증 통과 
    if(isCheck){
        //경고문구가 있는지 찾아서 있다면 삭제 처리 
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove(); 
        //리턴값으로 true 반환 
        return true; 

    //하나라도 체크가 되어 있지않아서 isCheck 가 false라면 
    }else{
        //경고문구 띄어주고 
        const errMsgs = inputs[0].closest("td").querySelectorAll("p"); 
        if(errMsgs.length >0) inputs[0].closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("필수 입력 항목을 체크해주세요"); 
        inputs[0].closest("td").append(errMsg); 

        //리턴값으로 false 반환 
        return false; 
    }
}


//select 인증함수 
 isSelect(name){
    //select 요소를 받아서 option중 선택된 요소의 순번을 찾아 value값 저장 
    let sel = this.form.querySelector(`[name=${name}]`); 
    let sel_index = sel.options.selectedIndex; 
    let val = sel[sel_index].value; 

    //option을 선택했다면 
    if(val !==""){
        const errMsgs = sel.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = sel.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) sel.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append("항목을 선택해 주세요"); 
        sel.closest("td").append(errMsg); 

        return false; 
    }

}



//password 인증함수 
  isPwd(name1, name2, len){

    //두개의 비밀번호 값을 저장 
    let pwd1 = this.form.querySelector(`[name=${name1}]`); 
    let pwd2 = this.form.querySelector(`[name=${name2}]`); 
    let pwd1_val = pwd1.value; 
    let pwd2_val = pwd2.value; 

    //숫자,문자,특수문자 조건을 정규표현식으로 저장 
    const num = /[0-9]/; 
    const eng = /[a-zA-Z]/; 
    const spc = /[~!@#$%^&*()_+?><]/;

    //두개의 비밀번호 같고, 비밀번호의 글자수가 len개 이상이고 
    //비밀번호에 num, eng, spc 가 포함되어 있다면 
    if(pwd1_val === pwd2_val && pwd1_val.length >= len && num.test(pwd1_val) && eng.test(pwd1_val) && spc.test(pwd1_val)){

        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove(); 

        return true; 
    }else{
        const errMsgs = pwd1.closest("td").querySelectorAll("p"); 
        if(errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove(); 

        const errMsg = document.createElement("p"); 
        errMsg.append(`비밀번호는 ${len}글자 이상, 영문,숫자,특수문자를 포함하여 동일하게 입력하세요`); 
        pwd1.closest("td").append(errMsg); 

        return false; 
    }
}


}
