const request = require('request-promise');
const cheerio = require('cheerio');

const host = 'http://bxjg.circ.gov.cn';
const fixHost = (uri) => {
    if (uri.startsWith('http')) {
        return uri;
    } else if (uri.startsWith('/')) {
        return host + uri;
    } else {
        return `${host}/${uri}`;
    }
};

const spider = async () => {
    const options = {
        uri: fixHost('/web/site0/tab5201/'),
        transform: body => cheerio.load(body)
    };
    return await request(options);
};

spider()
    .then($ => {
        let links = $('a:contains("保险业经营情况表")');
        let uris = [];
        for (let i = 0; i < links.length; i++) {
            uris.push(fixHost(links[i].attribs.href))
        }
        return uris;
    })
    .then(uris => console.log(uris))
    .catch(e => {console.log(e)});

