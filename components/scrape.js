// import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import {load} from 'cheerio';
import PromptNew from "./model.js";
import axios from "axios";
// import puppeteer from "puppeteer";

export default async function DataScraper(url){

    const imagefallbackurl='https://media.istockphoto.com/id/1409309637/vector/breaking-news-label-banner-isolated-vector-design.jpg?s=612x612&w=0&k=20&c=JoQHezk8t4hw8xXR1_DtTeWELoUzroAevPHo0Lth2Ow='
    const articletitle = url.title;
    const articlesnippet = url.snippet;
    const articledate = url.date;
    const articlesource = url.source;
    const articlelink = url.link;
    const articleimage = url.imageUrl || imagefallbackurl;
//     const loader = new PuppeteerWebBaseLoader(url.link, {
//         launchOptions: {
//             executablePath: puppeteer.executablePath(), // Adjust to your system
//             args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         },
//       });
  // const docs = await loader.scrape();
  const {data} = await axios.get(url.link,{
    headers:{
      'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome 91.0.4472.124 Safari/537.36'
    }
  });
    const $ = load(data);
    const h1Text = $('h1').text(); // Extracts text between <h1> tags
    const pTagsText = $('p').map((i, el) => $(el).text()).get(); // Extracts text from all <p> tags
    const summarised = await PromptNew('Give me a JSON output with summary of category of topic discussed,use only summary and category as keys in json ,summarise this in 30 words and dont add any remarks of yours or anything:'+pTagsText);
    return {h1Text,summarised,articletitle,articlesnippet,articlelink,articledate,articlesource,articleimage}

 
 
  }
  
