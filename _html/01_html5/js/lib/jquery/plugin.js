// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→グローバル変数の実装
　→AJAX非同期通信対応

・Common UI
　→UI動作で必要な実装

・Lightbox
　→モーダルウィンドウの実装

・Validate
　→メールのバリデート実装

・MailForm
　→メールフォームのレイアウト、挙動に関わる実装

・Suggest
　→検索からサジェストを出す実装

・LanguageChange
　→Cookieを利用した言語切替や判定の実装

・SNSAPI
　→Twitter、FacebookなどのSNS API処理の実装

・Kerning / Centering Adjust
　→カーニングやセンタリングの実装

・Device Adjust
　→PC版とのレイアウトや挙動の切替、SPの特定端末における挙動対策、等

----------------------------------------------------*/




var GLOBAL = GLOBAL || self;




(function(global) {


"use strict";


/* Setup
------------------------------------------------------------------------------*/




    /* グローバル変数
    ----------------------------------------*/


    // ウィンドウのサイズ判定 //
    var window_width            = $(window).width();
    var window_height           = $(window).height();
    var window_outer_width      = $(window).outerWidth();
    var window_outer_height     = $(window).outerHeight();
    var window_inner_width      = $(window).innerWidth();
    var window_inner_height     = $(window).innerHeight();


    // ディレクトリの判定 //
    var rootDir                 = location.href.split('/');
    var currentDir              = rootDir[rootDir.length -2];


    // 端末ユーザーエージェントの判定 //
    var user_agent              = navigator.userAgent;


    // ヘッダーの判定 //
    var header                  = $('header');
    var header_navi_1st_none    = $('header#header-navi-1st-none');
    var header_navi_1st         = $('header#header-navi-1st');
    var header_navi_2nd         = $('header#header-navi-2nd');
    var header_navi_3rd         = $('header#header-navi-3rd');


    // フッターの判定 //
    var footer                  = $('footer');
    var footer_navi_1st         = $('footer#footer-navi-1st');
    var footer_navi_2nd         = $('footer#footer-navi-2nd');
    var footer_navi_3rd         = $('footer#footer-navi-3rd');




        /* ユーザーエージェント一覧
        ----------------------------------------


        //　iOS
        user_agent.indexOf('iPhone') > 0
        user_agent.indexOf('iPad') > 0
        user_agent.indexOf('iPod') > 0

        //　Android
        user_agent.indexOf('Android') > 0

        //　BlackBerry
        user_agent.indexOf('BlackBerry') > 0

        //　Windows Phone
        user_agent.indexOf('windows Phone') > 0

        //　NOKIA
        user_agent.indexOf('NOKIA') > 0

        //　Firefox OS
        /Mobile.*Firefox/.test(user_agent)

        //　IE
        user_agent.match(/MSIE/) 　////　vr.11 or high
        user_agent.match(/Trident/) ////　vr.10 or less


        ----------------------------------------
        */




    $.ajaxSetup ({

        cache: true,
        async: true

    });


    function getScript(rootDir) {

        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.japlugin.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.kerning.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.colorbox.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.heightLine.min.js');

    }


    if (header_navi_1st.length || header_navi_1st_none.length) {
        getScript('./');
    }

    else if (header_navi_2nd.length) {
        getScript('../');
    }

    else if (header_navi_3rd.length) {
        getScript('../../');
    }




/* AJAX Setup ここまで
------------------------------------------------------------------------------*/




/* Common UI
------------------------------------------------------------------------------*/




    /* 【TEST】
    ----------------------------------------------------*/




        /* 【TEST】 window判定実装
           ウィンドウ自体の幅と高さを計測し、使っているブラウザのユーザーエージェントを判定
        ----------------------------------------*/


        function testUserStatusDecision() {

            var window_width    = $(window).width();
            var window_height   = $(window).height();

            $('#test01').html('ウィンドウ幅' + '&nbsp;:&nbsp;' + window_width);
            $('#test02').html('ウィンドウ高さ' + '&nbsp;:&nbsp;' + window_height);
            $('#test03').html('ユーザーエージェント' + '&nbsp;:&nbsp;' + '<br />' + user_agent);
            $('#test04').html('現在のディレクトリ' + '&nbsp;:&nbsp;' + currentDir);

        }


        $(window).on('load resize', function() {
            testUserStatusDecision();
        });




        /*【TEST】 IE判定実装
        ----------------------------------------*/


        /* IEか否か */
        var isIE        = false;

        /* IEのバージョン */
        var version     = null;

        /* IEであるか否かの判定 */
        if (user_agent.match(/MSIE/) || user_agent.match(/Trident/) ) {
            isIE = true;
            version = user_agent.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
            version = parseInt(version);
            console.log('IE : Ver:', version);
        }




        /* 【TEST】 Json読み込み
        ----------------------------------------*/


        function testJsonSelect(rootDir) {

            return $.getJSON(rootDir + 'ajax/text.json', function(data) {

                var items = [];
                $.each(data, function(key, val) {
                    items.push('<li id=' + key + '>' + val + '</li>');
                });

                $('<ul/>',{
                    'class':    'my-new-list',
                    html:       items.join('')
                }).appendTo('#test05');

            });

        }


        if (header_navi_1st.length || header_navi_1st_none.length) {
            testJsonSelect('./');
        }

        else if (header_navi_2nd.length) {
            testJsonSelect('../');
        }

        else if (header_navi_3rd.length) {
            testJsonSelect('../../');
        }




        /*【TEST】 btn-hover実装
        ----------------------------------------*/


        function btnHoverSelect(rootDir) {

            return $.ajax ({

                    type:   'GET',
                    url:    rootDir + 'include/btn.html',

                }).done(function(btn) {

                    btn = btn.replace(/\{\$root\}/g, rootDir);
                    $('#hover').append(btn);

            });

        }


        if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent) ) {

        }

        else if (header_navi_1st.length || header_navi_1st_none.length) {
            btnHoverSelect('./');
        }

        else if (header_navi_2nd.length) {
            btnHoverSelect('../');
        }

        else if (header_navi_3rd.length) {
            btnHoverSelect('../../');
        }

        else {

        }




    /* 【TEST】ここまで
    ----------------------------------------------------*/




    /* Header共通化
    ----------------------------------------------------*/


    function headerSelect(rootDir) {

        return $.ajax ({

                type:   'GET',
                url:    rootDir + 'include/header.html',

            }).done(function(html) {

                html = html.replace(/\{\$root\}/g, rootDir);
                header.append(html);

        });

    }


    if (header_navi_1st.length) {
        headerSelect('./');
    }

    else if (header_navi_2nd.length) {
        headerSelect('../')
    }

    else if (header_navi_3rd.length) {
        headerSelect('../../');
    }

    else if (header_navi_1st_none.length) {

    }




    /* Footer共通化
    ----------------------------------------------------*/


    function footerSelect(rootDir) {

        return $.ajax ({

                type:   'GET',
                url:    rootDir + 'include/footer.html',

            }).done(function(html) {

                html = html.replace(/\{\$root\}/g, rootDir);
                footer.append(html);

        });

    }


    if (footer_navi_1st.length) {
        footerSelect('./');
    }

    else if (footer_navi_2nd.length) {
        footerSelect('../')
    }

    else if (footer_navi_3rd.length) {
        footerSelect('../../');
    }




    /* dt adjust -- 定義タグで表組する場合
    ----------------------------------------------------*/


    // dtの幅を定義して、dtに応じてddのマージンを調整しdt,ddでの表組を作る //
    function dtAdjust() {

        /* dtの幅 */
        var dt_column_width     = $('dl.column dt').width();
        var dt_news_width       = $('dl.news dt').width();

        /* ddの判定 */
        var dd_column           = $('dl.column dd');
        var dd_news             = $('dl.news dd');

        /* 可変部分の高さを適用 */
        dd_column.css('margin-left', dt_column_width + 20 + 'px');
        dd_news.css('margin-left', dt_news_width  + 'px');

    }


    // DOM 読み込み / リサイズ //
    $(window).on('load resize', function() {
        dtAdjust();
    });




    /* PageScroll
    ----------------------------------------------------*/


    // ページスクロール //
    function pagescroll() {

        return $.getScript('//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.js', function() {

            $('a[rel=scroll]').on('click', function() {

                /* リンクの判定 */
                var href    = $(this).attr('href');
                var target  = $(href === "#" || href === "" ? 'html' : href);

                /* アンカーリンクへスクロール */
                target.velocity('scroll', {
                    duration:   500,
                    easing:     'easeOutExpo'
                });
                return false;

            });

        });

    }


    pagescroll();




    /* Slider
    ----------------------------------------------------*/


    // スライダーのクラスを設定 //
    var carouselslider = $('#carousel-slider');

    carouselslider.carousel({
        interval: 8000
    });


    // スライダーにタッチスワイプを実装する -SP- //
    function carouselSliderFlick() {

        var carousel = new Hammer(carouselslider[0]);

        /* 左にスワイプしたら次の画像に切り替え */
        carousel.on('swipeleft', function() {
            carouselslider.carousel('next');
        });

        /* 右にスワイプしたら前の画像に切り替え */
        carousel.on('swiperight', function() {
            carouselslider.carousel('prev');
        });

    }


    // ソースにスライダー用のid名が含まれていたらタッチスワイプを発火する -SP- //
    if (carouselslider.length) {
        carouselSliderFlick();
    }




    /* Tabs
    ----------------------------------------------------*/


    var nav_tabs = $('#tabs');

    nav_tabs.tabs({

        collapsible: false,
        show:   { effect: 'fadeIn', duration: 800 },
        fx:     { height: 'toggle', opacity: 'toggle', duration: 300 }

    });




    /* WindowClose
    ----------------------------------------------------*/


    function quitBox(cmd) {

        if (cmd=='quit') {
            open(location, '_self').close();
        }
        return false;

    }




    /* MouseOver
    ----------------------------------------------------*/


    // マウスオーバー用のクラスを設定 //
    var img_mouse_over = $('img.img-mouseover');


    // マウスオーバー時の挙動を設定 //
    function mouseOver(i) {

        var imgArr = i ;

        switch (imgArr) {

            case 'on' :

                img_mouse_over.each(function() {
                    $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
                });
                break;

            case 'off' :

                img_mouse_over.each(function() {
                    $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
                });
                break;

            default :

                break;

        }

    }


    // PCのみ発火 //
    if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

        img_mouse_over.on({

            'mouseenter': function() {
                mouseOver();
            },

            'mouseleave': function() {
                mouseOver();
            }

        });

    }

    else {

        img_mouse_over.on({

            'mouseenter': function() {
                mouseOver('on');
            },

            'mouseleave': function() {
                mouseOver('off');
            }

        });

    }




    /* TargetBlank
       for IE8
    ----------------------------------------------------*/


    // ブランク用のクラスを設定 //
    var window_blank = $('.blank');


    // クリックしたらアンカーリンクをブランクで動作 //
    window_blank.on('click', function() {

        /* リンクの判定 */
        var href = $(this).attr('href');

        window.open(href, '_blank');
        return false;

    });




