/*Các biến này được sử dụng khi có cặp pokemon hợp lệ
*   TYPE: dùng để xác định kiểu vẽ cho 2 con pokemon hợp lệ
*       0: nối 2 con pokemon theo đường thẳng(ngang hoạc dọc).
*       1: nối 2 con pokemon theo đường zigzag theo x (chữ Z hoặc chữ L).
*       2: nối 2 con pokemon theo đường zigzag theo y (chữ Z hoặc chữ L).
*       3. nối 2 con pokemon khi bị ra ngoài hình chữ nhật (chữ U ngang).
*       4. nối 2 con pokemon khi bị ra ngoài hình chữ nhật (chữ U dọc).
*   NUMBER1_ROW, NUMBER1_COL: biến dòng và cột cho pokemon thứ nhất
*   NUMBER2_ROW, NUMBER2_COL: biến dòng và cột cho pokemon thứ hai
*   RIGHT_ANG1_ROW, RIGHT_ANG1_COL: biến dòng và cột cho góc vuông thứ nhất(khi vẽ có góc vuông)
*   RIGHT_ANG2_ROW, RIGHT_ANG2_COL: biến dòng và cột cho góc vuông thứ hai(khi vẽ có góc vuông)*/

var TYPE = 1000;
var NUMBER1_ROW = 1000;
var NUMBER1_COL = 1000;

var NUMBER2_ROW = 1000;
var NUMBER2_COL = 1000;

var RIGHT_ANG1_ROW = 1000;
var RIGHT_ANG1_COL = 1000;

