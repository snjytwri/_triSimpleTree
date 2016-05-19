function GetPlanNode(PatientId) {

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
"   <attribute name='tri_vitalvaluetypename' />" +
"   <attribute name='tri_patientfactor' />" +
"   <attribute name='tri_metric' />" +
"   <attribute name='tri_targetmetricoperator' />" +
"   <attribute name='tri_actiontriggervalue' />" +
"   <attribute name='tri_activitydescription' />" +
"   <attribute name='tri_measuredetails' />" +
"   <attribute name='tri_activityassignmentrole'  />" +
"   <attribute name='tri_schedulecategory'  />" +
"   <attribute name='tri_goalsection'  />" +
"   <order attribute='tri_schedulecategory' descending='false' />" +
"   <order attribute='tri_goalsection' descending='false' />" +
"    <filter type='and'>" +
"      <condition attribute='tri_patientid' operator='eq' value='" + PatientId + "' />" +
"    </filter>" +
"  </entity>" +
"</fetch>"
    // alert(FetchXmlplan);
    var planLevel = "";
    var PlanArray = [];
    var CatArray = [];
    var CurrPlanId = "";
    var CurrPlanId_li = "";
    var CurrIssueId = "";
    var CurrGoalId = "";
    var CurrActionId = "";
    var PrvPlanId = "";
    var IssueNodeTags = "";
    var vSchedCat = -1;
    var vSchedCatStr = "";
    var vSchedCatTag = "";
    retrievedPlanRecords = XrmServiceToolkit.Soap.Fetch(FetchXmlplan);

    if (retrievedPlanRecords.length > 0) //No matching Care plan found, create new care plan
    {
        for (var i = 0; i < retrievedPlanRecords.length; i++) {
            CurrPlanId = retrievedPlanRecords[i].attributes["tri_careplanid"].id;
            CurrPlanId_td = retrievedPlanRecords[i].attributes["tri_careplanid"].id + "_td";
            CurrPlanId_tr = retrievedPlanRecords[i].attributes["tri_careplanid"].id + "_tr";
            if (retrievedPlanRecords[i].attributes["tri_schedulecategory"] != undefined) {
                vSchedCatStr = retrievedPlanRecords[i].attributes["tri_schedulecategory"].value;
                switch (vSchedCatStr) {
                    case 100000000:
                        vSchedCatTag = "Care Management Schedule";
                        break;
                    case 100000001:
                        vSchedCatTag = "Care Transition Schedule";
                        break;
                }
            }
            // var IndexOfPlan = PlanArray.indexOf(CurrPlanId);
            var IndexOfCat = CatArray.indexOf(vSchedCatTag);
            if (IndexOfCat === -1) {
                //PrvPlanId = CurrPlanId
                CatArray.push(vSchedCatTag);
                //var planName = retrieveName(CurrPlanId, "tri_cccareplanSet");
                //var planName = retrievedPlanRecords[i].attributes["tri_planname"].value;

                //if (GetGoalNode(retrievedPlanRecords, PatientId, CurrPlanId) != "") {
                //    //GoalNodeTags = '<ul class="goalULclass">' + GetGoalNode(retrievedPlanRecords, PatientId, CurrPlanId) + '</ul>';
                //    GoalNodeTags = GetGoalNode(retrievedPlanRecords, PatientId, CurrPlanId) ;
                //}
                //else { GoalNodeTags = "" };

                if (GetSectionNode(retrievedPlanRecords, PatientId, CurrPlanId, vSchedCatStr) != "") {
                    //GoalNodeTags = '<ul class="goalULclass">' + GetGoalNode(retrievedPlanRecords, PatientId, CurrPlanId) + '</ul>';
                    GoalSectionTags = GetSectionNode(retrievedPlanRecords, PatientId, CurrPlanId, vSchedCatStr);
                }
                else { GoalSectionTags = "" };
                // alert(GoalSectionTags);
                // if (retrievedPlanRecords[i].attributes["tri_planselected"].value === true) { // set checkbox based on join field value
                //     flgchcked = '<input type="checkbox"  class = "chkboxclass" name="planchkbox"  value="' + CurrPlanId + '"  checked/>';
                //       }
                //else  {

                //     flgchcked = '<input  type="checkbox"  class = "chkboxclass" name="planchkbox"  value="' + CurrPlanId + '"  />';


                //}
                //planLevel = planLevel + '<li  class="plannameLI" id="' + CurrPlanId_li + '"><span>' + flgchcked + ' </span> <img class="plusminus" /> <span class="planname" id = "' + CurrPlanId + '">' + planName + '</span>' + GoalNodeTags +'</li>'
                //planLevel = planLevel + '<tr class= "tree" id="' + CurrPlanId + '"><td style="white-space:nowrap;" class="active"  class="plannameLI" id="' + CurrPlanId_td + '"><img class="plusminus"> <span style="vertical-align:middle">' + flgchcked + '<span> <span class="planname" id = "' + CurrPlanId + '">' + vSchedCatTag + '</span></td>' + GoalNodeTags + '</tr>';
                planLevel = planLevel + '<tr class= "tree" ><td style="white-space:nowrap;" class="active" class="plannameLI" id="' + vSchedCatStr + '"> <img class="plusminus"> <span class="planname" >' + vSchedCatTag + '</span></td>' + GoalSectionTags + '</tr>';
            }
        }

    }
    return planLevel
}

