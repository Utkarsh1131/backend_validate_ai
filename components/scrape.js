import { PuppeteerWebBaseLoader } from "@langchain/community/document_loaders/web/puppeteer";
import {load} from 'cheerio';
import PromptNew from "./model.js";

export default async function DataScraper(url){
    const articletitle = url.title;
    const articlesnippet = url.snippet;
    const articledate = url.date;
    const articlesource = url.source;
    const articleimage = url.imageUrl;
    const loader = new PuppeteerWebBaseLoader(url.link, {
        // required params = ...
        // optional params = ...
      });
  const docs = await loader.scrape();
  const $ = load(JSON.stringify(docs));
  const h1Text = $('h1').text(); // Extracts text between <h1> tags
  const pTagsText = $('p').map((i, el) => $(el).text()).get(); // Extracts text from all <p> tags
  const summarised = await PromptNew('Summarise this in 20 words:'+pTagsText);
  return {h1Text,summarised,articletitle,articlesnippet,articledate,articlesource,articleimage}
  }
  
