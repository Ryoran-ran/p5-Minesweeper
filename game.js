const canvas = {height:600, width:800};

const reset = 0;
const nomal = 0;
const pien = -1;
const grass = 1;

const flag = 1;
const hatena = 2;

const bomd = -1;

var size;
var bakudan;

var mineseper;
var select;
var back;
var cus

const play = 0;
const menu = 1;
const custom = 2

const easy = 0;
const normal = 1;
const hard = 2;

let canvasX

var game_sence = menu;

function setup(){
    // createCanvas(canvas.width, canvas.height);
    

    canvasX = createCanvas(canvas.width, canvas.height);
    canvasX.elt.oncontextmenu = () => false;
    
    background(150);
    // frameRate(60);
    size = new Vec(9, 9);
    bakudan = 0;

    select = new Menu;

    mineseper = new Field(size.x, size.y, bakudan);
    back = new Back_button;

    cus = new Custom_menu;
    
}

function draw(){
    background(200);

    if(game_sence == play){
        mineseper.show();
        back.show();
    }
    else if(game_sence == menu){
        select.show();
    }
    else if(game_sence == custom){
        cus.show();
        back.show();
    }
    
}

//マウスイベント
function mouseReleased(){
    if(mouseButton == LEFT){
        if(game_sence == play){
            mineseper.mouse_click();
            back.mouse_click();
        }
        else if(game_sence == menu){
            select.mouse_click();
        }
        else if(game_sence == custom){
            back.mouse_click();
            cus.mouse_click();
        }
    }
    else if(mouseButton == RIGHT){
        
        if(game_sence == play){
            mineseper.key_pless();
        }
    }
}
// function doubleClicked(){

// }

//キーボードイベント
function keyPressed(){

    if(game_sence == play){
        if(key == "z"){
            mineseper.key_pless();
        }
    }
}


function ransu(min,max){
    return parseInt(Math.random() * (max - min) + min);
}
function ransu_double(min,max){
    return Math.random() * (max - min) + min;
}

class Vec {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y
    }
}

class Rect{
    constructor(_w, _h){
        this.pos = new Vec;
        this.size = new Vec(_w, _h);
    }

    get left(){
        return this.pos.x - this.size.x / 2;
    }
    get right(){
        return this.pos.x + this.size.x / 2;
    }
    get top(){
        return this.pos.y - this.size.y / 2;
    }
    get bottom(){
        return this.pos.y + this.size.y / 2;
    }

    touch(){
        if(this.left < mouseX && this.right > mouseX &&
            this.top < mouseY && this.bottom > mouseY){
                return true;
        }
        else{
            return false;
        }
    }
}

class Mass extends Rect{
    constructor(_size, _x, _y){
        super(_size, _size);

        this.mass_pos = new Vec(_x, _y);

        this.open = false;

        this.bomd = 0;

        this.flag = 0;
    }
    position_set(field_size){
        // console.log(field_size.x);
        this.pos.x = (this.size.x/2 + canvas.width/2 - this.size.x * field_size.x/2) + (this.size.x + 0) * (this.mass_pos.x-1);
        // this.pos.y = (this.size.y/2 + 0) + (this.size.y + 0) * (this.mass_pos.y+2);
        this.pos.y = (-this.size.y / 2 + 120-30) + (this.size.y + 0) * (this.mass_pos.y);
    }

    set_x(field_size){
        return this.size.x * field_size/2;

        // return 0;
    }

    show(check){
        stroke(0);
        strokeWeight(1);
        if(!this.open){
            if(this.touch()){
            fill(50);
            }
            else{
                fill(100);
            }
        }
        else if(this.open){
            fill(200);
        }
        
        rect(this.left, this.top, this.size.x, this.size.y);

        if(check.end){
            if(this.bomd == bomd){
                fill(255, 0, 0);
                ellipse(this.pos.x, this.pos.y, this.size.x*0.8, this.size.y*0.8);
            }
        }
        else if(check.clear){
            if(this.bomd == bomd){
                fill(0, 0, 255);
                ellipse(this.pos.x, this.pos.y, this.size.x*0.8, this.size.y*0.8);
            }
        }

        if(this.flag == flag){
            textAlign(CENTER, CENTER);
            noStroke();
            fill(0);
            textSize(this.size.x * 0.8);
            text("✋", this.pos.x,this.pos.y);
        }
        else if(this.flag == hatena){
            textAlign(CENTER, CENTER);
            noStroke();
            fill(255);
            textSize(this.size.x * 0.8);
            text("?", this.pos.x,this.pos.y);
        }
        
//textSize:40
        if(this.open && this.bomd > 0){
            textAlign(CENTER, CENTER);
            // noStroke();
            stroke(this.num_color());
            fill(this.num_color());
            textSize(this.size.x * 0.8);
            text(this.bomd, this.pos.x,this.pos.y);
        }
    }