function GetIssueNode(retrievedPlanRecords, PatientId, PlanId) {

    var issueLevel = "";
    var CurrIssueId = "";
    var CurrIssueId_li = "";
    var PrvIssueId = "";
    var IssueArray = [];
    var GoalNodeTags = "";
    retrievedIssueRecords = retrievedPlanRecords;

    if (retrievedIssueRecords.length > 0) //No matching Care plan found, create new care plan
    {
        for (var i = 0; i < retrievedIssueRecords.length; i++) {

            var CurrPlanId = retrievedIssueRecords[i].attributes["tri_careplanid"].id

            if (CurrPlanId == PlanId) {

                CurrIssueId = retrievedIssueRecords[i].attributes["tri_careplanissueid"].id;
                PlanIssueConcatid = CurrPlanId + CurrIssueId;
                CurrIssueId_li = retrievedIssueRecords[i].attributes["tri_careplanissueid"].id + "_li";
                var IndexOfIssue = IssueArray.indexOf(CurrIssueId);
                if (IndexOfIssue === -1) {
                    IssueArray.push(CurrIssueId);
                    //var issueName = retrieveName(CurrIssueId, "tri_cccareplanissueSet");
                    var issueName = retrievedIssueRecords[i].attributes["tri_issuename"].value;

                    if (GetGoalNode(retrievedIssueRecords, PatientId, PlanId, CurrIssueId) != "") {
                        GoalNodeTags = '<ul class="goalULclass">' + GetGoalNode(retrievedIssueRecords, PatientId, PlanId, CurrIssueId) + '</ul>';
                    }
                    else { GoalNodeTags = "" };

                    if (retrievedIssueRecords[i].attributes["tri_issueselected"].value === true) { // set checkbox based on join field value
                        flgchcked = '<input type="checkbox" class = "chkboxclass" name="issuechkbox" align= "center" value="' + PlanIssueConcatid + '"  checked/>';
                    }
                    else {

                        flgchcked = '<input type="checkbox" class = "chkboxclass" name="issuechkbox" align= "center" value="' + PlanIssueConcatid + '"  />';

                    }
                    issueLevel = issueLevel +
                        '<li class="issuenameLI" id="' + CurrIssueId_li + '">' + flgchcked + '<a><img class="plusminus" /></a><span class="issuename" id = "' + CurrIssueId + '">' + issueName + '</span>' + GoalNodeTags + '</li>'

                }
            }
        }

    }
    return issueLevel;
}

