//--------------------------------------------------------顯示所有問卷標題
$(document).ready(function () {
    sessionStorage.removeItem('questionList');
    sessionStorage.removeItem('questionnaireInfo');
    sessionStorage.removeItem("qaList");//刪除新增時的題目session
    sessionStorage.removeItem('queSessionFile');//刪除新增時的問卷session
    //--
    sessionStorage.removeItem('questionnaireFeedback');//刪除新增時的問卷session
    sessionStorage.removeItem('queSessionFile1');//刪除新增時的問卷session
    sessionStorage.removeItem('qaListVo');
    sessionStorage.removeItem('numIndex');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('numUuid');
    getQuestionnaireList()

})
//--------------------------------------------------------搜尋
$('#searchQusBackstage').on('click', function (e) {
    e.preventDefault()
    let searchQuestionnaireName = $('#queTitleBackstage').val();
    let startDate = $('#startDateSearcah').val();
    let endDate = $('#endDateSearch').val();
    getQuestionnaireList(searchQuestionnaireName, startDate, endDate)

});
//--------------------------------------------------------刪除
$(document).on('click', 'button[id*=deleteHomePage]', function (e) {
    let delIds = [];
    $('input[id*=ckb]:checked').each(function () {
        if ($(this).prop('checked') == true) {
            delIds.push($(this).prop('id').split('_')[1])
        }
    })
    deleteQuestionnaireName(delIds)
    console.log(delIds);
})
//--------------------------------------------------------前往觀看統計
$(document).on('click', 'input[id*=btn]', function (e) {
    e.preventDefault();
    let id = $(this).prop('id').split('_')[1]
    sessionStorage.setItem('readQuesId', id);
    getTopicAndOptions(id)
    window.location.href = "Revisebackstage/Revisebackstage.html#tab-4"
})