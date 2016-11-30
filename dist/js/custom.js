$(function(){
    $(".navbar-nav li").click(function(){
        if(!$(".navbar-toggle").is(":hidden")){
            $(".navbar-collapse").collapse('hide');
        }
    });
    $(".time-count").countdown({
       template:"<span>%d<br>天</span>" +
       "<span>%h<br>时</span>" +
       "<span>%i<br>分</span>" +
       "<span>%s<br>秒</span>",
        date:"2016/12/24 9:00"
    });
    var select="<option>0</option>" +
        "<option>1</option>"+
        "<option>2</option>"+
        "<option>3</option>"+
        "<option>4</option>"+
        "<option>5</option>";
    $(".student-num").append(select);

    $(".go-to-step2").click(function(){
        $('#my-tab li:eq(1) a').tab('show');
    });
    $(".go-to-step1").click(function(){
        $('#my-tab li:eq(0) a').tab('show');
    });
    $(".go-to-step3").click(function(){
        $('#my-tab li:eq(2) a').tab('show');
    });

    $(".student-num").change(getSelect);
    $(".promo input").change(getSelect);
});
window.onload=function(){
    var style="<style></style>";
    // $("iframe").contents().find("body").append(style);
};
function getSelect(){
    var price=[1000,2000];
    var course=[];
    var courseText=[];
    var promo=["usee","xinsight","youxinren"];
    course[0]=$("#course1").val();
    course[1]=$("#course2").val();
    course=course.map(function(x){
        return parseInt(x);
    });
    var countPrice=0;
    for(var i=0;i<course.length;i++){
        countPrice+=course[i]*price[i];
    }
    //12月1日前9.5折
    var afterPrice=countPrice;
    var today=new Date();
    var month=today.getMonth();
    if(month<11){
        afterPrice=countPrice*0.95;
    }else{
        //渠道优惠9.5折
        var promoText=$(".promo input").val().toLowerCase();
        if(promo.indexOf(promoText)===-1){
            //没优惠
        }else{
            afterPrice=countPrice*0.95;
        }
    }
    $(".price").html(countPrice);
    $(".after-price").html(afterPrice);
    if(afterPrice!==countPrice){
        $(".price").html(countPrice+" * 0.95 = "+afterPrice);
    }
    $("#step2 tbody").html("");
    if(countPrice!==0){
        $("#step2 tfoot").hide();
        $("#step2 .course-count").show();
        for(var i=0;i<course.length;i++){
            if(course[i]!==0){
                switch (i){
                    case 0:
                        courseText[i]='<tr>'+
                            '<td >学生（凭任何大学学生证享受优惠）'+
                            '</td>'+
                            '<td>1.原型设计 <br>2.用户体验研究方法 <br>3.名企职业发展，社交鸡尾酒会 <br>4.眼动仪与用户体验，虚拟现实 </td>'+
                            '<td class="text-center">￥1000'+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                    case 1:
                        courseText[i]='<tr>'+
                            '<td >已工作'+
                            '</td>'+
                            '<td>1.原型设计 <br>2.用户体验研究方法 <br>3.名企职业发展，社交鸡尾酒会 <br>4.眼动仪与用户体验，虚拟现实 </td>'+
                            '<td class="text-center">￥2000'+
                            '</td>'+
                            '<td>'+course[i]+
                            '</td>'+
                            '</tr>';
                        break;
                }
                $("#step2 tbody").append(courseText[i]);
            }
        }
    }else{
        $("#step2 tfoot").show();
        $("#step2 .course-count").hide();
    }
}