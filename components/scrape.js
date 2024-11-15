import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import {load} from 'cheerio';


  export default async function DataScraper(url){
    const loader = new PuppeteerWebBaseLoader(url, {
        // required params = ...
        // optional params = ...
      });
  const docs = await loader.scrape();
  const $ = load(JSON.stringify(docs));
  const h1Text = $('h1').text(); // Extracts text between <h1> tags
  const pTagsText = $('p').map((i, el) => $(el).text()).get(); // Extracts text from all <p> tags
  return {h1Text,pTagsText}
  }
  
