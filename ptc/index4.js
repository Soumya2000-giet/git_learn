const change_heading=document.querySelector('#main-heading');
change_heading.style.textAlign='right';
const change_basket=document.querySelector('#basket-heading');
change_basket.style.color='brown';
const change_class_bg=document.querySelector('.fruits');
change_class_bg.style.backgroundColor ='gray';
change_class_bg.style.marging='50px'
change_class_bg.style.padding='50px'
change_class_bg.style.listStyleType = 'none'
const change_class_prop=document.querySelectorAll('.fruit');

for(let i=0;i<change_class_prop.length;i++){
    change_class_prop[i].style.backgroundColor='white'
    change_class_prop[i].style.color='brown'
    change_class_prop[i].style.padding='5px';
    change_class_prop[i].style.marging='5px';
    
}

const change_class_prop2=document.querySelectorAll('.fruit:nth-child(even)');

for(let i=0;i<change_class_prop2.length;i++){
    change_class_prop2[i].style.backgroundColor='brown'
    change_class_prop2[i].style.color='white'
    change_class_prop2[i].style.padding='5px';
    change_class_prop2[i].style.marging='5px';
    
}