const axios = require('axios');
const cheerio = require('cheerio');

function test() {
    console.log("tips scrapper working");
}




async function getFreeTips(){
    
    try {
        const response = await axios.get('https://betwinner360.com/');
        const html = response.data;
        const $ = cheerio.load(html);
        const todayTips = [];
        const yesterdayTips = [];
        await $('#tabs_desc_7898_2 tbody tr').each((i, row) => {
            const match = {};
            match['Match'] = $(row).find('td[data-label="Match"]').text().trim();
            match['Prediction'] = $(row).find('td[data-label="Prediction"]').text().trim();
            match['Results'] = $(row).find('td[data-label="Results"]').text().trim();
            match['win'] = $(row).attr('id') === 'green' ? true : false;
            yesterdayTips.push(match);
          });

         await $('#tabs_desc_7898_1 tbody tr').each((i, row) => {
            const match1 = {};
            match1['Match'] = $(row).find('td[data-label="Match"]').text().trim();
            match1['Prediction'] = $(row).find('td[data-label="Prediction"]').text().trim();
            match1['Results'] = $(row).find('td[data-label="Results"]').text().trim();
            todayTips.push(match1);
          });
          
        //   console.log(todayTips);
          return {
            todayTips,
            yesterdayTips
          };
    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    test,
    getFreeTips
}