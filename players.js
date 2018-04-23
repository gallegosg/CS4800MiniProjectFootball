var table = document.getElementById('table');
table.classList.add("table");

//get players
getPlayers = (year) => {
    var team = getGetValue();
    url = 'https://api.mysportsfeeds.com/v1.2/pull/nfl/' + year + '-regular/roster_players.json?team='+ team + '&sort=player.lastname.A';
    var playerArray = [];
    fetch(url, {
        headers: {
            'Authorization': 'Basic '+btoa('ggallegos:software'), 
          }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            var unModdedPlayerArray = json.rosterplayers.playerentry;
            unModdedPlayerArray.forEach(function(obj) { 
                //playerArray.push(obj.player.FirstName + " " + obj.player.LastName); 
                playerArray.push(obj)
            });
            showPlayers(playerArray);
        });
}

/**
 * get more player information
 */
getPlayerInfo = (year) => {
    var team = getGetValue();
    url = 'https://api.mysportsfeeds.com/v1.2/pull/nfl/' + year + '-regular/cumulative_players.json?team='+ team + '&sort=player.lastname.A';
    var playerArray = [];
    fetch(url, {
        headers: {
            'Authorization': 'Basic '+btoa('ggallegos:software'), 
          }
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            var unModdedPlayerArray = json.cumlativeplayerstats.playerstatsentry;
            unModdedPlayerArray.forEach(function(obj) { 
                playerArray.push(obj)
            });
            showPlayers(playerArray);
        });
}

//show players function
showPlayers = (arr) => {
    var header = document.getElementById("header");
    header.innerHTML = arr[0].team.City + " " + arr[0].team.Name;

    for (var i = 0; i < arr.length; i++){
        //tr - Table Row
        //td - table cell

        //create Table
        var playerObject = arr[i].player;

        var tr = document.createElement('tr');

        var nameRow = document.createElement('td');
        var positionRow = document.createElement('td');
        var numberRow = document.createElement('td');
        var heightRow = document.createElement('td');
        var weightRow = document.createElement('td');

        //Add Data to Node
        var name = document.createTextNode(playerObject.LastName + ", " + playerObject.FirstName)
        var position = document.createTextNode(playerObject.Position);
        var number = document.createTextNode(playerObject.JerseyNumber);
        var height = document.createTextNode(playerObject.Height);
        var weight = document.createTextNode(playerObject.Weight); 

        //Add Data to Row
        nameRow.appendChild(name);
        positionRow.appendChild(position);
        numberRow.appendChild(number);
        heightRow.appendChild(height);
        weightRow.appendChild(weight);

        //Add Rows to Table
        tr.appendChild(nameRow);
        tr.appendChild(positionRow);
        tr.appendChild(numberRow);
        tr.appendChild(heightRow)
        tr.appendChild(weightRow)

        table.appendChild(tr);
    }
    document.body.appendChild(table);
}

getGetValue = () => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var value = url.searchParams.get("team");
    return value;
}

/**
 * draw the table headers
 */
drawTableHeaders = () => {
    var nameHeader = document.createElement('th');
    var name = document.createTextNode('Name');
    nameHeader.appendChild(name)
    table.appendChild(nameHeader);

    var positionHeader = document.createElement('th');
    var position = document.createTextNode('Position');
    positionHeader.appendChild(position)
    table.appendChild(positionHeader);

    var jerseyNumberHeader = document.createElement('th');
    var jerseyNumber = document.createTextNode('Jersey Number');
    jerseyNumberHeader.appendChild(jerseyNumber)
    table.appendChild(jerseyNumberHeader);

    var heightHeader = document.createElement('th');
    var height = document.createTextNode('Height');
    heightHeader.appendChild(height)
    table.appendChild(heightHeader);

    var weightHeader = document.createElement('th');
    var weight = document.createTextNode('Weight(lbs)');
    weightHeader.appendChild(weight)
    table.appendChild(weightHeader);
}

function yearChange() {
    var year = document.getElementById("dropdown").value;
    
    var Parent = document.getElementById('table');
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }

    getPlayers(year);
    drawTableHeaders()
}

drawTableHeaders();
getPlayers(2017);