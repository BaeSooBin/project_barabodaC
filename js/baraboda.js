;(function($){

    var baraboda = {
        init:function(){
            this.scrollEventFn();
            this.headerFn();
            this.section1Fn();
            this.section2Fn();
            this.section3Fn();
            this.section4Fn();
            this.section5Fn();
            this.section6Fn();
            this.section7Fn();
            this.section8Fn();
            this.section9Fn();
            this.upDownFn();
            this.popUpFn();
            
        },
        scrollEventFn:function(){
            var scrollOld = 0;
            var scrollNew = 0;
            var $window = $(window);
            var $header = $('#header')
            var result = null;
            var that = this;

            function scrollFn(){
                scrollNew = $window.scrollTop();

                var scr = function(){
                    result = scrollOld-scrollNew > 0 ? 'UP' : 'DOWN';
                }

                scr();

                if($window.scrollTop() == 0){
                    $header.removeClass('addWhite');
                    $header.removeClass('addTranp');
                }
                else{
                    if(result == 'UP'){
                        if(that.btn == 1){
                            $header.removeClass('addWhite');
                            $header.addClass('addTranp');                        
                        }
                        else{
                            $header.addClass('addWhite');
                            $header.removeClass('addTranp');
                        }

                    }
                    if(result == 'DOWN'){
                        if(that.btn == 1){
                            $header.removeClass('addWhite');
                            $header.addClass('addTranp');                        
                        }
                        else{
                            $header.addClass('addWhite');
                            $header.removeClass('addTranp');
                        }

                    }
                }
                scrollOld = scrollNew;                
            }

            $window.scroll(function(){
                scrollFn();
            });


        },
        headerFn:function(){
            var $window = $(window);
            var $mainBtn = $('#header .main-btn');
            var $mobileBtn = $('#header .mobile-btn');
            var $sub = $('#header .sub');
            var $navLi = $('#header #nav > ul > li');
            var $asideLi = $('#header #aside > ul > li');
            var $nav = $('#header #nav');
            var $bar = $('#header .bar');
            var $arrow = $('#header .main-btn img');
            var pc = 0;
            var mobile = 0;
            var that = this;
            
            $mainBtn.on({
                mouseenter:function(e){
                    e.preventDefault();
                    $(this).next().stop().show();
                }
            });
            $navLi.on({
                mouseleave:function(e){
                    e.preventDefault();
                    $sub.stop().hide();
                }
            });

            $asideLi.on({
                mouseleave:function(e){
                    e.preventDefault();
                    $sub.stop().hide();
                }
            });

            function pcEventFn(){
                $nav.stop().show();
                $sub.stop().hide();
                $nav.css({display:'inline-block'});

                $mainBtn.on({
                    mouseenter:function(e){
                        e.preventDefault();
                        $(this).next().stop().show();
                    }
                });

                $navLi.on({
                    mouseleave:function(e){
                        e.preventDefault();
                        $sub.stop().hide();
                    }
                });

            }

            function mobileEventFn(){
                $sub.stop().hide();
                $bar.removeClass('addMobile');
                $nav.stop().slideUp(0);
                $arrow.removeClass('addBtn');

                $mainBtn.off('mouseenter');
                $navLi.off('mouseleave');

            }

            function pcMobileFn(){
                if( $window.innerWidth() > 1200 ){
                    pc=1;
                    mobile=0;
                    pcEventFn();
                    that.btn = 0;
                }
                else{
                    pc=0;
                    mobile=1;
                    mobileEventFn();
                }
            }
            setTimeout(pcMobileFn,100);

            $window.resize(function(){
                pcMobileFn();
            });
            mobileEventFn();

           /*  $mainBtn.on({
                click:function(e){
                    e.preventDefault();
                    if(mobile==1){
                        $arrow.toggleClass('addBtn');
                        $sub.stop().slideUp(300);
                        $(this).next().stop().slideToggle(300);
                    }
                }
            }); */

            //메인 arrow 버튼
            $mainBtn.each(function(idx){
                $(this).on({
                    click:function(e){
                        e.preventDefault();
                        if(mobile==1){
                            $arrow.eq(idx).toggleClass('addBtn');
                            $sub.eq(idx).stop().slideUp(300);
                            $(this).next().stop().slideToggle(300);
                        }
                    }
                });
            });

            $mobileBtn.on({
                click:function(e){
                    e.preventDefault();
                    $bar.toggleClass('addMobile');
                    $nav.stop().slideToggle(300);

                    that.btn == 0 ? that.btn = 1 : that.btn = 0;
                }
            });

        },
        section1Fn:function(){
            
            var $section1 = $('#section1');
            var $slide = $('#section1 .slide');
            var $winW = $(window).width();
            var $winH = $(window).height();
            var $slideWrap = $('#section1 .slide-wrap');
            var $nextBtn = $('#section1 .next-btn');
            var $prevBtn = $('#section1 .prev-btn');
            var $pageBtn = $('#section1 .page-btn');
            var cnt = 0;
            var setId = null;
            var setId2 = null;
            var n = $('#section1 .slide').length;

            function resizeFn(){
                $winW = $(window).width();
                $winH = $(window).height();
                $imgW = $('#section1 img').innerWidth();
                $slide.css({width:$winW, height:$winH});

                    if($winW>980){
                        $winH = $(window).height();
                    }
                    else if(680>$winW){
                        $winH = 600;
                        $imgH = 500;
                    }
                $section1.css({width:$winW, height:$winH});
            }
            resizeFn();
            setTimeout(resizeFn,100);

            $(window).resize(function(){
                setTimeout(resizeFn,100);
            });

            //1.메인슬라이드함수
            function mainNextSlideFn(){
                $slide.css({zIndex:1, opacity:1});
                $slide.eq(cnt==0?2:cnt-1).css({zIndex:2});
                $slide.eq(cnt).css({zIndex:3}).stop().animate({opacity:0},0).animate({opacity:1});
                pageBtnColorEventFn();
            }
            function mainPrevSlideFn(){
                $slide.css({zIndex:1, opacity:1});
                $slide.eq(cnt).css({zIndex:2});
                $slide.eq(cnt==2?0:cnt+1).css({zIndex:3}).stop().animate({opacity:1},0).animate({opacity:0});
                pageBtnColorEventFn();
            }

            //2. 다음,이전 슬라이드 카운트함수
            function nextSlideCountFn(){
                cnt++;
                if(cnt>n){
                    cnt=0;
                }
                mainNextSlideFn();
            };
            function prevSlideCountFn(){
                cnt--;
                if(cnt<0){
                    cnt=n;
                }
                mainPrevSlideFn();
            };

            //좌우버튼
            $nextBtn.on({
                click:function(){
                    pauseTimerFn();
                    if( !$slideWrap.is(':animated') ){
                        nextSlideCountFn();
                    }
                }
            });
            $prevBtn.on({
                click:function(){
                    pauseTimerFn();
                    if( !$slideWrap.is(':animated') ){
                        prevSlideCountFn();
                    }
                }
            });
            
            //자동타이머
            function autoTimerFn(){
                setId = setInterval(nextSlideCountFn, 4000);
            }
            autoTimerFn();

            //슬라이드 터치시 멈춤
            function pauseTimerFn(){
                var t = 0;
                clearInterval(setId2);
                clearInterval(setId);
                setId2 = setInterval(function(){
                    t++;
                    if(t>3){
                        t=0;
                        clearInterval(setId2);
                        clearInterval(setId);
                        nextSlideCountFn();
                        autoTimerFn();
                    }
                }, 1000);
            }

            function pageBtnColorEventFn(){
                $pageBtn.removeClass('addPage');
                $pageBtn.eq(cnt > n-1 ? 0 : cnt).addClass('addPage');
            }
            pageBtnColorEventFn();

            $pageBtn.each(function(idx){
                $(this).on({
                    click:function(){
                        pauseTimerFn();
                        if(cnt<idx){
                            cnt=idx;
                            nextSlideCountFn();
                        }
                        if(cnt<idx){
                            cnt=idx;
                            prevSlideCountFn();
                        }
                        
                    }
                });
            });

        },
        section2Fn:function(){
            var $section2 = $('#section2');
            var t = 0;

            function scrollFn(){
                $section2.addClass('addAni');
            }

            $(window).scroll(function(){
                if( $(this).scrollTop() == 0 ){
                    t=0;
                    $section2.removeClass('addAni');
                }
                if( $(this).scrollTop() > 200 ){
                    if(t==0){
                        t=1;
                        scrollFn();
                    }
                }
            });

        },
        section3Fn:function(){
            var $section3 = $('#section3');
            var t = 0;

            //페럴럭스
            function scrollFn(){
              $section3.addClass('addAni');
            }

            $(window).scroll(function(){
              if( $(this).scrollTop() == 0 ){
                t=0;
                $section3.removeClass('addAni');
              }
              if( $(this).scrollTop() > 600 ){
                if(t==0){
                  t=1;
                  scrollFn();
                }
              }
            });


        },
        section4Fn:function(){
            var $lookBtn = $('#section4 .look-btn');
            var $bestWrap = $('#section4 #specialty-wrap .best-wrap');
            var $navUl = $('#section4 #specialty-wrap ul');
            var $navUlW = $('#section4 #specialty-wrap ul').innerWidth();
            var $navUlLi = $('#section4 #specialty-wrap ul li');
            var $navUlLiW = $('#section4 #specialty-wrap ul li').innerWidth();
            var $imgWrap = $('#section4 .img-wrap')
            var $navUlLiH = $navUlLiW*imgHRate;
            var n = $('#section4 #specialty-wrap ul li').length;
            var $winW = $(window).innerWidth();
            var btnNum = 0;
            var cols = 4;
            var imgHRate = 1.263492063;
            var rows = Math.ceil(n/cols);

            var show = [];
            var hide = [];
            var k = -1;
            var $section4 = $('#section4');
            var $sec4Top = $('#section4').offset().top-300;
            var t = 0;

            //페럴럭스
            function scrollFn(){
                $section4.addClass('addAni');
            }

            $(window).scroll(function(){
                if( $(this).scrollTop() == 0 ){
                    t=0;
                    $section4.removeClass('addAni');
                }
                if( $(this).scrollTop() > $sec4Top ){
                    if(t==0){
                        t=1;
                        scrollFn()
                    }
                }
            });


            function resizeFn(){

                $winW = $(window).innerWidth();
                if($winW>1200){
                    cols = 4;
                }
                else if(1200>$winW && $winW>980){
                    cols = 3;
                }
                else if(980>$winW && $winW>680){
                    cols = 2;
                }
                else{
                    cols = 1;
                }
                
                $navUlW = $('#section4 #specialty-wrap ul').innerWidth();
                $navUlLiW = $navUlW/cols; //칸너비
                $navUlLiH = $navUlLiW*imgHRate;

                if(btnNum == 0){
                    hide = [];
                    show = [0,1,2,3,4,5,6,7,8]

                    $bestWrap.css({opacity:0})
                }
                else if(btnNum == 1){
                    hide = [3,4,5,6,7,8];
                    show = [0,1,2]

                    $bestWrap.css({opacity:1})
                }
                else if(btnNum == 2){
                    hide = [0,1,2,7,8];
                    show = [3,4,5,6]

                    $bestWrap.css({opacity:1})
                }
                else if(btnNum == 3){
                    hide = [0,1,2,3,4,5,6];
                    show = [7,8]

                    $bestWrap.css({opacity:1})
                }

                n=show.length;
                rows = Math.ceil(n/cols);
                $navUl.css({ height : $navUlLiH*rows });
                $navUlLi.css({width : $navUlLiW, height : $navUlLiH});
                $imgWrap.removeClass('addZoom');

                //hide 반복문
                $.each(hide, function(idx){
                    $navUlLi.eq(hide[idx]).stop().hide();
                });

                //show 제어문
                k=-1;
                for(var i=0; i<rows; i++){
                    for(var j=0; j<cols; j++){
                        k++;
                        if(k>=n){
                            break;
                        }
                        else{
                            $navUlLi.eq(show[k]).stop().show().animate({left:$navUlLiW*j, top:$navUlLiH*i}, 400);
                        }
                    }
                }

                for(var i=0; i<n; i++){
                    $imgWrap.eq(show[i]).addClass('addZoom');
                }




            }
            resizeFn();
            setTimeout(resizeFn, 300);

            $(window).resize(function(){
                resizeFn();
            });


            $lookBtn.each(function(idx){
                $(this).on({
                    click:function(){
                        btnNum = idx;
                        resizeFn();
                        $lookBtn.removeClass('addnav');
                        $(this).addClass('addnav');
                    }
                });
            });
            
        },
        section5Fn:function(){
            var $section5 = $('#section5');
            var $sec5Top = $('#section5').offset().top-300;
            var t = 0;

            //페럴럭스
            function scrollFn(){
              $section5.addClass('addAni');
            }

            $(window).scroll(function(){
              if( $(this).scrollTop() == 0 ){
                t=0;
                $section5.removeClass('addAni');
              }
              if( $(this).scrollTop() > $sec5Top ){
                if(t==0){
                  t=1;
                  scrollFn();
                }
              }
            });
        },
        section6Fn:function(){
            var $section6 = $('#section6');
            var $sec6Top = $('#section6').offset().top-300;
            var t = 0;
            
            function scrollFn(){
                $section6.addClass('addAni');
            }

            $(window).scroll(function(){
                if($(this).scrollTop() == 0){
                    t=0;
                    $section6.removeClass('addAni');
                }
                if($(this).scrollTop() > $sec6Top ){
                    if(t==0){
                        t=1;
                        scrollFn();
                    }
                }

            });
/*
            var $win = $(window);
            var $winW = $(window).innerWidth();
            var $winH = $(window).innerHeight();
            var $video = $('.youtube');
            var $videoWrapW = $('.video-wrap').innerWidth();
            var $videoWrapH = $('.video-wrap').innerHeight();
            var $vidW = $video.innerWidth();
            var $vidH = $video.innerHeight();
            var marginL = ($videoWrapW-$vidW)/2;
            var marginT = ($videoWrapH-$vidH)/2;

            function resizeFn(){
                $videoWrapW = $('.video-wrap').innerWidth();
                $videoWrapH = $('.video-wrap').innerHeight();
                $vidW = $video.innerWidth();
                $vidH = $video.innerHeight();
                // marginL = ($videoWrapW-$vidW)/2;
                // marginT = ($videoWrapH-$vidH)/2;

                if($videoWrapW>$vidW){
                    $video.css({width:$videoWrapW,height:'auto'});
                }
                if($videoWrapH>$vidH){
                    $video.css({width:'auto',height:$videoWrapH});
                }
                // $video.css({marginLeft:marginL, marginTop:marginT});
                $section6.css({width:$videoWrapW,height:$videoWrapH});
            }
            resizeFn();
            setTimeout(resizeFn, 100);
            
            $win.resize(function(){
                setTimeout(resizeFn, 100);
            })*/

        },
        section7Fn:function(){
            var $section7 = $('#section7');
            var $sec7Top = $('#section7').offset().top-200;
            var t = 0;

            function scrollFn(){
                $section7.addClass('addAni');
            }
            
            $(window).scroll(function(){
                if( $(this).scrollTop() == 0 ){
                    t=0;
                    $section7.removeClass('addAni');
                }
                if( $(this).scrollTop() > $sec7Top ){
                    if(t==0){
                        t=1;
                        scrollFn();
                    }
                }
            });
        },
        section8Fn:function(){
            var $section8 = $('#section8');
            var $sec8Top = $('#section8').offset().top;
            var t = 0;

            function scrollFn(){
                $section8.addClass('addAni');
            }
            
            $(window).scroll(function(){
                if( $(this).scrollTop() == 0 ){
                    t=0;
                    $section8.removeClass('addAni');
                }
                if( $(this).scrollTop() > $sec8Top ){
                    if(t==0){
                        t=1;
                        scrollFn();
                    }
                }
            });

            var $input = $('input');
            var $cube = $('#section8 .cube');

            $input.on({
                click:function(){
                    $cube.removeClass('addCube')
                }
            });
            
        },
        section9Fn:function(){
            var $calBtn = $('#section9 .calendar-btn');
            var $calendar = $('#section9 .calendar');
            var $call = $('#section9 .call');

            $calBtn.on({
                click:function(e){
                    e.preventDefault();
                    $calendar.stop().show();
                }

            });
            $call.on({
                mouseleave:function(e){
                    e.preventDefault();
                    $calendar.stop().hide();
                }
            });


            var today = null;  //날짜객체
            var year  = null;  //년
            var month = null;  //월
            var date  = null;  //일
            var day   = null;  //요일
            var y = 0;
            var m = 0;
            var $dateBox = $(".date-box span");
            var txt = '';
            var yoil  = ['일','월','화','수','목','금','토']

            function timerFn(){
                today   = new Date();
                year  = today.getFullYear();
                month = today.getMonth()+1;
                date  = today.getDate();
                day   = today.getDay();
                yoil  = ['일','월','화','수','목','금','토']

                txt = year + ' - ' + (month+1) + ' - ' + date + ' - ' + yoil[day] + '요일';

                //현재날짜
                $dateBox.html(txt);
            }
            timerFn();

            setInterval(function(){
                timerFn();
            },1000);

            var lastDate = null;
            var col = null;
            var prevLastDate = null;
            cnt = 0;

            function calendarFn(y,m){
                col = null;
                prevLastDate = null;
                cnt = 0;
    
                $('.calendar table caption').html( y + '년  ' + m + '월' );
                $('td').removeClass('now');
    
                var nowYear = new Date().getFullYear();
                var nowMonth = new Date().getMonth()+1;
                var nowDate = new Date().getDate()-1;
    
                firstDay = new Date(y + '-' + m + '-' + 1).getDay();
                col = firstDay;
                prevLastDate = new Date(y, m-1, 0).getDate();
                lastDate = new Date(y, m, 0).getDate();
    
                for(var i=1; i<=lastDate; i++){
                    if( col !== null){
                        $('td').eq(col).html(i);
                        col++;
    
                        if(nowYear == y && nowMonth == m){
                            if(nowDate == i){
                                $('td').eq(col).addClass('now');
                            }
                        }
                        else{
                            $('td').removeClass('now');
                        }
                    }
                }
    
                for(var i=firstDay-1; i>=0; i--){
                    $('td').eq(i).html(prevLastDate).addClass('color1');
                    prevLastDate--;
                }
    
                for(var i=col; i<$('td').length; i++){
                    cnt++;
                    $('td').eq(i).html(cnt).addClass('color1');
                }
            }
            calendarFn(year, month);

            y = year;
            m = month;

            //다음달 버튼
            $('.next-btn').on({
                click:function(){
                    m++;
                    if(m>12){
                        y++;
                        m=1;
                    }
                    console.log(y,m);
                    $('td').removeClass('color1');
                    calendarFn(y,m);
                }
            });

            //이전달 버튼
            $('.prev-btn').on({
                click:function(){
                    m--;
                    if(m<1){
                        y--;
                        m=12;
                    }
                    $('td').removeClass('color1');
                    calendarFn(y,m);
                }
            });

        },
        upDownFn:function(){
            var $goBtn = $('.goBtn');
            var $smoothTBtn = $('.smoothTBtn');
            var $smoothBBtn = $('.smoothBBtn');
            var t = 0;

            $smoothTBtn.on({
                click:function(e){
                    e.preventDefault();
                    var url = $(this).attr('href');
                        $('html,body').stop().animate({scrollTop:$(url).offset().top},800);
                }
            });
            $smoothBBtn.on({
                click:function(e){
                    e.preventDefault();
                    var url = $(this).attr('href');
                        $('html,body').stop().animate({scrollTop:$(document).height() + $(window).height()},800);
                }
            });

            $(window).scroll(function(){
                if( $(this).scrollTop()>=100 ){
                    if(t==0){
                        t=1;
                        $goBtn.stop().fadeIn(200);
                    }
                }
                else{
                    if(t==1){
                        t=0;
                        $goBtn.stop().fadeOut(200);
                    }
                }
            });


        },
        popUpFn:function(){
            var $closeBtn = $('.close-btn');
            var $popUp = $('#popUp')

            $closeBtn.on({
                click:function(){
                    $popUp.stop().hide();
                }
            })
        }


    }

    baraboda.init();

})(jQuery);