let pageNumber = 0;
function getQuestionnaireList(searchQuestionnaireName, searchStartDate, searchEndDate) {

    let ary = [];
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page" class="page-btn">上一页</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page" class="page-btn">下一页</button>';
    let objPostData = {
        searchQuestionnaireName: searchQuestionnaireName,
        searchStartDate: searchStartDate,
        searchEndDate: searchEndDate
    }

    $.ajax({
        url: "http://localhost:8080/getQuestionnaireList",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),

        success: function (QuestionnaireRes) {
            // $('#table1').empty()
            // $('#table1').append(`<thead><th><th>#</th><th>問卷</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th></thead>`);
            let { message, questionnaireNameList } = QuestionnaireRes
            if (message != null) {
                alert(message)
            }
            changePage(1, questionnaireNameList);


            var page = document.querySelector('.page_btn'); //要塞按鈕的位置

            var btnNum = Math.ceil(questionnaireNameList.length / 10); //算出每頁要顯示10筆資料所需要的按鈕
            console.log(btnNum + "btnNum")

            var str = '';

            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
                str += `<span>${(i + 1)}</span>`
            };

            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;

            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btn span')

            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePage.bind(this, (i + 1), questionnaireNameList))
            }

            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page');
            const supPageBtn = document.querySelector('#sup-page');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber <= 1) {

                    changePage(1, questionnaireNameList);
                } else {

                    //回到當前頁面的上一筆
                    changePage(pageNumber - 1, questionnaireNameList);
                }
            });

            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {

                    changePage(pageNumber, questionnaireNameList);
                } else {
                    //回到當前頁面的下一筆
                    changePage(pageNumber + 1, questionnaireNameList);
                }
            });

        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//------------------------------------------------------------------------------
function creatPeople(name, manOrGirl, email, phone, age) {
    let objPostData = {
        name: name,
        manOrGirl: manOrGirl,
        email: email,
        phone: phone,
        age: age
    }

    $.ajax({
        url: "http://localhost:8080/creatPeople",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (QuestionnaireRes) {
            let { message, people } = QuestionnaireRes
            if (message != null) {
                alert(message)
            }
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}

//------------------------------------------------------------------------------
//印出問卷供用戶填寫
function getTopicAndOptions(questionnaireNameUuid) {

    let objPostData = {
        questionnaireNameUuid: questionnaireNameUuid
    }

    $.ajax({
        url: "http://localhost:8080/getTopicAndOptions",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (QuestionnaireRes) {
            let { questionnaireName, topicTitleInfoList, optionsInfoList } = QuestionnaireRes
            let num = 0;
            $('#writeTable').empty()


            for (let t of topicTitleInfoList) {
                // <th><th>#</th><th>問題</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th>
                $('#writeTable').append(`<th>${t.topicName}</th>`);//問題
                for (let o of optionsInfoList) {
                    if (t.topicUuid == o.topicUuid) {
                        if (t.onlyOrMany == false) {
                            $('#writeTable').append(`<tr><td><input type="radio"> ${o.questionName}</td></tr>`); ///選項
                        } else {
                            $('#writeTable').append(`<tr><td><input type="checkbox">${o.questionName}</td></tr>`);///選項
                        }
                    }
                }
            }

        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//---------------------------------------------------------------------------

function changePage(page, data) {

    //全域變數:用於得知當前頁數
    pageNumber = page;
    console.log(pageNumber + "頁")

    //代表每頁出現 10 筆資料
    var items = 10;

    //按鈕按下 1，會出現 1～10筆資料，但陣列索引值卻是 0～9 的資料，以此類推
    var pageIndexStart = (page - 1) * items

    var pageIndexEnd = page * items

    //每次近來這function先清空
    $('#table1').empty()
    $('#table1').append(`<th><th>#</th><th>問卷</th><th>狀態</th><th>開始時間</th><th>結束時間</th><th>觀看統計</th></th>`);

    //索引1-10資料
    for (var i = pageIndexStart; i < pageIndexEnd; i++) {
        if (i >= data.length) { break; }
        let num = i + 1;

        //解構，看第幾筆資料

        let item = data[i]
        let openOrClosure = ""
        if (item.stateOpenOrClosure == true) {
            openOrClosure = "開啟";
        } else {
            openOrClosure = "關閉";
        }
        $('#table1').append(`<tbody id="myTbody"><tr><td><input type="checkbox" name="check1" id="ckb_${item.questionnaireUuid}_${item.questionnaireName}"></td><td>${num}</td><td><button id="hrefQues_${item.questionnaireUuid}_${item.questionnaireName}" class="test123456">${item.questionnaireName}</button></td><td>${openOrClosure}</td><td>${item.startDate}</td><td>${item.endDate}</td>><td><input type="button" value="前往" id="btn_${item.questionnaireUuid}"></td></tr></tbody>`);
    }
};