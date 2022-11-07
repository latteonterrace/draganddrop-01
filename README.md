# Drag & Drop 

이 예제에서는 \<p\> 요소를 드래그하여 target \<div\>에 이동시킵니다. 

* dragstart 핸들러에서 setData()를 사용하여 DataTransfer 오브젝트에 \<p\> 요소의 id를 추가합니다. 
* drop 핸들러에서 id를 가져와서 그것을 사용하여 \<p\>요소를 target로 옮깁니다. 



## HTML 작성 

드래그할 대상을 다음과 같이 작성하세요.  draggable="true"로 설정하세요. 
```html
<div>
    <p id="source" draggable="true">
     이 요소를 선택하세요. 이것을 drop zone으로 드래그한 다음에 놓으세요.  그러면 이 요소가 이동합니다. 
    </p>
</div>
```


드래그한 요소가 드랍될 요소를 다음과 같이 작성하세요.  draggable 속성은 필요 없습니다.  
```html
<div id="target">Drop Zone</div>
```


## CSS 작성 
CSS를 다음과 같이 작성합니다.  
```css
div {
    margin: 0.5em 0;
    padding: 2em;
}

#target,
#source {
    border: 1px solid black;
    padding: 0.5rem;
}

.dragging {
    background-color: pink;
}
```  



## 이벤트 
드래그 앤 드랍 시 발생하는 이벤트들은 다음 표와 같습니다. 

| 이벤트 | 설명                                                                           |
|-----------|--------------------------------------------------------------------------------|
| dragstart | 객체(object)를 드래그하려고 시작할 때 발생                                          |
| drag      | 대상 객체를 드래그하면서 마우스를 움직일 때 발생                                               |
| dragenter | 마우스가 대상 객체의 위로 처음 진입할 때 발생                                                |
| dragover  | 드래그하면서 마우스가 대상 객체의 영역 위에 자리 잡고 있을 때 발생                                    |
| drop      | 드래그가 끝나서 드래그하던 객체를 놓는 장소에 위치한 객체에서 발생. 리스너는 드래그된 데이터를 가져와서 드롭 위치에 놓는 역할 |
| dragleave | 드래그가 끝나서 마우스가 대상 객체의 위에서 벗어날 때 발생                                         |
| dragend   | 대상 객체를 드래그하다가 마우스 버튼을 놓는 순간 발생                                            |


이제 이벤트드를 사용해 보겠습니다.  


### 드래그 시작 
source 요소에 "dragstart" 이벤트 리스너를 추가합니다. 이제 source 요소를 드래그를 클릭하여 드래그를 시작하면 "dragStart"가 콘솔에 출력됩니다. 

```jsx
// 드래그할 대상 
const source = document.querySelector("#source");
source.addEventListener("dragstart", (ev) => {
    console.log("dragStart");
});
```

### 드래그중 
드래그가 시작된 다음에 마우스를 계속 움직이면 "drag"가 계속해서 콘솔에 출력됩니다. 
```jsx
source.addEventListener("drag", (e) => { 
    e.preventDefault();
    console.log("drag");
});
```


### 드래그 끝 
드래그를 하다가 마우슬 놓으면 "dragend" 이벤트가 발생합니다. 
```jsx
source.addEventListener("dragend", (e) => { 
    e.preventDefault();
    console.log("dragend");
});
```




### 드래그 대상 진입 
드래그하여 드랍할 위치에 들어가면 dragenter 이벤트가 발생합니다. 
```jsx
// 드랍될 대상 
const target = document.querySelector("#target");
target.addEventListener("dragenter", (ev) => {
    console.log("dragEnter");
    ev.preventDefault();
});
```

### 드랍 대상 위에 있음
드랍할 대상위에 있으면 dragover 이벤트가 발생합니다. 
```jsx
target.addEventListener("dragover", (ev) => {
     console.log("dragOver");
    ev.preventDefault();
});
```

### 드랍 위치를 떠남 
드랍할 대상 위치 위에 있다가 떠나면 dragLeave 이벤트가 발생합니다. 
```jsx
target.addEventListener("dragleave", (ev) => {
    console.log("dragLeave");
    ev.preventDefault();
});
```

### 드랍 
드랍할 대상 위에서 마우스를 놓으면 drop 이벤트가 발생합니다. 
```jsx
target.addEventListener("drop", (ev) => {
    console.log("Drop");
    ev.preventDefault();
});
```

## 데이터 전송
드래그 앤 드롭 시 데이터를 전송하려면 DataTransfer.setData()를 이용합니다. 

**Syntax**    
```
setData(format, data)
```
* format - drag object에 추가될 drag data의 타입 문자열
* data - drag object에 추가될 data를 나타내는 문자열 

데이터를 꺼내 올 때는 getData(format)를 사용합니다. 


드래그를 시작할 때 clearData()를 먼저 호출하고 setData()에 drag data를 설정한다. 다음은 source 요소인 id를 drag data로 설정합니다. 
```jsx
const source = document.querySelector("#source");
source.addEventListener("dragstart", (ev) => {
  ev.dataTransfer.clearData();
  ev.dataTransfer.setData("text/plain", ev.target.id);
});
```
drag data를 꺼내올 때 getData()로 꺼내온다. ev.target.appendChild()를 사용하여 이동 시킵니다. 

```jsx
target.addEventListener("drop", (ev) => {
  const data = ev.dataTransfer.getData("text");
  const source = document.getElementById(data);
  ev.target.appendChild(source);
});
```


## Drag Types 
HTML 드래그 앤 드롭 API는 일반 텍스트, URL, HTML 코드, 파일 등을 포함한 다양한 유형의 데이터 드래그를 지원합니다. 이 문서에서는 일반적인 드래그 가능한 데이터 유형에 대한 모범 사례를 설명합니다.

자세한 사항은  [Recommended Drag Types](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Recommended_drag_types)을 참고합니다.

### Text
```jsx
event.dataTransfer.setData("text/plain", "This is text to drag");
```

### Links
```jsx
const dt = event.dataTransfer;
dt.setData("text/uri-list", "https://www.mozilla.org");
dt.setData("text/plain", "https://www.mozilla.org");
```


### HTML and XML 
```jsx
const dt = event.dataTransfer;
dt.setData("text/html", "Hello there, <strong>stranger</strong>");
dt.setData("text/plain", "Hello there, stranger");
```


















