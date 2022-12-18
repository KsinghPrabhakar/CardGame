// let arr = [{name: 'mUkesh'}, {name:'Dheeraj'}, {name: 'Rohti'}, {name: 'Akash'}, {name: 'Nitish'}];

// let part = arr.slice(1,3)
// console.log(part);

// let arr = [9, 7, 2];

// let x = arr.sort();

// console.log('x is',x);
// console.log('arr is',arr);

let arr = [12, 7, 8]


const sortArr = (arr) => { // [9, 7, 6]
    let minIndex = 0;
    for(let i=0; i<arr.length - 1; i++){
        for(let j=i+1; j<arr.length; j++){
            if(arr[j]<arr[minIndex]){
                minIndex = j
            }
        }
        let temp = arr[i] // 9
        arr[i] = arr[minIndex] // 6
        arr[minIndex] = temp
    }
    
    return arr
}

let res = sortArr(arr)
console.log('res is',res);