    num_color(){
        if(this.bomd == 1){
            return "blue";
        }
        else if(this.bomd == 2){
            return "green";
        }
        else if(this.bomd == 3){
            return "red";
        }
        else if(this.bomd == 4){
            return "#00008b";
        }
        else if(this.bomd == 5){
            return "#8b0000";
        }
        else if(this.bomd == 6){
            return "#8b0000";
        }
        else if(this.bomd == 7){
            return "#8b0000";
        }
        else if(this.bomd == 8){
            return "#8b0000";
        }
    }
}

class Button extends Rect{
    constructor(_num, _w, _h){
        super(_w, _h);
        this.num = _num;
    }
}

class Reset extends Button{
    constructor(){
        super(reset, 30, 30);
        this.pos.x = canvas.width / 2;
        this.pos.y = 60;

        this.face = 0;
    }

    show(check){
        stroke(0);
        strokeWeight(1);
        if(!this.open){
            if(this.touch()){
            fill(50);
            }
            else{
                fill(100);
            }
        }
        else if(this.open){
            fill(150);
        }
        
        rect(this.left, this.top, this.size.x, this.size.y);

        this.face_draw(check);
    }

    face_draw(check){
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(20);
        if(!check.end && !check.clear){
            text("🙂", this.pos.x,this.pos.y);
        }
        else if(check.end){
            text("🥺", this.pos.x,this.pos.y);
        }
        else if(check.clear){
            text("😎", this.pos.x,this.pos.y);
        }
        
    }
}

class Display_num extends Rect{
    constructor(_num){
        super(60, 30);
        this.num = _num

        this.num_display = "";
    }

    display(){
        this.num_display = ( '000' + this.num).slice( -3 );

        stroke(255, 0 ,0);
        fill(255, 0, 0);
        textSize(20);
        text(this.num_display, this.pos.x, this.pos.y) 
    }
}

class Count_flag extends Display_num{
    constructor(_num){
        super(_num);
        this.pos.x = canvas.width / 2 - 60;
        this.pos.y = 60;
    }

    flag_check(mass, system){
        if(!mass.open && (!system.end && !system.clear)){
            if(mass.flag == 0){
                this.num--;
            }
            else if(mass.flag == flag){
                this.num++;
            }
        }
    }

    show(){
        textAlign(RIGHT, CENTER);
        this.display();
    }
}

class Count_time extends Display_num{
    constructor(){
        super(0);
        this.pos.x = canvas.width / 2 + 60;
        this.pos.y = 60;

        this.count = 0

        this.timer = false;
    }

    count_time(){
        if(this.timer){
            this.count += 1;
            if(this.count == 60){
                this.num++;
                this.count = 0;
            }
        }
    }

    show(){
        textAlign(LEFT, CENTER);
        this.display();
    }
}

class Bar extends Rect{
    constructor(){
        super(canvas.width, 30);
        this.pos.x = canvas.width / 2;
        this.pos.y = this.size.y / 2;
    }

    show(){
        // stroke(0);
        // strokeWeight(1);
        noStroke();
        fill(0);
        rect(this.left, this.top, this.size.x, this.size.y);
    }
}

class Field{
    constructor(_x, _y, _bomd){
        this.field_size = new Vec(_x, _y);
        this.field = [];
        for(var i = 0; i < this.field_size.x; i++){
            this.field[i] = []
            for(var j = 0; j < this.field_size.y; j++){
                this.field[i][j] = new Mass(this.size_define(), i+1, j+1);
                this.field[i][j].position_set(this.field_size);
            }
        }

        this.bomd = _bomd;
        if(this.bomd > this.field_size.x * this.field_size.y - 9){
            this.bomd = this.field_size.x * this.field_size.y - 9;
        }

        this.point = {touch: false, pos: new Vec};

        this.button = {
            touch: false,
            num: 0
        };

        this.button_style = [
            new Reset
        ];

        this.bar = new Bar; 
        this.display_flag = new Count_flag(this.bomd);
        this.display_time = new Count_time;

        this.game_system = {
            start: false,
            end: false,
            clear: false
        };
    }
    size_define(){

        var x = 750 / this.field_size.x;
        var y = 750 / this.field_size.y;

        if(y * this.field_size.y > 475){
            y = 475 / this.field_size.y;
            
            if(y * this.field_size.x > 750){
                return x
            }
            else{
                return y; 
            }
            
        }

        return x;

    }

