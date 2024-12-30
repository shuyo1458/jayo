document.getElementById('searchBtn').addEventListener('click', function() {
    console.log('查詢按鈕被點擊');
    const studentId = document.getElementById('studentId').value;
    const urlParams = new URLSearchParams(window.location.search);
    const classId = urlParams.get('class'); // 取得URL參數

    if (!classId) {
        alert('參數錯誤：請提供班級ID。');
        return; // 如果沒有提供班級ID，則停止執行
    }

    const jsonFile = `${classId}.json`; // 根據班級ID選擇相應的JSON檔案

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const student = data.find(s => s.學號 === studentId); // 根據學號查找學生
            const tbody = document.querySelector('#resultTable tbody');
            tbody.innerHTML = ''; // 清空之前的結果
            if (student) {
                // 顯示表格
                document.getElementById('resultTable').style.display = 'table'; // 顯示表格

                // 將基本資料顯示在表格中，去掉作業繳交次數
                const row = `<tr>
                                <td>${student.學號}</td>
                                <td>${student.姓名}</td>
                                <td>${student.點名次數}</td>
                            </tr>`;
                tbody.innerHTML = row;

                // 使用迴圈顯示所有作業資料
                Object.entries(student).forEach(([key, value]) => {
                    // 只顯示作業相關的資料
                    if (key.startsWith('作業')) {
                        const assignmentRow = `<tr>
                                                <td colspan="2">${key}</td>
                                                <td>${value}</td>
                                            </tr>`;
                        tbody.innerHTML += assignmentRow; // 將作業資料添加到表格中
                    }
                });
            } else {
                tbody.innerHTML = '<tr><td colspan="12">找不到該學號</td></tr>';
            }
        })
        .catch(error => console.error('Error:', error));
}); 