var RIGHT_ANG2_ROW = 1000;
var RIGHT_ANG2_COL = 1000;
/*Hàm checkSelections dùng để kiểm tra giá trị 2 con pokemon có giống nhau không từ 1 mảng.
Đồng thời kiểm tra vị trí của 2 con này có trùng nhau không, nếu trùng nhau thì là sai.
Đây là hàm chỉ kiểm tra giá trị chưa tính kiểm tra đường đi*/
function checkSelections(array, number1_row, number1_col, number2_row, number2_col){
    /*Đây là dòng if kiểm tra vị trí 2 con pokemon có bị trùng vào 1 chỗ hay không*/
    if(number1_row == number2_row && number1_col == number2_col){
        return false;
    }else{
        /*Đây là dòng if kiểm tra giá trị từ vị trí của 2 con pokemon*/
        if(array[number1_row][number1_col] == array[number2_row][number2_col]){
            return true;
        }else{
            return false;
        }
    }
}
/*Hàm checkLineX dùng để kiểm tra vị trí của 2 pokemon có trên 1 dòng hay không.
* Chỉ kiểm tra các phần tử trống trên dòng ngoại trừ 2 vị trị pokemon*/
function checkLineX(array, sameRow, number1_col, number2_col){
    /*Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
    var start = (number1_col > number2_col)? number2_col : number1_col;
    var end = (number1_col > number2_col)? number1_col : number2_col;
    var result = false
    /*Đây là dòng if kiểm tra 2 con pokemon này có kề nhau trên 1 dòng hay không*/
    if(array[sameRow][start] == array[sameRow][start + 1]){
        result = true;
    }
    /*Đây là dòng lặp for không tính 2 con pokemon*/
    for(var i = start + 1; i < end; i++){
        /*Đây là dòng if kiểm tra xem 2 con pokemon này có bị vật cản giữa chúng hay không*/
        if(array[sameRow][i] == 0){
            result = true;
        }else{
            result = false;
            break;
        }
    }
    return result;
}
/*Hàm checkLineY dùng để kiểm tra vị trí của 2 pokemon có trên 1 cột hay không.
* Chỉ kiểm tra các phần tử trống trên dòng ngoại trừ 2 vị trị pokemon*/
function checkLineY(array, same_col, number1_row, number2_row){
    /*Kiểm tra con nào trước con nào sau tính từ trên xuống dưới*/
    var start = (number1_row > number2_row)? number2_row : number1_row;
    var end = (number1_row > number2_row)? number1_row : number2_row;
    var result = false
    /*Đây là dòng if kiểm tra 2 con pokemon này có kề nhau trên 1 cột hay không*/
    if(array[start][same_col] == array[start + 1][same_col]){
        result = true;
    }
    /*Đây là dòng lặp for không tính 2 con pokemon*/
    for(var i = start + 1; i < end; i++){
        /*Đây là dòng if kiểm tra xem 2 con pokemon này có bị vật cản giữa chúng hay không*/
        if(array[i][same_col] == 0){
            result = true;
        }else{
            result = false;
            break;
        }
    }
    return result;
}
/*Hàm checkLineXForZigZag dùng để check 2 con pokemon khi có đường ngang của chữ U, Z, L */
function checkLineXForZigZag(array, sameRow, number1_col, number2_col){
    try{
        /*Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
        var start = (number1_col > number2_col)? number2_col : number1_col;
        var end = (number1_col > number2_col)? number1_col : number2_col;
        var result = false
        /*Các đoạn if dùng để kiểm tra các pokemon có kề nhau hay không*/
        if(start == 0 && array[sameRow][start + 1] == 0){
            result = true;
        }
        if(end == array[0].length && array[sameRow][end - 1] == 0){
            result = true;
        }
        if(array[sameRow][start + 1] == 0 || array[sameRow][end - 1] == 0){
            result = true;
        }
        /*Đây là dòng lặp for không tính 2 con pokemon*/
        for(var i = start + 1; i < end; i++){
            /*Đây là dòng if kiểm tra xem 2 con pokemon này có bị vật cản giữa chúng hay không*/
            if(array[sameRow][i] == 0){
                result = true;
            }else{
                result = false;
                break;
            }
        }
        return result;
    }catch (e){

    }
}
/*Hàm checkLineYForZigZag dùng để check 2 con pokemon khi có đường dọc của chữ U, Z, L */
function checkLineYForZigZag(array, same_col, number1_row, number2_row){
    /*Kiểm tra con nào trước con nào sau tính từ trên xuống dưới*/
    var start = (number1_row > number2_row)? number2_row : number1_row;
    var end = (number1_row > number2_row)? number1_row : number2_row;
    var result = false
    /*Đoạn if dùng để kiểm tra các pokemon có kề nhau hay không*/
    if(array[start + 1][same_col] == 0 || array[end - 1][same_col] == 0){
        result = true;
    }
    /*Đây là dòng lặp for không tính 2 con pokemon*/
    for(var i = start + 1; i < end; i++){
        /*Đây là dòng if kiểm tra xem 2 con pokemon này có bị vật cản giữa chúng hay không*/
        if(array[i][same_col] == 0){
            result = true;
        }else{
            result = false;
            break;
        }
    }
    return result;
}
/*Hàm isZigZagX dùng để kiểm tra đường zigzag(Z) hoặc đường L
mà đường bắt đầu theo đường bắt đầu từ điểm nhỏ theo trục ngang. Mà trong tất cả trường hợp theo i*/
function isZigZagX(array, number1_row, number1_col, number2_row, number2_col, i){
    var start_row;
    var start_col;
    var end_row;
    var end_col;
    /*Đây là đoạn if dùng để kiểm tra điểm nào nhỏ điểm nào lớn theo cột hay
    * Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
    if(number1_col < number2_col){
        start_row = number1_row;
        start_col = number1_col;
        end_row = number2_row;
        end_col = number2_col;
    }else{
        start_row = number2_row;
        start_col = number2_col;
        end_row = number1_row;
        end_col = number1_col;
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa đường chữ L mà đường dọc bắt đầu từ điểm nhỏ*/
    if(start_col == i){
        /*Đây là đoạn if kiểm tra có vật cản không theo đường chữ L.
        Gồm 1 đường thẳng, 1 đường ngang, và góc vuông giữa 2 đường*/
        if(checkLineYForZigZag(array, i, start_row, end_row)&&
            checkLineXForZigZag(array, end_row, i, end_col)&&
            array[end_row][i] == 0){
            /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và góc vuông*/
            NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
            NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
            RIGHT_ANG1_ROW = end_row;
            RIGHT_ANG1_COL = i;
            return true;
        }else{
            return false;
        }
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa đường chữ L mà đường dọc bắt đầu từ điểm lớn*/
    if(end_col == i){
        /*Đây là đoạn if kiểm tra có vật cản không theo đường chữ L.
        Gồm 1 đường thẳng, 1 đường ngang, và góc vuông giữa 2 đường*/
        if(checkLineXForZigZag(array, start_row, start_col, i)&&
            checkLineYForZigZag(array, i, start_row, end_row)&&
            array[start_row][i] == 0){
            /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và góc vuông*/
            NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
            NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
            RIGHT_ANG1_ROW = start_row;
            RIGHT_ANG1_COL = i;
            return true;
        }else{
            return false;
        }
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa đường zigzag(Z) mà đường bắt đầu từ điểm nhỏ theo trục ngang.
    * Gồm 3 đường 1 đường dọc, 2 đường ngang, 2 góc vuông*/
    if(checkLineXForZigZag(array, start_row, start_col, i)&&
        checkLineYForZigZag(array, i, start_row, end_row)&&
        checkLineXForZigZag(array, end_row, i, end_col)&&
        array[start_row][i] == 0&&
        array[end_row][i] == 0){
        /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và 2 góc vuông*/
        NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
        NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
        RIGHT_ANG1_ROW = start_row;
        RIGHT_ANG1_COL = i;
        RIGHT_ANG2_ROW = end_row;
        RIGHT_ANG2_COL = i;
        return true;
    }else{
        return false;
    }
}
/* Hàm checkZigZagX dùng để kiểm tra đường zigzag(Z) hoặc đường L
mà đường bắt đầu theo đường bắt đầu từ điểm nhỏ theo trục ngang*/
function checkZigzagX(array, number1_row, number1_col, number2_row, number2_col){
    /*Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
    var start = (number1_col > number2_col)? number2_col : number1_col;
    var end = (number1_col > number2_col)? number1_col : number2_col;
    /*Đây là dòng lặp for để kiểm tra tất các trường hợp theo đường zigzag(Z) hoặc đường L
    mà đường bắt đầu từ điểm nhỏ theo trục ngang. Nếu có trường hợp đúng về trả về trường hợp đó*/
    for(var i = start; i <= end; i++){
        if(isZigZagX(array,number1_row, number1_col, number2_row, number2_col, i)){
            return true;
        }else{
            continue;
        }
    }
    /*Nếu không có trường hợp nào thỏa các điều kiện trên thì trả về false*/
    return false;
}
/*Hàm isZigZagY dùng để kiểm tra đường zigzag(Z) hoặc đường L
mà đường bắt đầu theo đường bắt đầu từ điểm nhỏ theo trục dọc. Mà trong tất cả trường hợp theo i*/
function isZigzagY(array, number1_row, number1_col, number2_row, number2_col, i){
    var start_row;
    var start_col;
    var end_row;
    var end_col;
    /*Đây là đoạn if dùng để kiểm tra điểm nào nhỏ điểm nào lớn theo dòng hay
    * Kiểm tra con nào trước con nào sau tính từ trên xuống dưới*/
    if(number1_row < number2_row){
        start_row = number1_row;
        start_col = number1_col;
        end_row = number2_row;
        end_col = number2_col;
    }else{
        start_row = number2_row;
        start_col = number2_col;
        end_row = number1_row;
        end_col = number1_col;
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa đường chữ L mà đường ngang bắt đầu từ điểm nhỏ*/
    if(start_row == i){
        /*Đây là đoạn if kiểm tra có vật cản không theo đường chữ L.
        Gồm 1 đường thẳng, 1 đường ngang, và góc vuông giữa 2 đường*/
        if(checkLineXForZigZag(array, i, start_col, end_col) &&
            checkLineYForZigZag(array, end_col, i, end_row) &&
            array[i][end_col] == 0){
            /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và góc vuông*/
            NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
            NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
            RIGHT_ANG1_ROW = i;
            RIGHT_ANG1_COL = end_col;
            return true;
        }else{
            return false;
        }
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa đường chữ L mà đường ngang bắt đầu từ điểm lớn*/
    if(end_row == i){
        /*Đây là đoạn if kiểm tra có vật cản không theo đường chữ L.
        Gồm 1 đường thẳng, 1 đường ngang, và góc vuông giữa 2 đường*/
        if(checkLineYForZigZag(array, start_col, start_row, i) &&
            checkLineXForZigZag(array, i, start_col, end_col) &&
            array[i][start_col] == 0){
            /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và góc vuông*/
            NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
            NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
            RIGHT_ANG1_ROW = i;
            RIGHT_ANG1_COL = start_col;
            return true;
        }else{
            return false;
        }
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa đường zigzag(Z) mà đường bắt đầu từ điểm nhỏ theo trục dọc.
   * Gồm 3 đường 2 đường dọc, 1 đường ngang, 2 góc vuông*/
    if(checkLineYForZigZag(array, start_col, start_row, i) &&
        checkLineXForZigZag(array, i, start_col, end_col) &&
        checkLineYForZigZag(array, end_col, i, end_row) &&
        array[i][end_col] == 0 &&
        array[i][start_col] == 0){
        /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và 2 góc vuông*/
        NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
        NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
        RIGHT_ANG1_ROW = i;
        RIGHT_ANG1_COL = start_col;
        RIGHT_ANG2_ROW = i;
        RIGHT_ANG2_COL = end_col;
        return true;
    }else{
        return false;
    }
}
/* Hàm checkZigZagY dùng để kiểm tra đường zigzag(Z) hoặc đường L
mà đường bắt đầu theo đường bắt đầu từ điểm nhỏ theo trục dọc*/
function checkZigzagY(array, number1_row, number1_col, number2_row, number2_col){
    /*Kiểm tra con nào trước con nào sau tính từ trên xuống dưới*/
    var start = (number1_row > number2_row)? number2_row : number1_row;
    var end = (number1_row > number2_row)? number1_row : number2_row;
    /*Đây là dòng lặp for để kiểm tra tất các trường hợp theo đường zigzag(Z) hoặc đường L
    mà đường bắt đầu  từ điểm nhỏ theo trục dọc. Nếu có trường hợp đúng về trả về trường hợp đó*/
    for (var i = start; i<=end; i++){
        if(isZigzagY(array, number1_row, number1_col, number2_row, number2_col, i)){
            return true;
        }else{
            continue;
        }
    }
    /*Nếu không có trường hợp nào thỏa các điều kiện trên thì trả về false*/
    return false;
}
/*Hàm isOutRecX dùng để kiểm tra các đường hình chữ U ngang. Mà trong tất cả trường hợp theo i*/
function isOutRecX(array, number1_row, number1_col, number2_row, number2_col, i){
    var start_row;
    var start_col;
    var end_row;
    var end_col;
    /*Đây là đoạn if dùng để kiểm tra điểm nào nhỏ điểm nào lớn theo cột hay
    * Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
    if(number1_col < number2_col){
        start_row = number1_row;
        start_col = number1_col;
        end_row = number2_row;
        end_col = number2_col;
    }else{
        start_row = number2_row;
        start_col = number2_col;
        end_row = number1_row;
        end_col = number1_col;
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa hình chữ U ngang.
    * Gồm 3 đường 1 đường dọc, 2 đường ngang, 2 góc vuông*/
    if (checkLineXForZigZag(array, start_row, start_col, i) &&
        checkLineYForZigZag(array, i, start_row, end_row) &&
        checkLineXForZigZag(array, end_row, i, end_col) &&
        array[start_row][i] == 0 &&
        array[end_row][i] == 0) {
        /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và 2 góc vuông*/
        NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
        NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
        RIGHT_ANG1_ROW = start_row;
        RIGHT_ANG1_COL = i;
        RIGHT_ANG2_ROW = end_row;
        RIGHT_ANG2_COL = i;
        return true;
    } else {
        return false;
    }

}
/* Hàm checkOutRecX dùng để kiểm tra đường hình chữ U ngang. Đồng thời phải kiểm tra hướng của chúng*/
function checkOutRecX(array, number1_row, number1_col, number2_row, number2_col, direction){
    /*Kiểm tra con nào trước con nào sau tính từ trái sang phải*/
    var start = (number1_col > number2_col)? number2_col : number1_col;
    var end = (number1_col > number2_col)? number1_col : number2_col;
    /*Đây là đoạn if để kiểm tra hướng di chuyển từ tham số direction.
    Nếu bằng true thì đường dọc đi từ con pokemon cuối cùng sang phải.
    Còn bằng false thì đường dọc đi từ con pokemon đâu tiên sang trái.*/
    if(direction){
        /*Đây là dòng lặp for để kiểm tra tất các trường hợp theo đường chữ U ngang
        mà đường dọc đi từ con pokemon cuối cùng sang phải. Nếu có trường hợp đúng về trả về trường hợp đó*/
        for(var i = end + 1; i <= array[0].length; i++){
            if(isOutRecX(array, number1_row, number1_col, number2_row, number2_col, i)){
                return true;
            }else{
                continue;
            }
        }
    }else{
        /*Đây là dòng lặp for để kiểm tra tất các trường hợp theo đường chữ U ngang
        mà đường dọc đi từ con pokemon đầu tiên sang trái. Nếu có trường hợp đúng về trả về trường hợp đó*/
        for(var i = start - 1; i >= 0; i--){
            if(isOutRecX(array, number1_row, number1_col, number2_row, number2_col, i)){
                return true;
            }else{
                continue;
            }
        }
    }
    /*Nếu không có trường hợp nào thỏa các điều kiện trên thì trả về false*/
    return false;
}
/*Hàm isOutRecY dùng để kiểm tra các đường hình chữ U dọc. Mà trong tất cả trường hợp theo i*/
function isOutRecY(array, number1_row, number1_col, number2_row, number2_col, i){
    var start_row;
    var start_col;
    var end_row;
    var end_col;
    /*Đây là đoạn if dùng để kiểm tra điểm nào nhỏ điểm nào lớn theo dòng hay
   * Kiểm tra con nào trước con nào sau tính từ trên xuống dưới*/
    if(number1_row < number2_row){
        start_row = number1_row;
        start_col = number1_col;
        end_row = number2_row;
        end_col = number2_col;
    }else{
        start_row = number2_row;
        start_col = number2_col;
        end_row = number1_row;
        end_col = number1_col;
    }
    /*Đây là đoạn if khi 2 con pokemon thỏa hình chữ U dọc.
    * Gồm 3 đường 2 đường dọc, 1 đường ngang, 2 góc vuông*/
    if(checkLineYForZigZag(array, start_col, start_row, i) &&
        checkLineXForZigZag(array, i, start_col, end_col) &&
        checkLineYForZigZag(array, end_col, i, end_row) &&
        array[i][end_col] == 0 &&
        array[i][start_col] == 0){
        /*Nếu đúng thì thiết lập điểm nối đầu và điểm nối cuối và 2 góc vuông*/
        NUMBER1_ROW = start_row; NUMBER1_COL = start_col;
        NUMBER2_ROW = end_row; NUMBER2_COL = end_col;
        RIGHT_ANG1_ROW = i;
        RIGHT_ANG1_COL = start_col;
        RIGHT_ANG2_ROW = i;
        RIGHT_ANG2_COL = end_col;
        return true;
    }else{
        return false;
    }
}
/* Hàm checkOutRecY dùng để kiểm tra đường hình chữ U dọc. Đồng thời phải kiểm tra hướng của chúng*/
function checkOutRecY(array, number1_row, number1_col, number2_row, number2_col, direction){
    /*Kiểm tra con nào trước con nào sau tính từ trên xuống dưới*/
    var start = (number1_row > number2_row)? number2_row : number1_row;
    var end = (number1_row > number2_row)? number1_row : number2_row;
    /*Đây là đoạn if để kiểm tra hướng di chuyển từ tham số direction.
    Nếu bằng true thì đường ngang đi từ con pokemon cuối cùng xuống dưới.
    Còn bằng false thì đường ngang đi từ con pokemon đâu tiên lên trên.*/
    if(direction){
        /*Đây là dòng lặp for để kiểm tra tất các trường hợp theo đường chữ U dọc
        mà đường ngang đi từ con pokemon cuối cùng xuống dưới. Nếu có trường hợp đúng về trả về trường hợp đó*/
        for (var i = end + 1; i <= array.length; i++){
            if(isOutRecY(array, number1_row, number1_col, number2_row, number2_col, i)){
                return true;
            }else{
                continue;
            }
        }
    }else{
        /*Đây là dòng lặp for để kiểm tra tất các trường hợp theo đường chữ U dọc
        mà đường ngang đi từ con pokemon đầu tiên lên trên. Nếu có trường hợp đúng về trả về trường hợp đó*/
        for (var i = start - 1; i >= 0; i--){
            if(isOutRecY(array, number1_row, number1_col, number2_row, number2_col, i)){
                return true;
            }else{
                continue;
            }
        }
    }
    /*Nếu không có trường hợp nào thỏa các điều kiện trên thì trả về false*/
    return false;
}
/*Đây là hàm reset các giá trị 2 con pokemon, 2 góc vuông và thể loại nối giữa chúng*/
function resetAll(){
    TYPE = 1000;
    RIGHT_ANG1_ROW = 1000;RIGHT_ANG1_COL = 1000;

    RIGHT_ANG2_ROW = 1000;RIGHT_ANG2_COL = 1000;

    NUMBER1_ROW = 1000;NUMBER1_COL = 1000;

    NUMBER2_ROW = 1000;NUMBER2_COL = 1000;
}
/*Hàm canConnect sẽ vận dụng tất các trường hợp để có thể tìm được đường nối được giữa 2 con pokemon*/
function canConnect(array, number1_row, number1_col, number2_row, number2_col){
    /*Trước khi tìm thì phải reset các giá trị cơ bản gồm 2 con pokemon hợp lệ, 2 góc vuông
    và thể loại nối giữa chúng*/
    resetAll();
    /*Đây là dòng if vận dụng hàm checkSelections dùng để kiểm tra giá trị 2 con pokemon có giống nhau không.
    * Chưa tính đường đi giữa chúng. Đồng thời 2 ô mình click có giá trị khác 0 hay không.
    * Khi thỏa điểu kiện này sẽ kiểm tra tất cả các trường hợp để tìm được đường nối hợp lệ giữa 2 con pokemon*/
    if(checkSelections(array, number1_row, number1_col, number2_row, number2_col) &&
        (array[number1_row][number1_col] != 0 || array[number2_row][number2_col] != 0)){
        /*Đây là đoạn if kiểm tra xem 2 con pokemon có chung 1 dòng hay không*/
        if(number1_row == number2_row){
            /*Nếu chung 1 dòng thì sẽ tiếp tục kiểm tra đoạn if có chứa hàm checkLineX*/
            if(checkLineX(array, number1_row, number1_col, number2_col)){
                /*Nếu thỏa điều kiện if có chứa hàm checkLineX thì thiết lập các giá trị*/
                TYPE = 0;
                NUMBER1_ROW = number1_row; NUMBER1_COL = number1_col;
                NUMBER2_ROW = number2_row; NUMBER2_COL = number2_col;
                return true;
            }
        }
        /*Đây là đoạn if kiểm tra xem 2 con pokemon có chung 1 cột hay không*/
        if(number1_col == number2_col){
            /*Nếu chung 1 cột thì sẽ tiếp tục kiểm tra đoạn if có chứa hàm checkLineY*/
            if(checkLineY(array, number1_col, number1_row, number2_row)){
                /*Nếu thỏa điều kiện if có chứa hàm checkLineY thì thiết lập các giá trị*/
                TYPE = 0;
                NUMBER1_ROW = number1_row; NUMBER1_COL = number1_col;
                NUMBER2_ROW = number2_row; NUMBER2_COL = number2_col;
                return true
            }
        }
        /*Đây là đoạn if chứa hàm checkZigzagX*/
        if(checkZigzagX(array, number1_row, number1_col, number2_row, number2_col)){
            /*Nếu thỏa điều kiện if có chứa hàm checkZigzagX thì thiết lập các giá trị*/
            TYPE = 1;
            return true;
        }
        /*Đây là đoạn if chứa hàm checkZigzagY*/
        if(checkZigzagY(array, number1_row, number1_col, number2_row, number2_col)){
            /*Nếu thỏa điều kiện if có chứa hàm checkZigzagY thì thiết lập các giá trị*/
            TYPE = 2;
            return true;
        }
        /*Đây là đoạn if chứa hàm checkOutRecX mà direction của nó có giá trị true
        (từ con pokemon cuối cùng sang phải)*/
        if(checkOutRecX(array, number1_row, number1_col, number2_row, number2_col, true)){
            /*Nếu thỏa điều kiện if có chứa hàm checkOutRecX thì thiết lập các giá trị*/
            TYPE = 3;
            return true;
        }
        /*Đây là đoạn if chứa hàm checkOutRecX mà direction của nó có giá trị false
        (từ con pokemon đầu tiên sang trái)*/
        if(checkOutRecX(array, number1_row, number1_col, number2_row, number2_col, false)){
            /*Nếu thỏa điều kiện if có chứa hàm checkOutRecX thì thiết lập các giá trị*/
            TYPE = 3;
            return true;
        }
        /*Đây là đoạn if chứa hàm checkOutRecY mà direction của nó có giá trị true
        (từ con pokemon cuối cùng xuống dưới)*/
        if( checkOutRecY(array, number1_row, number1_col, number2_row, number2_col, true)){
            /*Nếu thỏa điều kiện if có chứa hàm checkOutRecY thì thiết lập các giá trị*/
            TYPE = 4;
            return true;
        }
        /*Đây là đoạn if chứa hàm checkOutRecY mà direction của nó có giá trị false
        (từ con pokemon đầu tiên lên trên)*/
        if( checkOutRecY(array, number1_row, number1_col, number2_row, number2_col, false)){
            /*Nếu thỏa điều kiện if có chứa hàm checkOutRecY thì thiết lập các giá trị*/
            TYPE = 4;
            return true;
        }
        /*Nếu mà không thỏa bất kỳ điều kiện gì khi hàm checkSelections hợp lệ thì trả về false*/
        return false;
    }
    /*Sẽ trả về false nếu không thỏa điều kiện if chứa hàm checkSelections*/
    else{
        return false;
    }
}