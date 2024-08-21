// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    const form = document.querySelector('form');
    
    // Create a new input element for the fruit description
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.name = 'description';
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'Description of the fruit...';
    descriptionInput.style.height = '35px';
    descriptionInput.style.width = '40%';
    descriptionInput.style.border = '2px solid yellowgreen';
    descriptionInput.style.borderRadius = '5px';
    descriptionInput.style.marginTop = '5px';
    
    // Insert the new input element before the submit button
    form.insertBefore(descriptionInput, form.querySelector('button'));
    
    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        
        // Get the fruit name and description from the form inputs
        const fruitName = document.getElementById('fruit-to-add').value;
        const fruitDescription = document.getElementById('description').value;
        
        if (fruitName) {
            // Create a new list item for the fruit
            const newFruit = document.createElement('li');
            newFruit.classList.add('fruit');
            newFruit.innerHTML = `${fruitName}<br><p>${fruitDescription}</p><button class="delete-btn">x</button>`;
            
            // Add the new fruit to the list
            document.querySelector('ul.fruits').appendChild(newFruit);
            
            // Clear the input fields
            document.getElementById('fruit-to-add').value = '';
            document.getElementById('description').value = '';
        }
    });
    
    // Function to filter the fruits
    function filterFruits() {
        const filterText = document.getElementById('filter').value.toLowerCase();
        const fruits = document.querySelectorAll('ul.fruits .fruit');
        
        fruits.forEach(fruit => {
            const fruitName = fruit.textContent.toLowerCase();
            const fruitDescription = fruit.querySelector('p').textContent.toLowerCase();
            if (fruitName.includes(filterText) || fruitDescription.includes(filterText)) {
                fruit.style.display = '';
            } else {
                fruit.style.display = 'none';
            }
        });
    }
    
    // Attach the filter function to the input field
    document.getElementById('filter').addEventListener('input', filterFruits);
    
    // Handle fruit deletion
    document.querySelector('ul.fruits').addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            event.target.parentElement.remove();
        }
    });
});
