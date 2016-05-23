/// Comment for local changes
/// var CarePlanMonData;

function GetPlanNodefornewUI(PatientId) {

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

    return retrievedPlanRecords;

    //if (retrievedPlanRecords.length > 0) //No matching Care plan found, create new care plan
    //{
    //    for (var i = 0; i < retrievedPlanRecords.length; i++) {
    //        CurrPlanId = retrievedPlanRecords[i].attributes["tri_careplanid"].id;
    //        CurrPlanId_td = retrievedPlanRecords[i].attributes["tri_careplanid"].id + "_td";
    //        CurrPlanId_tr = retrievedPlanRecords[i].attributes["tri_careplanid"].id + "_tr";
    //        if (retrievedPlanRecords[i].attributes["tri_schedulecategory"] != undefined) {
    //            vSchedCatStr = retrievedPlanRecords[i].attributes["tri_schedulecategory"].value;
    //            switch (vSchedCatStr) {
    //                case 100000000:
    //                    vSchedCatTag = "Care Management Schedule";
    //                    break;
    //                case 100000001:
    //                    vSchedCatTag = "Care Transition Schedule";
    //                    break;
    //            }
    //        }
    //        var IndexOfCat = CatArray.indexOf(vSchedCatTag);
    //        if (IndexOfCat === -1) {
    //            CatArray.push(vSchedCatTag);

    //            if (GetSectionNode(retrievedPlanRecords, PatientId, CurrPlanId, vSchedCatStr) != "") {
    //                GoalSectionTags = GetSectionNode(retrievedPlanRecords, PatientId, CurrPlanId, vSchedCatStr);
    //            }
    //            else { GoalSectionTags = "" };
    //            planLevel = planLevel +
    //                //'<tr class= "tree" ><td style="white-space:nowrap;" class="active" class="plannameLI" id="' +
    //                //vSchedCatStr
    //                //+ '"> <img class="plusminus"> <span class="planname" >' + vSchedCatTag + '</span></td>' + GoalSectionTags + '</tr>';

    //            '<div><div style="white-space:nowrap;" class="plannameLI" id="' + vSchedCatStr + '">' + vSchedCatTag + '</span></div>' + GoalSectionTags + '</div>';
    //            //vSchedCatTag // we can bind this with 'Care Plan Monitor'
    //        }
    //    }
    //}
    // return planLevel
}

