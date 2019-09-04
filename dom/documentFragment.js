var list1 = document.getElementById('list1');
console.time('time');
var fragment = document.createDocumentFragment();
for (var i = 0; i < 500000; i++) {
  fragment.appendChild(document.createElement('li'));
}
list1.appendChild(fragment);
console.timeEnd('time');

// list1.parentElement.removeChild(list1);

var list = document.getElementById('list');
console.time('time');
for (var i = 0; i < 500000; i++) {
  list.appendChild(document.createElement('li'));
}
console.timeEnd('time');

// list.parentElement.removeChild(list);

console.time('time');
let list2 = document.createElement('ul');
for (var i = 0; i < 500000; i++) {
  list2.appendChild(document.createElement('li'));
}
document.querySelector('body').appendChild(list2);
console.timeEnd('time');
