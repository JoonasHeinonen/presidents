const COLORCODE = "#55ACEE";

d3.json("https://raw.githubusercontent.com/JoonasHeinonen/presidents.json/master/presidents.json", function(data) {
    // Initialize the height and with of svg-body
    let width = 600, height = 800;

    // Initialize the variables needed for border
    let padding = 20;
    let border = 1;
    let bordercolor = 'black';

    var message = d3.select("body").append("p")
                    .text("List of the former presidents of Finland and their time in the office: ")
                    .attr("x", 4)
                    .attr("width", width);

    var widthScale = d3.scale.linear()
                    .domain([0, 60])
                    .range([0, width]);

    var color = d3.scale.linear()
                    .domain([0, 60]);

    var canvas = d3.select("body").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "graph-svg-component");
    
    var bars = canvas.selectAll("rect")
                    .data(data)
                    .enter()
                        .append("rect")
                        .attr("width", function (d) { return widthScale(d.years_in_office); })
                        .attr("height", 32)
                        .attr("fill", COLORCODE)
                        .attr("y", function (d, i) { return i * 40; })
                        .attr("x", 0);

    canvas.selectAll("text")
                    .data(data)
                    .enter()
                        .append("text")
                        .attr("fill", "white")
                        .attr("x", function (d, i) { return i + 8; })
                        .attr("y", function (d, i) { return i * 40 + 22; })
                        .text(function (d) { return d.president_id + ". " + d.name + "\t(" + d.starting_year + " - " + d.last_year + ")"; });
    // + " (" + d.years_in_office + " years)"
    var borderPath = canvas.append("rect")
                    .attr("fill", "pink")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("height", height)
                    .attr("width", width)
                    .style("stroke", bordercolor)
                    .style("fill", "none")
                    .style("stroke-width", border);
});