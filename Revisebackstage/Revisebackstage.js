let quesId = sessionStorage.getItem('readQuesId')//問卷的uuId
// readQaByQuestionnaireTitle(quesId)
let qaList = JSON.parse(sessionStorage.getItem('questionList'))//封裝的list
let queInfo = JSON.parse(sessionStorage.getItem('questionnaireInfo'))//問卷名稱
let questionnaireFeedback = JSON.parse(sessionStorage.getItem('questionnaireFeedback'))//查看用戶填寫問卷資訊
let que = queInfo
//=====================================================================================
// let numAryS = JSON.parse(sessionStorage.getItem('numAry'))

//-----
//剛進網頁要準備的東西
//印出所有問卷資訊
$(document).ready(function () {
    if (que != null) {
        $('#queName').val(que.questionnaireName.questionnaireName)
        $('#textName').val(que.questionnaireName.description)
        $('#strDate').val(que.questionnaireName.startDate)
        $('#endDate').val(que.questionnaireName.endDate)
    }
    //===

    let qaListVo = [];
    if (qaList != null) {
        for (let vo of qaList) {
            let num = Math.floor(Math.random() * 100000);
            qaListVo.push({ num: num, topicTitleName: vo.topicTitleName, questionName: vo.questionName, onlyOrMany: vo.onlyOrMany, essential: vo.essential })
        }
    }

    for (let voItem of qaListVo) {
        $('#epName').val(voItem.topicTitleName)
        if (voItem.onlyOrMany == true) {
            sel = '多選'
        } else {
            sel = '單選'
        }
        if (voItem.essential == true) {
            nes = '必填'
        } else {
            nes = '非必填'
        }
        $('#question-list').append(`<tr id="tableRow_${voItem.num}"><td><input type="checkbox" name="check1" id="checkboxQusUpdate_${voItem.num}"></td<td></td><td id="td1"> ${voItem.topicTitleName}  </td><td id="td2"> ${sel} </td><td id="td3"> ${nes} </td><td id="td4"><button id="updateButton_${voItem.num}">編輯</button></td></tr>`);
    }
    //==
    sessionStorage.setItem('qaListVo', JSON.stringify(qaListVo))
    getPeopleAndWriteDateInfo(quesId)
    getTopicAndOptions(quesId)
})
//------------------------------------------------------------------無視
//問卷修改時的送出/確認修改
$('#changeIntCreate').on('click', function (e) {
    let queName = $('#queName').val();
    let textName = $('#textName').val();
    let strDate = $('#strDate').val();
    let endDate = $('#endDate').val();

    sessionStorage.setItem('queSessionFile1', JSON.stringify({
        title: queName,
        description: textName,
        startTime: strDate,
        endTime: endDate
    })
    )

    // create_questionnaire(queName, textName, strDate, endDate)
})

