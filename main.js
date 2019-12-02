var grid = [];
currentColor = 'red';
seenCells = {};
var cellsList = [];


// timeout for loading range selector
setTimeout(() => {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value;

  slider.oninput = function() {
    output.innerHTML = this.value;
    createGround(parseInt(this.value))
  }
}, 10);

// create random n*n array
function createGround(n){
  var result = [];
  for (var i = 0 ; i < n; i++) {
      result[i] = [];
      for (var j = 0; j < n; j++) {
          result[i][j] = (Math.floor(Math.random() * 2));
      }
  }
  grid = result;
  createTable(grid)
}

// create table from array and append to dom
function createTable(tableData) {
  var elem = document.getElementById('table-item');
  if (elem) {
    elem.parentNode.removeChild(elem);
  }
  var table = document.createElement('table');
  table.setAttribute('id', 'table-item');
  var tableBody = document.createElement('tbody');
  table.setAttribute('class', 'table table-bordered');
  var cells = [];
  tableData.forEach(function (rowData, index) {
    var row = document.createElement('tr');

    rowData.forEach(function (cellData, innerIndex) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(''));
      if (cellData) {
        var cellIndex = index;
        var cellInnerIndex = innerIndex;
        // cell.setAttribute('class', 'filled-cell');
        cell.setAttribute('id', index+','+innerIndex);
        cell.onclick = function ($event) {
          handClickEvent($event)
        }
        cell.onmouseover = function($event) {
          handleMouseOver($event);
        }
        cell.onmouseout = function($event) {
          handleMouseOut($event)
        }
        cells.push(cell);
      }
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
  cellsList = document.getElementsByTagName('td');
  checkAllTableFirst();
}

// call calculate neighbors for all cells
function checkAllTableFirst() {
  for (let i=0; i<grid.length; i++) {
    for(let j=0; j<grid.length; j++) {
      calcCellNeighbors(i, j, i+','+j)
    }
  }
}
// calculate neighbors for all cells
function calcCellNeighbors(a, b, className) {
  var key = a + "," + b;
  if (seenCells[key]) {
    return 0;
  }
  if (0 <= a && a <= grid[0].length-1 && 0 <= b && b <= grid[0].length-1 && grid[a][b] === 1) {
    seenCells[key] = true;
    document.getElementById(a+','+b).setAttribute('class', className+' filled-cell')
    calcCellNeighbors(a - 1, b, className);
    calcCellNeighbors(a + 1, b, className);
    calcCellNeighbors(a, b - 1, className);
    calcCellNeighbors(a, b + 1, className);
  } else {
    return 0;
  }
}

function handClickEvent(e) {
  for(var i =0;i<cellsList.length;++i){
    cellsList[i].innerText = '';
  }
  let className = e.currentTarget.attributes.class.nodeValue.split(' ')[0]
  let count = document.getElementsByClassName(className).length
  e.currentTarget.innerText = count;
  
}

function handleMouseOver(e) {
  let className = e.currentTarget.className.split(' ')[0]
  let neighbors = document.getElementsByClassName(className)
  for (var property in neighbors) {
      neighbors[property].style = `background-color: black`
  }
 
}

function handleMouseOut(e) {
  let className = e.currentTarget.className.split(' ')[0]
  let neighbors = document.getElementsByClassName(className)
  for (var property in neighbors) {
      neighbors[property].style = `background-color: ${currentColor}`
  }
 
}

// update color after pick one
function update(jscolor) {
  currentColor = '#' + jscolor;
  var cols = document.getElementsByClassName('filled-cell');
    for(i = 0; i < cols.length; i++) {
      cols[i].style.backgroundColor = '#' + jscolor;
    }
}