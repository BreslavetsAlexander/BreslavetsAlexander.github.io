(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(15)},15:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),c=n(3),s=n.n(c),i=n(1),r=n(4),l=n(5),m=n(7),u=n(6),d=n(8),h=function(e){return a.a.createElement("div",{className:"btn-group btn-block"},a.a.createElement("button",{type:"button",onClick:e.doneItems,className:"btn btn-success"},"Done"),a.a.createElement("button",{type:"button",onClick:e.restoreItems,className:"btn btn-info"},"Restore"),a.a.createElement("button",{type:"button",onClick:e.removeItems,className:"btn btn-danger"},"Remove"))},b=function(e){return a.a.createElement("div",{className:"input-group"},a.a.createElement("div",{className:"input-group-prepend"},a.a.createElement("span",null,a.a.createElement("button",{onClick:e.selectAll,className:"btn btn-outline-primary",type:"button",style:{marginRight:"5px"}},"Select all"))),a.a.createElement("input",{type:"text",onKeyDown:function(t){return e.addItem(t)},className:"form-control"}))},I=n(9),v={item:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"15px 1.25rem",borderTop:"1px solid #ccc"},todoDone:{textDecoration:"line-through",fontStyle:"italic",color:"gray"}},k=function(e){return a.a.createElement("li",{className:"item",style:v.item},a.a.createElement("input",{checked:e.item.checked,onChange:e.checkItem,style:{margin:0},className:"form-check-input",type:"checkbox",id:e.item.title+Date.now()}),a.a.createElement("label",{style:Object(I.a)({margin:"-4.8px 0 0 15px"},e.item.done?v.todoDone:null),className:"form-check-label",htmlFor:e.item.title+Date.now()},e.item.title),a.a.createElement("button",{onClick:e.doneItem,type:"button",style:{float:"right",display:e.item.done?"none":"block"},className:"btn btn-outline-success"},"Done"),a.a.createElement("div",{style:{float:"right",display:e.item.done?"block":"none"}},a.a.createElement("button",{onClick:e.removeItem,type:"button",className:"btn btn-outline-danger"},"Remove"),a.a.createElement("button",{onClick:e.restoreItem,type:"button",className:"btn btn-outline-info"},"Restore")))},f=function(e){return a.a.createElement("ul",{className:"list-group list-group-flush"},e.toDoItems.map(function(t,n){return a.a.createElement(k,{key:n,item:t,checkItem:function(){return e.checkItem(n)},doneItem:function(){return e.doneItem(n)},restoreItem:function(){return e.restoreItem(n)},removeItem:function(){return e.removeItem(n)}})}))},p=function(e){function t(){var e,n;Object(r.a)(this,t);for(var o=arguments.length,a=new Array(o),c=0;c<o;c++)a[c]=arguments[c];return(n=Object(m.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(a)))).state={toDoItems:[{title:"React",done:!1,checked:!1},{title:"In",done:!1,checked:!1},{title:"Action",done:!1,checked:!1}]},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"addItem",value:function(e){if(13===e.keyCode&&e.target.value.trim().length){var t=Object(i.a)(this.state.toDoItems);t.unshift({title:e.target.value,done:!1,checked:!1}),this.setState({toDoItems:t}),e.target.value=""}}},{key:"checkItem",value:function(e){var t=Object(i.a)(this.state.toDoItems);t[e].checked=!t[e].checked,this.setState({toDoItems:t})}},{key:"doneItem",value:function(e){var t=Object(i.a)(this.state.toDoItems);t[e].done=!0,this.setState({toDoItems:t})}},{key:"restoreItem",value:function(e){var t=Object(i.a)(this.state.toDoItems);t[e].done=!1,this.setState({toDoItems:t})}},{key:"removeItem",value:function(e){var t=Object(i.a)(this.state.toDoItems);t.splice(e,1),this.setState({toDoItems:t})}},{key:"selectAll",value:function(){var e=Object(i.a)(this.state.toDoItems);e.forEach(function(e){e.checked=!0}),this.setState({toDoItems:e})}},{key:"doneItems",value:function(){var e=Object(i.a)(this.state.toDoItems);e.forEach(function(e){e.checked&&(e.done=!0,e.checked=!1)}),this.setState({toDoItems:e})}},{key:"restoreItems",value:function(){var e=Object(i.a)(this.state.toDoItems);e.forEach(function(e){e.checked&&(e.done=!1,e.checked=!1)}),this.setState({toDoItems:e})}},{key:"removeItems",value:function(){var e=Object(i.a)(this.state.toDoItems);e=e.filter(function(e){return!e.checked}),this.setState({toDoItems:e})}},{key:"activePanel",value:function(){var e=0;return this.state.toDoItems.forEach(function(t){t.checked&&e++}),e<1?a.a.createElement(b,{selectAll:this.selectAll.bind(this),addItem:this.addItem.bind(this)}):a.a.createElement(h,{doneItems:this.doneItems.bind(this),restoreItems:this.restoreItems.bind(this),removeItems:this.removeItems.bind(this)})}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"card",style:{marginTop:"10px"}},a.a.createElement("div",{className:"card-header"},a.a.createElement("h4",{className:"card-title"},"Todo React application")),a.a.createElement("div",{className:"card-body"},this.activePanel()),a.a.createElement(f,{toDoItems:this.state.toDoItems,checkItem:this.checkItem.bind(this),doneItem:this.doneItem.bind(this),restoreItem:this.restoreItem.bind(this),removeItem:this.removeItem.bind(this)})))}}]),t}(a.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(a.a.createElement(p,null),document.querySelector(".container")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[10,1,2]]]);
//# sourceMappingURL=main.3de8d5b8.chunk.js.map