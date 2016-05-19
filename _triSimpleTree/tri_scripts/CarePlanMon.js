"use strict";

$(function () {

    $('#addNewCarePlan').click(function () {
        // window.open("AddNewCarePlan.html","Add Care Plan Window","width=800,height=400");

        $.get("AddNewCarePlan.html", function (data) {
            $("#newCarePlan").html(data);
        });
    });

    $('#addplan').click(function () {
        GetPlanNode(1);
    });

    openTab($('#detailsList li a'), "All", '#0072C6', true);
});

function openTab(listele, symptomName, color, Isfirstload) {
    var i;
    var x = document.getElementsByClassName("symptoms");
    //for (i = 0; i < x.length; i++) {
    //    x[i].style.display = "none";
    //}
    var ele = document.getElementById(symptomName);
    //ele.style.display = "block";

    if (symptomName === "All") {
        if (Isfirstload) {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
        }
        else if ($(listele)[0].innerText === "All (4)" && ele.style.display === "block") {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            $(listele)[0].innerText = "+";
            ele.style.display = "none";
        }
        else if ($(listele)[0].innerText === "All (4)" && ele.style.display === "none") {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            ele.style.display = "block";
        }
        else if ($(listele)[0].innerText === "+" && ele.style.display === "none") {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            ele.style.display = "block";
            $(listele)[0].innerText = "All (4)";
        }
    }
    else {
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        $('#detailsList li a')[0].innerText = "All (4)";
        ele.style.display = "block";
    }

    document.getElementById("detailsList").style.borderBottom = "thick solid " + color;
    $('#detailsList li:last-child').css({ color: color, fontSize: "20px" });
}






