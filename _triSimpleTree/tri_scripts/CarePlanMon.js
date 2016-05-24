"use strict";

$(function () {
    $('#addplan').click(function () {
       // GetPlanNode(1);
    });

    openTab($('#detailsList li a'), "All", '#0072C6', true);
});

function opendialog(page) {
    var $dialog = $('#addNewCarePlan')
    .html('<iframe style="border: 0px; " src="' + page + '" width="100%" height="100%"></iframe>')
    .dialog({
        title: "Type & Details Description",
        autoOpen: false,
        dialogClass: 'dialog_fixed,ui-widget-header',
        modal: true,
        height: 500,
        minWidth: 500,
        minHeight: 500,
        draggable: true,
        close: function () {
            $(this).remove();
        }
        ,
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
            }
        }
    });
    $dialog.dialog('open');
}

function openTypeDetailsDescription(ele)
{

}

function openTab(listele, symptomName, color, Isfirstload) {
    var i;
    var x = document.getElementsByClassName("symptoms");
    var ele = document.getElementById(symptomName);

    if (symptomName === "All") {
        if (Isfirstload) {
            $(x).hide();
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            $(listele)[0].style.fontSize = "18px";
        }
        else if ($(listele)[0].innerText === "All (4)" && $(ele).is(":visible")){ //ele.style.display === "block") {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            $(listele)[0].innerText = "+";
            //ele.style.display = "none";
            $(ele).hide(1000);
            $(ele).css("visibility", "hidden");
            $(listele)[0].style.fontSize = "18px";
        }
        else if ($(listele)[0].innerText === "All (4)" && !$(ele).is(":visible")) { //ele.style.display === "none") {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            //ele.style.display = "block";
            $(ele).show(500);
            $(ele).css("visibility", "visible");
            $(listele)[0].style.fontSize = "10px";
        }
        else if ($(listele)[0].innerText === "+" && !$(ele).is(":visible") ){ // ele.style.display === "none") {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            //ele.style.display = "block";
            $(ele).show(500);
            $(ele).css("visibility", "visible");
            $(listele)[0].innerText = "All (4)";
            $(listele)[0].style.fontSize = "10px";

        }
    }
    else {
        if (!$(ele).is(":visible")) {
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            $('#detailsList li a')[0].innerText = "All (4)";
            $('#detailsList li a')[0].style.fontSize = "10px";
            $(ele).show(500);
            $(ele).css("visibility", "visible");
        }
    }

    document.getElementById("detailsList").style.borderBottom = "thick solid " + color;
    $('#detailsList li:last-child').css({ color: color, fontSize: "20px" });
}