function GetSectionNode(retrievedPlanRecords, PatientId, PlanId, SchedCat) {

    var goalLevel = "";
    var CurrGoalId = "";
    var PrvGoalId = "";
    var GoalArray = [];
    var SectionArray = [];
    var GoalNodeDetailsTags = "";
    var vGoalSectionTag = "";
    var vGoalSectionStr = "";

    //var tri_activitydescription= "";
    //retrievedGoalRecords = XrmServiceToolkit.Soap.Fetch(FetchXmlgoal);
    retrievedGoalRecords = retrievedPlanRecords;
    //alert(retrievedPlanRecords.length);
    if (retrievedGoalRecords.length > 0) //No matching Care plan found, create new care plan
    {
        for (var i = 0; i < retrievedGoalRecords.length; i++) {

            var CurrPlanId = retrievedGoalRecords[i].attributes["tri_careplanid"].id;
            var CurrPlanGoalId = retrievedGoalRecords[i].attributes["tri_careplangoalid"].id;
            var CurrSchedCat = retrievedGoalRecords[i].attributes["tri_schedulecategory"].value;

            //if (CurrPlanId == PlanId ) {
            if (CurrSchedCat == SchedCat) {
                var CurrGoalId = retrievedGoalRecords[i].attributes["tri_careplangoalid"].id;
                var CurrVitalType = retrievedGoalRecords[i].attributes["tri_vitalvaluetypename"].value;
                var PlanGoalConcatid = CurrPlanId + CurrGoalId + "_vital";
                var ParentPlanId = retrievedGoalRecords[i].attributes["tri_careplanid"].id + "_td";
                var CurrGoalId_li = retrievedGoalRecords[i].attributes["tri_careplangoalid"].id + "_li";
                var SchedCat_cls = SchedCat + "_cls";
                if (retrievedGoalRecords[i].attributes["tri_goalsection"] != undefined) {

                    vGoalSectionStr = retrievedPlanRecords[i].attributes["tri_goalsection"].value;
                    switch (vGoalSectionStr) {
                        case 100000000:
                            vGoalSectionTag = "Symptoms";
                            break;
                        case 100000001:
                            vGoalSectionTag = "Tests / Care";
                            break;
                        case 100000002:
                            vGoalSectionTag = "Medications";
                            break;
                        case 100000003:
                            vGoalSectionTag = "Activity";
                            break;
                        case 100000004:
                            vGoalSectionTag = "Nutrition";
                            break;
                        case 100000005:
                            vGoalSectionTag = "Psycho-Social / Behavioural Health";
                            break;
                        case 100000006:
                            vGoalSectionTag = "Wrap Up";
                            break;
                        case 100000007:
                            vGoalSectionTag = "Home Vitals";
                            break;
                    }
                }

                //var indexOfGoal = GoalArray.indexOf(CurrVitalType);
                var indexOfSection = SectionArray.indexOf(vGoalSectionTag);

                if (indexOfSection === -1) {
                    SectionArray.push(vGoalSectionTag);
                    //var goalName = retrieveName(CurrGoalId, "tri_cccareplangoalSet");
                    //var goalName = retrievedGoalRecords[i].attributes["tri_goalname"].value;
                    //var goalSelected = retrievedGoalRecords[i].attributes["tri_goalselected"].value;
                    //var varGoalColor = setGoalColor(retrievedGoalRecords[i].attributes["new_goalstate"].value);
                    var varCatSectionConcatId = SchedCat + "_" + vGoalSectionStr;

                    if (GetGoalDetailsNode(retrievedPlanRecords, CurrVitalType, SchedCat, vGoalSectionStr) != "") {
                        //GoalNodeTags = '<ul class="goalULclass">' + GetGoalNode(retrievedPlanRecords, PatientId, CurrPlanId) + '</ul>';
                        GoalNodeDetailsTags = GetGoalDetailsNode(retrievedPlanRecords, CurrVitalType, SchedCat, vGoalSectionStr);
                    }
                    else { GoalNodeDetailsTags = "" };
                    //alert(GoalNodeDetailsTags);

                    if (retrievedGoalRecords[i].attributes["tri_goalselected"].value === true) { // set checkbox based on join field value
                        flgchcked = '<input type="checkbox" level="parent" class = "chkboxclass" name="' + CurrVitalType + '"  value="' + PlanGoalConcatid + '"  checked/>';
                    }
                    else {

                        flgchcked = '<input type="checkbox" level="parent" class = "chkboxclass" name="' + CurrVitalType + '"  value="' + PlanGoalConcatid + '"/>';

                    }


                    // goalLevel = goalLevel + '<tr class="goalrow"><td style="padding-left: 25px; white-space:nowrap;" class="active" class="goalnameLI" parentplanid="' + ParentPlanId + '" id="' + CurrGoalId_li + '"><img class="plusminus" /> <span style="vertical-align:middle">' + flgchcked + '</span> <span class="goalname" id = "' + CurrGoalId + '">' + CurrVitalType + '</span></td>' + GoalNodeDetailsTags + '</tr>';

                    goalLevel = goalLevel + '<tr class="goalrow" parentclass ="' + SchedCat_cls + '"><td style="padding-left: 25px; white-space:nowrap;" class="active" class="goalnameLI" parentschedcatid="' + SchedCat + '" id="' + varCatSectionConcatId + '"><img class="plusminus" />  <span style="vertical-align:middle">' + flgchcked + '</span> <span class="goalname" id = "' + CurrGoalId + '">' + vGoalSectionTag + '</span></td>' + GoalNodeDetailsTags + '</tr>';


                }
            }
        }
    }

    return goalLevel
}

