
let questionnaireName;
$(document).ready(function () {
    getQuestionnaireList()


})
//---------------
$(document).on('click', 'button[id*=hrefQues_]', function (e) {
    e.preventDefault()
    let quesId = $(this).prop('id').split('_')[1]
    sessionStorage.setItem('questionnaireNameUuid', quesId)
    questionnaireName = $(this).prop('id').split('_')[2]
    // alert(quesId)
    console.log(quesId);
    window.location.href = "http://127.0.0.1:5502/User/UserWrite.html"
})
//---------------
$('#peopleButton').on('click', function (e) {
    e.preventDefault()
    let name = $('#userName').val();
    let manOrGirl = $('#userGender').val();
    let email = $('#userEmail').val();
    let phone = $('#userPhone').val();
    let age = $('#userAge').val();
    creatPeople(name, manOrGirl, email, phone, age)
    // indexNum = sessionStorage.getItem('id')
    let questionnaireNameUuid = sessionStorage.getItem('questionnaireNameUuid')
    alert(questionnaireNameUuid)
    getTopicAndOptions(questionnaireNameUuid);
})
