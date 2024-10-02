const list =document.getElementById('list');
const creatBtn = document.getElementById('create-btn');

let todos = [];
//클릭 했을 때 todos 들이 추가 되도록 이벤트 등록
creatBtn.addEventListener('click', createNewTodo);
//createNewTodo 함수 정의
function createNewTodo() {
    //todos에 들어갈 객체 데이터
    const item = {id: new Date().getTime(), 
                  text: '', 
                  completed: false
                }


                //배열에 새로운 아이템 추가 unshift(앞쪽) 뒤에 추가는 push메소드 사용
    todos.unshift(item);

    

   //
    const {itemEl ,inputEl, removeBtnEl, editBtnEl} = creatTodoElement(item);

    //list에 아이템 추가
    list.prepend(itemEl);

  
                //inputEl에 타이핑 하기 위한 작업
    inputEl.removeAttribute('disabled');
    inputEl.addEventListener('input',() => {})           
    inputEl.focus();

    saveTodos();
}


// todos에 추가할 아이템의 요소들
function creatTodoElement(item) {
    //div 요소
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');
    //checkbox input요소
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.completed;

    
    checkboxEl.classList.add('checkbox');
    //input text 요소 (todos 제목들)
    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled','');
    inputEl.classList.add('inputbox');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons-remove-btn');
    removeBtnEl.innerText = 'remove';
    
    //actionsEl에 추가
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    //itemEl에 추가
    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);

    //input 이벤트
    inputEl.addEventListener('input',() => {
        //input의 value 자체가 item의 text
        item.text = inputEl.value;
        // 타이핑을 할 때 마다 데이터를 저장하게 됨
        saveTodos();
    //blur 이벤트 
    }) 
    inputEl.addEventListener('blur',() => {
        inputEl.setAttribute('disabled', '');
        saveTodos();
    })
    //체크 박스 이벤트
    checkboxEl.addEventListener('change', ()=> {
        item.completed = checkboxEl.checked;

        if (item.completed) {
            itemEl.classList.add('completed');
            
        }
            else {
                itemEl.classList.remove('completed');
                
            }
            saveTodos();
    })
    
    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
        saveTodos();
    })
    //제거 버튼 이벤트
    removeBtnEl.addEventListener('click', () => {
        //데이터 지우기 item.id (remove버튼을 클릭한 item)이 아닌 t.id 로 새 배열
        todos = todos.filter( t => t.id !== item.id)
        //요소 지우기
        itemEl.remove()
        saveTodos();
    });
    return {itemEl ,inputEl, removeBtnEl, editBtnEl};

}
//데이터 저장하기 브라우저의 local storage에 저장
function saveTodos() {
    const data = JSON.stringify(todos);
    window.localStorage.setItem('myTodos',data)
}
//데이터 불러오기 
function loadTodos() {

    const data = localStorage.getItem('myTodos');

    if(data) {
        //string화 된 데이터를 object화
        todos = JSON.parse(data);
        
    }
}

//새로 고침했을 때 브라우저에 표시 하면서 데이터 불러오기
function displayTodos() {
    loadTodos();
    for (let i = 0 ; i < todos.length; i++) {
        const item = todos[i];
        const { itemEl } = creatTodoElement(item);
        list.append(itemEl);
    }
}

displayTodos();