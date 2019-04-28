/**
 * Created by liubingbing on 2018/8/10.
 */
$(function(){
    var oper = new Store();
        pageEvent.init();//分页列表
        oper.init();
      //  $('.sms_select .select').select();
        $(window).scroll(function(){oper.s_centerShow()});
        $("#js_btn_add").on('click',oper.addOption);//点击添加按钮
        $(".topic_box").on('click','#js_box_close',oper.closeBox);//关闭弹框
        $(".topic_box").on('click','#js_add_option',oper.addBtnOption);//添加选项
        $(".topic_box").on('click','input[name="option_style"]',oper.chooseStyle);//选择题型
        $(".topic_box").on('click','input[name="op_style"]',oper.objStyle);//题目类型
        $(".topic_box").on('click','.close_circle',oper.closeCircle);//选项输入删除
        $(".topic_box").on('keyup','#js_textarea,#js_answer_sample',oper.keyUpWorlds);//判断输入字数
        $(".topic_box").on('keyup','#js_score',oper.keyCodeChange);//限制为数字输入
        $(".view").on('click','.view_close',oper.closeView);//关闭查看窗口
        $(".list_content").on('click','.look',oper.look);//查看按钮操作
        $(".list_content").on('click','.js_edit',oper.edit);//编辑操作
        $(".view").on('click','#js_view_edit',oper.viewEdit);//查看中的编辑操作
        $(".list_content").on('click','.js_del',oper.del);//删除列表
        $(".topic_box").on('click','#js_submit',oper.throttle(oper.submitSave,1000,{trailing: false}));//提交保存
        $("#js_all_save").on('click',oper.allSave);//保存按钮
        $("#js_btn_view").on('click',oper.btnView);//预览按钮
        $(".data_view_close").on('click',oper.closeDataView);//关闭预览窗口

        $(".sms_select").on('click','#js_title_ul',oper.checkMaterail);
        $(".sms_select .select_ul_t").on('click','li',oper.selectMaterial);


        $('.sms_select_1 .select').select();
        $('.sms_select_2 .select').select();
        $('.sms_select_3 .select').select();
        $(".library").on('click','.library_close',oper.closeLibrary);//关闭题库库窗口
        $("#js_library_add").on('click',oper.openLibrary);//打开题库库窗口
        $("#js_library_content").on('click','.library_look',oper.lookLibrary);//题库查看操作
        oper.selectInit();
        oper.ansyLoadData();
        oper.createPage();
        $('#js_search_btn').click(oper.ansyLoadData);//查询操作
        $('#js_search_btn').click(oper.createPage);
        $("#js_library_content").on('click','.js_library_del',oper.libraryDel);//题库删除
        $("#js_library_content").on('click','.choose',oper.librarySelected);//选择题目
});
function Store() {
    var self = this;
    this.edit_id = null;
    this.course_id = $("#js_curse_id").val();
    this.user_id = $("#js_user_id").val();
    this.select_1 = '';//题库弹框类别下拉
    this.select_2 = '';//题库弹框来源课程下拉
    this.select_3 = '';//题库弹框课程分类下拉
    this.search_i = '';//题库弹框收索

    //获取当前时间戳
    this.now = Date.now || function() {
            return new Date().getTime();
        };
    //返回一个函数，当被调用时，最多只能触发一次;
    //如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}
    this.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options)
            options = {};
        var later = function() {
            previous = options.leading === false ? 0 : self.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout)
                context = args = null;
        };
        return function() {
            var now = self.now();
            if (!previous && options.leading === false)
                previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout)
                    context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    this.init = function () {
        self.s_centerShow();//初始化遮罩

        $(document).click(function () {
            $('.select_ul_t').slideUp();
            $("#js_title_ul").removeProp('pick');
        })
    }

    this.s_centerShow = function (tag) {
        var objW = $(window);//当前窗口
        var objC = $(tag);//对话框,name是当前显示对话框的id名称

        var brsW = objW.width();
        var brsH = objW.height();
        var scrL = objW.scrollLeft();
        var scrT = objW.scrollTop();
        var curW = objC.width();
        var curH = objC.height();

        //计算对话框居中时距离左边的距离
        var left = scrL + (brsW - curW)/2;
        //计算对话框居中时距离顶部的距离
        var top = scrT + (brsH - curH)/2;

        if(tag){
            objC.css({
                "left":left,
                "top":top
            });
        }
        $(".mask").css({
            width: brsW + scrL,
            height: brsH + scrT
        })
    }
    //关闭弹框
    this.closeBox = function () {
        $(".mask").hide();
        $(".topic_box").hide();
    }
    //点击添加题目按钮
    this.addOption = function () {
        self.s_append();
        self.s_centerShow();
        $(".mask").show();
        $(".topic_box").show();
    }
    //动态添加答案选项的内容
    this.s_append = function (obj) {
       $(".topic_box").empty();
        if(obj){
            self.edit_id = obj.id;
            self.s_appendStr2(obj);
        }else{
            self.edit_id = null;
            self.s_appendStr();
        }
    }
    //无数据时的添加
    this.s_appendStr = function () {
        var str = '<p class="topic_box_close"><span class="fr handpoint" id="js_box_close">x</span></p>'+
                '<div class="topic_style clearfix mb30"> ' +
                '<p class="fl pl20 topic_box_title">题目类型：</p> ' +
            '<div class="fl mt5" id="js_obj_style"> ' +
            '<input type="radio" id="op_one" checked name="op_style" value="1"> ' +
            '<label for="op_one" class="ml30">客观题</label> ' +
            '<input type="radio" id="op_two" name="op_style" value="0"> ' +
            '<label for="op_two" class="ml50">主观题</label> ' +
            '</div> ' +
            '</div>' +
            '<div class="topic_content clearfix mb30">' +
            '<p class="fl pl20 topic_box_title">建议分值：</p> ' +
            '<input style="width: 170px;" id="js_score" class="fl" type="text" max="100" min="0"> ' +
            '<span class="ml10" style="display: inline-block;line-height: 34px;"> 分（假设试卷总分值100分）</span> ' +
            '</div>'+
            '<div class="topic_style clearfix mb30"> ' +
            '<p class="fl pl20 topic_box_title">选项类型：</p> ' +
            '<div class="fl mt5" id="js_topic_style"> ' +
            '<input type="radio" id="one" checked name="option_style" value="0">' +
            '<label for="one" class="ml30">单选题</label>' +
            '<input type="radio" id="two" name="option_style" value="1">' +
            '<label for="two" class="ml50">多选题</label>' +
            '</div>' +
            '</div>' +
            '<div class="topic_content clearfix mb30">' +
            '<p class="fl pl20 topic_box_title">题目内容：</p>' +
            '<input class="fl" type="text" maxlength="120" id="js_title" placeholder="不用带题号，120字以内">' +
            '</div>' +
            '<div class="topic_options clearfix">' +
            '<p class="fl pl20 topic_box_title">题目答案选项：</p> ' +
            '<ul class="fl" id="js_option_ul">' +
            '<li class="mb20">' +
            '<input type="text" maxlength="50" placeholder="选项内容50字以内">' +
            '<div class="close_circle"></div>' +
            '<span class="ml50">' +
            '<input type="radio" id="three" name="option" checked> ' + '<label for="three">设为正确选项</label>' +
            '</span>' +
            '<span class="ml50 none">' +
            '<input type="checkbox" id="checkbox_1">' +
            '<label for="checkbox_1">设为正确选项</label>' +
            '</span>' +
            '</li>' +
            '<li class="mb20">' +
            '<input type="text" maxlength="50" placeholder="选项内容50字以内">' +
            '<div class="close_circle"></div>' +
            '<span class="ml50">' +
            '<input type="radio" id="four" name="option"> ' + '<label for="four">设为正确选项</label>' +
            '</span>' +
            '<span class="ml50 none">' +
            '<input type="checkbox" id="checkboxs_2">'+
            '<label for="checkboxs_2">设为正确选项</label>' +
            '</span>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '<div class="add_option mb30" id="js_add_option">添加选项</div>'+
            '<div class="topic_content mb30 none"> ' +
            '<p class="fl pl20 topic_box_title">答案示例：</p> ' +
            '<textarea name="" id="js_answer_sample" maxlength="500" placeholder="答案示例"></textarea> ' +
            '<span class="f12"><i>0</i>/500</span></div>'+
            '<div class="topic_content clearfix mb30">' +
            '<p class="fl pl20 topic_box_title">答案解析：</p> ' +
            '<textarea name="" id="js_textarea" maxlength="500" placeholder="答案解析"></textarea> ' +
            '<span class="f12"><i id="js_i">0</i>/500</span> ' +
            '</div>'+'<button class="btn_submit" id="js_submit">提交</button>';
       $(".topic_box").append(str);
    }
    //有数据时的添加
    this.s_appendStr2 = function (obj) {
        console.log(obj);
        var analyze_num = obj.analyze.length;
        var example_num = obj.example.length;
        var score = obj.score || '-';
        var str = '<p class="topic_box_close" id="js_box_close"><span>x</span></p>'+
                '<div class="topic_style clearfix mb30">' +
                '<p class="fl pl20 topic_box_title">题目类型：</p>' +
                '<div class="fl" id="js_obj_style">';
        if (obj.is_obj == '0'){//主观题
            str += '<input type="radio" id="op_one" name="op_style" value="1">' +
                '<label for="op_one" class="ml30">客观题</label>' +
                '<input type="radio" checked id="op_two" name="op_style" value="0">' +
                '<label for="op_two" class="ml50">主观题</label>' +
                '</div>' +
                '</div>';
        }else{
            str += '<input type="radio" checked id="op_one" checked name="op_style" value="1">' +
                '<label for="op_one" class="ml30">客观题</label>' +
                '<input type="radio" id="op_two" name="op_style" value="0">' +
                '<label for="op_two" class="ml50">主观题</label>' +
                '</div></div>';
        }
            str += '<div class="topic_content clearfix mb30">' +
                '<p class="fl pl20 topic_box_title">建议分值：</p>' +
                '<input style="width: 170px;" class="fl" id="js_score" value="'+score+'" type="text">' +
                '<span class="ml10" style="display: inline-block;line-height: 34px;"> 分（假设试卷总分值100分）</span>' +
                '</div><div class="topic_style clearfix mb30"> ' +
                '<p class="fl pl20 topic_box_title">选项类型：</p> ' +
                '<div class="fl" id="js_topic_style"> ';
        if(obj.is_mult == '0'){
            str +=  '<input type="radio" id="one" checked name="option_style" value="0">' +
                '<label for="one" class="ml30">单选题</label>' +
                '<input type="radio" id="two" name="option_style" value="1">' +
                '<label for="two" class="ml50">多选题</label>' +
                '</div>';
        }else{
            str +=  '<input type="radio" id="one" name="option_style" value="0">' +
                '<label for="one" class="ml30">单选题</label>' +
                '<input type="radio" id="two" checked name="option_style" value="1">' +
                '<label for="two" class="ml50">多选题</label>' +
                '</div>';
        }
        str += '</div><div class="topic_content clearfix mb30">'+
                '<p class="fl pl20 topic_box_title">题目内容：</p>' +
                '<input class="fl" type="text" maxlength="500" id="js_title" value="'+obj.qus_name+'" placeholder="不用带题号，500字以内"></div>' +
                '<div class="topic_options clearfix">' +
                '<p class="fl pl20 topic_box_title">题目答案选项：</p> ' +
                '<ul class="fl" id="js_option_ul">';
        var opts = JSON.parse(obj.opts);
        var answer = null;
            console.log(opts);
            if(!$.isEmptyObject(opts)){
                answer = obj.answer.split('|');
                for(i in opts){
                    str += '<li class="mb20">' +
                        '<input type="text" maxlength="50" value="'+opts[i]+'" placeholder="选项内容50字以内">' +
                        '<div class="close_circle"></div>';
                    if($.inArray(i,answer) !== -1 && obj.is_mult == '0'){
                        str += '<span class="ml50">' +
                            '<input type="radio" id='+i+' name="option" checked> ' + '<label for='+i+'>设为正确选项</label>' +
                            '</span>';
                    }else{
                        str += '<span class="ml50">' +
                            '<input type="radio" id='+i+' name="option"> ' + '<label for='+i+'>设为正确选项</label>' +
                            '</span>';
                    }

                    if($.inArray(i,answer) !== -1 && obj.is_mult != '0'){
                        str += '<span class="ml50">' +
                            '<input type="checkbox" id='+"checkbox_"+i+' checked>' +
                            '<label for='+"checkbox_"+i+'>设为正确选项</label>' +
                            '</span>';
                    }else{
                        str += '<span class="ml50">' +
                            '<input type="checkbox" id='+"checkbox_"+i+'>' +
                            '<label for='+"checkbox_"+i+'>设为正确选项</label>' +
                            '</span>';
                    }
                    str += '</li>';
                }
            }else{
                str += '<li class="mb20">' +
                    '<input type="text" maxlength="50" placeholder="选项内容50字以内">' +
                    '<div class="close_circle"></div>' +
                    '<span class="ml50">' +
                    '<input type="radio" id="three" name="option" checked>' +
                    '<label for="three">设为正确选项</label>' +
                    '</span>' +
                    '<span class="ml50 none">' +
                    '<input type="checkbox" id="checkbox_1">' +
                    '<label for="checkbox_1">设为正确选项</label>' +
                    '</span></li><li class="mb20">' +
                    '<input type="text" maxlength="50" placeholder="选项内容50字以内"> ' +
                    '<div class="close_circle"></div>' +
                    '<span class="ml50">' +
                    '<input type="radio" id="four" name="option">' +
                    '<label for="four">设为正确选项</label>' +
                    '</span>' +
                    '<span class="ml50 none">' +
                    '<input type="checkbox" id="checkbox_2">' +
                    '<label for="checkbox_2">设为正确选项</label>' +
                    '</span>' +
                    '</li>';
            }
            str +=  '</ul></div>' +
                    '<div class="add_option mb30" id="js_add_option">添加选项</div>'+
                    '<div class="topic_content clearfix mb30">' +
                    '<p class="fl pl20 topic_box_title">答案示例：</p>' +
                    '<textarea name="" id="js_answer_sample" maxlength="500" placeholder="答案示例"value="'+obj.example+'">'+obj.example+'</textarea>' +
                    '<span class="f12"><i>'+example_num+'</i>/500</span></div>'+
                    '<div class="topic_content clearfix mb30">' +
                    '<p class="fl pl20 topic_box_title">答案解析：</p> ' +
                    '<textarea name="" id="js_textarea" maxlength="500" placeholder="答案解析" value="'+obj.analyze+'">'+obj.analyze+'</textarea> ' +
                    '<span class="f12"><i id="js_i">'+analyze_num+'</i>/500</span> ' +
                    '</div>'+'<button class="btn_submit" id="js_submit">提交</button>';
        $(".topic_box").append(str);
        if(obj.is_obj == '1'){//客观题
            $("#js_topic_style").parent().show();
            $("#js_option_ul").parent().show();
            $("#js_add_option").show();
            $("#js_answer_sample").parent().hide();
        }else{
            $("#js_topic_style").parent().hide();
            $("#js_option_ul").parent().hide();
            $("#js_add_option").hide();
            $("#js_answer_sample").parent().show();
        }
        if(obj.is_mult != '0'){ //复选
            $("#js_option_ul input[type='radio']").parent().hide();
        }else{
            $("#js_option_ul input[type='checkbox']").parent().hide();
        }
    }
    //添加选项
    this.addBtnOption = function () {
        var status = $("#js_topic_style").find("input[type='radio']:checked").val();
        console.log(status);
        var num = $("#js_option_ul>li").length + Math.random();
        var str = '<li class="mb20"><input type="text" maxlength="50" placeholder="选项内容50字以内"><div class="close_circle"></div>';
        if($("#js_option_ul>li").length >=10){
            popupalert('最多添加10个选项！','notice','');
            return;
        }
        if(status == 0){
            str += '<span class="ml50 "> ' +
                '<input type="radio" id="option_'+num+'" name="option"> '+
                '<label for="option_'+num+'">设为正确选项</label> ' +
                '</span> '+
                '<span class="ml50 none">' +
                '<input type="checkbox" id="checkboxs_'+num+'">'+
                '<label for="checkboxs_'+num+'">设为正确选项</label>' +
                '</span>';
        }else{
            str += '<span class="ml50 none"> ' +
                '<input type="radio" id="option_'+num+'" name="option"> ' +
                '<label for="option_'+num+'">设为正确选项</label> ' +
                '</span> '+
                '<span class="ml50">' +
                '<input type="checkbox" id="checkboxs_'+num+'">'+
                '<label for="checkboxs_'+num+'">设为正确选项</label>' +
                '</span>';
        }
        str += '</li>';
        $("#js_option_ul").append(str);
        self.s_centerShow();
    }
    //选择题型
    this.chooseStyle = function () {
        var val = $(this).val();
        if(val == 0){
            $("#js_option_ul input[type='radio']").parent().show().siblings('span').hide();
        }else{
            $("#js_option_ul input[type='checkbox']").parent().show().siblings('span').hide();
        }
    }
    //题目类型
    this.objStyle = function () {
        var val = $(this).val();
        if(val == 0){//主观题
            // $("#js_textarea").parent().hide();
            // $("#js_answer_sample").parent().hide();
            $("#js_topic_style").parent().hide();
            $("#js_option_ul").parent().hide();
            $("#js_add_option").hide();
            $("#js_answer_sample").parent().show();
            $("#js_title").prop('maxlength',500).attr('placeholder','不用带题号，500字以内').val('');
        }else{
            $("#js_topic_style").parent().show();
            $("#js_option_ul").parent().show();
            $("#js_add_option").show();
            $("#js_answer_sample").parent().hide();
            $("#js_title").prop('maxlength',120).attr('placeholder','不用带题号，120字以内').val('');
        }
    }
    //选项输入删除
    this.closeCircle = function () {
        if($("#js_option_ul>li").length <=2){
            popupalert('至少添加2个选项！','notice','');
            return;
        }
        $(this).parent().remove();
        self.s_centerShow();
    }
    //判断输入字数
    this.keyUpWorlds = function () {
        var val = $(this).val();
        $(this).siblings('span').find('i').html(val.length);
    }
    //限制为数字输入
    this.keyCodeChange = function (event) {
        //this.value = this.value.replace(/[^\d]/g,'');
        this.value = this.value.replace(/[^\.\d]/g,'');
    }
    //关闭查看窗口
    this.closeView = function () {
        $(".mask").hide();
        $(".view").hide();
    }
    //查看按钮操作
    this.look = function () {
        $(".mask").show();
        $(".view").show();
        var _this = this;
        var origin = $(this).attr('data-origin');
        $.post('/ets/store/getInfo',{'id':$(_this).attr('data-id')},function(res) {
          //  console.log(origin);
            var score = (res.score&&res.score+'分') || '--';
            var index = $(_this).parent().parent().index() + 1;
            var is_mult = res.is_obj == '1' ?res.is_mult == 0 ? '（单选题）':'（多选题）':'(主观题)';
            var str = '<p class="view_close mb50">x</p> ' +
                '<h3>'+index+'、'+res.qus_name+'<span class="ml20">'+is_mult+'</span></h3> ' +
                '<ul class="pl20"> ';
            var opts = null;
            var answer = null;
            if(res.opts && res.is_obj == '1'){
                opts = JSON.parse(res.opts);
                answer = res.answer.split('|');
                for(i in opts){
                    if($.inArray(i,answer) !== -1){
                        str += '<li>'+opts[i]+'<span></span></li> ';
                    }else {
                        str += '<li>'+opts[i]+'</li> ';
                    }
                }
            }
            str += '</ul><h3 class="mt20 mb10 color_666">建议分值：<span>'+score+'</span></h3>';
            if(res.is_obj == '0'){
                str += '<div class="mb50 mt60">' +
                    '<p class="f16 mb20">答案示例：</p>' +
                    '<p class="w700 color_666">'+res.example+'</p></div>';
            }
            str += '<div class="mb20">' +
                '<p class="f16 mb20">答案解析：</p>' +
                '<p class="w700 color_666">'+res.analyze+'</p>' +
                '</div>';
            if(origin == '0'){
                str += '';
            }else{
                str += '<button id="js_view_edit" data-id='+res.id+'>编辑</button>';
            }
            $(".view").empty().append(str);
        });
    }
    //编辑
    this.edit = function (id) {
        var id = $(this).attr('data-id') || id;
        $.post('/ets/store/getInfo',{'id':id},function(res) {
            self.s_append(res);
            $(".mask").show();
            $(".topic_box").show();
        });
    }
    //查看中的编辑操作
    this.viewEdit = function () {
        var id = $(this).attr('data-id');
        // $(".mask").show();
        $(".view").hide();
        self.edit(id);
    }
    //删除列表
    this.del = function () {
        var _this = this;
        popupalert('确定删除吗？','alert',function () {
            $.post('/ets/store/del',{
                'id':$(_this).attr('data-id'),
                'course_id':self.course_id
                }, function (ret) {
                if(ret.res == '0'){
                   // $(_this).parent().parent().remove();
                    popupalert('删除成功','message');
                    window.location.reload();
                    return;
                }else{
                    popupalert('删除失败','error');
                    return;
                }
            });
        });
    }
    //提交保存
    this.submitSave = function () {
        var is_mult = $("input[name='option_style']:checked").val(),//选项类型
            is_obj = $("input[name='op_style']:checked").val(),//题目类型
            title = $("#js_title").val(),
            score = $("#js_score").val()-0 || '',
            option = {},//选项
            answer = [],//答案
            analyze = $.trim($("#js_textarea").val()) || '无',//解析
            example = $.trim($("#js_answer_sample").val()) || '无',//示例
            status = false,
            key = ['A','B','C','D','E','F','G','H','I','J','K','L'];

        if(score){
            if(score<=0 || score >100){
                popupalert('分值设置范围大于0小于等于100！','notice');
                return;
            }
        }else{
            popupalert('分值设置不能为空！','notice');
            return;
        }
        if(score.toString().indexOf('.') > -1 && score.toString().split(".")[1].length > 1){
            popupalert('仅可设置一位小数！','notice');
            return;
        }
        if(!title){
            popupalert('题目内容不能为空！','notice');
            return;
        }
        if(is_obj == '1'){//客观题
            $("#js_option_ul").find("input[type='text']").each(function (i,e) {
                if($(this).val() !== ''){
                    option[key[i]] = $(this).val();
                }else{
                    status = true;
                }
            });
            if(status){
                popupalert('答案选项输入有误！','error');
                return;
            }
            if(is_mult == 0){//单选
                var index = $("#js_option_ul input[type='radio']:checked").parent().parent().index();
                answer.push(key[index]);
            }else{//多选
                $("#js_option_ul").find("input[type='checkbox']:checked").each(function (i,e) {
                    var index = $(this).parent().parent().index();
                    answer.push(key[index]);
                });
                if(answer.length <= 1){
                    popupalert('多选题至少设置两个答案！','notice');
                    return;
                }
            }
            if(!answer || answer.length <=0){
                popupalert('请设置答案！','error');
                return;
            }
            if(answer.length > 1){
                answer = answer.join('|');
            }else{
                answer = answer[0];
            }
        }

        // console.log(self.edit_id);return;
        $.ajax({
            url:'/ets/store/save',
            type : "post",
            async : true,
            cache : false,
            data : {
                'id' : self.edit_id || '',
                'course_id' : self.course_id || '',
                'is_obj' : is_obj,
                'score' :  score,
                'origin' : '0',
                'qus_name' : title,
                'opts' : JSON.stringify(option),
                'is_mult' : is_mult,
                'answer' : answer,
                'example' : example,
                'analyze' : analyze
            },
            dataType : "json",
            success:function (ret) {
                console.log(ret);
                if(ret.result == '0'){
                    popupalert('保存成功！','message');
                    setTimeout(function () {
                       // self.closeBox();
                        window.location.href = '/ets/store/index?course_id='+self.course_id;
                    },1500);
                }
            },
            error : function (e) {
                popupalert('保存失败！','alert');
                console.log('error:', e);
            }
        })
    }
    this.allSave = function () {
        popupalert('保存成功','message');
    }
    //预览
    this.btnView = function () {
        self.s_centerShow();
        $('.mask').show();
        $('.data_view').show();
    }
    this.closeDataView = function () {
        $('.mask').hide();
        $(this).parent().hide();
    }

    this.checkMaterail = function(){
        event.stopPropagation();
        var pick = $(this).prop('pick');
        if(pick){
            $('.select_ul_t').slideUp();
            $(this).removeProp('pick');
        }else{
            $('.select_ul_t').slideDown();
            $(this).prop('pick','1');
            $(".sms_select").css('box-shadow','0 0 8px #999');
        }
    }
    this.selectMaterial = function () {
        var type_flag = $(this).attr('data-value');
        if(type_flag !== ''){
            window.location.href = '/ets/store/index?course_id='+self.course_id+'&is_obj='+type_flag;
        }else{
            window.location.href = '/ets/store/index?course_id='+self.course_id;
        }
    }

    //关闭题库窗口
    this.closeLibrary = function () {
        $('.mask').hide();
        $(this).parent().hide();
    }
    //显示题库窗口
    this.openLibrary = function () {
        self.s_centerShow();
        $('.mask').show();
        $('.library').show();
    }
    //题库查看窗口
    this.lookLibrary = function () {
        var id = $(this).attr('data-id');
        if($(this).prop('data-show')=='0'){
            $("div[data-library-id='"+id+"']").slideUp();
            $(this).prop('data-show','1');
            $(this).html('查看');
        }else{
            $('.library_view').hide();
            $(".library_look").prop('data-show','1').html('查看');
            $("div[data-library-id='"+id+"']").slideDown();
            $(this).prop('data-show','0');
            $(this).html('收起');
        }
    }
    this.selectInit = function () {
        $(".sms_select_1 .select_ul").on('click','li',function () {
            self.select_1 = $(this).attr('data-value');
            console.log( self.select_1+':' +self.select_2+':'+ self.select_3 );
            self.ansyLoadData();
            self.createPage();
        });
        $(".sms_select_2 .select_ul").on('click','li',function () {
            self.select_2 = $(this).attr('data-value');
            console.log( self.select_1+':' +self.select_2+':'+ self.select_3 );
            self.ansyLoadData();
            self.createPage();
        });
        $(".sms_select_3 .select_ul").on('click','li',function () {
            self.select_3 = $(this).attr('data-value');
            console.log( self.select_1+':' +self.select_2+':'+ self.select_3 );
            self.ansyLoadData();
            self.createPage();
        });
    }
    //异步获取数据
    this.ansyLoadData = function (page){
        self.search_i = $("#js_search").val() || ''; //搜索
        var data = {
            "course_id" : self.course_id,
            "page"     : $.isNumeric(page)?page:1,
            "is_obj": self.select_1,
            "origin": self.select_2,
            "skill_id" : self.select_3,
            "keyword"  : self.search_i
        };
        $.ajax({
            url: "/ets/store/getstorelist",
            type: "post",
            data: data,
            async: true,
            cache: false,
            dataType: "json",
            success:function(res) {
                // console.log(res.list);
                var user = res.list;
                self.totalData = res.count;
                if(res.count > 0){
                    var tbody = "";
                    var pageNum = null,
                        is_obj = null,
                        is_mult = null,
                        score = '';
                    for(var row in user){
                        pageNum = ((row-0)+1)+((data.page-1)*8);
                        is_obj = user[row]['is_obj'] == '1'?'客观题':'主观题';
                        is_mult = user[row]['is_obj'] == '1'?user[row]['is_mult'] == '0'?'（单选题）':'（多选题）':'';
                        // title = user[row]['origin'] == '1'?'本课程作业':user[row]['title'];
                        title = self.s_options(user[row]['course_id'],user[row]['origin'],user[row]['title']);
                        score = (user[row]['score'] && user[row]['score']+'分') || '--';
                        tbody += '<div class="list_com clearfix">';
                        tbody += '<p class="fl textset">';
                        tbody += '<span>'+pageNum+'、</span>';
                        tbody += '<span>'+user[row]['qus_name']+'</span></p>';
                        tbody += '<p class="fl">'+is_obj+'</p>';
                        tbody += '<p class="fl textset">'+title+'</p>';
                        tbody += '<p class="fr">';
                        tbody += '<button class="choose" data-id='+user[row]['id']+'>选择该题</button>';
                        tbody += '<button class="ml20 mr20 library_look" data-id='+user[row]['id']+'>查看</button>';
                        tbody += '<button class="js_library_del" data-origin='+user[row]['origin']+' data-id='+user[row]['id']+'>删除</button></p>';
                        tbody += '</div>';
                        tbody += '<div class="library_view pt30 pl30 pb30" data-library-id='+user[row]['id']+'><h3>';
                        tbody += pageNum+'、'+user[row]['qus_name']+'<span>';
                        tbody += is_mult + '</span></h3>';
                        var opts = null;
                        var answer = null;
                        if(user[row]['is_obj'] == '1'){//客观题
                            opts = JSON.parse(user[row]['opts']);
                            answer = user[row]['answer'].split('|');
                            tbody += '<ul class="pl20">';
                                for(i in opts){
                                    if($.inArray(i,answer) !== -1){
                                        tbody += '<li>'+opts[i]+'<span></span></li> ';
                                    }else {
                                        tbody += '<li>'+opts[i]+'</li> ';
                                    }
                                }
                            tbody += '</ul>';
                        }
                        tbody += '<h3 class="mt20 mb10 color_666">建议分值：<span>'+score+'</span></h3>';
                        if(user[row]['is_obj'] == '0'){
                            tbody += '<div class="mb50 mt60">';
                            tbody += '<p class="f16 mb20">答案示例：</p>';
                            tbody += '<p class="w700 color_666">'+(user[row]['example']?user[row]['example']:"无")+'</p>';
                            tbody += '</div>';
                        }
                        tbody += '<div class="mb20">';
                        tbody += '<p class="f16 mb20">答案解析：</p>';
                        tbody += '<p class="w700 color_666">'+(user[row]['analyze']?user[row]['analyze']:"无")+'</p>';
                        tbody += '</div>';
                        tbody += '</div>';
                    }
                    $('#js_library_content').empty().html(tbody);
                    //     $('#pagerByPost').html(re.pager);
                    //    bindNavgateClickBehindAnsy();
                }else{
                    $("#js_library_content").empty().html("<h3 class='pt30 pb30 f16 tc'>没有满足条件的信息</h3>");
                    //     $("#pagerByPost").html(re.pager);
                }
            }
        });
    };
    //生成分页
    this.createPage = function () {
        $('.M-box').show();
        setTimeout(function () {
            $('.M-box').pagination({
                pageCount: Math.ceil(self.totalData/8),
                jump: false,
                coping:true,
                homePage:'首页',
                endPage:'末页',
                callback : function(api){
                    // api.setPageCount(Math.ceil(totalData/20));
                    self.ansyLoadData(api.getCurrent());
                    //  $('.now').text(api.getCurrent());
                    //  console.log(api.getCurrent());
                }
            },function(api){
                //  self.ansyLoadData(api.getCurrent());
                //   console.log(totalData);
            });
        },2000);
    };
    //区分是作业还是其他题库的题
    this.s_options = function(course_id,origin,title){
        if(course_id == self.course_id && origin == '1'){
            return "本课程作业"
        }else{
            return title;
        }
    }
    //题库删除
    this.libraryDel = function () {
        var _this = this;
        popupalert('确定删除吗？','alert',function () {
            $.post('/ets/store/delstore',{
                'id':$(_this).attr('data-id'),
                'origin':$(_this).attr('data-origin'),
            },function (ret) {
                console.log(ret);
                if(ret.result == '0'){
                    // $(_this).parent().parent().remove();
                    popupalert('删除成功','message');
                    window.location.reload();
                    return;
                }else{
                    popupalert('删除失败','error');
                    return;
                }
            });
        });
    }
    //选择题目
    this.librarySelected = function () {
        var _this = this;
        $.post('/ets/store/select',{
            'id':$(_this).attr('data-id'),
            'course_id':self.course_id
        },function (ret) {
            // console.log(ret);
            if(ret.result == '1'){
                popupalert('该题已添加！','error');
                return;
            }
            if(ret.result == '0'){
                popupalert('添加成功','message');
                window.location.reload();
                return;
            }else{
                popupalert('添加失败','error');
                return;
            }
        });
    }
}