    point_check(i, j){
        if(this.field[i][j].touch()){
            this.point.touch = true;
            this.point.pos.x = i;
            this.point.pos.y = j;
        }
    }
    button_check(i){
        if(this.button_style[i].touch()){
            this.button.touch = true;
            this.point.num = i;
        }
    }

    zahyou(){
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
        textSize(20);
        text(this.point.pos.x + "," + this.point.pos.y, 50,50);

        text("start:" + this.game_system.start, 50, 100);
        text("end:" + this.game_system.end, 50, 125);
        text("clear:" + this.game_system.clear, 50, 150);
    }

    show(){
        this.point.touch = false;
        this.button.touch = false;

        this.display_time.count_time();
        
        this.bar.show();
        this.mass_show(this.game_system);
        this.button_show();
        this.infomation_show();
        // this.zahyou();
    }

    mass_show(check){
        for(var i = 0; i < this.field.length; i++){
            for(var j = 0; j < this.field[i].length; j++){
                // console.log(this.field[j][i]);
                this.point_check(i, j);
                this.field[i][j].show(check);
            }
        }
    }

    button_show(){
        this.button_check(0);
        this.button_style[0].show(this.game_system);
        // for(var i = 0; i < this.button_style.length; i++){
        //     this.button_check(i);
        //     this.button_style[i].show(this.game_system);
        // }
    }

    infomation_show(){
        this.display_flag.show();
        this.display_time.show();
    }

    //クリック時
    mouse_click(){
        this.mouse_click_mass();
        this.mouse_click_button();
    }

    //キーボードプレス
    key_pless(){
        // if(key == "z"){
            this.display_flag.flag_check(this.field[this.point.pos.x][this.point.pos.y], this.game_system);
            this.mass_flag();
        // }
    }

    mouse_click_mass(){
        // console.log(this.field[this.point.pos.x][this.point.pos.y].frag);
        if(this.point.touch && !(this.game_system.end || this.game_system.clear)){
            if(this.field[this.point.pos.x][this.point.pos.y].flag == 0){
                
                if(!this.game_system.start){
                    this.bomd_create(this.bomd);
                    this.field_create();
                    this.game_system.start = true;
                    this.display_time.timer = true;
                }

                if(!this.field[this.point.pos.x][this.point.pos.y].open){
                    this.field[this.point.pos.x][this.point.pos.y].open = true;

                    if(this.field[this.point.pos.x][this.point.pos.y].bomd == 0){
                        this.zero_open();
                    }
                }

                else if(this.field[this.point.pos.x][this.point.pos.y].open){
                    if(this.flag_count(this.point.pos.x, this.point.pos.y)){
                        // console.log("aaz");
                        this.around_open(this.point.pos.x, this.point.pos.y);
                    }

                    if(this.around_zero(this.point.pos.x, this.point.pos.y)){
                        this.zero_open();
                    }
                }

                if(this.clear_check()){
                    this.game_system.clear = true;
                    this.display_time.timer = false;
                }
            }
            
        }
    }
    around_zero(i, j){
        if(
            this.around_zero_mini(i-1, j-1) ||
            this.around_zero_mini(i, j-1) ||
            this.around_zero_mini(i+1, j-1) ||
            this.around_zero_mini(i-1, j) ||
            this.around_zero_mini(i, j) ||
            this.around_zero_mini(i+1, j) ||
            this.around_zero_mini(i-1, j+1) ||
            this.around_zero_mini(i, j+1) ||
            this.around_zero_mini(i+1, j+1)
        ){
            return true;
        }
        else{
            return false;
        }
    }

    around_zero_mini(i, j){
        if(i < 0 || i >= this.field.length || j < 0 || j >= this.field[i].length){
            return false;
        }
        else if(this.field[i][j].flag != 0){
            return false;
        }
        else if(!this.field[i][j].open){
            return false;
        }
        else if(this.field[i][j].open && this.field[i][j].bomd == 0){
            return true;
        }
        else{
            return false;
        }
    }