/* Common UI ここまで
------------------------------------------------------------------------------*/




/* Lightbox
------------------------------------------------------------------------------*/




    // ライトボックス(colorbox)の実行スクリプト //
    function colorbox(rootDir) {

        $.getScript(rootDir + 'js/lib/jquery/jquery.colorbox.min.js', function(){

            /* 用途別colorbox実行スクリプト */
            $('.group1').colorbox({

                rel:            'group1',
                transition:     'fade',
                slideshow:      false,

                fixed:          true,
                maxWidth:       '90%',
                maxHeight:      '90%',
                reposition:     true,
                opacity:        '0.3',

                retinaImage:    false,
                retinaUrl:      false

            });

            $('.group2').colorbox({

                rel:            'group2',
                transition:     'fade',
                slideshow:      false,

                fixed:          true,
                maxWidth:       '90%',
                maxHeight:      '90%',
                reposition:     true,
                opacity:        '0.3',

                retinaImage:    false,
                retinaUrl:      false

            });

            /* オプション */
            $('.ajax').colorbox();

            $('.youtube').colorbox({

                iframe:         true,
                innerWidth:     640,
                innerHeight:    390

            });

            $('.vimeo').colorbox({

                iframe:         true,
                innerWidth:     500,
                innerHeight:    409

            });

            $('.iframe').colorbox({

                iframe:         true,
                width:          '80%',
                height:         '80%'

            });

            $('.inline').colorbox({

                inline:         true,
                width:          '50%'

            });

            $('.callbacks').colorbox({

                onOpen:     function() {
                    alert('onOpen: colorbox is about to open');
                },
                onLoad:     function() {
                    alert('onLoad: colorbox has started to load the targeted content');
                },
                onComplete: function() {
                    alert('onComplete: colorbox has displayed the loaded content');
                },
                onCleanup:  function() {
                    alert('onCleanup: colorbox has begun the close process');
                },
                onClosed:   function() {
                    alert('onClosed: colorbox has completely closed');
                }

            });

            $('.non-retina').colorbox({

                rel:            'group5',
                transition:     'none'

            })

            $('.retina').colorbox({

                rel:            'group5',
                transition:     'none',
                retinaImage:    true,
                retinaUrl:      true

            });

            /* inlineで呼び出すcolorbox実行スクリプト例 */
            $('#click').on('click', function() {

                $('#click').css({

                    'background-color': '#f00',
                    'color':            '#fff',
                    'cursor':           'inherit'

                }).text("Open this window again and this message will still be here.");
                return false;

            });

        });

    }


    if (header_navi_1st.length || header_navi_1st_none.length) {
        colorbox('./');
    }

    else if (header_navi_2nd.length) {
        colorbox('../');
    }

    else if (header_navi_3rd.length) {
        colorbox('../../');
    }




