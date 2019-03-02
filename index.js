const COLORCODE = "#55ACEE";

// The source code for this algorithm is from this website: http://bl.ocks.org/Caged/6476579
d3.json("https://raw.githubusercontent.com/JoonasHeinonen/presidents.json/master/presidents.json", function(data) {
    var margin = {top: 80, right: 10, bottom: 30, left: 20},
                width = 1600 - margin.left - margin.right,
                height = 640 - margin.top - margin.bottom;
            
    d3.select("body").append('h1').text('List of the former presidents of Finland and their time in the office: ');

    var format = d3.format(".0");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(format);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<strong>Name:</strong> <span style='color:red'>" + d.name + "</span><br>" +
                    "<strong>Party:</strong> <span style='color:red'>" + d.party + "</span><br>" +
                    "<strong>Years in office:</strong> <span style='color:red'>" + d.years_in_office + "</span><br>" +
                    "<strong>ID:</strong> <span style='color:red'>" + d.president_id + "</span><br>";
    })

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right * 2)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left * 2 + "," + margin.top + ")");
    
    svg.call(tip);

    d3.tsv("data/data.tsv", type, function(error, data) {
        x.domain(data.map(function(d) { return d.president_id; }));
        y.domain([0, d3.max(data, function(d) { return d.years_in_office; })]);

        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "white");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("URL Count");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.president_id); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.years_in_office); })
            .attr("height", function(d) { return height - y(d.years_in_office); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
    });

    function type(d) {
        d.years_in_office = +d.years_in_office;
        return d;
    }
});