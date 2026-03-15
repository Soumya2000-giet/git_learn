const new_sub_heding = document.createElement('h3');
const new_text = document.createTextNode('Buy high quality organic fruits online');
new_sub_heding.appendChild(new_text);
new_sub_heding.style.fontStyle='italic';


const get_div = document.querySelector('div');
get_div.appendChild(new_sub_heding)

const new_paragraph= document.createElement('p');
const p_text = document.createTextNode('Total fruits: 4');
new_paragraph.appendChild(p_text);


const get_div_list = document.querySelectorAll('div');
const get_second_div = get_div_list[1]
const get_class = document.querySelector('.fruits')
get_second_div.insertBefore(new_paragraph,get_class)
new_paragraph.id='fruits-total'