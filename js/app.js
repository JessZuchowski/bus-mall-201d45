'use strict';

//Global variables
var total_items = 20;
var the_catalog = [];

var currently_displayed_left_item;
var currently_displayed_center_item;
var currently_displayed_right_item;

var catalog_container = document.getElementById('all_items');

var left_h2 = document.getElementById('left_item_h2');
var center_h2 = document.getElementById('center_item_h2');
var right_h2 = document.getElementById('right_item_h2');

var left_img = document.getElementById('left_item_img');
var center_img = document.getElementById('center_item_img');
var right_img = document.getElementById('right_item_img');

//Product Constructor: includes item, url, and click count.
var Item = function(name, url){
  this.name = name;
  this.url = url;
  this.clicked_on_count = 0;

  the_catalog.push(this);
};

//Image renderer: finds target, creates new element, gives content, appends to page.
var render_item = function(item, target_img, target_h2){
  target_img.src = item.url;
  target_h2.textContent = item.name;
};

//Event Handler: tallies votes and total clicks, shows new items. 

var handle_click_on_item = function(event){
  if(event.target.tagName === 'IMG'){
    if(event.target.id === 'left_item_img'){
      currently_displayed_left_item.clicked_on_count ++;    
    }else if (event.target.id === 'center_item_img'){
      currently_displayed_center_item.clicked_on_count ++;   
    }else if (event.target.id === 'right_item_img'){
      currently_displayed_right_item.clicked_on_count ++;
    }
    total_items--; 

//Pick new items.

    var left_item_idx = Math.floor(Math.random() * the_catalog.length);
    var center_item_idx = Math.floor(Math.random() * the_catalog.length);
    var right_item_idx = Math.floor(Math.random() * the_catalog.length);

//Update currently displayed items.

    currently_displayed_left_item = the_catalog[left_item_idx];
    currently_displayed_center_item = the_catalog[center_item_idx];
    currently_displayed_right_item = the_catalog[right_item_idx];

//Call render function for 3 new items.

    render_item(the_catalog[left_item_idx], left_img, left_h2);
    render_item(the_catalog[center_item_idx], center_img, center_h2);
    render_item(the_catalog[right_item_idx], right_img, right_h2);

//To stop listening
    if(total_items <= 0){
      catalog_container.removeEventListener('click', handle_click_on_item);
    }
  }
}; 

//Init Area: create all items.

var bag_item = new Item('Bag', './img.bag.jpg');
var banana_item = new Item('Banana', './img.banana.jpg');
var bathroom_item = new Item('Bathroom', './img.bathroom.jpg');
var boots_item = new Item('Boots', './img.boots.jpg');
var breakfast_item = new Item('Breakfast', './img.breakfast.jpg');
var bubblegum_item = new Item('Bubblegum', './img.bubblegum.jpg');
var chair_item = new Item('Chair', './img.chair.jpg');
var cthulhu_item = new Item('Cthulhu', './img.cthulhu.jpg');
var dogduck_item = new Item('Dog-Duck', './img.dog-duck.jpg');
var dragon_item = new Item('Dragon', './img.dragon.jpg');
var pen_item = new Item('Pen', './img.pen.jpg');
var petsweep_item = new Item('Pet-Sweep', './img.pet-sweep.jpg');
var scissors_item = new Item('Scissors', './img.scissors.jpg');
var shark_item = new Item('Shark', './img.shark.jpg');
var sweep_item = new Item('Sweep', './img.sweep.jpg');
var tauntaun_item = new Item('Tauntaun', './img.tauntaun.jpg');
var unicorn_item = new Item('Unicorn', './img.unicorn.jpg');
var usb_item = new Item('USB', './img.usb.jpg');
var watercan_item = new Item('Water-Can', './img.water-can.jpg');
var wineglass_item = new Item('Wine-Glass', './img.wine-glass.jpg');

new Item('Bag', './img.bag.jpg');
new Item('Banana', './img.banana.jpg');
new Item('Bathroom', './img.bathroom.jpg');
new Item('Boots', './img.boots.jpg');
new Item('Breakfast', './img.breakfast.jpg');
new Item('Bubblegum', './img.bubblegum.jpg');
new Item('Chair', './img.chair.jpg');
new Item('Cthulhu', './img.cthulhu.jpg');
new Item('Dog-Duck', './img.dog-duck.jpg');
new Item('Dragon', './img.dragon.jpg');
new Item('Pen', './img.pen.jpg');
new Item('Pet-Sweep', './img.pet-sweep.jpg');
new Item('Scissors', './img.scissors.jpg');
new Item('Shark', './img.shark.jpg');
new Item('Sweep', './img.sweep.jpg');
new Item('Tauntaun', './img.tauntaun.jpg');
new Item('Unicorn', './img.unicorn.jpg');
new Item('USB', './img.usb.jpg');
new Item('Water-Can', './img.water-can.jpg');
new Item('Wine-Glass', './img.wine-glass.jpg');

currently_displayed_left_item = the_catalog[0];
currently_displayed_center_item = the_catalog[1];
currently_displayed_right_item = the_catalog[3];

catalog_container.addEventListener('click', handle_click_on_item);

function named_function () {
  console.log();
}
console.log(handle_click_on_item);
console.log(named_function);
