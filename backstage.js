/////////////關鍵字搜尋//////////////////////

//keyup 打字的事件
// $('#queTitleBackstage').on('keyup',function(){
//     //抓取使用者的值，toLowerCase 不管大小寫
//     let value = $(this).val().toLowerCase();
//     // .text()找到所有文字 .indexof() 文字位置 , RegExp 檢查一致 ,replace() 變化顏色
// $('#table1').find('td').each(function(){
//     let text = $(this).text();
//     let position = text.indexOf(value);
//     //RegExp找到一致性的， i=>修飾符用於執行對大小寫不敏感的匹配。 g=>修飾符用於執行全局匹配（查找所有匹配而非在找到第一個匹配後停止。
//     let check = new RegExp(value,'ig');
//     text = text.replace(check, (match, _$1) => {
//         return "<mark style = 'background-color: yellow;'>"+ match +"</mark>"
//     });
//     $(this).html(text);
// });
// $('#myTbody tr').filter(function(){
//     $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1 );
// });
// });

/////////////// 顯示所有資料/////////////////
// $('#searchBtn').on('click',function(){

//     read_all_questionnaire(epName, textName, strDate, endDate)
//     alert('成功');
// })
////////////////刪除問卷/////////////////



/////////////首頁搜尋/////////////////
// $('#searchQusBackstage').on('click',function(e){
//     e.preventDefault()
//     let title = $('#queTitleBackstage').val()
//     let startTime = $('#startDateSearch').val()
//     let endTime = $('#endDateSearch').val()
//     search(title, startTime, endTime)

// })

