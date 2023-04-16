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
        let latestVipTips = [];
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
            match1['win'] = $(row).attr('id') === 'green' ? true : false;
            todayTips.push(match1);
          });

          await $('tbody tr').not('#tabs_desc_7898_1 *').not('#tabs_desc_7898_2 *').each((i, row) => {
            const match2 = {};
            match2['Match'] = $(row).find('td[data-label="Match"]').text().trim();
            match2['Prediction'] = $(row).find('td[data-label="Prediction"]').text().trim();
            match2['Results'] = $(row).find('td[data-label="Results"]').text().trim();
            match2['win'] = $(row).attr('id') === 'green' ? true : false;
            latestVipTips.push(match2);
          });
          latestVipTips = latestVipTips.filter((item) => item.Match !== '');
          console.log(latestVipTips);
          return {
            todayTips,
            yesterdayTips,
            latestVipTips
          };
    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    test,
    getFreeTips
}