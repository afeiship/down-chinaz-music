let fs = require('fs');
let cheerio = require('cheerio');
let superagent = require('superagent');
let co = require('co');
let pageUrls = [
    'http://sc.chinaz.com/yinxiao/PianTouYinXiao.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_2.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_3.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_4.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_5.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_6.html',
];

let targetMusicUrls = [];



//http://sc.chinaz.com/yinxiao/PianTouYinXiao_2.html

let getPageUrl = co.wrap(function* () {
    return yield superagent
        .get(url)
        .end(function (err, res) {
            let targetUrls = [];
            let $ = cheerio.load(res.text);
            console.log($('.music_block').length)

            $('.music_block').each(function (index, val) {
                targetUrls.push(
                    $(val).find('.z a').attr('href')
                );
            });

            return new Promise().resolve({targetUrls});
        });
});


co(function* () {
    let urls = yield this.getPageUrl();
    console.log(urls);
})


// pageUrls.forEach(function (url) {
//     superagent
//         .get(url)
//         .end(function (err, res) {
//             var $ = cheerio.load(res.text);
//             console.log($('.music_block').length)

//             $('.music_block').each(function (index, val) {
//                 targetUrls.push(
//                     $(val).find('.z a').attr('href')
//                 );
//             });



//             //抓取具体的页面：
//             // targetUrls.forEach(function (url) {
//             //     superagent
//             //         .get(url)
//             //         .end(function (err, res2) {
//             //             $ = cheerio.load(res2.text);
//             //             targetMusicUrls.push(
//             //                 $('.downbody .dian')[1].find('a').attr('href')
//             //             );
//             //         })
//             // })
//             //console.log($('.music_block').length)
//             //console.log($('.music_block .z a').attr('href'))
//         })
// })