function GetGoalDetailsNode(retrievedPlanRecords, VitalTypeName, SchedCatdtl, GoalSectiondtl) {

    var goaldetailLevel = "";
    var MeasureDetails = "";
    var TargetValue;
    var vMeasureDtl;
    var vActiontriggerValue;
    var vActivityDescription;
    var vPatientfactor;
    var varPatientFactorStr;
    var vTargetMetricOperator;
    var vTargetMetricOperatorStr;
    var vActivityAssgmntRole;
    var vActivityAssgmntRoleStr;


    //alert(FetchXmlGD);
    retrievedGoalRecords1 = retrievedPlanRecords;
    //alert( retrievedGoalRecords1.length);
    if (retrievedGoalRecords1.length > 0) //No matching Care plan found, create new care plan
    {
        for (var i = 0; i < retrievedGoalRecords1.length; i++) {

            TargetValue = "";
            vMeasureDtl = "";
            vActiontriggerValue = "";
            vActivityDescription = "";
            vTargetMetricOperator = -1;
            vTargetMetricOperatorStr = "";
            vActivityAssgmntRole = -1;
            vActivityAssgmntRoleStr = "";
            vPatientfactor = -1;
            varPatientFactorStr = "";
            var CurrVitalType = retrievedGoalRecords1[i].attributes["tri_vitalvaluetypename"].value;
            var CurrSchedCat = retrievedGoalRecords1[i].attributes["tri_schedulecategory"].value;
            var CurrGoalSection = retrievedGoalRecords1[i].attributes["tri_goalsection"].value;
            var currVitalTypeName = retrievedGoalRecords1[i].attributes["tri_vitalvaluetypename"].value;
            var currCplanName = retrievedGoalRecords1[i].attributes["tri_planname"].value;
            //var MeasureDetails = retrievedGoalRecords1[i].attributes["tri_measuredetails"].value;

            //if (CurrVitalType === VitalTypeName) {
            if (CurrSchedCat === SchedCatdtl && CurrGoalSection === GoalSectiondtl) {


                // var SchedCatSectnInt = SchedCatdtl + GoalSectiondtl;
                var SchedCatSectnCls = SchedCatdtl + "_" + GoalSectiondtl + "_cls";
                var CurrPlanId = retrievedGoalRecords1[i].attributes["tri_careplanid"].id;
                var CurrGoalId = retrievedGoalRecords1[i].attributes["tri_careplangoalid"].id;
                var CurrGoalId_li = retrievedGoalRecords1[i].attributes["tri_careplangoalid"].id + "_li";
                var goalSelected = retrievedGoalRecords1[i].attributes["tri_goalselected"].value;
                var careplanjoin = retrievedGoalRecords1[i].attributes["tri_careplanjoinid"].value;

                //vTargetMetricOperator = 'metricoperator' + careplanjoin;

                if (retrievedGoalRecords1[i].attributes["tri_metric"] != undefined) {
                    TargetValue = retrievedGoalRecords[i].attributes["tri_metric"].value;
                }

                if (retrievedGoalRecords1[i].attributes["tri_measuredetails"] != undefined) {
                    vMeasureDtl = retrievedGoalRecords[i].attributes["tri_measuredetails"].value;
                }

                if (retrievedGoalRecords1[i].attributes["tri_actiontriggervalue"] != undefined) {
                    vActiontriggerValue = retrievedGoalRecords[i].attributes["tri_actiontriggervalue"].value;
                }

                if (retrievedGoalRecords1[i].attributes["tri_activitydescription"] != undefined) {
                    vActivityDescription = retrievedGoalRecords[i].attributes["tri_activitydescription"].value;
                }



                if (retrievedGoalRecords1[i].attributes["tri_patientfactor"] != undefined) {

                    varPatientFactorStr = retrievedGoalRecords[i].attributes["tri_patientfactor"].value;
                    switch (varPatientFactorStr) {
                        case 100000000:
                            //vTargetMetricOperator = "100000000";
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="100000000" selected>Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003">Stage 2-3</option><option value="100000004">All</option><option value="100000005">Normal</option><option value="100000006">Abnormal</option></select></div>';
                            break;
                        case 100000001:
                            //vTargetMetricOperator = "100000001";
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="100000000">Most Patients</option><option value="100000001" selected>Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003">Stage 2-3</option><option value="100000004">All</option><option value="100000005">Normal</option><option value="100000006">Abnormal</option></select></div>';
                            break;
                        case 100000002:
                            //vTargetMetricOperator = "100000002";
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002" selected>Comorbid</option><option value="100000003">Stage 2-3</option><option value="100000004">All</option><option value="100000005">Normal</option><option value="100000006">Abnormal</option></select></div>';
                            break;
                        case 100000003:
                            //vTargetMetricOperator = "100000003";
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003" selected>Stage 2-3</option><option value="100000004">All</option><option value="100000005">Normal</option><option value="100000006">Abnormal</option></select></div>';
                            break;
                        case 100000004:
                            //vTargetMetricOperator = "100000003";
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003" >Stage 2-3</option><option value="100000004" selected>All</option><option value="100000005">Normal</option><option value="100000006">Abnormal</option></select></div>';
                            break;
                        case 100000005:
                            //vTargetMetricOperator = "100000003";
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003" >Stage 2-3</option><option value="100000004">All</option><option value="100000005" selected>Normal</option><option value="100000006">Abnormal</option></select></div>';
                            break;
                        case 100000006:
                            //vTargetMetricOperator = "100000003";
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003" >Stage 2-3</option><option value="100000004">All</option><option value="100000005">Normal</option><option value="100000006" selected>Abnormal</option></select></div>';
                            break;
                        case -1:
                            vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="-100000000" selected></option><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003">Stage 2-3</option><option value="100000004">All</option><option value="100000005">Normal</option><option value="100000006">Abnormal</option></select></div>';
                            break;

                    }

                }
                else {
                    vPatientfactor = '<div><select class="PatientfactorSelectId" ><option value="-100000000" selected></option><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003">Stage 2-3</option><option value="100000004">All</option><option value="100000005">Normal</option><option value="100000006">Abnormal</option></select></div>';

                }

                if (retrievedGoalRecords1[i].attributes["tri_targetmetricoperator"] != undefined) {

                    vTargetMetricOperatorStr = retrievedGoalRecords[i].attributes["tri_targetmetricoperator"].value;
                    switch (vTargetMetricOperatorStr) {
                        case 167410000:
                            //vTargetMetricOperator = "100000000";
                            vTargetMetricOperator = '<div><select class="TargetMetricOperatorSelectCls" ><option value="167410000" selected>></option><option value="167410001"><</option><option value="167410002">=</option><option value="167410003">% Decrease</option><option value="167410004">% Increase</option></select></div>';
                            break;
                        case 167410001:
                            //vTargetMetricOperator = "100000001";
                            vTargetMetricOperator = '<div><select class="TargetMetricOperatorSelectCls" ><option value="167410000">></option><option value="167410001" selected><</option><option value="167410002">=</option><option value="167410003">% Decrease</option><option value="167410004">% Increase</option></select></div>';
                            break;
                        case 167410002:
                            //vTargetMetricOperator = "100000002";
                            vTargetMetricOperator = '<div><select class="TargetMetricOperatorSelectCls" ><option value="167410000">></option><option value="167410001"><</option><option value="167410002" selected>=</option><option value="167410003">% Decrease</option><option value="167410004">% Increase</option></select></div>';
                            break;
                        case 167410003:
                            //vTargetMetricOperator = "100000003";
                            vTargetMetricOperator = '<div><select class="TargetMetricOperatorSelectCls" ><option value="167410000">></option><option value="167410001"><</option><option value="167410002">=</option><option value="167410003" selected>% Decrease</option><option value="167410004">% Increase</option></select></div>';
                            break;
                        case 167410004:
                            //vTargetMetricOperator = "100000003";
                            vTargetMetricOperator = '<div><select class="TargetMetricOperatorSelectCls" ><option value="167410000">></option><option value="167410001"><</option><option value="167410002">=</option><option value="167410003">% Decrease</option><option value="167410004" selected>% Increase</option></select></div>';
                            break;
                        case -1:
                            vTargetMetricOperator = '<div><select class="TargetMetricOperatorSelectCls" ><option value="-167410000" selected></option><option value="167410000">></option><option value="167410001"><</option><option value="167410002">=</option><option value="167410003">% Decrease</option><option value="167410004">% Increase</option></select></div>';
                            break;

                    }

                }
                else {
                    vTargetMetricOperator = '<div><select class="TargetMetricOperatorSelectCls" ><option value="-167410000" selected></option><option value="167410000">></option><option value="167410001"><</option><option value="167410002">=</option><option value="167410003">% Decrease</option><option value="167410004">% Increase</option></select></div>';

                }

                if (retrievedGoalRecords1[i].attributes["tri_activityassignmentrole"] != undefined) {

                    vActivityAssgmntRoleStr = retrievedGoalRecords[i].attributes["tri_activityassignmentrole"].value;
                    switch (vActivityAssgmntRoleStr) {
                        case 167410000:
                            //vTargetMetricOperator = "100000000";
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="167410000 selected">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000">Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002">Physician</option></select></div>';
                            break;
                        case 167410001:
                            //vTargetMetricOperator = "100000000";
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="167410000">Care Manager</option><option value="167410001" selected >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000">Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002">Physician</option></select></div>';
                            break;
                        case 167410002:
                            //vTargetMetricOperator = "100000000";
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="167410000">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" selected>Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000">Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002">Physician</option></select></div>';
                            break;
                        case 167410003:
                            //vTargetMetricOperator = "100000000";
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="167410000">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" selected>Care Navigator</option><option value="100000000">Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002">Physician</option></select></div>';
                            break;
                        case 100000000:
                            //vTargetMetricOperator = "100000000";
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="167410000">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000" selected>Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002">Physician</option></select></div>';
                            break;
                        case 100000001:
                            //vTargetMetricOperator = "100000001";
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="167410000">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000" >Physiatrist</option><option value="100000001" selected>Cardiologist</option><option value="100000002">Physician</option></select></div>';
                            break;
                        case 100000002:
                            //vTargetMetricOperator = "100000002";
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="167410000">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000" >Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002" selected>Physician</option></select></div>';
                            break;
                        case -1:
                            vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="-1" selected></option><option value="167410000">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000" >Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002">Physician</option></select></div>';
                            break;
                    }

                }
                else {

                    vActivityAssgmntRole = '<div><select class="ActivityAssgmntRoleSelectCls"><option value="-1" selected></option><option value="167410000">Care Manager</option><option value="167410001" >Nurse</option><option value="167410002" >Dietician</option><option value="167410003" >Care Navigator</option><option value="100000000" >Physiatrist</option><option value="100000001">Cardiologist</option><option value="100000002">Physician</option></select></div>';

                }


                var PlanGoaldtlConcatid = CurrPlanId + CurrGoalId;

                if (retrievedGoalRecords1[i].attributes["tri_goalselected"].value === true) { // set checkbox based on join field value
                    flgchcked = '<input type="checkbox" level="child" class = "chkboxclassdtl" name="goalchkbox" parentname="' + VitalTypeName + '" align= "center" value="' + PlanGoaldtlConcatid + '"  checked/>';
                }
                else {

                    flgchcked = '<input type="checkbox" level="child" class = "chkboxclassdtl" name="goalchkbox" parentname="' + VitalTypeName + '" align= "center" value="' + PlanGoaldtlConcatid + '"  />';

                }




                goaldetailLevel = goaldetailLevel + '<tr class="goalrowdetail" parentCatSectionClass="' + SchedCatSectnCls + '" parentgoalid="' + CurrGoalId_li + '"><td></td><td class = "chkboxclasstd" style="text-align:center">' + flgchcked
                // + '</span></td><td style="text-align:center"><div><select id="metricoperator' + careplanjoin + '"><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003">Stage 2-3</option></select></div></td>' +
                 + '</td><td style="text-align:left">' + currVitalTypeName + '</td><td style="text-align:center">' + vPatientfactor + '</td>' +
                      '<td style="text-align:center">' + vTargetMetricOperator + '</td>' +
                      '<td style="text-align:center">' + TargetValue + '</td>' +
                      '<td style="text-align:center"><div><select class="ActionMetricOperatorSelectCls"><option value="167410000">></option><option value="167410001"><</option><option value="167410002">=</option><option value="167410003">% Decrease</option><option value="167410004">% Increase</option></select></div></td>' +
                      '<td style="text-align:center">' + vActiontriggerValue + '</td>' +
                      //'<td style="text-align:center"><input type="checkbox" name="autoactivitychkbox" align= "center" /></td>' + //AutocreateActivity?
                      '<td>' + vMeasureDtl + '</td>' + //measure details
                      //'<td>' + '' + '</td>' + //Activity Create On
                      //'<td>' + '' + '</td>' + //Activity Due On
                      '<td>' + '' + '</td>' + //Activity Recurrence
                      //'<td>' + '' + '</td>' + //Number Of Recurrences
                      '<td>' + vActivityAssgmntRole + '</td>' + //Activity Assignment Role
                      '<td>' + vActivityDescription + '</td>' + //Activity Description
                      '<td style="text-align:left">' + currCplanName + '</td>' + //care plan
                      '<tr>'


                //}
            }
        }
    }

    //goaldetailLevel = '<tr><td></td><td>Hello</td><tr>';
    return goaldetailLevel;
}

function retrieveMultipleOperationAsync(contactId) {
    XrmSvcToolkit.retrieveMultiple({
        entityName: "Contact",
        odataQuery: "$select=BirthDate,ContactId,CreditLimit,DoNotEMail,DoNotPhone,FamilyStatusCode,FirstName,GenderCode,LastName,MiddleName&$filter=ContactId eq guid'" + contactId + "'",
        async: true,
        successCallback: function (results) {
            alert("RetrieveMultiple=Just retrieved: " + results[0].FirstName + " " + results[0].MiddleName + " " + results[0].LastName);
        },
        errorCallback: function (error) {
            throw error;
        }
    });
}








