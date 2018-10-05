var mongoose = require("mongoose"),
    Blog = require("./blog"),
    Comment   = require("./comment");

var presetBlogs = [
    {
        title:'刻意練習',
        image:'https://valuepartnersblog.files.wordpress.com/2018/01/getimage.jpg?w=616',
        content:'透過學習技巧的研究，我們可以用愈來愈少時間就達到前 人的程度、可以用更少的努力就得到比前人更佳的成就。但是想要有某種程度的表現，背後還是有一個閾值，該花的時間和心血還是要花的。如果每個人都能了解這種學習方法並加以 實踐，正如作者所說的，到時候世界上將會有多少比例的人達到今天的專家境界？說不定現在在一個領域只有5%能夠達到頂尖，但透過刻意練習法，能將比例大大地提高到50%？說不定那會是人類文明的黃金時期吧。',
        author:{
            id:'5bb22ccd9b1f5216b068b119',
            username: 'yanghao'
        }
    },{
        title:'拖延心理學',
        image:'https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/075/16/0010751674.jpg&v=5901c82d&w=348&h=348',
        content:'看完這本書後，我覺得要阻絕拖延，最重要的是認清「理想和現實的自己」以及「正視所有的挫折和困難，把小事都做好就是一件大事」這兩種心態吧。常常我們高估自己，設定過於遠 大的目標又想要去完成，造成自己的壓力，因此開始用拖延逃避這個目標；也可能低估自己，覺得自己做不到這件事，不如把時間花在更有成就感的地方，因而拖延去完成它。而要求 自己小部分小部分的去跨越每一個階段的障礙，更是打造最終成就的關鍵，無論如何都要對自己有信心，然後去行動。完成一件事的毅力全在於自己多想要它，拖延也絕不是只能用懶 惰來解釋的，可能讓我們現在感覺很好，但是有害於我們未來的成長。希望更多人能透過「對拖延的了解」，照著「排除拖延習慣的方法」去執行，在完成生活中所有目標的同時對自己建立更健全的自信心態。',
        author:{
            id:'5bb22ccd9b1f5216b068b119',
            username: "yanghao"
        }
    },{
        title:'斜槓青年',
        image:'https://s.yimg.com/zp/images/26720F3A2D36E2678ADC1D37CE6D384CBB7E5B2B',
        content:'求學時期，我一直很無法適應「自己只有一種可能：成為專才教育制度下的產品，在大學將自己分到一個科系，並被要求自己要在這個學科裡達到專精，未來也靠這行吃飯」這件事。從高二開始我才開始有了把書唸好以外的夢想，記得當時是想 當個學甚麼像甚麼的神手，所以積極參加社團。上了大學也是很不務正業，東摸摸西摸摸，甚麼事都想累積一點經驗值，最後成了一個半調子的人，甚麼都好像碰過卻甚麼都不熟。其 實現在回想起來，我在追求的也不是成為所有領域的頂尖，而是追求自己的可能性，儘管現在一事無成，我還是想深深感謝過去那個為各式各樣的事情忙到焦頭爛額，卻為自己始終沒 甚麼成就而痛苦了四年，最後不斷逃避面對現實的自己。過去的我造就了我願意嘗試、持續對於萬物抱有好奇心的個性。而現在的我，有了一些關於學習的知識做後盾，該是時候來完 成年輕時未竟的夢想了，總覺得當個slash非常地適合我呢。',
        author:{
            id:'5bb22ccd9b1f5216b068b119',
            username: 'yanghao'
        }
    },{
         title:'華頓商學院最受歡迎的談判課',
        image: 'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/077/39/0010773987.jpg&v=5a33a475&w=348&h',
        content:'和別人談判時，首先就是要讓別人聽進去你說的話，否則有滿腹的技巧都是白搭。在你惹對方討厭時、引發對方情緒時，對方都會因為對你這個人的賭爛而降低接收你傳達的資訊的意願。這讓我想起，台灣社會常說的「會不會做人」，人心爽了，就甚麼事都好辦。有一個學長也曾經跟我說「就算你很會做事，如果不會做人，就會沒有事可以做」，因 為那些不喜歡你的人可能會用他們的職權千方百計阻撓你達成目標，只因為你讓他們不爽。不知道在哪裡看到的，但是我一直記得一個道理「千萬不要得罪小人」，就算你是對的，用 正義的理由教訓了小人，但是只要私底下小人出於怨恨搞了甚麼鬼，吃虧的絕對還是你自己。談判的對象是人，因此在談判前要弄清楚目的：我的目標在哪裡？為了達成目標我需要和 這個人建立關係、借助他幫我達成目標，因此要想辦法讓他願意幫我，就盡量不要做些會得罪他人的事。',
        author:{
            id:'5bb22ccd9b1f5216b068b119',
            username: 'yanghao'
        }
    }
    ];
    
function seedDB(){
   //Remove all blogs
   Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("all blogs removed");
        //remove all comments
        Comment.remove({}, function(err){
            if(err){
                console.log(err);
            } else {
                console.log("all comments removed");
                // add in preset blogs
                presetBlogs.forEach(function(presetBlog){
                    Blog.create(presetBlog, function(err, blog){
                        if(err){
                            console.log(err);
                        } else {
                            console.log("presetBlog added");
                            // add in preset comments
                             Comment.create(
                                    {
                                        text: "這期推薦的書都不錯喔～",
                                        author: {
                                            id:"5bb22dfbe6df391af43872bc",
                                            username:"username"
                                        }
                                    }, function(err, comment){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            blog.comments.push(comment);
                                            blog.save();
                                            console.log("comment created");
                                        }
                                    });
                        }
                    });
                });
            }
        });

    }); 
}
 
module.exports = seedDB;