    flag_count(i, j){
        var count = 0;

        count += this.flag_count_mini(i-1, j-1);
        count += this.flag_count_mini(i, j-1);
        count += this.flag_count_mini(i+1, j-1);
        count += this.flag_count_mini(i-1, j);
        count += this.flag_count_mini(i+1, j);
        count += this.flag_count_mini(i-1, j+1);
        count += this.flag_count_mini(i, j+1);
        count += this.flag_count_mini(i+1, j+1);

        // console.log(count + "," + this.field[i][j].bomd);

        if(this.field[i][j].bomd == count){
            return true;
        }
        else{
            return false;
        }
    }

    flag_count_mini(i, j){
        if(i < 0 || j<0 || i >= this.field.length || j >= this.field[i].length){
            return 0;
        }
        if(this.field[i][j].flag == flag){
            return 1;
        }
        else if(this.field[i][j].flag == hatena){
            return -100;
        }
        else{
            return 0;
        }
    }

    clear_check(){
        var count = 0;
        var bom = false;
        for(var i = 0; i < this.field.length; i++){
            for(var j = 0; j < this.field[i].length; j++){
                if(!this.field[i][j].open){
                    count++;
                }
                else if(this.field[i][j].open && this.field[i][j].bomd == bomd){
                    bom = true;
                    break;
                }
            }
            if(bom){
                break;
            }
        }
        if(bom){
            this.game_system.end = true;
            this.display_time.timer = false;
            return false;
        }
        if(count == this.bomd){
            return true;
        }
        else{
            return false;
        }
    }

    bomd_create(_bomd){
        var x, y;
        for(var i = 0; i < _bomd; i++){
            while(1){
                x = parseInt(random(0, this.field_size.x));
                y = parseInt(random(0, this.field_size.y));

                if(this.bomd_canput_check(x, y)){
                    this.field[x][y].bomd = bomd;
                    break;
                }
            } 
        }
    }

    field_create(){
        for(var i = 0; i < this.field.length; i++){
            for(var j = 0; j < this.field[i].length; j++){
                // console.log(this.field[i][j].bomd);
                if(this.field[i][j].bomd != bomd){
                    
                    this.field[i][j].bomd = this.bomd_count(i, j)
                }
            }
        }
    }

    bomd_count(i, j){
        var count = 0;
        count += this.bomd_count_mini(i-1, j-1);
        count += this.bomd_count_mini(i, j-1);
        count += this.bomd_count_mini(i+1, j-1);
        count += this.bomd_count_mini(i-1, j);
        count += this.bomd_count_mini(i+1, j);
        count += this.bomd_count_mini(i-1, j+1);
        count += this.bomd_count_mini(i, j+1);
        count += this.bomd_count_mini(i+1, j+1);

        // console.log(count);
        return count;
    }

    bomd_count_mini(i, j){
        if(i < 0 || j<0 || i >= this.field.length || j >= this.field[i].length){
            return 0;
        }
        if(this.field[i][j].bomd == bomd){
            return 1;
        }
        else{
            return 0;
        }
    }

    zero_open(){
        var count = 0
        while(1){
            count = 0;
            for(var i = 0; i < this.field.length; i++){
                for(var j = 0; j < this.field[i].length; j++){
                    if(this.field[i][j].bomd == 0 && this.field[i][j].open){
                        // console.log("a");
                        if(this.around_check(i, j)){
                            // console.log("b");
                            count++;
                            this.around_open(i,j);
                        }
                    }
                }
            }

            if(count == 0){
                break;
            }
        }
    }
    around_check(i, j){
        if(this.around_check_mini(i-1, j-1) ||
            this.around_check_mini(i, j-1) ||
            this.around_check_mini(i+1, j-1) ||
            this.around_check_mini(i-1, j) ||
            this.around_check_mini(i+1, j) ||
            this.around_check_mini(i-1, j+1) ||
            this.around_check_mini(i, j+1) ||
            this.around_check_mini(i+1, j+1)
        ){
            return true;
        }
        else{
            return false;
        }
    }

    around_check_mini(i, j){
        if(i < 0 || i >= this.field.length || j < 0 || j >= this.field[i].length){
            return false;
        }
        else if(this.field[i][j].flag != 0){
            return false;
        }
        else if(this.field[i][j].open){
            return false;
        }
        else if(!this.field[i][j].open){
            return true;
        }
    }

    around_open(i, j){
        this.around_open_mini(i-1, j-1);
        this.around_open_mini(i, j-1);
        this.around_open_mini(i+1, j-1);
        this.around_open_mini(i-1, j);
        this.around_open_mini(i+1, j);
        this.around_open_mini(i-1, j+1);
        this.around_open_mini(i, j+1);
        this.around_open_mini(i+1, j+1);
    }

