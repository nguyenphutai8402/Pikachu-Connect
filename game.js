/*Tạo ra biến hàng(ROW) và cột(COL) để tạo ra board_game_value.
* Có tất cả có 36 pokemon khác nhâu
* Biến pokemonImages dùng để lưu đường dẫn các pokemon.
* Biến pokemonValues dùng để lưu giá trị cho từng pokemon(Các giá trị từ 1 đến 36)*/
var ROW = 11;
var COL = 18;
const pokemonImages = [];
const pokemonValues = [];
/*Dòng lặp for tiến hành lưu đường dẫn vào pokemonImages và lưu giá trị vào pokemonValues*/
for(var i = 1; i <= 36; i++){
    var img = 'image/pieces' + i +'.png';
    pokemonImages.push(img);
    pokemonValues.push(i);
}
/*Biến board_game_value dùng để tạo board game bao gồm các giá trị pokemon và đường viền của mảng này là giá trị 0*/
var board_game_value = [];
/*Dòng lặp for đê tạo board_game_value gồm 11 dòng và 18 cột có giá trị bằng không(board_game_value khởi đầu)*/
for(var i = 0; i < ROW; i++){
    var row = [];
    for(var j = 0; j < COL; j++){
        row.push(0);
    }
    board_game_value.push(row);
}
/*Hàm random trong khoảng từ min đến max*/
function randomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/*Hàm addValueInBGV để tạo board_game_value cho các giá trị pokemon 1 cách ngẫu nhiên*/
function addValueInBGV(){
    /*Đây là dòng lặp for chạy từ giá trị con pokemon đầu tiên đến hêt mảng đó*/
    for(var i = 0; i < pokemonValues.length; i++){
        /*Đây là dòng lặp for cho mỗi giá trị pokemon được random 4 lần.
        Chỉ random từ vị trị số 1 của dòng và cột cho đến vị trí số 9 của dòng và 16 của cột
        để board_game_value có đường bao toàn số 0*/
        for(var j = 0; j < 4; j++){
            var row = randomNumber(1, 9);
            var col = randomNumber(1, 16);
            /*Dòng lặp while hợp lệ nếu random và vị trị có giá trị khác 0*/
            while(board_game_value[row][col] != 0){
                row = randomNumber(1, 9);
                col = randomNumber(1, 16);
            }
            /*Gắn giá trị hàng và cột đã random trong board_game_value thành giá trị của pokemon*/
            board_game_value[row][col] = pokemonValues[i];
        }
    }
}
/*Hàm createBoardGameEmpty dùng để tạo 1 table chưa có ảnh pokemon gồm 11 hàng và 36 cột trong thẻ <body>*/
function createBoardGameEmpty(){
    var board_game = document.getElementsByClassName("board-game");
    for(var i = 0; i < ROW; i++){
        var row = document.createElement('tr');
        /*Đặt tên cho hàng*/
        row.className = "row row-" + i;
        for(var j = 0; j < COL; j++){
            var cell = document.createElement('td');
            /*Đặt tên cho ô*/
            cell.className = "cell " + i + "-" + j;
            row.appendChild(cell);
        }
    board_game[0].appendChild(row);
    }
}
/*Hàm resetBoardGame để tạo lại board_game_value khởi đầu.
* Dòng lặp for đê tạo board_game_value gồm 11 dòng và 18 cột có giá trị bằng không(board_game_value khởi đầu)*/
function resetBoardGame(){
    board_game_value.splice(0, board_game_value.length);
    for(var i = 0; i < ROW; i++){
        var row = [];
        for(var j = 0; j < COL; j++){
            row.push(0);
        }
        board_game_value.push(row);
    }
}
/*Hàm createBoardGame dùng để thêm ảnh pokemon từ đường dẫn trong mảng pokemonImages*/
function createBoardGame(){
    /*Trước hết reset lai board_game_value về board_game_value khởi đầu*/
    resetBoardGame();
    /*Tạo table trong thẻ <body> nhưng chưa có ảnh*/
    createBoardGameEmpty();
    /*Thêm giá trị pokemon vào board_game_value*/
    addValueInBGV();
    /*Thêm ảnh pokemon vào table trong thẻ <body> từ đường dẫn trong mảng pokemonImages.
    Để có thể thêm ảnh pokemon cần phải so sánh giá trị pokemon trong board_game_value
    và lấy ra đường dẫn hình ảnh tướng ứng*/
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