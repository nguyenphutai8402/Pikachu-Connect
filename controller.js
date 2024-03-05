/*Đây là biến khi click vào 2 con pokemon bất kỳ(tính luôn cả những ô trống)*/
var SELECT1_ROW;var SELECT1_COL;
var SELECT2_ROW;var SELECT2_COL;
/*Biến LEVEL dùng để thiết lập level chơi*/
var LEVEL = 1;
/*Biến TIME_Play dùng để thiết lập thời gian chơi ở đây là 10 phút*/
var TIME_PLAY = 600;
/*Biến COUNTDOWN dùng để thiết lập setInterval để cho thời gian chơi */
var COUNTDOWN;
/*Biến LINES là 1 mảng dùng để chứa các đường cần vẽ*/
var LINES = [];

/*Hàm takePosition dùng để trả về mảng gồm 2 phần tử, phần tử đầu là dòng, thứ hai là cột từ tên class
của 1 ô trong table*/
function takePosition(text){
    var postion = [];
    var subString = text.substring(5, text.length);
    postion = subString.split("-");
    return postion;
}
/*Hàm resetPosition để thiết lập các điểm đã được chọn*/
function resetPosition(){
    SELECT1_ROW = null; SELECT1_COL = null;
    SELECT2_ROW = null;SELECT2_COL = null;
}
/*Hàm removeHighlight dùng để thiết lập lại các ô về trạng thái ban đầu
(ở đây là loại bỏ các hiệu ứng: hightlight và daijobu)*/
function removeHighlight(){
    var imagePokemons = document.querySelectorAll('.image-pokemon');
    imagePokemons.forEach((imagePokemon)=>{
        imagePokemon.classList.remove("highlight");
        imagePokemon.classList.remove("daijobu");
    })
}
/*Hàm wrongPair dùng để thêm hiệu ứng vào ô khi click vào 2 conpokemon không hợp*/
function wrongPair(fromPokemon, toPokemon){
    var fromPokemonImg = fromPokemon.querySelector("img");
    var toPokemonImg = toPokemon.querySelector("img");
    fromPokemonImg.classList.add("wrong-pair");
    toPokemonImg.classList.add("wrong-pair");
    setTimeout(() => {
        fromPokemonImg.classList.remove("wrong-pair");
        toPokemonImg.classList.remove("wrong-pair");
    }, 250);
}
/*Hàm chooseDrawLine dùng để chọn 2 vị trí để vẽ đường thẳng(ngang ,dọc)*/
function chooseDrawLine(fromPokemon, toPokemon){
    var fromCellPos = fromPokemon.getBoundingClientRect();
    var toCellPos = toPokemon.getBoundingClientRect();
    var pokemon1_x = fromCellPos.left + fromCellPos.width/2;
    var pokemon1_y = fromCellPos.top + fromCellPos.height/2;
    var pokemon2_x = toCellPos.left + toCellPos.width/2;
    var pokemon2_y = toCellPos.top + toCellPos.height/2;
    /*Mảng LINES sẽ thêm đường khi click 2 điểm vào mảng */
    LINES.push({po1_x: pokemon1_x, po1_y: pokemon1_y, po2_x: pokemon2_x, po2_y: pokemon2_y})
}
/*Hàm actionDraw dùng để vẽ các đường thẳng đã được lưu trong mảng LINES*/
function actionDraw(){
    var table = document.getElementsByClassName("board-game");
    var ta_width = table[0].offsetWidth + 80;
    var ta_height = table[0].offsetHeight + 80;
    var wrap_game = document.getElementsByClassName("wrap-game");
    var canvas = document.getElementById("paint");
    /*Thiết lập độ dài và độ rộng của thẻ <canvas> và thêm css zIndex = 1 để hiện lên trên bảng*/
    canvas.width = parseInt(ta_width);
    canvas.height = parseInt(ta_height);
    canvas.style.zIndex = "1";
    wrap_game[0].appendChild(canvas);
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    /*Dòng lặp này dùng để vẽ tất cả các đường có trong mảng LINES*/
    for(var i = 0; i < LINES.length; i++){
        ctx.moveTo(LINES[i].po1_x, LINES[i].po1_y);
        ctx.lineTo(LINES[i].po2_x, LINES[i].po2_y);
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'red';
        ctx.stroke();
        ctx.beginPath();
    }
    /*Gọi hàm setTimeout sau khoảng 0,25 giây để xóa hết các phần tử mảng LINES.
    * Style lại css cho thẻ <canvas> để zIndex = "-1" ẩn dưới table.
    * Xóa hết các đường đã vẽ trên canvas*/
    setTimeout(() =>{
        LINES.splice(0, LINES.length);
        canvas.style.zIndex = "-1";
        ctx.clearRect(0,0,canvas.width,canvas.height);
    },250);
}
/*hàm drawLines sẽ vẽ trường hợp mà có thể tìm được đường đi giữa 2 con pokemon*/
function drawLines(){
    /*Biến fromPokemon và toPokemon dùng để găn 2 con pokemon hợp lệ*/
    var fromPokemon = document.getElementsByClassName("cell " + NUMBER1_ROW + "-" + NUMBER1_COL);
    var toPokemon = document.getElementsByClassName("cell " + NUMBER2_ROW + "-" + NUMBER2_COL);
    fromPokemon = fromPokemon[0];
    toPokemon = toPokemon[0];
    /*dòng if này để kiểm tra xem vẽ theo kiểu nào. Ở đây là vẽ theo đường thẳng trước*/
    if(TYPE == 0){
        chooseDrawLine(fromPokemon, toPokemon);
        actionDraw();
    }
    /*Nếu vẽ theo đường thẳng không được thì sẽ vẽ theo đường chữ Z, L, U*/
    else{
        /*Sẽ cố gẵng vẽ theo trường hợp 3 đường trước(chữ Z, U) nếu có lỗi thì chỉ vẽ được 2 đường(L)*/
        try{
            var rightAng1 =
                document.getElementsByClassName("cell " + RIGHT_ANG1_ROW + "-" + RIGHT_ANG1_COL);
            var rightAng2 =
                document.getElementsByClassName("cell " + RIGHT_ANG2_ROW + "-" + RIGHT_ANG2_COL);
            rightAng1 = rightAng1[0];
            rightAng2 = rightAng2[0];
            chooseDrawLine(fromPokemon, rightAng1);
            chooseDrawLine(rightAng1, rightAng2);
            chooseDrawLine(rightAng2, toPokemon);
            actionDraw();
        }catch (e){
            /*Bieens choose dùng để chọn góc vuông nào là hợp lệ(Góc vuông khác 1000)*/
            var choose = (RIGHT_ANG1_ROW != 1000)? 1 : 2;
            /*Đoạn if này cho thấy góc vuông 1 hợp lệ*/
            if(choose == 1){
                var right_ang1 =
                    document.getElementsByClassName("cell " + RIGHT_ANG1_ROW + "-" + RIGHT_ANG1_COL);
                right_ang1 = right_ang1[0];
                chooseDrawLine(fromPokemon, right_ang1);
                chooseDrawLine(right_ang1, toPokemon);
                actionDraw();
            }
            /*Còn không thì góc vuông 2 hợp lệ*/
            else{
                var right_ang2 =
                    document.getElementsByClassName("cell " + RIGHT_ANG2_ROW + "-" + RIGHT_ANG2_COL);
                right_ang2 = right_ang2[0];
                chooseDrawLine(fromPokemon, right_ang2);
                chooseDrawLine(right_ang2, toPokemon);
                actionDraw();
            }
        }
    }
}
/*Hàm removeImagePokemon dùng để xóa hình ảnh pokemon tại một ô trong table*/
function removeImagePokemon(x, y){
    var pokemon = document.getElementsByClassName("cell " + x + "-" + y);
    pokemon[0].innerHTML = "";
}
/*Hàm level1 dùng để thực hiện cơ chế level1
* */
function level1(){
    board_game_value[SELECT1_ROW][SELECT1_COL] = 0;
    board_game_value[SELECT2_ROW][SELECT2_COL] = 0;
    removeImagePokemon(SELECT1_ROW,SELECT1_COL);
    removeImagePokemon(SELECT2_ROW,SELECT2_COL);
}
/*Hàm level2 dùng để thực hiện cơ chế level2
* Leve2 sẽ xóa bỏ giá trị và hình ảnh tại vị trí 2 con pokemon hợp lệ.
* Đồng thời sẽ random lại vị trí của các con còn lại nhưng trừ chỗ trống của 2 con hợp lệ kia*/
function level2(){
    board_game_value[SELECT1_ROW][SELECT1_COL] = 0;
    board_game_value[SELECT2_ROW][SELECT2_COL] = 0;
    removeImagePokemon(SELECT1_ROW,SELECT1_COL);
    removeImagePokemon(SELECT2_ROW,SELECT2_COL);
    randomAgain();
}
/*Hàm moveForLevel3 dùng để dịch chuyển hết tất cả con pokemon từ phải về trái khi có chố trống.
* Nhưng 2 chỗ trống này không nằm trên 1 hàng*/
function moveForLevel3(row, col){
    /*tại mảng 2 chiều board_game_value này sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
    * Tiếp theo sẽ thêm giá trị 0 vào cuối mảng tại dòng đó*/
    board_game_value[row].splice(col, 1);
    board_game_value[row].push(0);
    /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
    for(var i = 0; i < board_game_value[row].length; i++){
        var cell = document.getElementsByClassName(row + "-" + i);
        cell[0].innerHTML = "";
    }
    /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
    for(var i = 0; i < board_game_value[row].length; i++){
        var value = board_game_value[row][i];
        if(value == 0){
            continue;
        }else{
            var cell = document.getElementsByClassName(row + "-" + i);
            var image = document.createElement("img");
            image.className = "image-pokemon"
            image.src = pokemonImages[value - 1];
            cell[0].appendChild(image);
        }
    }
}
/*Hàm moveForLevel3SameRow dùng để dịch chuyển hết tất cả con pokemon từ phải về trái khi có chố trống.
* Nhưng 2 chô trống này nằm trên 1 hàng*/
function moveForLevel3SameRow(row1, col1, row2, col2){
    /*Để kiểm tra xem 2 con pokemon này có chung 1 dòng không*/
    if(row1 == row2){
        /*Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
        var start_col = (col1 < col2)? col1 : col2;
        var end_col = (col1 < col2)? col2 : col1;
        /*Thứ tự thực hiện con pokemon cuối rồi đến con đầu.
        Tại mảng 2 chiều board_game_value này sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
        * Tiếp theo sẽ thêm giá trị 0 vào cuối mảng tại dòng đó*/
        board_game_value[row1].splice(end_col, 1);
        board_game_value[row1].push(0);
        board_game_value[row1].splice(start_col, 1);
        board_game_value[row1].push(0);
        /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
        for(var i = 0; i < board_game_value[row1].length; i++){
            var cell = document.getElementsByClassName(row1 + "-" + i);
            cell[0].innerHTML = "";
        }
        /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
        for(var i = 0; i < board_game_value[row1].length; i++){
            var value = board_game_value[row1][i];
            if(value == 0){
                continue;
            }else{
                var cell = document.getElementsByClassName(row1 + "-" + i);
                var image = document.createElement("img");
                image.className = "image-pokemon"
                image.src = pokemonImages[value - 1];
                cell[0].appendChild(image);
            }
        }
    }
    /*Nếu không chung dòng thì gọi hàm moveForLevel3
    * để xóa 2 con pokemon giống nhau trên 2 dòng khác nhau theo cơ chế leve3*/
    else{
        moveForLevel3(row1, col1);
        moveForLevel3(row2, col2);
    }
}
/*Hàm level3 dùng để thực hiện cơ chế level3
* Leve3 sẽ xóa bỏ hình ảnh tại vị trí 2 con pokemon hợp lệ.
* Đồng thời dịch chuyển hết tất cả con pokemon từ phải về trái khi có chố trống*/
function level3(){
    moveForLevel3SameRow(NUMBER1_ROW, NUMBER1_COL, NUMBER2_ROW, NUMBER2_COL);
}

