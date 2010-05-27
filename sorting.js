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
  console.log('called');
  bubblesort($('#container div'));
}

function init(){
  $('#sort').click(sortit);
  var h = 0;
  var x = 0;
  for(var i=0;i<NUM_RECTANGLES;i++){
    h = Math.floor(Math.random()*MAXHEIGHT);
    $('#container').append(
      $('<div>', {
        id: 'rectangle_' + String(i),
        class:'rectangle',
        style:'height:' + String(h) + 'px; left:' + String(x) + 'px;'}
      ).data({'height':h,'x':x}));
    x += RECT_WIDTH + 5;
  }
}
