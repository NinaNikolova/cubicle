const uniqid = require('uniqid');
const cubes = [
    {
        id:'1e0lobdcwli31wf7f',
        name:'Gan356 Air SM',
        imageUrl:'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg',
        description:'Some description here',
        difficultyLevel: 3
    },
    {
        id:'1e0lobdcwli31wf9f',
        name:'Eco-Dark',
        imageUrl:'https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg',
        description:'Some description here',
        difficultyLevel: 2
    },
    {
        id:'5e0lobdcwli31wf9f',
        name:'Pyraminx',
        imageUrl:'https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg',
        description:'Some description here',
        difficultyLevel: 5
    },

];

exports.getAll = ()=> cubes.slice();

exports.getOne = (cubeId)=>cubes.find(x=>x.id==cubeId)
exports.create = (cubeData) => {
    const newCube = {id: uniqid(),...cubeData}
    cubes.push(newCube)
    return newCube;
}