/*Hàm moveForLevel4 dùng để chia board_game_value ra là 2 nửa trái và phải.
* Đồng thời dịch chuyển tất cả con pokemon làm sao để trống ở giữa, di chuyển vào 2 bên khi có chố trống.
* Nhưng 2 chỗ trống này không nằm trên 1 hàng*/
function moveForLevel4(row, col){
    /*Dòng if này sẽ kiểm tra xem con pokemon này nằm ở bên trái hay bên phải*/
    if(col <= 8){
        /*Nếu pokemon nằm ở bên trái thì tại mảng 2 chiều board_game_value này
        sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
        * Tiếp theo sẽ thêm giá trị 0 vào dòng row cột 8*/
        board_game_value[row].splice(col, 1);
        board_game_value[row].splice(8, 0, 0);
        /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var cell = document.getElementsByClassName(row + "-" + i);
            cell[0].innerHTML = "";
        }
        /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var value = board_game_value[row][i];
            if(value == 0){
                continue;
            }else{
                var cell = document.getElementsByClassName(row + "-" + i);
                var image = document.createElement("img");
                image.className = "image-pokemon"
                image.src = pokemonImages[value - 1];
                cell[0].appendChild(image);
            }
        }
    }else{
        /*Nếu pokemon nằm ở bên phỈ thì tại mảng 2 chiều board_game_value này
        sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
        * Tiếp theo sẽ thêm giá trị 0 vào dòng row cột 9*/
        board_game_value[row].splice(col, 1);
        board_game_value[row].splice(9, 0, 0);
        /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var cell = document.getElementsByClassName(row + "-" + i);
            cell[0].innerHTML = "";
        }
        /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var value = board_game_value[row][i];
            if(value == 0){
                continue;
            }else{
                var cell = document.getElementsByClassName(row + "-" + i);
                var image = document.createElement("img");
                image.className = "image-pokemon"
                image.src = pokemonImages[value - 1];
                cell[0].appendChild(image);
            }
        }
    }
}
/*Hàm moveForLevel4SameRow dùng để chia board_game_value ra là 2 nửa trái và phải.
* Đồng thời dịch chuyển tất cả con pokemon làm sao để trống ở giữa, di chuyển vào 2 bên khi có chố trống.
* Nhưng 2 chỗ trống này nằm trên 1 hàng*/
function moveForLevel4SameRow(row1, col1, row2, col2){
    /*Để kiểm tra xem 2 con pokemon này có chung 1 dòng không*/
    if(row1 == row2){
        /*Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
        var start_col = (col1 < col2)? col1 : col2;
        var end_col = (col1 < col2)? col2 : col1;
        /*Dòng if này để kiểm tra 2 con pokemon này có nằm bên trái hay không*/
        if(start_col <= 8 && end_col <= 8){
            /*Nếu nằm bên trái
            *Thứ tự thực hiện con pokemon cuối rồi đến con đầu.
            *Tại mảng 2 chiều board_game_value này sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
            *Tiếp theo sẽ thêm giá trị 0 vào dòng row cột 8*/
            board_game_value[row1].splice(end_col, 1);
            board_game_value[row1].splice(8, 0, 0);
            board_game_value[row1].splice(start_col, 1);
            board_game_value[row1].splice(8, 0, 0);
            /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var cell = document.getElementsByClassName(row1 + "-" + i);
                cell[0].innerHTML = "";
            }
            /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var value = board_game_value[row1][i];
                if(value == 0){
                    continue;
                }else{
                    var cell = document.getElementsByClassName(row1 + "-" + i);
                    var image = document.createElement("img");
                    image.className = "image-pokemon"
                    image.src = pokemonImages[value - 1];
                    cell[0].appendChild(image);
                }
            }
        }else if(start_col >= 9 && end_col >= 9){
            /*Nếu nằm bên phải
            *Thứ tự thực hiện con pokemon đầu rồi đến con cuối.
            *Tại mảng 2 chiều board_game_value này sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
            *Tiếp theo sẽ thêm giá trị 0 vào dòng row cột 9*/
            board_game_value[row1].splice(start_col, 1);
            board_game_value[row1].splice(9, 0, 0);
            board_game_value[row1].splice(end_col, 1);
            board_game_value[row1].splice(9, 0, 0);
            /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var cell = document.getElementsByClassName(row1 + "-" + i);
                cell[0].innerHTML = "";
            }
            /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var value = board_game_value[row1][i];
                if(value == 0){
                    continue;
                }else{
                    var cell = document.getElementsByClassName(row1 + "-" + i);
                    var image = document.createElement("img");
                    image.className = "image-pokemon"
                    image.src = pokemonImages[value - 1];
                    cell[0].appendChild(image);
                }
            }
        }
        /*Nếu mỗi con nằm 1 phía trên 1 dòng thì gọi hàm moveForLevel4
        * để xóa 2 con pokemon giống nhau trên cùng 1 dòng nhưng 2 phía theo cơ chế level4*/
        else if(start_col <= 8 && end_col >= 9){
            moveForLevel4(row1, col1);
            moveForLevel4(row2, col2);
        }
    }else{
        /*Nếu không chung dòng thì gọi hàm moveForLevel4
        * để xóa 2 con pokemon giống nhau trên 2 dòng khác nhau theo cơ chế level4*/
        moveForLevel4(row1, col1);
        moveForLevel4(row2, col2);
    }
}
/*Hàm level4 dùng để thực hiện cơ chế level4
* Leve4 sẽ xóa bỏ hình ảnh tại vị trí 2 con pokemon hợp lệ.
* Đồng thời dịch chuyển tất cả con pokemon làm sao để trống ở giữa, di chuyển vào 2 bên khi có chố trống.*/
function level4(){
    moveForLevel4SameRow(NUMBER1_ROW, NUMBER1_COL, NUMBER2_ROW, NUMBER2_COL);
}
/*Hàm moveForLevel5 dùng để chia board_game_value ra là 2 nửa trái và phải.
* Đồng thời dịch chuyển tất cả con pokemon làm sao để trống ở 2 bên, di chuyển vào giữa khi có chố trống.
* Nhưng 2 chỗ trống này không nằm trên 1 hàng*/
function moveForLevel5(row, col){
    /*Dòng if này sẽ kiểm tra xem con pokemon này nằm ở bên trái hay bên phải*/
    if(col <= 8){
        /*Nếu pokemon nằm ở bên trái thì tại mảng 2 chiều board_game_value này
        sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
        * Tiếp theo sẽ thêm giá trị 0 vào đầu dòng row*/
        board_game_value[row].splice(col, 1);
        board_game_value[row].unshift(0);
        /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var cell = document.getElementsByClassName(row + "-" + i);
            cell[0].innerHTML = "";
        }
        /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var value = board_game_value[row][i];
            if(value == 0){
                continue;
            }else{
                var cell = document.getElementsByClassName(row + "-" + i);
                var image = document.createElement("img");
                image.className = "image-pokemon"
                image.src = pokemonImages[value - 1];
                cell[0].appendChild(image);
            }
        }
    }
    else{
        /*Nếu pokemon nằm ở bên phải thì tại mảng 2 chiều board_game_value này
       sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
       * Tiếp theo sẽ thêm giá trị 0 vào cuối dòng row*/
        board_game_value[row].splice(col, 1);
        board_game_value[row].push(0);
        /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var cell = document.getElementsByClassName(row + "-" + i);
            cell[0].innerHTML = "";
        }
        /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
        for(var i = 0; i < board_game_value[row].length; i++){
            var value = board_game_value[row][i];
            if(value == 0){
                continue;
            }else{
                var cell = document.getElementsByClassName(row + "-" + i);
                var image = document.createElement("img");
                image.className = "image-pokemon"
                image.src = pokemonImages[value - 1];
                cell[0].appendChild(image);
            }
        }
    }
}
/*Hàm moveForLevel5SameRow dùng để chia board_game_value ra là 2 nửa trái và phải.
* Đồng thời dịch chuyển tất cả con pokemon làm sao để trống ở 2 bên, di chuyển vào giữa khi có chố trống.
* Nhưng 2 chỗ trống này nằm trên 1 hàng*/
function moveForLevel5SameRow(row1, col1, row2, col2){
    /*Để kiểm tra xem 2 con pokemon này có chung 1 dòng không*/
    if(row1 == row2){
        /*Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
        var start_col = (col1 < col2)? col1 : col2;
        var end_col = (col1 < col2)? col2 : col1;
        /*Dòng if này để kiểm tra 2 con pokemon này có nằm bên trái hay không*/
        if(start_col <= 8 && end_col <= 8){
            /*Nếu nằm bên trái
           *Thứ tự thực hiện con pokemon đầu rồi đến con cuối.
           *Tại mảng 2 chiều board_game_value này sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
           *Tiếp theo sẽ thêm giá trị 0 vào đầu dòng row*/
            board_game_value[row1].splice(start_col, 1);
            board_game_value[row1].unshift(0)
            board_game_value[row1].splice(end_col, 1);
            board_game_value[row1].unshift(0);
            /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var cell = document.getElementsByClassName(row1 + "-" + i);
                cell[0].innerHTML = "";
            }
            /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var value = board_game_value[row1][i];
                if(value == 0){
                    continue;
                }else{
                    var cell = document.getElementsByClassName(row1 + "-" + i);
                    var image = document.createElement("img");
                    image.className = "image-pokemon"
                    image.src = pokemonImages[value - 1];
                    cell[0].appendChild(image);
                }
            }
        }else if(start_col >= 9 && end_col >= 9){
            /*Nếu nằm bên phải
            *Thứ tự thực hiện con pokemon cuối rồi đến con đầu.
            *Tại mảng 2 chiều board_game_value này sẽ xóa bỏ giá trị con pokemon này ra khỏi mảng tại dòng row.
            *Tiếp theo sẽ thêm giá trị 0 vào cuối dòng row*/
            board_game_value[row1].splice(end_col, 1);
            board_game_value[row1].push(0);
            board_game_value[row1].splice(start_col, 1);
            board_game_value[row1].push(0);
            /*Dòng lặp for này dùng để xóa các ảnh pokemon tại dòng row trong table*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var cell = document.getElementsByClassName(row1 + "-" + i);
                cell[0].innerHTML = "";
            }
            /*Dòng lặp for này dùng để thêm các ảnh pokemon tại dòng row đó trong table dựa vào board_game_value mới*/
            for(var i = 0; i < board_game_value[row1].length; i++){
                var value = board_game_value[row1][i];
                if(value == 0){
                    continue;
                }else{
                    var cell = document.getElementsByClassName(row1 + "-" + i);
                    var image = document.createElement("img");
                    image.className = "image-pokemon"
                    image.src = pokemonImages[value - 1];
                    cell[0].appendChild(image);
                }
            }
        }
        /*Nếu mỗi con nằm 1 phía trên 1 dòng thì gọi hàm moveForLevel5
        * để xóa 2 con pokemon giống nhau trên cùng 1 dòng nhưng 2 phía theo cơ chế level5*/
        else if(start_col <= 8 && end_col >= 9){
            moveForLevel5(row1, col1);
            moveForLevel5(row2, col2);
        }
    }else{
        /*Nếu không chung dòng thì gọi hàm moveForLevel5
       * để xóa 2 con pokemon giống nhau trên 2 dòng khác nhau theo cơ chế level5*/
        moveForLevel5(row1, col1);
        moveForLevel5(row2, col2);
    }
}
/*Hàm level5 dùng để thực hiện cơ chế level5
* Level5 sẽ xóa bỏ hình ảnh tại vị trí 2 con pokemon hợp lệ.
* Đồng thời dịch chuyển tất cả con pokemon làm sao để trống ở 2 bên, di chuyển vào giữa khi có chố trống.*/
function level5(){
    moveForLevel5SameRow(NUMBER1_ROW, NUMBER1_COL, NUMBER2_ROW, NUMBER2_COL);
}
/*Hàm checkForLevel6 dùng để kiểm tra trên board_game_value còn mấy giá trị pokemon trên board_game_value.
* Nếu còn 1 hoặc 2 giá trị pokemon thì trả về true. Còn không thì trả về false*/
function checkForLevel6(){
    var notZero = 0;
    for(var i = 1; i < board_game_value.length - 1; i++){
        for(var j = 1; j < board_game_value[i].length - 1; j++){
            if(board_game_value[i][j] != 0){
                notZero++;
            }
        }
    }
    if(notZero == 2 || notZero == 1){
        return true;
    }else{
        return false;
    }
}
/*Hàm moveForLevel6 dùng để xóa bỏ giá trị và hình ảnh tại vị trí 1 con pokemon hợp lệ.
* Đồng thời sẽ random lấy 1 vị trí pokemon đã tồn tại trong board_game_value.
* Lứu ý: xóa giá trị và hình ảnh của 1 con pokemon đã random.
* Sau đó thay thế vào vị trí 1 con pokemon hợp lệ đó*/
function moveForLevel6(row, col){
    /*Tiến hành random dòng và cột*/
    var rowRandom = randomNumber(1, 9);
    var colRandom = randomNumber(1, 16);
    /*Kiểm tra điều kiện while, nếu random ra vị trị có giá trị bằng 0 trong board_game_value
    hoặc trùng với vị trí pokemon hợp lệ thì random dòng và cột lại*/
    while(board_game_value[rowRandom][colRandom] == 0 ||
    (board_game_value[row][col] == board_game_value[rowRandom][colRandom])){
        /*Dòng if sẽ ngắt dòng lặp while nếu trên board_game_value chỉ còn 1 hay 2 con pokemon*/
        if(checkForLevel6()){
            break;
        }else{
            /*Random lại dòng và cột để chọn con pokemon mới*/
            rowRandom = randomNumber(1, 9);
            colRandom = randomNumber(1, 16);
        }
    }
    var valOfRan = board_game_value[rowRandom][colRandom];
    /*Đây là đoạn code dùng để xóa hình ảnh tại con pokemon hợp lệ và random trong table*/
    board_game_value[row].splice(col, 1);
    board_game_value[row].splice(col, 0, valOfRan);
    board_game_value[rowRandom].splice(colRandom, 1);
    board_game_value[rowRandom].splice(colRandom, 0 ,0);
    var cell = document.getElementsByClassName(rowRandom + "-" + colRandom);
    cell[0].innerHTML = "";
    removeImagePokemon(row, col);

    /*Đây là đoạn code thêm hình ảnh của con pokemon random vào vị trí con pokemon hợp lệ*/
    var cell = document.getElementsByClassName(row + "-" + col);
    var image = document.createElement("img");
    image.className = "image-pokemon"
    image.src = pokemonImages[valOfRan - 1];
    cell[0].appendChild(image);
}
/*Hàm level6 dùng để thực hiện cơ chế level6
* Level6 sẽ xóa bỏ giá trị và hình ảnh tại vị trí 2 con pokemon hợp lệ.
* Đồng thời sẽ random lấy 2 vị trí pokemon đã tồn tại trong board_game_value.
* Lứu ý: xóa giá trị và hình ảnh của 2 con pokemon đã random.
* Sau đó thay thế vào vị trí 2 con pokemon hợp lệ đó*/
function level6(){
    moveForLevel6(NUMBER1_ROW, NUMBER1_COL);
    moveForLevel6(NUMBER2_ROW, NUMBER2_COL);
}
/*Hàm havePair dùng để kiểm tra xem còn cặp pokemon nào hợp lệ hay không*/
function havePair(){
    /*Dòng if dùng để kiểm tra xem đã chiến thắng hay chưa*/
    if(checkVictory() == false){
        /*Các dòng lặp for sẽ kiểm tra từng trường hợp để kiếm lấy 1 cặp pokemon hợp lệ*/
        for(var i = 1; i < board_game_value.length - 1; i++){
            for(var j = 1; j < board_game_value[i].length - 1; j++){
                for(var x = 1; x < board_game_value.length - 1; x++){
                    for(var y = 1; y < board_game_value[x].length - 1; y++){
                        /*Dòng if sẽ kiểm tra hàm canConnect
                        có thể kết nối trong từng trường hợp trên giữa 2 con poekemon*/
                        if(canConnect(board_game_value, i, j, x, y)){
                            /*Nếu có cặp hợp lệ thì trả về true*/
                            return true;
                        }else{
                            /*Nếu cặp đang xét không hợp lệ thì tiếp tục qua cặp tiếp theo*/
                            continue;
                        }
                    }
                }
            }
        }
        /*Nếu không có 1 cặp pokemon nào hợp lệ thì trả về false*/
        return false;
    }
}
/*Hàm randomAgain sẽ random lại tất cả các vị trị của con pokemon còn lại */
function randomAgain(){
    /*Tạo ra 2 biến:
    * remainingPo là 1 mảng dùng để lưu tất các các giá trị con pokemon có trên board_game_value
    * indexRePo là 1 mảng dùng để lưu vị trí(dòng và cột) của con pokemon có trên board_game_value*/
    var remainingPo = [];
    var indexRePo = [];
    /*Các dòng lặp for sẽ kiểm tra từng giá trị con pokemon có trên board_game_value*/
    for(var i = 0; i < board_game_value.length; i++){
        for(var j = 0; j < board_game_value[i].length; j++){
            var checkPo = board_game_value[i][j];
            /*Dòng if dùng để kiểm tra xem giá trị con pokemon có trên board_game_value có khác 0 khay không*/
            if(checkPo != 0){
                /*Nếu khác 0 tiến hay lưu giá trị và vị trí vào 2 biến remainingPo và indexRePo tương ứng*/
                remainingPo.push(checkPo);
                indexRePo.push({i,j});
            }
        }
    }
    /*Dòng lặp while này tiến hành random lấy vị trí trong remainingPo và indexRePo
    để thiết lập board_game_value mới*/
    while (remainingPo.length != 0){
        /*Đây là dòng code random ra vị trí giá trị pokemon trong remainingPo.
        * Sau đó xóa vị trí giá trị con pokemon đó trong mảng remainingPo*/
        var pokemon = randomNumber(0, remainingPo.length - 1);
        var randomPokemon = remainingPo.splice(pokemon,1);
        randomPokemon = randomPokemon[0];
        /*Đây là dòng code random ra vị trí pokemon trong indexRePo.
        * Sau đó xóa vị trí con pokemon đó trong mảng indexRePo*/
        var index = randomNumber(0, indexRePo.length - 1);
        var indexOfPokemonRan = indexRePo.splice(index,1);
        indexOfPokemonRan = indexOfPokemonRan[0];

        /*Thiết lập board_game_value từ những lần random trên*/
        var row1 = indexOfPokemonRan.i;
        var col1 = indexOfPokemonRan.j;
        board_game_value[row1][col1] = randomPokemon;
    }
    /*Đây là dòng code xóa hết ảnh trong table*/
    var cells = document.querySelectorAll(".cell");
    cells.forEach((cell)=>{
        cell.innerHTML = "";
    })
    /*Các dòng lặp for này sẽ thêm ảnh pokemon theo board_game_value mới*/
    for(var i = 0; i < ROW; i++){
        for(var j = 0; j < COL; j++){
            var value = board_game_value[i][j];
            if(value == 0){
                continue;
            }else{
                var cell = document.getElementsByClassName(i + "-" + j);
                var image = document.createElement("img");
                image.className = "image-pokemon"
                image.src = pokemonImages[value - 1];
                cell[0].appendChild(image);
            }
        }
    }
}
/*Đây là hàm thông báo khi không còn pokemon nào và
thực hiện random lại tất cả các vị trị của các con pokemon còn lại*/
function notifyNotHavePair(){
    if(havePair() == false){
        alert("hết cặp");
        randomAgain();
    }
}
/*Hàm helpMe dùng để gợi ý cho người chơi cặp pokemon nào sẽ là hợp lệ.
* Bằng cách cho 2 con pokemon hợp lệ rung lên trong vòng 0.5s*/
function helpMe(){
    /*Biến turn cho thấy người chơi chỉ được 10 lần hỗ trợ*/
    var turn = 10;
    var help = document.getElementsByClassName("help-me");
    help = help[0];
    /*Thêm sự kiện click vào nút help-me*/
    help.addEventListener('click', function (){
        /*Sau khi nhấn thì turn sẽ mất 1 giá trị*/
        turn--;
        /*Dòng if sẽ kiểm tra xem turn có lớn hơn hoặc bằng 0 hay không*/
        if(turn >= 0){
            /*Các dòng lặp for sẽ kiểm tra từng trường hợp để kiếm lấy 1 cặp pokemon hợp lệ*/
            for(var i = 1; i < board_game_value.length - 1; i++){
                for(var j = 1 ; j < board_game_value[i].length - 1; j++){
                    for(var x = 1; x < board_game_value.length - 1; x++){
                        for(var y = 1; y < board_game_value[x].length -1; y++){
                            /*Dòng if sẽ kiểm tra hàm canConnect
                            có thể kết nối trong từng trường hợp trên giữa 2 con poekemon*/
                            if(canConnect(board_game_value, i, j, x, y)){
                                /*Nếu có cặp hợp lệ thì thêm classList daijobu
                                để có thể làm cặp pokemon hợp lệ rung lên trong 0.5s*/
                                var Pokemon1 = document.getElementsByClassName("cell " + i + "-" + j);
                                var Pokemon2 = document.getElementsByClassName("cell " + x + "-" + y);
                                var imgPo1 = Pokemon1[0].querySelector("img");
                                var imgPo2 = Pokemon2[0].querySelector("img");
                                imgPo1.classList.add("daijobu");
                                imgPo2.classList.add("daijobu");
                                /*gọi hàm setTimeout để xóa bỏ các hightLight*/
                                setTimeout(()=>{
                                    removeHighlight();
                                },500);
                                /*Dòng if sẽ kiểm tra để cho tên của nút help-me được thay đổi cho hợp lý.
                                * Nếu hết lượt tên nút help-me sẽ đổi thành "Hết lượt"*/
                                if(turn == 0){
                                    var notify = "Hết lượt";
                                    var help_me = document.getElementsByClassName("help-me");
                                    help_me[0].innerHTML = notify;
                                    return;
                                }
                                /*Còn không thì tên nút help-me sẽ đổi thành "Help me: " + turn + " lần"*/
                                else{
                                    var notify = "Help me: " + turn + " lần"
                                    var help_me = document.getElementsByClassName("help-me");
                                    help_me[0].innerHTML = notify;
                                    return;
                                }
                            }else{
                                continue;
                            }
                        }
                    }
                }
            }
        }
        /*Nếu turn nhỏ hơn 0 thì tên nút help-me sẽ đổi thành "Hết lượt"*/
        else{
            var help_me = document.getElementsByClassName("help-me");
            help_me[0].innerHTML = "Hết lượt";
        }
    })
    /*Đây là đoạn if tương tự việc nhấn vào nút help-me nhưng khác là nó nhấn bằng nút Z và vô hạn lần bấm.
    * Việc này để tiện cho việc quay video*/
    document.addEventListener("keydown", (event)=>{
        if(event.keyCode === 90){
            for(var i = 0; i < board_game_value.length; i++){
                for(var j = 0; j < board_game_value[i].length; j++){
                    for(var x = 0; x < board_game_value.length; x++){
                        for(var y = 0; y < board_game_value[x].length; y++){
                            if(canConnect(board_game_value, i, j, x, y)){
                                var Pokemon1 = document.getElementsByClassName("cell " + i + "-" + j);
                                var Pokemon2 = document.getElementsByClassName("cell " + x + "-" + y);
                                var imgPo1 = Pokemon1[0].querySelector("img");
                                var imgPo2 = Pokemon2[0].querySelector("img");
                                imgPo1.classList.add("daijobu");
                                imgPo2.classList.add("daijobu");
                                setTimeout(()=>{
                                    removeHighlight();
                                },500);
                                return;
                            }else{
                                continue;
                            }
                        }
                    }
                }
            }
        }
    })
}
/*Hàm whatLevel dùng để thiết lập game mới theo level mà người chơi đã nhấn*/
function whatLevel(){
    var level1 = document.getElementById("level1");
    var level2 = document.getElementById("level2");
    var level3 = document.getElementById("level3");
    var level4 = document.getElementById("level4");
    var level5 = document.getElementById("level5");
    var level6 = document.getElementById("level6");
    /*Nếu nút level nào được nhấn thì nó sẽ thực hiện các việc sau:
    * 1. Xóa board game cũ
    * 2. Xóa thời gian
    * 3. Tạo board game mới
    * 4. Hiện thị board game ra
    * 5. Set biến LEVEL thành level tương ứng đã click
    * 6. Thêm hàm click
    * 7. Thêm hàm helpMe
    * 8. Thêm hàm timeToPlay để thời gian được chạy*/
    level1.addEventListener('click',()=>{
        deleteBoardGame();
        clearInterval(COUNTDOWN);
        createBoardGame();
        showGame();
        var table = document.getElementsByClassName("board-game");
        table[0].style.visibility = "visible";
        LEVEL = 1;
        click();
        helpMe();
        timeToPlay(TIME_PLAY);
    })
    level2.addEventListener('click',()=>{
        deleteBoardGame();
        clearInterval(COUNTDOWN);
        createBoardGame();
        showGame();
        var table = document.getElementsByClassName("board-game");
        table[0].style.visibility = "visible";
        LEVEL = 2;
        click();
        helpMe();
        timeToPlay(TIME_PLAY);
    })
    level3.addEventListener('click',()=>{
        deleteBoardGame();
        clearInterval(COUNTDOWN);
        createBoardGame();
        showGame();
        var table = document.getElementsByClassName("board-game");
        table[0].style.visibility = "visible";
        LEVEL = 3;
        click();
        helpMe();
        timeToPlay(TIME_PLAY);
    })
    level4.addEventListener('click',()=>{
        deleteBoardGame();
        clearInterval(COUNTDOWN);
        createBoardGame();
        showGame();
        var table = document.getElementsByClassName("board-game");
        table[0].style.visibility = "visible";
        LEVEL = 4;
        click();
        helpMe();
        timeToPlay(TIME_PLAY);
    })
    level5.addEventListener('click',()=>{
        deleteBoardGame();
        clearInterval(COUNTDOWN);
        createBoardGame();
        showGame();
        var table = document.getElementsByClassName("board-game");
        table[0].style.visibility = "visible";
        LEVEL = 5;
        click();
        helpMe();
        timeToPlay(TIME_PLAY);
    })
    level6.addEventListener('click',()=>{
        deleteBoardGame();
        clearInterval(COUNTDOWN);
        createBoardGame();
        showGame();
        var table = document.getElementsByClassName("board-game");
        table[0].style.visibility = "visible";
        LEVEL = 6;
        click();
        helpMe();
        timeToPlay(TIME_PLAY);
    })
}
/*hàm mainGame dùng để kiểm tra có thể kết nối từ 2 vị trí của ô pokemon đã click*/
function mainGame(){
    var fromPokemon = document.getElementsByClassName("cell " + SELECT1_ROW + "-" + SELECT1_COL);
    var toPokemon = document.getElementsByClassName("cell " + SELECT2_ROW + "-" + SELECT2_COL);
    fromPokemon = fromPokemon[0];
    toPokemon = toPokemon[0];
    var check = canConnect(board_game_value, SELECT1_ROW, SELECT1_COL, SELECT2_ROW, SELECT2_COL);
    /*Dòng if kiểm tra có thể kết nối từ 2 vị trí của ô pokemon đã click */
    if(check){
        /*Nếu 2 ô này hợp lệ thì tiến hành vẽ đường giữa 2 con pokemon bằng drawLines*/
        drawLines();
        /*Thiết lập level tương ứng*/
        switch (LEVEL){
            case 1:
                level1();
                break;
            case 2:
                level2();
                break;
            case 3:
                level3();
                break;
            case 4:
                level4();
                break;
            case 5:
                level5();
                break;
            case 6:
                level6();
                break;
        }
    }else{
        /*Còn sai thì sẽ thông báo cho 2 ô pokemon đó không hợp lệ bằng hàm wrongPair*/
        wrongPair(fromPokemon, toPokemon);
    }
    /*Nếu board game mà không còn con nào thì gọi hàm notifyNotHavePair*/
    notifyNotHavePair();
}
/*Hàm click dùng để chọn 2 con pokemon và thêm hiệu ứng highlight cho chúng*/
function click(){
    var cells = document.querySelectorAll('.cell');
    /*Thiết lập sự kiện click cho từng ô trong bảng*/
    cells.forEach(function (cell){
        cell.addEventListener('click', function (){
            var checkHaveImg = cell.childElementCount;
            /*Đây là dòng if để kiểm tra xem ô mình click có hợp lệ hay không.
            * Ô không hợp lệ là ô không có ảnh*/
            if(checkHaveImg != 0){
                /*Dòng if cho thấy nếu mình chọn ô đầu tiên thì thêm hiệu ứng cho ô đó*/
                if(SELECT1_ROW == null && SELECT1_COL == null){
                    removeHighlight();
                    var imgPo = cell.querySelector('img');
                    imgPo.classList.toggle("highlight");
                    var className = this.className;
                    var xAndY = takePosition(className);
                    SELECT1_ROW = parseInt(xAndY[0]);
                    SELECT1_COL = parseInt(xAndY[1]);
                    return;
                }
                /*Dòng if cho thấy nếu mình chọn ô thứ hai thì xóa hiệu ứng của 2 ô
                và gọi hàm mainGame, xong đó reset vị trí bằng hàm resetPosition.
                Đồng thời kiểm tra xem có thắng hay chưa bằng hàm victory*/
                if((SELECT2_ROW == null && SELECT2_COL == null) &&
                    (SELECT1_ROW != null && SELECT1_COL != null)) {
                    removeHighlight();
                    var className = this.className;
                    var xAndY = takePosition(className);
                    SELECT2_ROW = parseInt(xAndY[0]);
                    SELECT2_COL = parseInt(xAndY[1]);
                    mainGame();
                    resetPosition();
                    victory();
                    return;
                }
            }
            /*Nếu ô không hợp lệ thì gọi hàm resetPosition và removeHighlight
            để thiết lập lại vị trí và xóa bỏ các css đi*/
            else{
                resetPosition();
                removeHighlight();
            }
        })
    })
}
/*hàm checkVictory dùng đê kiểm tra xem đã thắng chưa
bằng cách kiểm tra board_game_value các giá trị đã bằng 0 hay chưa*/
function checkVictory(){
    for(var i = 0; i < board_game_value.length; i++){
        for (var j = 0; j < board_game_value[i].length; j++){
            if(board_game_value[i][j] == 0){
                continue;
            }else{
                return false;
            }
        }
    }
    return true;
}
/*Hàm victory sẽ thông báo cho chúng ta chến thắng nếu hàm checkVictory đúng*/
function victory(){
    if(checkVictory()){
        alert("Bạn đã thắng level này!");
        clearInterval(COUNTDOWN);
        firstMenu();
    }
}
/*Hàm timeToPlay để thiết lập thơi gian chơi*/
function timeToPlay(time){
    /*Găn biến COUNTDOWN cho setInterval và thời gian delay là 1s*/
    COUNTDOWN = setInterval(()=>{
        time--;
        /*Đây là dòng code định dạng cho thời gian được chạy*/
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var timeString = hours + ':' + minutes + ':' + seconds;
        /*Nếu thời gian nhỏ hơn 0 thì sẽ clearInterval
        và thông báo "Bạn đã thua cuộc" Đồng thời phần board sẽ bị giấu đi*/
        if(time < 0){
            clearInterval(COUNTDOWN);
            var clock = document.getElementById('clock');
            clock.innerHTML = "Chọn level để chơi";
            alert("Bạn đã thua cuộc");
            var table = document.getElementsByClassName("board-game");
            table[0].style.visibility = "hidden";
            var help_me = document.getElementsByClassName("help-me");
            help_me[0].style.display = "none";
        }
        /*Nếu thời gian vẫn còn hợp lệ thì thiết lạp lại thời gian sau 1s*/
        else{
            var clock = document.getElementById('clock');
            clock.innerHTML = timeString;
        }
    }, 1000);
}
/*Hàm deleteBoardGame dùng để xóa table đi*/
function deleteBoardGame(){
    var table = document.getElementsByClassName('board-game');
    table[0].innerHTML = "";
}
/*Hàm firstMenu dùng để hiện thị menu đầu tiên*/
function firstMenu(){
    var wrap_game = document.getElementsByClassName("wrap-game");
    wrap_game[0].style.display = "none";
    var help_me = document.getElementsByClassName("help-me");
    help_me[0].style.display = "none";
    var clock = document.getElementById('clock');
    clock.innerHTML = "Hãy chơi thật nhiệt huyết";
}
/*Hàm showGame dùng để hiện thị menu khi chơi game*/
function showGame(){
    var wrap_game = document.getElementsByClassName("wrap-game");
    wrap_game[0].style.display = "block";
    var help_me = document.getElementsByClassName("help-me");
    help_me[0].style.display = "block";
    help_me[0].innerHTML = "Help me: 10 lần";
}
/*Gọi game firstMenu để hiện thị menu khởi động*/
firstMenu();
/*Gọi hàm whatLevel để khi chọn level*/
whatLevel();