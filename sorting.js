/*
Javascript sorting visualization created by Liam Kaufman
May 30th 2010
Version 0.01
*/

var MAXHEIGHT = 800;
var MAXWIDTH = 1000;
var MARGIN = 2;
var RECT_WIDTH = 21;
var NUM_RECTANGLES = 40;


function Sorter(){
  this.rect_array = [];
  this.i = 0; this.j= 1;
  this.prev_i = null;
  this.prev_j = null;
  this.curr_i = null;
  this.curr_j = null;
}

Sorter.prototype.swap = function(){
  var temp_curr_j_x = this.curr_j.data('x');
  var temp_curr_i_x = this.curr_i.data('x');
  this.curr_j.data('x', temp_curr_i_x).animate({'left': temp_curr_i_x},100);
  this.curr_i.data('x', temp_curr_j_x).animate({'left': temp_curr_j_x},100); 
  var temp_current = this.rect_array[this.j];
  this.rect_array[this.j] = this.rect_array[this.i];
  this.rect_array[this.i] = temp_current;
  
}

Sorter.prototype.mark_i_j = function(){
  if (this.prev_i != null){
    this.prev_i.css('background-color',this.prev_i.data('color'));
    this.prev_j.css('background-color',this.prev_j.data('color'));
    //this.prev_i.removeClass('highlight');
    //this.prev_j.removeClass('highlight');
    this.prev_i = this.curr_i;
    this.prev_j = this.curr_j;
  }else{
    this.prev_i = $(this.rect_array[this.i]);
    this.prev_j = $(this.rect_array[this.j]);
  }
  this.curr_i = $(this.rect_array[this.i]);
  this.curr_j = $(this.rect_array[this.j]);
  this.curr_i.css('background-color','#07e');
  this.curr_j.css('background-color','#07e');
  //$(this.curr_i).addClass('highlight');
  //$(this.curr_j).addClass('highlight');
  
}


Sorter.prototype.init_bubblesort = function(){
  this.end = this.rect_array.length;
  this.bubblesort();
}

Sorter.prototype.bubblesort = function(){
  this.mark_i_j();
  if(this.curr_i.data('height') > this.curr_j.data('height')){
    this.swap();
  }
  this.i += 1;
  this.j += 1;
  if(this.j == this.end){
    this.i = 0;
    this.j = 1;
    this.end -= 1;
    if(this.end == 1){return}
  }
  var self = this;
  window.setTimeout(function(){self.bubblesort();}, 40);
}

Sorter.prototype.init = function(array,sort_type){
  var sort_types = {'bubblesort':this.init_bubblesort,
                    'quicksort':this.init_quicksort,
                    'liamsort':this.init_liamsort};
  this.rect_array = array;
  sort_types[sort_type].call(this);
}

Sorter.prototype.init_liamsort = function(){
  this.begining = 0;
  this.liamsort();
}

Sorter.prototype.liamsort = function(){
  this.mark_i_j();
  
  if(this.curr_i.data('height') > this.curr_j.data('height')){
    this.swap();
  }
  this.j += 1;
  if(this.j == this.rect_array.length){

    if(this.i == this.rect_array.length){
      return;
    }
    this.i += 1;
    this.j = this.i + 1;
  }
  var self = this;
  window.setTimeout(function(){self.liamsort();}, 40);
}

Sorter.prototype.init_quicksort = function(){
  this.quicksort();
}

Sorter.prototype.quicksort = function(){
  alert('Not yet implemented.');
}


function sortit() {
  var sorter = new Sorter();
  sorter.init($('#container div'), $('#sorttype').val())
}

function reset(){
  var h_increment = 20;
  var h = 0;
  var x = 0;
  var rgb = [250,250,250];
  var rgb_dec = 5;
  var rgb_values =[];
  heights = [];
  for(var i = 0;i<NUM_RECTANGLES;i++){
    h += 20;
    heights.push(h);
    rgb_values.push('#' + rgb[0].toString(16) + rgb[1].toString(16) + rgb[2].toString(16));
    rgb[0] -= rgb_dec; rgb[1] -= rgb_dec; rgb[2] -= rgb_dec;
  }
  $('#container').empty();
  for(var i=0;i<NUM_RECTANGLES;i++){
    //h = Math.floor(Math.random()*MAXHEIGHT);
    index = (Math.floor(Math.random()*heights.length));
    h = heights.splice(index,1)[0];
    rgb_string = rgb_values.splice(index,1)[0];

    $('#container').append(
      $('<div>', {
        id: 'rectangle_' + String(i),
        class:'rectangle',
        style:'height:' + String(h) + 'px; left:' + String(x) + 'px;'}
      ).data({'height':h,'x':x, 'color': rgb_string}).css({'background-color':  rgb_string}));
    x += RECT_WIDTH + 4;
  }
}

function init(){
  reset();
  $('#sort').click(sortit);
  $('#reset').click(reset);

}

$(document).ready(init);
