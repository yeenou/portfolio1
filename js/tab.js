const dts = document.querySelectorAll("dt"); 
const dds = document.querySelectorAll("dd"); 
const dts_a = document.querySelectorAll("dt>a"); 

//dts_a의 갯수만큼 반복을 돌면서 이벤트 바인딩 
dts_a.forEach((el, index)=>{
    //dts에 focusin이 될때 
   el.addEventListener("focusin", ()=>{
       //같은 요소에 중복이벤트가 발생하지 않으므로 isOn은 필요없음 
       //활성화 함수 호출 
       activation(dts, index); 
       activation(dds, index); 
   })
})




//dt의 갯수만큼 반복을 돌면서 dt에 이벤트를 바인딩 
dts.forEach((dt, index)=>{

   //dt를 클릭했을 때 
   dt.addEventListener("click", e=>{
       e.preventDefault(); //기본링크이동방지 

      // console.log(index); 
      //버튼을 클릭했을 때 활성화가 되어있는지 판별하여 
      //이미 활성화되어있다면 아래 함수 호출하지않고 종료 
       let isOn = e.currentTarget.classList.contains("on"); 
       if(isOn) return; 

      activation(dts, index);        
      activation(dds, index); 
   });
});


//활성화 함수 정의
//반복을 돌면서 모든 dt,dd에 on을 제거하고 
//해당순번의 dt,dd에 on 추가 
function activation(items, index){
   for(let el of items){
       el.classList.remove("on"); 
   }
   items[index].classList.add("on"); 
} 