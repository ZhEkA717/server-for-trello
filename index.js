
const str = 'localhost:5000/api/task/id1/id2';

const id = str.split('/');
const id1 = id[id.length-2];

console.log(id1);

