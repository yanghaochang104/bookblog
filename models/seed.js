var mongoose = require('mongoose'),
    Blog = require('./blog'),
    Comment = require('./comment');

var presetblogs = [
    {
        title:'刻意練習',
        image:'https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/075/27/0010752714.jpg&v=59143d4b&w=348&h=348',
        content:'透過學習技巧的研究，我們可以用愈來愈少時間就達到前人的程度、可以用更少的努力就得到比前人更佳的成就。但是想要有某種程度的表現，背後還是有一個閾值，該花的時間和心血還是要花的。如果每個人都能了解這種學習方法並加以實踐，正如作者所說的，到時候世界上將會有多少比例的人達到今天的專家境界？說不定現在在一個領域只有5%能夠達到頂尖，但透過刻意練習法，能將比例大大地提高到50%？說不定那會是人類文明的黃金時期。'
    },{
        title:'拖延心理學',
        image:'https://im1.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/075/16/0010751674.jpg&v=5901c82d&w=348&h=348',
        content:'看完這本書後，我覺得要阻絕拖延，最重要的是認清「理想和現實的自己」以及「正視所有的挫折和困難，把小事都做好就是一件大事」這兩種心態吧。常常我們高估自己，設定過於遠大的目標又想要去完成，造成自己的壓力，因此開始用拖延逃避這個目標；也可能低估自己，覺得自己做不到這件事，不如把時間花在更有成就感的地方，因而拖延去完成它。而要求自己小部分小部分的去跨越每一個階段的障礙，更是打造最終成就的關鍵，無論如何都要對自己有信心，然後去行動。完成一件事的毅力全在於自己多想要它，拖延也絕不是只能用懶惰來解釋的，可能讓我們現在感覺很好，但是有害於我們未來的成長。希望更多人能透過「對拖延的了解」，照著「排除拖延習慣的方法」去執行，在完成生活中所有目標的同時對自己建立更健全的自信心態。'
    },{
        title:'斜槓青年',
        image:'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/076/22/0010762201.jpg&v=5a38f83a&w=348&h=348',
        content:'求學時期，我一直很無法適應「自己只有一種可能：成為專才教育制度下的產品，在大學將自己分到一個科系，並被要求自己要在這個學科裡達到專精，未來也靠這行吃飯」這件事。從高二開始我才開始有了把書唸好以外的夢想，記得當時是想當個學甚麼像甚麼的神手，所以積極參加社團。上了大學也是很不務正業，東摸摸西摸摸，甚麼事都想累積一點經驗值，最後成了一個半調子的人，甚麼都好像碰過卻甚麼都不熟。其實現在回想起來，我在追求的也不是成為所有領域的頂尖，而是追求自己的可能性，儘管現在一事無成，我還是想深深感謝過去那個為各式各樣的事情忙到焦頭爛額，卻為自己始終沒甚麼成就而痛苦了四年，最後不斷逃避面對現實的自己。過去的我造就了我願意嘗試、持續對於萬物抱有好奇心的個性。而現在的我，有了一些關於學習的知識做後盾，該是時候來完成年輕時未竟的夢想了，總覺得當個slash非常地適合我呢。'
    },{
        title:'華頓商學院最受歡迎的談判課',
        image:'https://im2.book.com.tw/image/getImage?i=https://www.books.com.tw/img/001/077/39/0010773987.jpg&v=5a33a475&w=348&h=348',
        content:'剛在軍中看完這本書時，我興致勃勃地去找副連長談關於我的假的事情。連上規定體測有過的人放假前一天1800就可以走，沒過就要放假當天早上0800才可以走。我蒐集了一些「標準」：連上有一些士官、新兵體測沒過還是照放1800；也試著運用「動之以情」的方式：1800可以跟一些比較熟的同梯一起搭車，放0800假我就要自己包車下山要多付很多錢；最後提出自己的交換條件，「用評價不相等的事情交換」：我知道連上最近很忙需要人手，那我希望能透過承接更多業務、做比別人更多的事情來換得放1800假的權力。但是我去找副連長時，講了一大堆之後他說「你覺得問題出在誰身上？你為什麼不過體測就好？」我就知道這個談判應該是不會成立了，接著他又說「這不是我能決定的，要問連長」，我又發現了自己出了一個錯誤，因為我沒有「找到有能力做決定的人」，我浪費時間找了一個沒辦法做決定的人講，接著他跟我說他要幫我跟連長報，想當然最後連長也說「不能這樣換，一事歸一事」。後來想想這是軍中，命令完全沒有轉圜的餘地，人家想怎麼命令就怎麼命令，我也沒多沮喪，因為我知道自己要抱著「不要想要一次全壘打，只要每九場比賽多打出一支安打」的心態，將這次經驗化作下次談判的借鏡。'
    } 
]; 

function seedDB(){
    //remove all blogs
    Blog.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            //add in preset blogs
            console.log('all blogs have been removed !');
                presetblogs.forEach(function(presetblog){
                Blog.create(presetblog, function(err, preBlog){
                    if(err){
                        console.log(err);
                    } else {
                        // add in preset comments for each blog
                        console.log('preblog inserted');
                        Comment.create({
                            author:'Antony',
                            text: 'like the book, it is expensive though'
                        }, function(err, preComment){
                            if(err){
                                console.log(err)
                            } else {
                                preBlog.comments.push(preComment);
                                preBlog.save();
                                console.log('new comment created');
                            }
                        });
                    }
                });
            });  
        }
    });
}

module.exports = seedDB ;