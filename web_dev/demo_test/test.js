var findminimumnumber = (arr) => {
        
    let min_element =arr[0];
    for(let ele of arr){
        if(ele<min_element){
            min_element=ele;
        }
    }
    return min_element;
       
  }
  
  async function readInput() {
          let inputString = '';
          var output=[];
          process.stdin.on('data', inputStdin => {
              inputString += inputStdin;
              const inputArr = inputString.split(/(?:\r\n|\r|\n)/g)
              output = findminimumnumber(inputArr[0].split(','));
              console.log(output.trim());
              process.exit();
              
          })
          
  
  }
  readInput();