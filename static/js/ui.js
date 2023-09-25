window.uiUx = {
    popupLayer:{
        popCount:1,
        open:function(url,name){
            let layerName = 'contents'+this.popCount
            this.popCount +=1; // popupLayer.open을 한번 더 불렀을때 popcount를 증가시키기 위해서.
            if(name){
                layerName = name;
            }

            const temp = `<div id = "layer--${layerName}" class="popupLayerWrapper">
                                    <div class="popupLayer">
                                        <div class="popupLayerFrame"><iframe src="${url}" width="100%" height="100%" class="layerFrame"></iframe></div>
                                        <button type="button" class="btnLayerClose" onclick="uiUx.popupLayer.close(this);"></button>
                                    </div>
                                </div>`;
            $('body').append(temp);
            setTimeout(function () {
                $("#layer--" + layerName).addClass("show");
            }, 100)
        },
        close:function(target){
            let $target = $(target).parents('.popupLayerWrapper')
            if(typeof target ==='string'){
                // 위의 기본 팝업의 닫기 버튼에서는 인수로 (this)를 보내는데, 특정 팝업을 닫고싶을 때는 해당 layerName의
                $target = $('#'+target);
            }

            if(!target){ // target을 지정하지 않았다면
                if($('.popupLayerWrapper').length > 0 ){  // 모든 .popupLayerWrapper
                    $target = $('.popupLayerWrapper');
                } else {
                    $target = parent.$('.popupLayerWrapper'); //혹은 parent document의 .popupLayerWrapper
                }
            }

            $target.fadeOut(200,()=>{
                //$(this).removeClass('show')
                console.log($(this))
                $target.remove();
            })
        }
    },
    afterFunction : function(before, after, time){
        const afterTime = time ? time : 100;
        before();
        setTimeout(function(){
            after();
        },afterTime);
    },
}

window.uiUtil=
    {
        scrollMove : function (obj,speed,easing,gap,afterFunc){
            if(speed == null || speed ===''){speed = 500;} // 기본 속도는 500ms
            if(easing == null || easing===''){easing='easeInOutQuint';}//
            if(gap == null || gap ===''){gap=0;}
            let offset = $(obj).offset();
            let topValue = offset.top;
            $('html,body').stop().animate({
                scrollTop : topValue - gap
            }, speed, easing, function(){
                if(afterFunc){
                    afterFunc();
                }
            })
        },
        chkAll : function(chkAll, chkList){
            let $chkAll = $(chkAll);
            let $chkList = $(chkList);
            let checkitemLength = $chkList.length;
            $chkAll.change(function () {
                let currentState = $(this).prop('checked');
                if (!currentState) {
                    $chkList.prop('checked', false);
                } else {
                    $chkList.prop('checked', true);
                }
            })
            $chkList.change(function(){
                let checkedLength = 0;
                $chkList.each(function(){
                    if($(this).is(':checked')){
                        checkedLength +=1;
                    }
                })
                if(checkitemLength > checkedLength){
                    //uiUtil.chkClear($chkAll)
                    $chkAll.prop('checked',false)
                }else{
                    $chkAll.prop('checked',true)
                }
            })
        },
        chkClear : function(obj){
            $(obj).prop('checked',false);
        }
    }

window.custom = {
    test : function(){
        console.log('로드가 잘 됩니다.')
    },
}

function setHeightIframe(height) {
    $(".layerFrame").css("height", height);
}

/* layer팝업 딤 창 클릭 시 팝업 닫힘 */
$(document).click(function(e){
    if ((e.target.classList.contains('popupLayerWrapper'))) {
        let $targetElement = e.target.children[0].querySelector('.btnLayerClose');
        uiUx.popupLayer.close($targetElement);
    }
    if ((e.target.classList.contains('spreadPopupLayer'))) {
        let $targetElement = e.target.children[0].querySelector('.btnLayerClose');
        $targetElement.click();
    }
})