    around_open_mini(i, j){
        if(!(i < 0 || i >= this.field.length || j < 0 || j >= this.field[i].length)){
            if(this.field[i][j].flag == 0 && !this.field[i][j].open){
                this.field[i][j].open = true;
            }
        }
    }

    bomd_canput_check(x, y){
        // console.log(x + "," + y);
        // console.log(this.field[x][y].bomd);
        
        if(this.field[x][y].bomd == bomd){
            // console.log("false");
            return false;
        }

        else if(x >= this.point.pos.x-1 && x <= this.point.pos.x+1 &&
            y >= this.point.pos.y-1 && y <= this.point.pos.y+1){
            // console.log("false");
            return false;
        }

        // console.log("true");
        return true;
    }

    mouse_click_button(){
        if(this.button.touch){
            if(this.button.num == reset){
                this.field_reset();
            }
        }
    }

    mass_flag(){
        if((!this.game_system.end && !this.game_system.clear)){
            if(!this.field[this.point.pos.x][this.point.pos.y].open){
                this.field[this.point.pos.x][this.point.pos.y].flag++;
    
                if(this.field[this.point.pos.x][this.point.pos.y].flag > hatena){
                    this.field[this.point.pos.x][this.point.pos.y].flag = 0;
                }
            }
        }
    }

    field_reset(){
        this.game_system.start = false;
        this.game_system.end = false;
        this.game_system.clear = false;

        this.button_style[0].face = 0;

        this.display_flag.num = this.bomd;
        this.display_time.num = 0;
        this.display_time.timer = false;

        for(var i = 0; i < this.field.length; i++){
            for(var j = 0; j < this.field[i].length; j++){
                this.field[i][j].open = false;
                this.field[i][j].bomd = 0;
                this.field[i][j].flag = 0;
            }
        }
    }
}

//メニュー
class Select_button extends Rect{
    constructor(_x, _y, _sizex, _sizey, _bomd, _txt){
        super(100,50);
        this.pos.x = _x;
        this.pos.y = _y;

        this.long = new Vec(_sizex, _sizey);
        this.bomd = _bomd;

        this.txt = _txt;

        this.button = {touch: false, num: 0};
    }

    show(){
        stroke(0);
        strokeWeight(1);

        if(this.touch()){
        fill(50);
        }
        else{
            fill(100);
        }
        
        rect(this.left, this.top, this.size.x, this.size.y);

        textAlign(CENTER, CENTER);
        // stroke(255, 0 ,0);
        noStroke();
        fill(255);
        textSize(20);
        text(this.txt, this.pos.x, this.pos.y) 
    }

    mouse_click(){
        mineseper = new Field(this.long.x, this.long.y, this.bomd);
        game_sence = play;
    }
}

class Custom_button extends Rect{
    constructor(_x, _y, _txt){
        super(100,50);
        this.pos.x = _x;
        this.pos.y = _y;

        this.txt = _txt;

        this.button = {touch: false, num: 0};
    }
    show(){
        stroke(0);
        strokeWeight(1);

        if(this.touch()){
        fill(50);
        }
        else{
            fill(100);
        }
        
        rect(this.left, this.top, this.size.x, this.size.y);

        textAlign(CENTER, CENTER);
        // stroke(255, 0 ,0);
        noStroke();
        fill(255);
        textSize(20);
        text(this.txt, this.pos.x, this.pos.y) 
    }

    mouse_click(){
        // mineseper = new Field(10, 10, 0);
        game_sence = custom;
    }
}

class Menu{
    constructor(){
        this.button = [
            new Select_button(100, 100, 9, 9, 10, "初級"),
            new Select_button(100, 160, 16, 16, 40, "中級"),
            new Select_button(100, 220, 30, 16, 99, "上級"),
            new Custom_button(100, 280, "カスタム")
        ];

        this.check = {touch: false, num: 0};
    }

    show(){
        this.check.touch = false;


        for(var i = 0; i < this.button.length; i++){
            if(this.button[i].touch()){
                this.check.touch = true;
                this.check.num = i;
            }
            this.button[i].show();
        }
    }

    mouse_click(){
        this.mouse_click_button();
    }

    mouse_click_button(){
        if(this.check.touch){
            // mineseper = new Field(this.button[this.check.num].long.x, this.button[this.check.num].long.y, this.button[this.check.num].bomd);
            // game_sence = play;
            this.button[this.check.num].mouse_click();
        }
    }
}

