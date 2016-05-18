"use strict";

$(function () {

    $('#addNewCarePlan').click(function () {

    });

    $('#addplan').click(function () {
        GetPlanNode(1);
    });

    openTab($('#detailsList li:first-child'), "All", '#0072C6');
});

function openTab(listele, symptomName, color) {
    var i;
    var x = document.getElementsByClassName("symptoms");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    var ele = document.getElementById(symptomName);
    ele.style.display = "block";

    if (symptomName === "All") {
        if ($(listele)[0].innerText === "+") {
            $(listele)[0].innerText = "All (4)";
            ele.style.display = "block";
        }
        else if ($(listele)[0].innerText === "All (4)") {

            $(listele)[0].innerText = "+";
            //if (ele.style.display === "none") {
                ele.style.display = "none";
           // }

            //else if (ele.style.display === "block") {
            //    ele.style.display = "none"
            //}
        }
    }

    document.getElementById("detailsList").style.borderBottom = "thick solid " + color;
    $('#detailsList li:last-child').css({ color: color, fontSize: "20px" });
}






