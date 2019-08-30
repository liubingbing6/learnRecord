/**
 * Created by liubingbing on 2019/1/16.
 */
;(function(W,$){
    $.fn.scrollBar = function (params) {
        this.defaults = {
            'contentId':'content',
            'contentItem':'li',
        }
        let options = Object.assign({},this.defaults,params);

        this.each(function () {
            let self = this;
            let colorArr = ['red','yellow','blue','green','pink','purple'];

            this.contentHeight = '';//总体内容高度
            this.boxHeight = '';//页面框的高度
            this.overflowHeight = '';//计算内容是否超过了页面框高度
            this.sideBarOutHeight = '';//滚动条外部的框的高度
            this.barHeight = '';//滚动条的高度
            this.aLiHeight = '';//子元素的高度
            this.disY = null;//记录滚动条的偏移量


            //初始化加载数据
            this.init = function(){
                let oLi = '';
                let barHeight = '';//超过页面框的内容高度
                for(let i = 1;i<=30;i++){
                    oLi += `<li>${i}</li>`;
                }
                $('#content').html(oLi);
                $('#content>li').each(function () {
                    this.style.background = colorArr[$(this).index() % colorArr.length];
                });

                self.contentHeight = $('#content').height();//总体内容高度
                self.boxHeight = $('#contener').height();//页面框的高度
                self.overflowHeight = self.contentHeight - self.boxHeight;//计算内容是否超过了页面框高度

                self.sideBarOutHeight = $('.scrollBar').height();
                // console.log(self.sideBarOutHeight);
                if(self.contentHeight <= self.boxHeight ){
                    $(".scrollBar").hide();
                }else{
                    $(".scrollBar").show();

                    barHeight = self.sideBarOutHeight-(self.overflowHeight / self.contentHeight)*self.sideBarOutHeight + 'px' ;
                    $('.bar').css({height:barHeight});
                }
                self.aLiHeight = $('li:first-child').height();
                self.barHeight = $("#js_bar").height();
            }

            this.scroll = function () {
                let ev = event || window.event;
                let top = '';
                let offsetTop = '';
                let step = 30;
                if(ev.wheelDelta < 0){
                    top = '-='+step; //向上滚动
                    if(self.boxHeight >= self.contentHeight){//内容高度小于页面框高度
                        top = '0';
                    }else{
                        offsetTop = $('#content').position().top;//当前内容已滚动的距离
                        if(Math.abs(offsetTop) + self.boxHeight >= self.contentHeight){
                            top = offsetTop;
                        }
                    }
                }else{
                    top = '+='+step;//向下滚动
                    offsetTop = $('#content').position().top;
                    if(offsetTop >=0){
                        top = '0';
                    }
                }
//            console.log(offsetTop);
                $('#content').css({top:top});

                offsetTop = $('#content').position().top;
                let t = -(offsetTop / self.overflowHeight) * (self.sideBarOutHeight - self.barHeight);
//            console.log(t);
                if(t <= 0){
                    t = 0;
                }else if(t >= self.sideBarOutHeight - self.barHeight){
                    t = self.sideBarOutHeight - self.barHeight;
                }
                $('#js_bar').css({top:t});
            }

            this.moveScroll = function () {
                let ev = event || window.event;
                let _this = this;
                self.disY = ev.clientY - $(this).position().top;

                document.onmousemove = function (ev) {
                    let event = ev || window.event;
                    let t = event.clientY - self.disY;
                    if(t <= 0){
                        t = 0;
                    }else if(t >= self.sideBarOutHeight - self.barHeight){
                        t = self.sideBarOutHeight - self.barHeight;
                    }

                    $(_this).css({top:t});

                    let blankHeight = self.sideBarOutHeight - self.barHeight;//滚动条空白的高度
                    let percentage = -(t / blankHeight)*self.overflowHeight ;//滚动的空白比计算隐藏内容滚动值
                    $('#content').css({top:percentage});
//                console.log(t);

                }
                document.onmouseup = function () {
                    document.onmouseup = null;
                    document.onmousemove = null;
                }
                return false;
            }

            this.barClick = function () {
                let ev = event || window.event;
                let offsetTop = $('.scrollBar').offset().top;
                let barY = ev.clientY - offsetTop - self.barHeight / 2;

                if(barY <= 0){
                    barY = 0;
                }else if(barY >= self.sideBarOutHeight - self.barHeight){
                    barY = self.sideBarOutHeight - self.barHeight;
                }
//            console.log(barY);
                $('#js_bar').css({top:barY});
                let blankHeight = self.sideBarOutHeight - self.barHeight;//滚动条空白的高度
                let percentage = -(barY / blankHeight)*self.overflowHeight ;//滚动的空白比计算隐藏内容滚动值
                $('#content').css({top:percentage});
                return false;
            }
        });
    }
})(window,jQuery);