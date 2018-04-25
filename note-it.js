var svg = d3.select("svg");
//var noteits = [];

//TODO
//function zooming(toZoom) {
//    toZoom.attr("transform", d3.event.transform);
//}

//function zooming() {
//    d3.selectAll(".noteit").attr("transform", d3.event.transform);
//}
//svg.call(d3.zoom().on("zoom", zooming));


function draw_noteit(text) {

    var n = svg.append("g")
            .attr("class", "noteit")
    // note the height/width via css above works on chrome
    // but for ff it must be set here...
    n.append("rect")
        .attr("class", "paper")
        .attr("width", "10em")
        .attr("height", "10em");
    return n;
}

function change_text(textField) {
    d = prompt("change text:");
    textField.text(d);
}

function create_noteit(text) {

    var n = draw_noteit(text);

    var t = n.append("g")
        .attr("class", "title")
        .attr("width", "9em")
        .attr("height", "1em")
    var tt = t.append("text")
        .text("..")
        .attr("x", "4px")
        .attr("y", "1em");
    tt.on("click", function() { change_text(tt) });
    var c = n.append("g")
        .attr("class", "content")
        .attr("width", "100px")
        .attr("height", "100px")
    var ct = c.append("text")
        .text("_")
        .attr("x", "4px")
        .attr("y", "2em")
    c.on("click", function() { change_text(ct) });
//    d3.selectAll("#title").on("click", change_text(tt));
    var h = n.append("g")
        .attr("class", "handle")
        .attr("width", "1em")
        .attr("height", "1em");
    h.append("text")
        .text("-")
        .attr("x", "9em")
        .attr("y", "1em");
    h.on("click", function() { n.remove() });
//        n.call(d3.zoom().on("zoom", zooming(n)));
    n.call(d3.drag().on("drag", function() {
// TODO the delta should have been calculated each time the mouse is pressed down, neither when adding the handler nor while dragging...
//        var dX = d3.event.x - n.attr("x");
//        var dY = d3.event.y - n.attr("y");
        n.attr("transform", "translate(" + d3.event.x + "," + d3.event.y + ")");
        n.raise();
    }));
//    noteits.push(n);
};

function drag_calc(delta, current) {
    return current - delta;
}

function drag_it() {
    var dX = d3.event.x - n.attr("x");
    var dY = d3.event.y - n.attr("y");
    drag_translate(dX, dY);
}

var stock = draw_noteit("+");
stock.append("text").text("+").attr("x", "9em").attr("y", "1em");
stock.on("mouseover", function() { create_noteit("...") } );


// TODO - make text editable on click
// TODO - d3.zoom is not the ideal solution, should be rewritten to work with the other features
// TODO - lift note-it on drag over the others
// TODO - add a textbox for content / functions below the title (9em remaining)
// TODO - display the config as json
// TODO - add sync between json:svg
// TODO - box shadow

