var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping')
mongoose.Promise = require('bluebird')
Product.find(function(err, p){
    console.log(p);
})
// var product = [
//     new Product({
//         imagePath: '/images/star_wars_episode_6_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 10
//     }),
    
//     new Product({
//         imagePath: '/images/star_wars_episode_5_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 12
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_4_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 15
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_3_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 15
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_2_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 20
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_1_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 25
//     })
// ];
// var done = 0;
// for(var i = 0; i < product.length; i++){
//     product[i].save(function (err, result){
//         done++;
//         if(done === product.length){
//             exit();
//         }
//     });
// }
function exit(){
    mongoose.disconnect();
}