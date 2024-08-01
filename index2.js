const change_prop=document.getElementsByClassName('fruit');
console.log(change_prop[1])
change_prop[2].style.backgroundColor = 'yellow';
for(let i=0;i<change_prop.length;i++){
    change_prop[i].style.fontWeight='bold';
}