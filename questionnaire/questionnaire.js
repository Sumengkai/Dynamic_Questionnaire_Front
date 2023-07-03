// 問卷預設_開始時間當日，結束時間+7天
$(document).ready(function () {
    var strToday = new Date();
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    $('#strDate').attr('min', strToday.toISOString().substring(0, 10));
    $('#strDate').val(strToday.toISOString().substring(0, 10));
    $('#endDate').val(endDate.toISOString().substring(0, 10));
    let sessionFileList = []
    sessionStorage.setItem('qaList', JSON.stringify(sessionFileList))
});
//問卷_開始日期不能大於結束日期  
$('#strDate').change(function () {
    var strDay = new Date($(this).val());
    var endDate = new Date($('#endDate').val());

    if (strDay > endDate) {
        $('#endDate').val($(this).val());
    }
});
//問卷_結束日期不能小於開始日期
$('#endDate').change(function () {

    var strDay = new Date($('#strDate').val());
    var endDate = new Date($(this).val());

    if (endDate < strDay) {
        $('#strDate').val($(this).val());
    }
});
//------------------------------------------------------------------
// 問卷新增時的送出
///////////////-----------問卷--------------////////////////
$('#intCreate1').on('click', function (e) {
    let queName = $('#queName').val();
    let textName = $('#textName').val();
    let strDate = $('#strDate').val();
    let endDate = $('#endDate').val();
    sessionStorage.setItem('queSessionFile', JSON.stringify({
        title: queName,
        description: textName,
        startTime: strDate,
        endTime: endDate
    })
    )
}
)
//------------------------------------------------------------------
//題目、選項<新增>
//////////////-------題目加入到暫存--------------////////////////
let sessionFileList = [];
$('#intCreateBtn2').on('click', function (e) {
    e.preventDefault();
    sessionFileList = JSON.parse(sessionStorage.getItem('qaList'))
    let numUuid = Math.floor(Math.random() * 100000);
    let topicTitleName = $('#tab2Question').val();
    let selectedOption = $('#sel11').val();
    let required11;
    if (required11 = $("#check123").is(":checked")) {
        required11 = true
    } else {
        required11 = false
    }
    let questionName = $('#epNameOptions').val();
    sessionFileList.push({ numUuid: numUuid, topicTitleName: topicTitleName, questionName: questionName, essential: required11, onlyOrMany: selectedOption });
    // 將問題存入 Session  
    let sel = '';
    let nes = '';
    if (selectedOption === 'true') {
        sel = '多選'
    } else {
        sel = '單選'
    }

    if (required11) {
        nes = '必填'
    } else {
        nes = '非必填'
    }

    $('#question-list').append(`<tr id="tableRow_${numUuid}"><td><input type="checkbox" name="check1" id="checkboxQus_${numUuid}"></td<td></td><td id="td1"> ${topicTitleName}  </td><td id="td2"> ${sel} </td><td id="td3"> ${nes} </td><td id="td4"><button id="btnChange1_${numUuid}">編輯</button></td></tr>`);
    sessionStorage.setItem('qaList', JSON.stringify(sessionFileList));
    cleanString();
})
//------------------------------------------------------------------
//清空input
function cleanString() {
    document.getElementById("tab2Question").value = "";
    document.getElementById("epNameOptions").value = "";
    document.getElementById("check123").checked = false;
    document.getElementById("sel11").value = false;
}
//------------------------------------------------------------------
//題目、選項的<編輯> ->將值帶入input
///////////////-----------題目修改--------------////////////////
$(document).on('click', 'button[id*=btnChange1]', function (e) {
    e.preventDefault()
    let numUuid = $(this).prop('id').split('_')[1]

    let voList = JSON.parse(sessionStorage.getItem('qaList'))
    sessionStorage.setItem('numUuid', numUuid)
    let updateQes;
    for (let voItem of voList) {
        if (numUuid == voItem.numUuid) {
            updateQes = voItem;
        }
    }




    $('#epNameOptions').val(updateQes.questionName);
    $('#tab2Question').val(updateQes.topicTitleName);
    if (updateQes.onlyOrMany == true) {
        $('#sel11').val('true')
    } else {
        $('#sel11').val('false')
    }


    if (updateQes.essential == true) {
        $("#check123").prop("checked", true)
    } else {
        $("#check123").prop("checked", false)
    }
    // 將create鈕外觀改成update 新增href屬性 值為被點選的Id
    $('#intRevise').show();
    $('#intCreateBtn2').hide();



})
//------------------------------------------------------------------
//題目、選項的送出
//////////////-------題目表單送出--------------//////////////
$('#intCreate2').on('click', function (e) {
    e.preventDefault()
    let sessionData = JSON.parse(sessionStorage.getItem('queSessionFile'));
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
    let qaList = JSON.parse(sessionStorage.getItem('qaList'))

    creatQuestionnaireName(title, description, startTime, endTime, qaList)

}
);
//------------------------------------------------------------------
/////////////////////////////////////
$('#intRevise').on('click', function (e) {
    e.preventDefault()

    let voList = JSON.parse(sessionStorage.getItem('qaList'))
    console.log(voList);
    let numUuid = sessionStorage.getItem('numUuid')
    let updateQes;
    for (let voItem of voList) {
        if (numUuid == voItem.numUuid) {
            updateQes = voItem;

        }
    }
    // 由于JavaScript中的对象是通过引用传递的，updateQes实际上引用了voList中的对象。因此，通过修改updateQes对象的属性，也会修改voList中对应对象的属性。
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


    // console.log(sessionFileList);
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
        if (item.onlyOrMany == true) {
            sel1 = '多選'
        } else {
            sel1 = '單選'
        }

        if (item.essential) {
            nes1 = '必填'
        } else {
            nes1 = '非必填'
        }

        $('#question-list').append(`<tr id="tableRow_${item.numUuid}"><td><input type="checkbox" name="check1" id="checkboxQus_${item.numUuid}"></td<td></td><td id="td1"> ${item.topicTitleName}  </td><td id="td2"> ${sel1} </td><td id="td3"> ${nes1} </td><td id="td4"><button id="btnChange1_${item.numUuid}">編輯</button></td></tr>`);
    }

    $('#intRevise').hide();
    $('#intCreateBtn2').show();
    sessionStorage.setItem('qaList', JSON.stringify(voList));
    // --test
    // voList = JSON.parse(sessionStorage.getItem('qaList'))
    // for (let voItem of voList) {
    //     console.log(voItem);
    // }
    // --test
    cleanString();
})
//------------------------------------------------------------------
//題目、選項的刪除session
///////////題目刪除//////////////////
$('#deleteQusBtn').on('click', function (e) {
    e.preventDefault()
    let voList = JSON.parse(sessionStorage.getItem('qaList'))
    let delIds = []
    $('[id*=checkboxQus]:checked').each(function () {
        if ($(this).prop('checked') == true) {
            delIds.push($(this).prop('id').split('_')[1])
        }
    })
    for (let item of delIds) {
        $('#tableRow_' + item).remove()
        voList = voList.filter(function (x) {
            return x.numUuid != item
        })
    }
    sessionStorage.setItem('qaList', JSON.stringify(voList));
    console.log(voList.length + "長度");
    console.log(delIds);
    cleanString();
    $('#intRevise').hide();
    $('#intCreateBtn2').show();
})
//------------------------------------------------------------------
////////////////顯示指定問卷的問答內容/////////
$(document).on('click', 'button[id*=hrefQues]', function (e) {
    e.preventDefault()
    // $(this).prop('href', 'questionnaire/questionnaire2.html')
    let quesId = $(this).prop('id').split('_')[1]

    console.log(quesId);
    sessionStorage.setItem('readQuesId', quesId)
    getVoList(quesId)
})
