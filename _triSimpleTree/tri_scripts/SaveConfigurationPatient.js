var arCheckedPlan =  [];
//var arCheckedIssue = [];
var arCheckedGoal = [];
//var arCheckedAction = [];

function SaveConfig(PatientId) {
    
    $("input[type='checkbox'][name='planchkbox']").each(function () {
        if ($(this).is(':checked')) {
            arCheckedPlan.push($(this).attr('value'));
        }
        
    });
    //$("input[type='checkbox'][name='issuechkbox']").each(function () {
    //    if ($(this).is(':checked')) {
    //        arCheckedIssue.push($(this).attr('value'));
    //    }

    //});
    $("input[type='checkbox'][name='goalchkbox']").each(function () {
        if ($(this).is(':checked')) {
            arCheckedGoal.push($(this).attr('value'));
        }

    });
    //$("input[type='checkbox'][name='actionchkbox']").each(function () {
    //    if ($(this).is(':checked')) {
    //        arCheckedAction.push($(this).attr('value'));
    //    }

    //});
   // alert(arCheckedGoal);
   // UpdateJoinEntityPlanChecked(PatientId, arCheckedPlan, arCheckedIssue, arCheckedGoal, arCheckedAction);
    UpdateJoinEntityPlanChecked(PatientId, arCheckedPlan,  arCheckedGoal);
    arCheckedPlan = [];//clear patient array
    //arCheckedIssue = []; //clear issue array
    arCheckedGoal = [];
    //arCheckedAction = [];
  
}

function UpdateJoinEntityPlanChecked(PatientId, arCheckedPlan, arCheckedGoal) {
//    getFetchxmlResultset(PatientId, arCheckedPlan, arCheckedIssue, arCheckedGoal, arCheckedAction)
    
//}

//function getFetchxmlResultset(PatientId, arCheckedPlan, arCheckedIssue)
//{
    var FetchXmlplan =
    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>" +
"  <entity name='tri_careplanjoin'>" +
"    <attribute name='tri_careplanid' />" +
"    <attribute name='tri_careplanactionid' />" +
"    <attribute name='tri_careplanissueid' />" +
"    <attribute name='tri_careplangoalid' />" +
"    <attribute name='tri_careplanjoinid' />" +
"    <attribute name='tri_planname' />" +
"    <attribute name='tri_issuename' />" +
"    <attribute name='tri_goalname' />" +
"    <attribute name='tri_actionname' />" +
"    <attribute name='new_goalstate' />" +
"    <attribute name='tri_planselected'/>" +
"    <attribute name='tri_issueselected'/>" +
"    <attribute name='tri_goalselected'/>" +
"    <attribute name='tri_actionselected'/>" +
"    <order attribute='tri_careplanid' descending='false' />" +
"    <filter type='and'>" +
"      <condition attribute='tri_patientid' operator='eq' value='" + PatientId + "' />" +
"    </filter>" +
"  </entity>" +
"</fetch>"

    //alert(FetchXmlplan);
     retrievedPlanRecords = XrmServiceToolkit.Soap.Fetch(FetchXmlplan);

     if (retrievedPlanRecords.length > 0) {

         var boolCplan = false;
         //var boolCpissue = false;
         var boolCpgoal = false;
         //var boolCpaction = false;

         for (var i = 0; i < retrievedPlanRecords.length; i++) {
             //alert(retrievedPlanRecords[i].attributes["tri_careplanjoinid"].value);
            

             planjoinid = retrievedPlanRecords[i].attributes["tri_careplanjoinid"].value;

             cplanId = retrievedPlanRecords[i].attributes["tri_careplanid"].id;
            // cpissueId = retrievedPlanRecords[i].attributes["tri_careplanissueid"].id;
             cpgoalId = retrievedPlanRecords[i].attributes["tri_careplangoalid"].id;
            // cpactionId = retrievedPlanRecords[i].attributes["tri_careplanactionid"].id;


            // planIssueConcat = cplanId + cpissueId;
             //planGoalConcat = cplanId + cpissueId + cpgoalId;

             planGoalConcat = cplanId + cpgoalId;

            // planIssueGoalActionConcat = cplanId + cpissueId + cpgoalId + cpactionId;

             if (arCheckedPlan.indexOf(cplanId) == -1) {
                 //uncheckPlanFlg(planjoinid);
                 boolCplan = false;
             }
             else {
                 //checkPlanFlg(planjoinid);
                 boolCplan = true;
             }

             //if (arCheckedIssue.indexOf(planIssueConcat) == -1) {
             //    boolCpissue = false;
             //}
             //else {
             //    boolCpissue = true;
             //}

             if (arCheckedGoal.indexOf(planGoalConcat) == -1) {
                 boolCpgoal = false;
             }
             else {
                 boolCpgoal = true;
             }

             //if (arCheckedAction.indexOf(planIssueGoalActionConcat) == -1) {
             //    boolCpaction = false;
             //}
             //else {
             //    boolCpaction = true;
             //}
           
             updateJoinFlgs(planjoinid, boolCplan, boolCpgoal);
        }

    }
 
}

function  updateJoinFlgs(planjoinid, boolCplan, boolCpgoal) {
    var tri_careplanjoin = {}
    //var planOSval = boolCplan;
    tri_careplanjoin.tri_PlanSelected = boolCplan;
    //tri_careplanjoin.tri_IssueSelected = boolCpissue;
    tri_careplanjoin.tri_GoalSelected = boolCpgoal;
    //tri_careplanjoin.tri_ActionSelected = boolCpaction;
    SDK.REST.updateRecord(planjoinid, tri_careplanjoin, "tri_careplanjoin", updateSuccessCallback, errorHandler);
  
}


function updateSuccessCallback() {
    //alert("The record changes were saved");
}

function errorHandler(error) {
    alert(error.message);
}

