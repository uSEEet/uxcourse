$(function(){
    $(".time-count").countdown({
       template:"<span>%d<br>天</span>" +
       "<span>%h<br>时</span>" +
       "<span>%i<br>分</span>" +
       "<span>%s<br>秒</span>",
        date:"2016-12-24 9:00"
    });
});