class Back_button extends Button{
    constructor(){
        super("×", 40, 30);
        this.pos.x = canvas.width - this.size.x / 2;
        this.pos.y = this.size.y / 2;
        this.button = {touch: false};
    }
    show(){
        this.button.touch = false;

        // stroke(0);
        // strokeWeight(1);

        noStroke();
        
        if(this.touch()){
            fill(139, 0 ,0);
            this.button.touch = true;
        }
        else{
            fill(255, 0 ,0);
        }

        rect(this.left, this.top, this.size.x, this.size.y);

        textAlign(CENTER, CENTER);
        noStroke();
        fill(255);
        textSize(20);

        text(this.num, this.pos.x,this.pos.y);
    }
    mouse_click(){
        if(this.button.touch){
            game_sence = menu;
        }
    }
}

//カスタム
class Custom_Button extends Rect{
    constructor(_x, _y, _w, _h, _txt){
        super(_w, _h);

        this.pos.x = _x;
        this.pos.y = _y

        this.txt = _txt;
    }

    show(){
        stroke(0);
        strokeWeight(1);

        if(this.touch()){
            fill(50);
        }
        else{
            fill(100);
        }
        
        rect(this.left, this.top, this.size.x, this.size.y);

        textAlign(CENTER, CENTER);
        // stroke(255, 0 ,0);
        noStroke();
        fill(255);
        textSize(20);
        text(this.txt, this.pos.x, this.pos.y) 
    }
}

class Custom_width_size extends Custom_Button{
    constructor(_x, _y, _txt){
        super(_x, _y, 30, 30, _txt);
    }

    mouse_click(size){
        if(this.txt == "+"){
            if(size.x < 30){
                size.x++;
            }
        }
        else if(this.txt == "-"){
            if(size.x > 9){
                size.x--;
            }
        }
    }
}
class Custom_height_size extends Custom_Button{
    constructor(_x, _y, _txt){
        super(_x, _y, 30, 30, _txt);
    }

    mouse_click(size){
        if(this.txt == "+"){
            if(size.y < 30){
                size.y++;
            }
        }
        else if(this.txt == "-"){
            if(size.y > 9){
                size.y--;
            }
        }
    }
}
class Custom_bomd extends Custom_Button{
    constructor(_x, _y, _txt){
        super(_x, _y, 30, 30, _txt);
    }

    mouse_click(size){
        if(this.txt == "+"){
            size.bomd++;
        }
        else if(this.txt == "-"){
            if(size.bomd > 10){
                size.bomd--;
            }
            
        }
    }
}
class Custom_start extends Custom_Button{
    constructor(_x, _y){
        super(_x, _y, 100, 30, "Let's GO!!");
    }

    mouse_click(size){
        mineseper = new Field(size.x, size.y, size.bomd);
        game_sence = play;
    }
}

class Custom_menu{
    constructor(){
        this.info = {x:9, y:9, bomd: 10};
        this.bar = new Bar; 

        this.button = [
            new Custom_width_size(120, 100, "+"),
            new Custom_width_size(30, 100, "-"),
            new Custom_height_size(120, 150, "+"),
            new Custom_height_size(30, 150, "-"),
            new Custom_bomd(120, 200, "+"),
            new Custom_bomd(30, 200, "-"),
            new Custom_start(75, 250)
        ];

        this.check = {touch: false, num: 0};
    }

    show(){
        this.check.touch = false;

        this.bar.show();

        this.text_show(this.info.x ,75, 100)
        this.text_show(this.info.y ,75, 150)
        this.text_show(this.info.bomd ,75, 200)

        for(var i = 0; i < this.button.length; i++){
            if(this.button[i].touch()){
                this.check.touch = true;
                this.check.num = i;
            }
            this.button[i].show();
        }
    }

    text_show(size, x, y){
        textAlign(CENTER, CENTER);
        // stroke(255, 0 ,0);
        noStroke();
        fill(0);
        textSize(20);
        text(size, x, y); 
    }

    mouse_click(){
        this.mouse_click_button();
    }

    mouse_click_button(){
        if(this.check.touch){
            // mineseper = new Field(this.button[this.check.num].long.x, this.button[this.check.num].long.y, this.button[this.check.num].bomd);
            // game_sence = play;
            this.button[this.check.num].mouse_click(this.info);

            if(this.info.bomd > this.info.x * this.info.y - 9){
                this.info.bomd = this.info.x * this.info.y - 9;
            }
        }
    }
}