function GetSectionNode(retrievedPlanRecords, PatientId, PlanId, SchedCat) {
    var goalLevel = "";
    var CurrGoalId = "";
    var PrvGoalId = "";
    var GoalArray = [];
    var GoalState = [];
    var SectionArray = [];
    var GoalNodeDetailsTags = "";
    var vGoalSectionTag = "";
    var vGoalSectionStr = "";

    retrievedGoalRecords = retrievedPlanRecords;
    if (retrievedGoalRecords.length > 0) //No matching Care plan found, create new care plan
    {
        for (var i = 0; i < retrievedGoalRecords.length; i++) {

            var CurrPlanId = retrievedGoalRecords[i].attributes["tri_careplanid"].id;  // curent plan Id
            var CurrPlanGoalId = retrievedGoalRecords[i].attributes["tri_careplangoalid"].id; // Current goal Id
            var CurrSchedCat = retrievedGoalRecords[i].attributes["tri_schedulecategory"].value;  // ????

            if (CurrSchedCat == SchedCat) {
                var CurrGoalId = retrievedGoalRecords[i].attributes["tri_careplangoalid"].id;
                var CurrVitalType = retrievedGoalRecords[i].attributes["tri_vitalvaluetypename"].value;  // type
                var PlanGoalConcatid = CurrPlanId + CurrGoalId + "_vital";
                var ParentPlanId = retrievedGoalRecords[i].attributes["tri_careplanid"].id + "_td";
                var CurrGoalId_li = retrievedGoalRecords[i].attributes["tri_careplangoalid"].id + "_li";
                var SchedCat_cls = SchedCat + "_cls";
                if (retrievedGoalRecords[i].attributes["tri_goalsection"] != undefined) {

                    // Type & Details
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

                var indexOfSection = SectionArray.indexOf(vGoalSectionTag);

                if (indexOfSection === -1) {
                    SectionArray.push(vGoalSectionTag);  // goal scetion

                    var varCatSectionConcatId = SchedCat + "_" + vGoalSectionStr;

                    if (GetGoalDetailsNode(retrievedPlanRecords, CurrVitalType, SchedCat, vGoalSectionStr) != "") {
                        GoalNodeDetailsTags = GetGoalDetailsNode(retrievedPlanRecords, CurrVitalType, SchedCat, vGoalSectionStr);
                    }
                    else { 
                        GoalNodeDetailsTags = "" 
                    };

                    //if (retrievedGoalRecords[i].attributes["tri_goalselected"].value === true) { // set checkbox based on join field value
                    //    flgchcked = '<input type="checkbox" level="parent" class = "chkboxclass" name="' + CurrVitalType + '"  value="' + PlanGoalConcatid + '"  checked/>';
                    //}
                    //else {

                    //    flgchcked = '<input type="checkbox" level="parent" class = "chkboxclass" name="' + CurrVitalType + '"  value="' + PlanGoalConcatid + '"/>';
                    //}
                    //goalLevel = goalLevel + '<tr class="goalrow" parentclass ="' +
                    //            SchedCat_cls + '"><td style="padding-left: 25px; white-space:nowrap;" class="active" class="goalnameLI" parentschedcatid="' +
                    //            SchedCat + '" id="' + varCatSectionConcatId + '"><img class="plusminus" />  <span style="vertical-align:middle">' +
                    //            flgchcked + '</span> <span class="goalname" id = "' + CurrGoalId + '">' +
                    //            vGoalSectionTag + '</span></td>' +
                    //            GoalNodeDetailsTags + '</tr>';

                    //added section for new UI
                    goalLevel = goalLevel +
                    '<div>' +
                       '<ul id="" class="w3-navbar w3-black"><li class="lifirstchild" style="background-color:#0072C6;margin-top:10px;">' +
                       '<a href="#" onclick="openTab(this, "All", "#0072C6")">+</a></li>' +
                       '<li style="background-color:#FF4444;margin-top:10px;"><a href="#" onclick="openTab(this,"One","#FF4444")">1</a></li>' +
                       '<li style="background-color: #99CC00; margin-top: 10px;"><a href="#" onclick="openTab(this, "Four", "#99CC00")">4</a></li>' +
                       '<li style="background-color:#666666;margin-top:10px;"><a href="#" onclick="openTab(this,"calender","#666666")">1&nbsp;</a></li>' +
                       //'<li><span>' + vGoalSectionTag + '</span></li>' +
                       '<li><span>' + "vGoalSectionTag" + '</span></li>' +
                       //'</ul>' + GoalNodeDetailsTags + '</div>' +
                       '</ul>' + "GoalNodeDetailsTags" + '</div>' +
                     '<div class="clear"></div>' +
                    '<div id="actions" style="width:100%;height:2px;border:1px solid #cccccc;margin-top:10px;background-color:#cccccc;"></div>';
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

    retrievedGoalRecords1 = retrievedPlanRecords;
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

            if (CurrSchedCat === SchedCatdtl && CurrGoalSection === GoalSectiondtl) {

                var SchedCatSectnCls = SchedCatdtl + "_" + GoalSectiondtl + "_cls";
                var CurrPlanId = retrievedGoalRecords1[i].attributes["tri_careplanid"].id;
                var CurrGoalId = retrievedGoalRecords1[i].attributes["tri_careplangoalid"].id;
                var CurrGoalId_li = retrievedGoalRecords1[i].attributes["tri_careplangoalid"].id + "_li";
                var goalSelected = retrievedGoalRecords1[i].attributes["tri_goalselected"].value;
                var careplanjoin = retrievedGoalRecords1[i].attributes["tri_careplanjoinid"].value;

                if (retrievedGoalRecords1[i].attributes["tri_metric"] != undefined) {
                    TargetValue = retrievedGoalRecords[i].attributes["tri_metric"].value; //////////////////////////////////////////
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

                //goaldetailLevel = goaldetailLevel +
                //    '<tr class="goalrowdetail" parentCatSectionClass="' + SchedCatSectnCls + '" parentgoalid="' + CurrGoalId_li + '"><td></td><td class = "chkboxclasstd" style="text-align:center">' + flgchcked
                //// + '</span></td><td style="text-align:center"><div><select id="metricoperator' + careplanjoin + '"><option value="100000000">Most Patients</option><option value="100000001">Elderly Frail</option><option value="100000002">Comorbid</option><option value="100000003">Stage 2-3</option></select></div></td>' +
                // + '</td><td style="text-align:left">' + currVitalTypeName + '</td><td style="text-align:center">' + vPatientfactor + '</td>' +
                //      '<td style="text-align:center">' + vTargetMetricOperator + '</td>' +
                //      '<td style="text-align:center">' + TargetValue + '</td>' +
                //      '<td style="text-align:center"><div><select class="ActionMetricOperatorSelectCls"><option value="167410000">></option><option value="167410001"><</option><option value="167410002">=</option><option value="167410003">% Decrease</option><option value="167410004">% Increase</option></select></div></td>' +
                //      '<td style="text-align:center">' + vActiontriggerValue + '</td>' +
                //      //'<td style="text-align:center"><input type="checkbox" name="autoactivitychkbox" align= "center" /></td>' + //AutocreateActivity?
                //      '<td>' + vMeasureDtl + '</td>' + //measure details
                //      //'<td>' + '+ + '</td>' + //Activity Create On
                //      //'<td>' + '+ + '</td>' + //Activity Due On  ---------- Next Due date
                //      '<td>' + '+ + '</td>' + ///Activity Recurrence ---------- Next Due date
                //      //'<td>' + '+ + '</td>' + //Number Of Recurrences
                //      '<td>' + vActivityAssgmntRole + '</td>' + //Activity Assignment Role
                //      '<td>' + vActivityDescription + '</td>' + //Activity Description
                //      '<td style="text-align:left">' + currCplanName + '</td>' + //care plan
                //      '<tr>';


                goaldetailLevel = goaldetailLevel +
                '<div id="">' +
                    '<div id="" class="symptoms" style="display:none;">' +
                        '<div class="careaPlans">' +
                            '<div style="">' +
                                '<span>' + currVitalTypeName + '</span>' +
                                '<span>' + TargetValue + '</span>' +
                                '<span>frequency minimized</span>' +
                                '<span>4/1/2016</span>' +
                                '<span>4/1/17(6 months)</span>' +
                                '<span><a href="#" onclick="openTypeDetailsDescription(this)">...</a></span>' +
                            '</div>' +
                        '</div>' +
                    '</div>'
                //+
                //'<div id="One" class="symptoms">'+
                //   '<div class="careaPlans">'+
                //        '<div style="">'+
                //            '<span> Breathing Symptoms</span>'+
                //            '<span>none</span>'+
                //            '<span>severe coughing continues</span>'+
                //            '<span>4/1/2016</span>'+
                //            '<span>4/1/17 OVERDUE</span>'+
                //            '<span><a href="#">...</a></span>'+
                //        '</div>'+
                //    '</div>'+
                //'</div>'+
                //'<div id="Four" class="symptoms" style="display:none;">'+
                //    '<div class="careaPlans">'+
                //        '<div style="">'+
                //            '<span>Able to Speak Full Sentences</span>'+
                //            '<span>yes</span>'+
                //            '<span>yes</span>'+
                //            '<span>4/1/2016</span>'+
                //            '<span>4/1/17(3 months)</span>'+
                //            '<span><a href="#">...</a></span>'+
                //        '</div>'+
                //    '</div>'+
                //'</div>'+
                //'<div id="calender" class="symptoms" style="display:none;">'+
                //    '<div class="careaPlans">'+
                //        '<div style="">'+
                //            '<span> Breathing Symptoms</span>'+
                //            '<span>none</span>'+
                //            '<span>severe coughing continues</span>'+
                //            '<span>4/1/2016</span>'+
                //            '<span>4/1/17 OVERDUE</span>'+
                //            '<span><a href="#">...</a></span>'+
                //        '</div>'+
                //    '</div>'+
                //    '</div>'+
                //'</div>'
                ;

            }
        }

        //goaldetailLevel = '<tr><td></td><td>Hello</td><tr>';
        return goaldetailLevel;
    }
}