/* Lightbox ここまで
------------------------------------------------------------------------------*/




/* Form
------------------------------------------------------------------------------*/




    // フォームサブミットの判定 //
    var form_submit_on_ja   = $('input#btn-confirm-on-ja');
    var form_submit_on_en   = $('input#btn-confirm-on-en');




    /* Validate
    ------------------------------------------------------------------------------*/




        // Submitを押したときのバリデート判定 Jp:日本語  //
        form_submit_on_ja.on('click', function() {

            /* エラー判定 */
            $('#inquiry-form-jp').validate({

                ignore: '.ignore',
                rules: {

                    inquiryListJp : {
                        required:   true
                    },
                    inquiryCompanyNameJp : {
                        required:   true
                    },
                    inquiryNameJaJp : {
                        required:   true,
                        kana:       true
                    },
                    inquiryNameEnJp : {
                        required:   true,
                        alphabet:   true
                    },
                    inquiryMailJp : {
                        required:   true,
                        alphabet:   true,
                        email:      true
                    },
                    inquiryTextJp : {
                        required:   true
                    }

                },
                messages: {

                    inquiryListJp : {
                        required:   '※お問い合わせ内容をお選び下さい。'
                    },
                    inquiryCompanyNameJp : {
                        required:   '※必須項目です。'
                    },
                    inquiryNameJaJp : {
                        required:   '※必須項目です。',
                        kana:       '※全角文字で入力して下さい。'
                    },
                    inquiryNameEnJp : {
                        required:   '※必須項目です。',
                        alphabet:   '※半角英数で入力して下さい。'
                    },
                    inquiryMailJp : {
                        required:   '※必須項目です',
                        alphabet:   '※半角英数で入力して下さい。',
                        email:      '※メールアドレスを入力してください。'
                    },
                    inquiryTextJp : {
                        required:   '※必須項目です。'
                    }

                }

            });


            /* エラーが出た箇所へ飛ぶ */
            function validateScrollJp(i) {

                var caseArr = i ;

                switch (caseArr) {

                    case 'inquiry-list-jp' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-list-jp');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-companyName-jp' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-companyName-jp');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-nameJa-jp' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-nameJa-jp');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-nameEn-jp' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-nameEn-jp');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-mail-jp' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-mail-jp');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-text-jp' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-text-jp');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                }

            }


            var inquiryListJp           = $('input#form-inquiryList-jp')
            var inquiryCompanyNameJp    = $('input#form-inquiryCompanyName-jp')
            var inquiryNameJaJp         = $('input#form-inquiryNameJa-jp')
            var inquiryNameEnJp         = $('input#form-inquiryNameEn-jp')
            var inquiryMailJp           = $('input#form-inquiryMail-jp')
            var inquiryTextJp           = $('textarea#form-inquiryText-jp')


            if (inquiryListJp.val() === '') {
                validateScrollJp('inquiry-list-jp');
            }

            else if (inquiryCompanyNameJp.val() === '') {
                validateScrollJp('inquiry-companyName-jp');
            }

            else if (inquiryNameJaJp.val() === '') {
                validateScrollJp('inquiry-nameJa-jp');
            }

            else if (inquiryNameEnJp.val() === '') {
                validateScrollJp('inquiry-nameEn-jp');
            }

            else if (inquiryMailJp.val() === '') {
                validateScrollJp('inquiry-mail-jp');
            }

            else if (inquiryTextJp.val() === '') {
                validateScrollJp('inquiry-text-jp');
            }

        });


        // Submitを押したときのバリデート判定 En:英語  //
        form_submit_on_en.on('click', function() {

            /* エラー判定 */
            $('#inquiry-form-en').validate({

                ignore: '.ignore',
                rules: {

                    inquiryListEn : {
                        required:   true
                    },
                    inquiryCompanyNameEn : {
                        required:   true
                    },
                    inquiryNameEnEn : {
                        required:   true,
                        alphabet:   true
                    },
                    inquiryMailEn : {
                        required:   true,
                        alphabet:   true,
                        email:      true
                    },
                    inquiryTextEn : {
                        required:   true
                    }

                },
                messages: {

                    inquiryListEn : {
                        required:   '*Please select.'
                    },
                    inquiryCompanyNameEn : {
                        required:   '*Please enter your company name.'
                    },
                    inquiryNameEnEn : {
                        required:   '*Please enter your name.'
                    },
                    inquiryMailEn : {
                        required:   '*Please enter your e-mail address.',
                        alphabet:   '*Please enter the alphabet.',
                        email:      '*Your e-mail address is incorrect.'
                    },
                    inquiryTextEn : {
                        required:   '*Please enter xxx.'
                    }

                }

            });


            /* エラーが出た箇所へ飛ぶ */
            function validateScrollEn(i) {

                var caseArr = i ;

                switch (caseArr) {

                    case 'inquiry-list-en' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-list-en');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-companyName-en' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-companyName-en');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-nameEn-en' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-nameEn-en');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-mail-en' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-mail-en');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-text-en' :

                        /* アンカーの判定 */
                        var target = $('#inquiry-text-en');

                        /* アンカーリンクへスクロール */
                        target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                }

            }


            var inquiryListEn           = $('input#form-inquiryList-en')
            var inquiryCompanyNameEn    = $('input#form-inquiryCompanyName-en')
            var inquiryNameEnEn         = $('input#form-inquiryNameEn-en')
            var inquiryMailEn           = $('input#form-inquiryMail-en')
            var inquiryTextEn           = $('textarea#form-inquiryText-en')


            if (inquiryListEn.val() === '') {
                validateScrollEn('inquiry-list-en');
            }

            else if (inquiryCompanyNameEn.val() === '') {
                validateScrollEn('inquiry-companyName-en');
            }

            else if (inquiryNameEnEn.val() === '') {
                validateScrollEn('inquiry-nameEn-en');
            }

            else if (inquiryMailEn.val() === '') {
                validateScrollEn('inquiry-mail-en');
            }

            else if (inquiryTextEn.val() === '') {
                validateScrollEn('inquiry-text-en');
            }

        });




    /* Validate ここまで
    ------------------------------------------------------------------------------*/




    /* MailForm
    ------------------------------------------------------------------------------*/




        // 同意する //
        function mailFormInputAbled(i) {

            var caseArr = i ;

            /* フォームサブミットの判定  */
            var form_submit_on_ja   = $('input#btn-confirm-on-ja');
            var form_submit_on_en   = $('input#btn-confirm-on-en');
            var form_reset_on_ja    = $('input#btn-reset-on-ja');
            var form_reset_on_en    = $('input#btn-reset-on-en');

            var form_submit_off_ja  = $('input#btn-confirm-off-ja');
            var form_submit_off_en  = $('input#btn-confirm-off-en');
            var form_reset_off_ja   = $('input#btn-reset-off-ja');
            var form_reset_off_en   = $('input#btn-reset-off-en');

            switch (caseArr) {

                case 'on' :

                    /* ボタンのdisabledを取る  */
                    form_submit_off_ja.attr('id', 'btn-confirm-on-ja').attr('disabled', false);
                    form_submit_off_en.attr('id', 'btn-confirm-on-en').attr('disabled', false);
                    form_reset_off_ja.attr('id', 'btn-reset-on-ja').attr('disabled', false);
                    form_reset_off_en.attr('id', 'btn-reset-on-en').attr('disabled', false);
                    return false;
                    break;

                case 'off' :

                    /* ボタンのdisabledを付与する  */
                    form_submit_on_ja.attr('id','btn-confirm-off-ja').attr('disabled', true);
                    form_submit_on_en.attr('id','btn-confirm-off-en').attr('disabled', true);
                    form_reset_on_ja.attr('id','btn-reset-off-ja').attr('disabled', true);
                    form_reset_on_en.attr('id','btn-reset-off-en').attr('disabled', true);
                    return false;
                    break;

            }

        }


        // 入力内容を消す //
        function mailFormInputReset() {

            /* input、label、pの値を設定 */
            var form_label_error    = $('label.error');
            var form_p_html         = $('p#form-inquiryListDisplay-jp, p#form-inquiryListDisplay-en');
            var form_input_val      = $('input#form-inquiryList-jp, input#form-inquiryList-en','input:text', 'input:checked', 'textarea');
            var form_accept         = $('#accept-ja, #accept-en');

            /* バリデート注意文言を消す */
            form_label_error.html('').hide();

            /* サジェスト部分の注意文言及び以下の値を消す
                [input type='hidden']
                [input type='text']
                [textarea]                       */
            form_p_html.html('');
            form_input_val.val('');

            /* 同意するボタン内の値を消す */
            form_accept.attr('checked', false);

            /* 同意ボタンにチェックが入っているか否かでのリセット、確認ボタンの動作 */
            mailFormInputAbled('off');

            /* リセットボタン押したらページトップへ飛ぶ */
            var target = $('#form');

            target.velocity('scroll', {
                duration:   500,
                easing:     'easeOutExpo'
            });
            return false;

        }


        // リセットボタンを押したときの動作 //
        $('input#btn-reset-on-ja, input#btn-reset-on-en').on('click', function() {
            mailFormInputReset();
        });


        // 同意ボタンを押したときのリセット、確認ボタンの動作 //
        /*  デフォルト */
        mailFormInputAbled('off');

        /*  同意する */
        $('#accept-ja,#accept-en').on('click', function() {

             /*  同意するにチェックが入っている場合 */
            if ($('#accept-ja:checked,#accept-en:checked').length === 1) {
                mailFormInputAbled('on');
            }

            /*  同意するにチェックが入っていない場合 */
            else {
                mailFormInputAbled('off');
            }

        }).css('cursor','pointer');


        // 戻るボタンを押したときの動作 //
        $('input#btn-formback-ja, input#btn-formback-en').on('click', function() {
            location.href='index.html'
        });


        // SPとPCでとび先を変える //
        $(window).on('load', function() {

            /* -SP- */
            if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {
                $('.policy').on('click', function() {
                    // location.href='../sitepolicy/index.html'
                    // window.open('../sitepolicy/index.html', '_blank');
                    return false;
                });
            }

            /* -PC- */
            else {
                $('.policy').on('click', function() {
                    // location.href='../../#/sitepolicy/'
                    // window.open('../../#/sitepolicy/', '_blank');
                    return false;
                });
            }

        });




    /* MailForm ここまで
    ------------------------------------------------------------------------------*/




/* Form ここまで
------------------------------------------------------------------------------*/




/* Suggest
------------------------------------------------------------------------------*/




    // サジェスト -PC- //
    function suggestOnPC() {

        /* マウスカーソルがセレクターの上に乗ったらサジェストを出す */
        $('.suggest-pc').on({

            /* マウスオン */
            'mouseenter': function() {
                $('#suggest-jp, #suggest-en').fadeIn();
            },

            /* マウスアウト */
            'mouseleave': function() {
                $('#suggest-jp, #suggest-en').fadeOut();
            }

        });

    }


    // サジェスト -SP- //
    function suggestOnSP() {

        /* タッチがサジェストの上に乗った時の判定 */
        $('#form-inquiryListDisplay-jp, #form-inquiryListDisplay-en').on('click', function() {

            /* サジェストクリアゾーンを出す */
            $('#suggest-jp, #suggest-en').fadeIn();
            $('.suggest-clear').show();

            /* サジェストクリアゾーンが全面に出るように設定 */
            var window_width = $(window).width();
            var window_height = $(window).height();
            $('.suggest-clear').css({
                'width':    window_width,
                'height':   window_height,
            });

        });

        /* タッチがサジェストクリアゾーンの上に乗った時の動作 */
        $('.suggest-clear').on('click', function() {
            $('#suggest-jp, #suggest-en').fadeOut();
            $('.suggest-clear').hide();
        });

    }


    // サジェストオフ -共通- //
    function suggestOff() {

        /* セレクター内のテキストをクリックした時の動作 */
        $('#suggest-jp, #suggest-en').on('click', function() {
            $('#suggest-jp, #suggest-en').fadeOut();
            $('.suggest-clear').hide();
        });

    }


    // サジェスト動作 -En:英語 / Jp:日本語- //
    // サジェスト外がクリッカブルになる為のサジェストクリアゾーン -初期設定: hidden- //
    $('.suggest-clear').hide();

    $(window).on('load resize', function() {

        /* サジェストを出す -SP- */
        if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {
            suggestOnSP();
        }

        /* サジェストを出す -PC- */
        else {
            suggestOnPC();
        }

        suggestOff();

    });


    // サジェスト内のお問い合わせ事項テキストを値として読み込む  //
    var suggestBusinessJp   = $('#menu-jp1').text();
    var suggestRecruitJp    = $('#menu-jp2').text();
    var suggestCreativeJp   = $('#menu-jp3').text();
    var suggestPersonalJp   = $('#menu-jp4').text();
    var suggestOtherJp      = $('#menu-jp5').text();

    var suggestBusinessEn   = $('#menu-en1').text();
    var suggestRecruitEn    = $('#menu-en2').text();
    var suggestCreativeEn   = $('#menu-en3').text();
    var suggestPersonalEn   = $('#menu-en4').text();
    var suggestOtherEn      = $('#menu-en5').text();


    function suggestMenu(i) {

        var caseArr = i ;

        switch (caseArr) {

            case 'menu1' :

                $('#form-inquiryList-jp').val(suggestBusinessJp);
                $('#form-inquiryListDisplay-jp').html(suggestBusinessJp);
                $('#form-inquiryList-en').val(suggestBusinessEn);
                $('#form-inquiryListDisplay-en').html(suggestBusinessEn);
                break;

            case 'menu2' :

                $('#form-inquiryList-jp').val(suggestRecruitJp);
                $('#form-inquiryListDisplay-jp').html(suggestRecruitJp);
                $('#form-inquiryList-en').val(suggestRecruitEn);
                $('#form-inquiryListDisplay-en').html(suggestRecruitEn);
                break;

            case 'menu3' :

                $('#form-inquiryList-jp').val(suggestCreativeJp);
                $('#form-inquiryListDisplay-jp').html(suggestCreativeJp);
                $('#form-inquiryList-en').val(suggestCreativeEn);
                $('#form-inquiryListDisplay-en').html(suggestCreativeEn);
                break;

            case 'menu4' :

                $('#form-inquiryList-jp').val(suggestPersonalJp);
                $('#form-inquiryListDisplay-jp').html(suggestPersonalJp);
                $('#form-inquiryList-en').val(suggestPersonalEn);
                $('#form-inquiryListDisplay-en').html(suggestPersonalEn);
                break;

            case 'menu5' :

                $('#form-inquiryList-jp').val(suggestOtherJp);
                $('#form-inquiryListDisplay-jp').html(suggestOtherJp);
                $('#form-inquiryList-en').val(suggestOtherEn);
                $('#form-inquiryListDisplay-en').html(suggestOtherEn);
                break;

            default :

                break;

        }

    }


    // テキストの値をinput#inquiryListへ与える  //
    $('#menu-jp1, #menu-en1').on('mouseover', function() {
        suggestMenu('menu1');
    });

    $('#menu-jp2, #menu-en2').on('mouseover', function() {
        suggestMenu('menu2');
    });

    $('#menu-jp3, #menu-en3').on('mouseover', function() {
        suggestMenu('menu3');
    });

    $('#menu-jp4, #menu-en4').on('mouseover', function() {
        suggestMenu('menu4');
    });

    $('#menu-jp5, #menu-en5').on('mouseover', function() {
        suggestMenu('menu5');
    });




/* Suggest ここまで
------------------------------------------------------------------------------*/




/* LanguageChange
------------------------------------------------------------------------------*/




    // ブラウザの設定言語から言語判定をとり、そこから日本語表示か英語表示か切り替える //
    function browserLanguage() {

        try {
            return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2) == 'ja' ? 'ja' : 'en';
        }

        catch(e) {
            return undefined;
        }

    }
    var settinglang = browserLanguage();


    // グローバルナビのUIから言語判定をとり、そこから日本語表示か英語表示か切り替える -PC- //
    function showLanguagePC(i) {

        var langArr = i ;

        /* コンテンツ判定 */
        var ja = $('#ja');
        var en = $('#en');

        switch (langArr) {

            case 'ja' :

                /* Cookie判定 */
                $.cookie('lang', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                ja.fadeIn().show();
                en.fadeOut().hide();
                break;

            case 'en' :

                /* Cookie判定 */
                $.cookie('lang', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_ja', { path: '/' });

                /* IDを切り替え */
                en.fadeIn().show();
                ja.fadeOut().hide();
                break;

            default :

                /* Cookie判定 */
                $.cookie('lang', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                ja.fadeIn().show();
                en.fadeOut().hide();
                break;

        }

    }


    // グローバルナビのUIから言語判定をとり、そこから日本語表示か英語表示か切り替える -SP- //
    function showLanguageSP(i) {

        var langArr = i ;

        /* コンテンツ判定 */
        var ja = $('#ja');
        var en = $('#en');

        switch (langArr){

            case 'ja' :

                /* Cookie判定 */
                $.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                ja.fadeIn().show();
                en.fadeOut().hide();

                /* Classを切り替え */
                $('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
                $('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');
                break;

            case 'en' :

                /* Cookie判定 */
                $.cookie('lang_en', langArr , { expires: 365 , path: '/' });
                $.removeCookie('lang_ja', { path: '/' });

                /* IDを切り替え */
                en.fadeIn().show();
                ja.fadeOut().hide();

                /* Classを切り替え */
                $('.language-list li.btn-en').removeClass('btn-en').addClass('btn-en-active');
                $('.language-list li.btn-ja-active').removeClass('btn-ja-active').addClass('btn-ja');
                break;

            default :

                /* Cookie判定 */
                $.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                ja.fadeIn().show();
                en.fadeOut().hide();

                /* Classを切り替え */
                $('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
                $('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');
                break;

        }

    }


    // デフォルトの表示 -lang_ja:和文 / lang_en:英文- //
    var lang_ja = $.cookie('lang_ja');
    var lang_en = $.cookie('lang_en');

    if (lang_ja) {
        showLanguagePC('ja');
        showLanguageSP('ja');
    }

    else if (lang_en) {
        showLanguagePC('en');
        showLanguageSP('en');
    }

    else {
        showLanguagePC();
        showLanguageSP();
    }


    // 切り替えた時の表示 //
    $('#jaBtn').on('click', function() {
        showLanguagePC('ja');
        showLanguageSP('ja');
    });

    $('#enBtn').on('click', function() {
        showLanguagePC('en');
        showLanguageSP('en');
    });




/* LanguageChange ここまで
------------------------------------------------------------------------------*/




/* SNSAPI
------------------------------------------------------------------------------*/




    // Twitter-Facebook //
    function popupLink(type, _self) {

        var href,
            windowname;

        if (type === 'twitter') {
            href        = 'http://twitter.com/share?original_referer=http://wwww.test.jp/&textテキストが入ります。&url=http://wwww.test.jp/';
            windowname  = 'twitterwindow';
        }

        else if (type === 'facebook') {
            href        = 'http://www.facebook.com/share.php?u=http://www.test.jp/';
            windowname  = 'facebookwindow';
        }

        window.open(href, windowname, 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
        return false;

    }




/* SNSAPI ここまで
------------------------------------------------------------------------------*/




/* Kerning / Centering Adjust
------------------------------------------------------------------------------*/




    /* Kerning
    ----------------------------------------------------*/


    /*Attention
    ----------------------------------------------------------------------------------------------------

    ※約物含めたリンク箇所でのカーニング指定を行うと挙動がおかしくなる
    　→約物を記号化、前後に半角スペースを入れる事で対応
      例）<a href="javascript:void(0)" class="policy"> &#12300;個人情報の取り扱いについて&#12301; </a>

    ----------------------------------------------------------------------------------------------------
    */


    function kerningDir(rootDir) {

        /* JSONデータ読み込み - 非同期通信するためgetJSONで読み出すこと - */
        return $.getJSON(rootDir + 'ajax/kerning.json', function(data) {

            /* カーニング実行スクリプト setTimeoutで遅延読み込み */
            setTimeout(function() {

                /* 中にテキストが入るタグの判定 divは含まれない */
                var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl.column dt, dl.column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

                /* JSONのデータを基にカーニングを実行 */
                tag.kerning({
                    'data': data
                });

            }, 100);

        });

    }


    if (header_navi_1st.length || header_navi_1st_none.length) {
        kerningDir('./');
    }

    else if (header_navi_2nd.length) {
        kerningDir('../');
    }

    else if (header_navi_3rd.length) {
        kerningDir('../../');
    }




    /* Centering
    ----------------------------------------------------*/


    function centering() {

        var box                 = $('.centerParentWrapper');
        var fixed_container     = $('#fixed-container');
        var padding             = parseInt(box.css('padding-top')) + parseInt(box.css('padding-bottom'));
        var margin              = 50;
        var min_height          = box.height() + padding + footer.height() + margin;


        if( window_inner_height < min_height ) {
            fixed_container.css({
                'position' : 'relative'
            });
        }

        else {
            fixed_container.css({
                'position' : 'fixed'
            });
        }

        fixed_container.css({
            'height' : window_inner_height + 'px'
        });

        fixed_container.css({
            'height' : window_inner_height - 30 + 'px'
        });

    }


    $(window).on('load resize', function() {
        centering();
    }).trigger('resize');




/* Centering / Kerning Adjust ここまで
------------------------------------------------------------------------------*/




/* Device Adjust
------------------------------------------------------------------------------*/




    // SP版とPC版でレイアウトを変える  //
    /* ブレークポイントの設定 */
    $(window).setBreakpoints({

        distinct: true,
        breakpoints: [ 1, 945 ]

    });


    /* ブレークポイント945の時 */
    $(window).on('enterBreakpoint945', function() {

        /* PC用画像ソースフォルダに切り替える */
        $('.img-response').each(function() {
            $(this).attr('src', $(this).attr('src').replace('sp', 'pc'));
        });

        $('#form-layout-jp').each(function() {
            $(this).attr('class', $(this).attr('class').replace('sp', 'pc'));
            $('.colon').show();
            $('dl.form-pc dd').css({
                'width': 400 + 'px'
            });
        });

        $('#suggest').each(function() {
            $(this).attr('class', $(this).attr('class').replace('sp', 'pc'));
        });

    });


    /* ブレークポイント1の時 */
    $(window).on('enterBreakpoint1', function() {

        /* SP用画像ソースフォルダに切り替える */
        $('.img-response').each(function() {
            $(this).attr('src', $(this).attr('src').replace('pc', 'sp'));
        });

        $('#form-layout-jp').each(function() {
            $(this).attr('class', $(this).attr('class').replace('pc', 'sp'));
            $('.colon').hide();
            $('dl.form-sp dd').css({
                'width': 400 / 400 * 100 + '%'
            });

        });

        $('#suggest').each(function() {
            $(this).attr('class', $(this).attr('class').replace('pc', 'sp'));
        });

    });


    // Android対策 -横向きで微妙にずれる- //
    var portraitWidth,landscapeWidth;

    $(window).on('load resize', function() {

        /* iPhone, iPadなど */
        if ((user_agent.indexOf('iPhone') > 0 && user_agent.indexOf('iPad') == -1) || user_agent.indexOf('iPod') > 0) {
            $('html').css({
                'zoom': 1
            });
        }

        /* Android */
        else if (user_agent.indexOf('Android') > 0) {

            /* 傾き（ポートレイトかランドスケープか）を判定 */
            if ('object' === typeof window.onorientationchange) {

                window.addEventListener('orientationchange', function() {

                    /* ランドスケープ */
                    if (window.innerHeight > window.innerWidth) {
                        $('html').css({
                            'zoom': landscapeWidth / 320
                        });
                    }

                    /* ポートレイト */
                    else {
                        $('html').css({
                            'zoom': portraitWidth / 320
                        });
                    }

                }, false);

            }

        }

    }).trigger('resize');




/* Device Adjust ここまで
------------------------------------------------------------------------------*/




})((this || 0).self || global);