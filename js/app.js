'use strict';

//Global variables
//var NUMBER_OF_CLICKS is static, the_catalog will be an array. Creating an item_container for the main body of the page. Created items at three positions by item Id. Declares vars for displayed_items.
var NUMBER_OF_CLICKS = 5;
var the_catalog = [];

var item_container = document.getElementById('all_items');

var displayed_item_left;
var left_img = document.getElementById('item_left_img');
var left_h2 = document.getElementById('item_left_h2');

var displayed_item_center;
var center_img = document.getElementById('item_center_img');
var center_h2 = document.getElementById('item_center_h2');

var displayed_item_right;
var right_img = document.getElementById('item_right_img');
var right_h2 = document.getElementById('item_right_h2');

//Item Constructor: includes item name, url, click count, and appeared. Pushes to the_catalog.
var Item = function(name, url){
  this.name = name;
  this.url = url;
  this.clicked_on_count = 0;
  this.appeared = 0;

  the_catalog.push(this); 
};

var render_item = function(item, target_img, target_h2){
  target_img.src = item.url;
  target_h2.textContent = item.name;
};

var render_item_chart = function () {
  var canvas_el = document.getElementById('vote_chart');
  var ctx = canvas_el.getContext('2d');

  var item_click_data = [];
  var item_click_labels = [];

  for (var i = 0; i < the_catalog.length; i++) {
    item_click_data.push(the_catalog[i].clicked_on_count);
    item_click_labels.push(the_catalog[i].name);
  }
  render_vote_chart(item_click_data, item_click_labels, 'Vote Results', ctx);
};

var render_vote_chart = function(data, labels, title, ctx){
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['item_click_labels'],
      datasets: [{
        label: 'Focus Group Vote Results',
        data: ['item_click_data'],
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
  })
};

var pick_new_items = function(){
  //Pick new items using random integers times the length of the_catalog.
  var random_left_idx = Math.floor(Math.random() * the_catalog.length);
  var random_center_idx = Math.floor(Math.random() * the_catalog.length);
  var random_right_idx = Math.floor(Math.random() * the_catalog.length);

  displayed_item_left = the_catalog[random_left_idx];
  displayed_item_center = the_catalog[random_center_idx];
  displayed_item_right = the_catalog[random_right_idx];

  render_item(the_catalog[random_left_idx], left_img, left_h2);
  render_item(the_catalog[random_center_idx], center_img, center_h2);
  render_item(the_catalog[random_right_idx], right_img, right_h2);
};

var increase_item_clicks = function(item_image_id){
  if (item_image_id === 'item_left_img') {
    displayed_item_left.clicked_on_count++;
  } else if (item_image_id === 'item_center_img') {
    displayed_item_center.clicked_on_count++;
  } else if (item_image_id === 'item_right_img') {
    displayed_item_right.clicked_on_count++;
  }
};

var handle_item_click = function(event){
  if(event.target.tagName === 'IMG'){
    increase_item_clicks(event.target.id);

    if (NUMBER_OF_CLICKS <= 0) {
      item_container.removeEventListener('click', handle_item_click);
      render_item_chart();

      var string_items = JSON.stringify(the_catalog);
      localStorage.setItem('all_items', string_items);
      console.log('Vote results saved to local storage.');
    } else {
      NUMBER_OF_CLICKS--;
      pick_new_items();
    }
  }
};

//Init Area: put three items on page, listen for clicks, create all items.
if(localStorage.getItem('all_items')){
  var string_items = localStorage.getItem('all_items');
  the_catalog = JSON.parse(string_items);
  console.log(`retreived ${the_catalog.length} from local storage.`);
}else {
  new Item('R2D2 Bag', './img/bag.jpg');
  new Item('Banana Slicer', './img/banana.jpg');
  new Item('Bathroom Stand', './img/bathroom.jpg');
  new Item('Rain Boots', './img/boots.jpg');
  new Item('Breakfast Station', './img/breakfast.jpg');
  new Item('Meatball Bubblegum', './img/bubblegum.jpg');
  new Item('Chair', './img/chair.jpg');
  new Item('Cthulhu', './img/cthulhu.jpg');
  new Item('Dog Duck Bill', './img/dog-duck.jpg');
  new Item('Dragon Meat', './img/dragon.jpg');
  new Item('Pen Cuttlery', './img/pen.jpg');
  new Item('Pet-Sweep', './img/pet-sweep.jpg');
  new Item('Pizza Scissors', './img/scissors.jpg');
  new Item('Shark Sleeping Bag', './img/shark.jpg');
  new Item('Baby Sweep', './img/sweep.png');
  new Item('Tauntaun Sleeping Bag', './img/tauntaun.jpg');
  new Item('Unicorn Meat', './img/unicorn.jpg');
  new Item('USB Tentacle', './img/usb.gif');
  new Item('Watering Can', './img/water-can.jpg');
  new Item('Wine Glass', './img/wine-glass.jpg');
  console.log('Created new items');
}

displayed_item_left = the_catalog[0];
displayed_item_center = the_catalog[1];
displayed_item_right = the_catalog[2];

item_container.addEventListener('click', handle_item_click);

/*
//Event Handler: tallies votes and total clicks.




  if (NUMBER_OF_CLICKS <= 0) {
    item_container.removeEventListener('click', handle_item_click);
  }
  


//Update currently displayed items. Tied to the_catalog array, not images. 
  the_catalog[random_left].render_as_image(item_left);
  the_catalog[random_center].render_as_image(item_center);
  the_catalog[random_right].render_as_image(item_right);

//Call render function for 3 new items using catalog index and ids. 
  displayed_item_left = the_catalog[random_left];
  displayed_item_center = the_catalog[random_center];
  displayed_item_right = the_catalog[random_right];
}




//=======Chart.js=======

var canvas_el = document.getElementById('voteResults');
var ctx = canvas_el.getContext('2d');

var vote_data = [];
for(var i = 0; i <the_catalog.length; i++){
  vote_data.push(the_catalog[i].clicks)
}

*/

