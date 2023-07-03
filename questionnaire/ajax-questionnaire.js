// //創建問卷
function creatQuestionnaireName(epName, description, strDate, endDate, voList) {

    let QuestionnaireReq = {
        questionnaireName: epName,
        description: description,
        startDate: strDate,
        endDate: endDate,
        dynamicQuestionnaireVoList: voList
    }

    $.ajax({
        url: "http://localhost:8080/api/creatQuestionnaireName",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(QuestionnaireReq),
        success: function (QuestionnaireRes) {

            let { message } = QuestionnaireRes
            console.log(message + "訊息")
            if (message != null) {
                alert(message)
            }
            window.location.href = "http://127.0.0.1:5502/backstage.html"
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    });
}


//填寫問卷
// function write_questionnaire(name, phone, Email, age, ansString, finishTime, questionnaireTitle, gender) {
//     let objPostData = {
//         name: name,
//         phone: phone,
//         Email: Email,
//         age: age,
//         ansString: ansString,
//         finishTime: finishTime,
//         questionnaireTitle: questionnaireTitle,
//         gender: gender
//     }
//     $.ajax({
//         url: "http://localhost:8080/write_questionnaire",
//         method: 'POST',
//         contentType: "application/json",
//         dataType: "json",
//         data: JSON.stringify(objPostData),
//         success: function (response) {
//             let { message } = response
//             alert(message)

//         },
//         error: function (e) {
//             console.log(e)
//             alert('Failed')
//         },
//     })
// }


