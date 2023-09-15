
// using d3 for convenience
var main = d3.select("main");
// var scrolly = main.select("#scrolly");
var figure = main.select("#group-1 figure");
var figure2 = main.select("#group-2 figure");
var article = main.select("article");
var step = article.selectAll(".step");


function setInnerHTML(elm, html) {
    elm.innerHTML = html;
    
    Array.from(elm.querySelectorAll("script"))
      .forEach( oldScriptEl => {
        const newScriptEl = document.createElement("script");
        
        Array.from(oldScriptEl.attributes).forEach( attr => {
          newScriptEl.setAttribute(attr.name, attr.value) 
        });
        
        const scriptText = document.createTextNode(oldScriptEl.innerHTML);
        newScriptEl.appendChild(scriptText);
        
        oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
    });
  }

// initialize the scrollama
var scroller = scrollama();



// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight / 2;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", figureMarginTop + "px");

    figure2
        .style("height", "400" + "px")
        .style("top", figureMarginTop + "px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}



var layout = {
    // autosize: false,
    height: 400,
    margin: {
      l: 0,
      r: 0,
      b: 0,
      t: 0,
      pad: 0
    },
    // paper_bgcolor: '#7f7f7f',
    // plot_bgcolor: '#c7c7c7'
  };

var data = [{
    type: "treemap",
    labels: ["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"],
    parents: ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ]
}]

Plotly.newPlot('myDiv', data, layout)

function updateTreeMap(response){
    
    if(response.index == 3){
        data[0]["labels"] = ["Eve", "Cain", "Seth", "Enos", "Noam", "Abel", "Awan", "Enoch", "Azura"]
        data[0]["parents"] = ["", "Eve", "Eve", "Seth", "Seth", "Eve", "Eve", "Awan", "Eve" ]
            
        Plotly.redraw('myDiv')
    }
    // console.log('pasei aqui', response)
    if(response.index == 4){
        data[0]["labels"] = ["Eve", "Cain", "Seth", "Enos", "Noam"]
        data[0]["parents"] = ["", "Eve", "Eve", "Seth", "Seth"]
            
        Plotly.redraw('myDiv')
    }
}

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // update graphic based on step
    figure.select("p").text(response.index + 1);

    updateTreeMap(response)
}

function init() {

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}

// kick things off
init();