//------------------------------------------------------------------CUD
//題目、選項加入到暫存 > 按下編輯後將值帶入input
$(document).on('click', 'button[id*=updateButton_]', function (e) {
    e.preventDefault();
    let voList = JSON.parse(sessionStorage.getItem('qaListVo'))
    let id = $(this).prop('id').split('_')[1]

    // let indexNum = $(this).parent('td').parent('tr').index() - 1
    sessionStorage.setItem('id', id)
    //==
    let updateQes;
    for (let voItem of voList) {
        if (id == voItem.num) {
            updateQes = voItem;
        }
    }

    //==
    console.log(id);
    $('#tab2Question').val(updateQes.topicTitleName);
    $('#epNameOptions').val(updateQes.questionName);
    if (updateQes.onlyOrMany) {
        $('#sel11').val('true')
    } else {
        $('#sel11').val('false')
    }

    if (updateQes.essential) {
        $("#check123").prop("checked", true)
    } else {
        $("#check123").prop("checked", false)
    }
    // 將create鈕外觀改成update 新增href屬性 值為被點選的Id
    $('#intRevise').show();
    $('#changeIntCreate2').hide();
})
//------------------------------------------------------------------
// 題目、選項的<編輯>
$('#intRevise').on('click', function (e) {
    e.preventDefault()

    let num = 0;
    let voList = JSON.parse(sessionStorage.getItem('qaListVo'))
    let idNum = sessionStorage.getItem('id')
    let updateQes;
    for (let voItem of voList) {
        if (idNum == voItem.num) {
            updateQes = voItem;
        }
    }
    updateQes.topicTitleName = $('#tab2Question').val();
    updateQes.questionName = $('#epNameOptions').val();
    if ($('#sel11').val() == 'true') {
        updateQes.onlyOrMany = true
    } else {
        updateQes.onlyOrMany = false
    }

    if ($("#check123").is(":checked")) {
        updateQes.essential = true
    } else {
        updateQes.essential = false
    }
    console.log(voList);
    $('#question-list').empty()
    let sel1 = ''
    let nes1 = ''

    $('#question-list').append(`
        <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>問題</th>
                        <th>種類</th>
                        <th>必填</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    `)
    for (let item of voList) {
        let num = Math.floor(Math.random() * 100000);
        if (item.onlyOrMany === true) {
            sel1 = '多選'
        } else {
            sel1 = '單選'
        }

        if (item.essential) {
            nes1 = '必填'
        } else {
            nes1 = '非必填'
        }
        $('#question-list').append(`<tr id="tableRow_${item.num}"><td><input type="checkbox" name="check1" id="checkboxQusUpdate_${item.num}"></td<td></td><td id="td1"> ${item.topicTitleName}  </td><td id="td2"> ${sel1} </td><td id="td3"> ${nes1} </td><td id="td4"><button id="updateButton_${item.num}">編輯</button></td></tr>`);
    }
    $('#intRevise').hide();
    $('#changeIntCreate2').show();
    // sessionStorage.removeItem('id')
    sessionStorage.setItem('qaListVo', JSON.stringify(voList))
    cleanString();
})
//------------------------------------------------------------------
//清空input
function cleanString(e) {
    // e.preventDefault();
    document.getElementById("tab2Question").value = "";
    document.getElementById("epNameOptions").value = "";
    document.getElementById("check123").checked = false;
    document.getElementById("sel11").value = false;
}
//------------------------------------------------------------------
//題目、選項的新增
$('#changeIntCreate2').on('click', function (e) {

    e.preventDefault()
    let numUuid = Math.floor(Math.random() * 100000);
    let voList = JSON.parse(sessionStorage.getItem('qaListVo'))

    let questions = $('#tab2Question').val();

    let selectedOption = false;

    let required11;
    if ($('#sel11').val() == 'true') {
        selectedOption = true
    } else {
        selectedOption = false
    }


    if (required11 = $("#check123").is(":checked")) {
        required11 = true
    } else {
        required11 = false
    }

    let num = 0;
    let options = $('#epNameOptions').val();



    voList.push({ num: numUuid, topicTitleName: questions, questionName: options, onlyOrMany: selectedOption, essential: required11 })

    // 將問題存入 Session  
    sessionStorage.setItem('qaListVo', JSON.stringify(voList))

    let sel = '';
    let nes = '';

    if (selectedOption == true) {
        sel = '多選'
    } else {
        sel = '單選'
    }

    if (required11) {
        nes = '必填'
    } else {
        nes = '非必填'
    }
    $('#question-list').append(`<tr id="tableRow_${numUuid}"><td><input type="checkbox" name="check1" id="checkboxQusUpdate_${numUuid}"></td<td></td><td id="td1"> ${questions}  </td><td id="td2"> ${sel} </td><td id="td3"> ${nes} </td><td id="td4"><button id="updateButton_${numUuid}">編輯</button></td></tr>`);
    // window.location.reload();
    cleanString();

})
//------------------------------------------------------------------
//暫且無視
//問題、選項的<確認修改>
$('#changeIntCreate3').on('click', function (e) {
    e.preventDefault();
    let sessionData = JSON.parse(sessionStorage.getItem('queSessionFile1'));
    // let title = sessionData.title;
    let voList = JSON.parse(sessionStorage.getItem('qaListVo'))
    let qaListVo = []
    for (let voItem of voList) {
        qaListVo.push({ topicTitleName: voItem.topicTitleName, questionName: voItem.questionName, onlyOrMany: voItem.onlyOrMany, essential: voItem.essential })
    }
    let title;
    let description;
    let startTime;
    let endTime;
    if (sessionData != null) {
        title = sessionData.title;
        description = sessionData.description;
        startTime = sessionData.startTime;
        endTime = sessionData.endTime;
    }

    updateQuestionnaireName(quesId, title, description, startTime, endTime, qaListVo)
})
//------------------------------------------------------------------
$(document).on('click', 'button[id*=GotofeedbackBtn_]', function (e) {
    e.preventDefault()
    let writeUuid = $(this).prop('id').split('_')[1]
    $('#testtesttt').hide()
    $('#userInfo').show()
    getQuestionnaireFeedback(writeUuid)
    let usersId = $(this).prop('id').split('_')[1]
})
$(document).on('click', 'button[id*=backFeedbackBtn]', function (e) {
    e.preventDefault()
    $('#userInfo').hide()
    $('#testtesttt').show()
})

//------------------------------------------------------------------
//題目、選項的刪除session
///////////題目刪除//////////////////
$('#deleteQusBtn').on('click', function (e) {
    e.preventDefault()
    let voList = JSON.parse(sessionStorage.getItem('qaListVo'))
    let delIds = []
    $('[id*=checkboxQusUpdate]:checked').each(function (e) {
        if ($(this).prop('checked') == true) {
            delIds.push($(this).prop('id').split('_')[1])
        }
    })
    for (let item of delIds) {
        $('#tableRow_' + item).remove()
        voList = voList.filter(function (x) {
            return x.num != item
        })
    }

    sessionStorage.setItem('qaListVo', JSON.stringify(voList));
    let num = voList.length;
    sessionStorage.setItem('numIndex', num);
    console.log(voList.length + "刪除後長度")
    let newNum = 0
    cleanString();
    $('#intRevise').hide();
    $('#changeIntCreate2').show();
})

