let fs = require('fs');
let cheerio = require('cheerio');
let superagent = require('superagent');
var request = require("co-request");
let co = require('co');
var each = require('co-each');
let pageUrls = [
    'http://sc.chinaz.com/yinxiao/PianTouYinXiao.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_2.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_3.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_4.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_5.html',
    // 'http://sc.chinaz.com/yinxiao/PianTouYinXiao_6.html',
];

let targetMusicUrls = [];

function* getPageUrl(inUrl) {
    let urls = [];
    let response = yield request(inUrl);
    let $ = cheerio.load(response.body);
    $('.music_block').each(function (index, val) {
        urls.push(
            $(val).find('.z a').attr('href')
        );
    });
    return urls;
}

co(function* () {
    let urls = yield getPageUrl(pageUrls);

    yield pageUrls.forEach(function*(url){
        urls= urls.concat(yield getPageUrl(url));
    });

    console.log('xx', urls.length)
})



//http://sc.chinaz.com/yinxiao/PianTouYinXiao_2.html

// let getPageUrl = co.wrap(function* () {
//     return yield superagent
//         .get(url)
//         .end(function (err, res) {
//             let targetUrls = [];
//             let $ = cheerio.load(res.text);
//             console.log($('.music_block').length)

//             $('.music_block').each(function (index, val) {
//                 targetUrls.push(
//                     $(val).find('.z a').attr('href')
//                 );
//             });

//             return new Promise().resolve({targetUrls});
//         });
// });


// co(function* () {
//     let urls = yield this.getPageUrl();
//     console.log(urls);
// })


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
