/**
 * Created by esierra on 2/2/2017.
 */

// Main Javascript File

function updateTable() {
    var url = "api/name_list_get";
    var rowsInTable = '';
    var populatedTable = '';


    $.getJSON(url, null, function(json_result) {


            for (var i = 0; i < json_result.length; i++) {
                rowsInTable = '';
                rowsInTable += '<tr>';
                console.log('json_result id: '+ json_result[i].id);
                console.log('json_result first: '+ json_result[i].first);
                console.log('json_result last: '+ json_result[i].last);
                console.log('json_result email: '+ json_result[i].email);
                console.log('json_result phone: '+ json_result[i].phone);
                console.log('json_result birthday: '+ json_result[i].birthday);
                rowsInTable += '<td>' + json_result[i].id + '</td>';
                rowsInTable += '<td>' + json_result[i].first + '</td>';
                rowsInTable += '<td>' + json_result[i].last + '</td>';
                rowsInTable += '<td>' + json_result[i].email + '</td>';
                rowsInTable += '<td>' + json_result[i].phone + '</td>';
                rowsInTable += '<td>' + json_result[i].birthday + '</td>';
                console.log(rowsInTable);
                rowsInTable += '</tr>';
                populatedTable += rowsInTable + '\n';
            }

            console.log('populated table: ' + populatedTable);
            document.getElementById("table_list").innerHTML = populatedTable;
            console.log("Done");
        }
    );
}

// Call your code.
updateTable();