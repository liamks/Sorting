var MAXHEIGHT = 800;
var MAXWIDTH = 1000;
var MARGIN = 2;
var RECT_WIDTH = 21;
var NUM_RECTANGLES = 40;
var rect_array = [];
var i = 0; j= 0;
var prev_1 = null;
var prev_2 = null;
var curr_i = null;
var curr_j = null;


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
  this.curr_j.data('x', temp_curr_i_x).animate({'left': temp_curr_i_x},20);
  this.curr_i.data('x', temp_curr_j_x).animate({'left': temp_curr_j_x},20);
  
  var temp_current = this.rect_array[this.j];
  this.rect_array[this.j] = this.rect_array[this.i];
  this.rect_array[this.i] = temp_current;
  
}

Sorter.prototype.mark_i_j = function(){
  console.log('mark');
  if (this.prev_i != null){
    this.prev_i.removeClass('highlight');
    this.prev_j.removeClass('highlight');
    this.prev_i = this.curr_i;
    this.prev_j = this.curr_j;
  }else{
    this.prev_i = $(this.rect_array[this.i]);
    this.prev_j = $(this.rect_array[this.j]);
  }
  this.curr_i = $(this.rect_array[this.i]);
  this.curr_j = $(this.rect_array[this.j]);
  $(this.curr_i).addClass('highlight');
  $(this.curr_j).addClass('highlight');
  
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
  //window.setTimeout(this.bubblesort, 80);
  window.setTimeout(function(){self.bubblesort();}, 40);
}

Sorter.prototype.init = function(array,sort_type){
  var sort_types = {'bubblesort':this.init_bubblesort,
                    'quicksort':this.init_quicksort,
                    'liamsort':this.init_liamsort};
  this.rect_array = array;
  sort_types[sort_type].call(this);
}




function iterate(){
  $(rect_array[i]).addClass('current');
  var temp = null;
  var temp_x = 0;
  var temp_2 = 0;
  if(i == rect_array.length){ i=0;j=0;return;}
  if(j == rect_array.length){$(rect_array[i]).removeClass('current'); i += 1; j = i + 1;}
  if (prev_1 != null){
    prev_1.removeClass('highlight');
    prev_2.removeClass('highlight');
  }
  if ($(rect_array[i]).data('height') > $(rect_array[j]).data('height')){
    $(rect_array[i]).removeClass('current');
    $(rect_array[j]).removeClass('current_j');
    $(rect_array[i]).addClass('highlight');
    $(rect_array[j]).addClass('current');
    temp_x = $(rect_array[j]).data('x');
    temp_2 = $(rect_array[i]).data('x');
    $(rect_array[j]).data('x', temp_2).animate({'left':temp_2});
    $(rect_array[i]).data('x',temp_x).animate({'left':temp_x});
    
    prev_1 = $(rect_array[i]);
    prev_2 = $(rect_array[j]);
    temp = rect_array[j];
    rect_array[j] = rect_array[i];
    rect_array[i] = temp;
  }
  $(rect_array[j]).removeClass('current_j');
  j+= 1;
  $(rect_array[j]).addClass('current_j');
  window.setTimeout(iterate, 80)
}

function bubblesort(array){
  rect_array = array;
  iterate();
}

function sortit() {
  var sorter = new Sorter();
  sorter.init($('#container div'), $('#sorttype').val())
  //console.log('called');
  //bubblesort($('#container div'));
}

function reset(){
  var h = 0;
  var x = 0;
  $('#container').empty();
  for(var i=0;i<NUM_RECTANGLES;i++){
    h = Math.floor(Math.random()*MAXHEIGHT);
    $('#container').append(
      $('<div>', {
        id: 'rectangle_' + String(i),
        class:'rectangle',
        style:'height:' + String(h) + 'px; left:' + String(x) + 'px;'}
      ).data({'height':h,'x':x}));
    x += RECT_WIDTH + 4;
  }
}

function init(){
  reset();
  $('#sort').click(sortit);
  $('#reset').click(reset);

}

$(document).ready(init);
