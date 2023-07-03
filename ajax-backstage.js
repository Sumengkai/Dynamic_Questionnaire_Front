
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
//--------------------------------------------------------------------------------
//刪除問卷
function deleteQuestionnaireName(questionnaireIdList) {
    let objPostData = {
        questionnaireNameUuidList: questionnaireIdList
    }
    $.ajax({
        url: "http://localhost:8080/deleteQuestionnaireName",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (QuestionnaireRes) {

            let { message } = QuestionnaireRes
            if (message != null) {
                alert(message)
            }
            window.location.reload();
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//--------------------------------------------------------------------------------
//顯示指定問卷的問答內容 
function getVoList(questionnaireNameUuid) {
    let objPostData = {
        questionnaireNameUuid: questionnaireNameUuid,
    }
    $.ajax({
        url: "http://localhost:8080/getVoList",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (QuestionnaireRes) {
            let { questionnaireName, dynamicQuestionnaireVoList } = QuestionnaireRes
            let sel = ''
            let nes = ''
            let questionnaireInfo = { questionnaireName }
            sessionStorage.setItem('questionnaireInfo', JSON.stringify(questionnaireInfo))//問卷
            sessionStorage.setItem('questionList', JSON.stringify(dynamicQuestionnaireVoList))//題目
            window.location.href = "Revisebackstage/Revisebackstage.html"
            // window.location.href='questionnaire/questionnaire2.html'

        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//--------------------------------------------------------------------------------
//修改問卷
function updateQuestionnaireName(questionnaireNameUuid, questionnaireName, description, startDate, endDate, dynamicQuestionnaireVoList) {
    let objPostData = {
        questionnaireNameUuid: questionnaireNameUuid,
        questionnaireName: questionnaireName,
        description: description,
        startDate: startDate,
        endDate: endDate,
        dynamicQuestionnaireVoList: dynamicQuestionnaireVoList
    }
    $.ajax({
        url: "http://localhost:8080/updateQuestionnaireName",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (response) {
            let { message } = response
            alert(message)

            window.location.href = "http://127.0.0.1:5502/backstage.html"

        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//--------------------------------------------------------------------------------
//問卷回饋->用戶填寫問卷日期
function getPeopleAndWriteDateInfo(questionnaireNameUuid) {
    let suppage = '';
    let nextpage = '';
    suppage = '<button id="sup-page" class="page-btn">上一页</button>&nbsp;&nbsp;&nbsp;';
    nextpage = '&nbsp;&nbsp;&nbsp;<button id="next-page" class="page-btn">下一页</button>';
    let objPostData = {
        questionnaireNameUuid: questionnaireNameUuid
    }
    $.ajax({
        url: "http://localhost:8080/getPeopleAndWriteDateInfo",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (QuestionnaireRes) {
            let { message, writeListInfo } = QuestionnaireRes
            if (message != null) {
                // alert(message + "????????")
            }
            //==
            changePageForPeople(1, writeListInfo);

            var page = document.querySelector('.page_btnForPeople'); //要塞按鈕的位置

            var btnNum = Math.ceil(writeListInfo.length / 1); //算出每頁要顯示10筆資料所需要的按鈕 ##

            console.log(btnNum + "btnNum")

            let str = '';

            // //看要幾個按鈕，塞進span並且顯示在heml元素的容器
            for (var i = 0; i < btnNum; i++) {
                str += `<span>${i + 1}</span>`;

            };

            // //塞進html元素中的容器
            page.innerHTML = suppage + str + nextpage;

            // //使用 querySelectorAll 選出下面所有的按鈕
            var btn = document.querySelectorAll('.page_btnForPeople span')

            // //選取到了每顆按鈕後，我們分別去做綁定監聽的動作
            for (var i = 0; i < btn.length; i++) {
                btn[i].addEventListener('click', changePageForPeople.bind(this, (i + 1), writeListInfo))
            }

            // //監聽上一頁、下一頁
            const nextPageBtn = document.querySelector('#next-page');
            const supPageBtn = document.querySelector('#sup-page');
            supPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber <= 1) {
                    changePageForPeople(1, writeListInfo);
                } else {
                    //回到當前頁面的上一筆
                    changePageForPeople(pageNumber - 1, writeListInfo);
                }
            });

            nextPageBtn.addEventListener('click', (e) => {
                e.preventDefault()
                if (pageNumber >= btn.length) {

                    changePageForPeople(pageNumber, writeListInfo);
                } else {
                    //回到當前頁面的下一筆
                    changePageForPeople(pageNumber + 1, writeListInfo);
                }
            });
            //==

            // $('#tab3feedBack').empty()


            // $('#tab3feedBack').append(`<thead>
            // <tr>
            //     <th>#</th>
            //     <th>姓名</th>
            //     <th>填寫時間</th>
            //     <th>觀看細節</th>
            // </tr>
            // </thead>`)
            // $.each(writeListInfo, function (index, value) {

            //     let num = index + 1
            //     let time = (value.writeDateTime).replace('T', ' ')

            //     $('#tab3feedBack').append(`<tr><td>${num}</td><td>${value.name}</td/><td>${time}</td/><td><button id="GotofeedbackBtn_${value.writeUuid}">前往</button></td></tr>`)

            // })


        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//--------------------------------------------------------------------------------
//問卷回饋->用戶填寫內容
function getQuestionnaireFeedback(writeDateUuid) {

    let objPostData = {
        writeDateUuid: writeDateUuid
    }

    $.ajax({
        url: "http://localhost:8080/getQuestionnaireFeedback",
        method: 'POST',
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(objPostData),
        success: function (QuestionnaireRes) {
            $('#topic1').empty()
            let { people, writeDate, questionnaireName, topicTitleInfoList, optionsInfoList, chooseListForPeople } = QuestionnaireRes
            // 人物資訊、填寫日期、問卷名稱、問題名稱、選項、用戶選的選項
            let questionnaireInfo = { people: people, writeDate: writeDate, questionnaireName: questionnaireName, topicTitleInfoList: topicTitleInfoList, optionsInfoList: optionsInfoList, chooseListForPeople: chooseListForPeople }
            sessionStorage.setItem('questionnaireFeedback', JSON.stringify(questionnaireInfo))
            $('#userName').val(people.name)
            $('#userGender').val(people.manOrGirl)
            $('#userPhone').val(people.phone)
            $('#userEmail').val(people.email)
            $('#userAge').val(people.age)
            $('#qName').val(questionnaireName.questionnaireName)
            $('#userFinish').val(writeDate.writeDateTime.replace('T', ' '))

            $('#topic1').append('<hr/>')
            for (let t of topicTitleInfoList) {

                $('#topic1').append(t.topicName)
                for (let o of optionsInfoList) {
                    if (t.topicUuid === o.topicUuid) {
                        $('#topic1').append('<br/>' + o.questionName + '&nbsp;' + o.percentage + "%" + '&nbsp;')
                    }
                    for (let c of chooseListForPeople) {
                        if (o.questionName == c && t.topicUuid === o.topicUuid) {
                            $('#topic1').append('<input type="checkbox" checked disabled></input>')
                        }
                    }
                }
                $('#topic1').append('<hr/>')
            }



            $('#topic1').append(`<button id="backFeedbackBtn">返回</button>`)


            // sessionStorage.setItem('questionList', JSON.stringify(qaList))


        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//--------------------------------------------------------------------------------
//問卷統計
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
            if (topicTitleInfoList == null || optionsInfoList == null) {
                console.log("空")
                return;
            }
            let num = 0;
            $('#tab4statistics').empty()
            for (let t of topicTitleInfoList) {
                num++;
                $('#tab4statistics').append(`<h2 style="color:red;">${t.topicName} </h2>`)
                $('#tab4statistics').append(`<canvas id="myChart_${num}"></canvas> 
                <br>
                <hr>
                <br>`)
                const ctx = document.getElementById('myChart_' + num);
                let oName = [];
                let percentage = [];

                for (let o of optionsInfoList) {
                    if (t.topicUuid === o.topicUuid) {
                        oName.push(o.questionName)
                        percentage.push(o.percentage)

                    }

                }

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: oName,
                        datasets: [
                            {
                                label: "%",
                                data: percentage,
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }

                });

            }
        },
        error: function (e) {
            console.log(e)
            alert('Failed')
        },
    })
}
//--------------------------------------------------------------------------------
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
        let date = new Date();
        let item = data[i]
        let openOrClosure = ""
        if (date < new Date(item.startDate)) {
            openOrClosure = "未開放"
        } else if (date > new Date(item.endDate)) {
            openOrClosure = "已結束"
        } else {
            openOrClosure = "開放"
        }
        $('#table1').append(`<tbody id="myTbody"><tr><td><input type="checkbox" name="check1" id="ckb_${item.questionnaireUuid}_${item.questionnaireName}"></td><td>${num}</td><td><button id="hrefQues_${item.questionnaireUuid}" class="test123456">${item.questionnaireName}</button></td><td>${openOrClosure}</td><td>${item.startDate}</td><td>${item.endDate}</td>><td><input type="button" value="前往" id="btn_${item.questionnaireUuid}"></td></tr></tbody>`);
    }
};
//--------------------------------------------------------------------------------
function changePageForPeople(page, data) {

    //全域變數:用於得知當前頁數
    pageNumber = page;
    console.log(pageNumber + "頁")

    //代表每頁出現 10 筆資料
    var items = 1;

    //按鈕按下 1，會出現 1～10筆資料，但陣列索引值卻是 0～9 的資料，以此類推
    var pageIndexStart = (page - 1) * items

    var pageIndexEnd = page * items

    //每次近來這function先清空
    $('#tab3feedBack').empty()


    $('#tab3feedBack').append(`<thead>
            <tr>
                <th>#</th>
                <th>姓名</th>
                <th>填寫時間</th>
                <th>觀看細節</th>
            </tr>
            </thead>`)

    //索引1-10資料
    for (var i = pageIndexStart; i < pageIndexEnd; i++) {
        if (i >= data.length) { break; }
        let num = i + 1;
        //解構，看第幾筆資料
        let item = data[i]
        let time = (item.writeDateTime).replace('T', ' ')
        $('#tab3feedBack').append(`<tr><td>${num}</td><td>${item.name}</td/><td>${time}</td/><td><button id="GotofeedbackBtn_${item.writeUuid}">前往</button></td></tr>`)
    }
};