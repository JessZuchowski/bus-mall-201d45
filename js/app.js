'use strict';

//Global variables
//var NUMBER_OF_CLICKS is static, the_catalog will be an array. Creating an item_container for the main body of the page. Created items at three positions by item Id. Declares vars for displayed_items.
var NUMBER_OF_CLICKS = 25;
var the_catalog = [];

var item_container = document.body;

var item_left = document.getElementById('item_left');
var item_center = document.getElementById('item_center');
var item_right = document.getElementById('item_right');

//Item Constructor: includes item name, url, click count, and appeared. Pushes to the_catalog.
var Item = function(name, url){
  this.name = name;
  this.url = url;
  this.clicks = 0;
  this.appeared = 0;

  the_catalog.push(this); 
};
Item.prototype.render_as_image = function(target_img){
  target_img.src = this.url;
};

//Init Area: put three items on page, listen for clicks, create all items.
new Item('Bag', './img/bag.jpg');
new Item('Banana', './img/banana.jpg');
new Item('Bathroom', './img/bathroom.jpg');
new Item('Boots', './img/boots.jpg');
new Item('Breakfast', './img/breakfast.jpg');
new Item('Bubblegum', './img/bubblegum.jpg');
new Item('Chair', './img/chair.jpg');
new Item('Cthulhu', './img/cthulhu.jpg');
new Item('Dog-Duck', './img/dog-duck.jpg');
new Item('Dragon', './img/dragon.jpg');
new Item('Pen', './img/pen.jpg');
new Item('Pet-Sweep', './img/pet-sweep.jpg');
new Item('Scissors', './img/scissors.jpg');
new Item('Shark', './img/shark.jpg');
new Item('Sweep', './img/sweep.png');
new Item('Tauntaun', './img/tauntaun.jpg');
new Item('Unicorn', './img/unicorn.jpg');
new Item('USB', './img/usb.gif');
new Item('Water-Can', './img/water-can.jpg');
new Item('Wine-Glass', './img/wine-glass.jpg');

var displayed_item_left = the_catalog[0];
var displayed_item_center = the_catalog[1];
var displayed_item_right = the_catalog[2];


//Event Handler: tallies votes and total clicks.
function handle_item_click (event) {
  NUMBER_OF_CLICKS--; //decrements clicks
  if(event.target.id === 'item_left'){
    displayed_item_left.clicks++;
  }
  if(event.target.id === 'item_center'){
    displayed_item_center.clicks++; 

  }
  if(event.target.id === 'item_right'){
    displayed_item_right.clicks++;

  }

  console.log('clicked');

  if (NUMBER_OF_CLICKS <= 0) {
    item_container.removeEventListener('click', handle_item_click);
  }
  

//Pick new items using random integers times the length of the_catalog.
  var random_left = Math.floor(Math.random() * the_catalog.length);
  var random_center = Math.floor(Math.random() * the_catalog.length);
  var random_right = Math.floor(Math.random() * the_catalog.length);
//Update currently displayed items. Tied to the_catalog array, not images. 
  the_catalog[random_left].render_as_image(item_left);
  the_catalog[random_center].render_as_image(item_center);
  the_catalog[random_right].render_as_image(item_right);

//Call render function for 3 new items using catalog index and ids. 
  displayed_item_left = the_catalog[random_left];
  displayed_item_center = the_catalog[random_center];
  displayed_item_right = the_catalog[random_right];
}

item_container.addEventListener('click', handle_item_click);


//=======Chart.js=======

var canvas_el = document.getElementById('voteResults');
var ctx = canvas_el.getContext('2d');

var vote_data = [];
for(var i = 0; i <the_catalog.length; i++){
  vote_data.push(the_catalog[i].clicks)
}

var myChart = new myChart(ctx, {
  type: 'bar',
  data: {
    labels: ['R2D2 Bag', 'Banana Slicer', 'Bathroom Stand', 'Boots', 'Breakfast Station', 'Meatball Bubblegum', 'Chair', 'Cthulhu', 'Dog Duck Bill', 'Dragon Meat', 'Pen Cutlery', 'Pet Sweeper', 'Pizza Scissors', 'Shark Sleeping Bag', 'Baby Sweeper', 'Tauntaun Sleeping Bag', 'Unicorn Meat', 'USB Tentacle', 'Watering Can', 'Wine Glass'],
    datasets: [{
      label: 'Focus Group Votes',
      data: vote_data,
      backgroundColor: [
        'grey',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: ['rgba(255,99,132,1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
      'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    animation: {
      easing: 'easeInCirc',
      duration: 1000
    }
  }
});


