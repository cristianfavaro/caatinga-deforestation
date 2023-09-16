
// using d3 for convenience
var main = d3.select("main");
var figure = main.select("#group-1 figure");
var figure2 = main.select("#group-2 figure");
var article = main.select("article");
var step = article.selectAll(".step");

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


// Treemap data
var layout = {
    autosize: true,
    height: 400,
    margin: {l: 0,r: 0,b: 0,t: 0},
};

parents = ["", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral"]
labels = [
    "Total geral", "Administração Ambiental", "Cadastro Técnico Federal",
    "Controle ambiental", "Fauna", "Flora", "Licenciamento", "Ordenamento urbano e Contr. patrim.",
    "Outras", "Pesca", "Qualidade Ambiental", "Unidade de Conservação",
]
values = [ 19180161.23, 121500.00, 693200.00, 4227640.00, 1746300.00, 8439992.63, 1136322.50, 413000.00, 1752586.10, 411110.00, 7000.00, 231510.00]

var data = [{
  type: 'treemap',
  branchvalues: "total",
  labels: labels,
  values: values, 
  parents: parents,
  marker: {colors: ["pink", "royalblue", "lightgray", "purple", "cyan", "lightgray", "lightblue"]}
}]


Plotly.newPlot('myDiv', data, layout)

function updateTreeMap(response){
    
    if(response.index == 3){
        data[0]["labels"] = labels
        data[0]["parents"] = parents
        data[0]["values"] = values
        Plotly.redraw('myDiv')
    }
    
    if(response.index == 4){
        data[0]["labels"] = [
            "Total geral",
            "Sem info",
            "Amazonia",
            "Caatinga",
            "Cerrado",
            "Costeiro e Marinho",
            "Mata Atlantica",
        ]
        data[0]["parents"] = ["", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral", "Total geral"];
        data[0]["values"] = [
            195462387.76,
            114790225.23,
            5198078.52,
            18641061.23,
            8539399.58,
            35411234.17,
            12882389.03,
        ]
        Plotly.redraw('myDiv')
    }
};

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }
    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });
    console.log(response)
    if(response.index){
        map.addLayer({
            'id': 'deforestation-layer',
            'type': 'circle',
            'source': 'deforestation_circle',
            'paint': {
                'circle-radius': 1,
                'circle-stroke-width': 0.5,
                'circle-color': 'red',
                'circle-stroke-color': 'white'
            }
        });    
    }
    // update graphic based on step
    // figure.select("p").text(response.index + 1);
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
};

// kick things off
init();
