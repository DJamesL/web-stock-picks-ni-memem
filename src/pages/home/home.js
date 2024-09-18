const url = "https://phisix-api3.appspot.com/stocks/BPI.json"
const pseiApiSourceUrl = "https://phisix-api3.appspot.com/stocks/"
// const jsonData = '{"stock":[{"name":"Bank of the Philippine Islands","price":{"currency":"PHP","amount":123.40},"percent_change":0.73,"volume":616490,"symbol":"BPI"}],"as_of":"2024-09-14T00:00:00+08:00"}'
// const stockListAndBuyBelowSource = 'https://docs.google.com/spreadsheets/d/1qT5CBz3SAYUEolL5hNXLME1Te9B9w3UtaUCKLT6embk';
const sheetId = "1qT5CBz3SAYUEolL5hNXLME1Te9B9w3UtaUCKLT6embk";
const sheetName = encodeURIComponent("Sheet1");
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
var stockListAndBuyBelow
let stock1Data

class StockPick {
  constructor(companyName,
    tickerCode,
    currentPrice,
    buyBelowPrice,
    intrinsicValuePrice,
    percentChange,
    source,
    dividend) {
    this._companyName = companyName;
    this._tickerCode = tickerCode;
    this._currentPrice = currentPrice;
    this._buyBelowPrice = buyBelowPrice;
    this._intrinsicValuePrice = intrinsicValuePrice;
    this._percentChange = percentChange;
    this._source = source;
    this._dividend = dividend;
  }

  get companyName() {
    return this._companyName;
  }
  get tickerCode() {
    return this._tickerCode;
  }
  get currentPrice() {
    return this._currentPrice;
  }
  get buyBelowPrice() {
    return this._buyBelowPrice;
  }
  get intrinsicValuePrice() {
    return this._intrinsicValuePrice;
  }
  get percentChange() {
    return this._percentChange;
  }
  get source() {
    return this._source;
  }
  get dividend() {
    return this._dividend;
  }

  // Can be only called on class level. StockPick.echo();
  static echo() {
    console.log("Ping");
  }
}


async function abc(url) {
  var resp = await fetch(url);
  var jobj = await resp.json();
  // stock1Data = jobj;
  return jobj;
}

function createCompanyNameChild(sectionParent) {
  // let cardContainerParent = $('<div class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8"></div>');
  let cardContainerChild = $('<div></div>');
  cardContainerChild.addClass('overflow-hidden shadow rounded-lg memcard bg-gray-200');
  let cardContainerGrandchild = $('<div></div>');
  cardContainerGrandchild.addClass('px-4 py-5 lg:p-6');

  cardContainerChild.append(cardContainerGrandchild);
  // cardContainerParent.append(cardContainerChild);
  sectionParent.append(cardContainerChild);
  return cardContainerGrandchild;
}

function updateAndCreateCardDetails(stockDataForDisplay, cardParent) {
  let companyNameInCard = $('<div></div>');
  companyNameInCard.addClass('companyName text-sm font-medium leading-5 text-gray-500 truncate');
  companyNameInCard.text(stockDataForDisplay.companyName);

  let tickerCodeInCard = $('<div"></div>');
  tickerCodeInCard.addClass('tickerCode text-sm font-medium leading-5 text-gray-500 truncate');
  tickerCodeInCard.text(stockDataForDisplay.tickerCode);

  let percentChangeInCard = $('<div class="intrinsicValuePrice text-sm font-medium leading-5 truncate"></div>');
  percentChangeInCard.text("Change: " + stockDataForDisplay.percentChange + "%");

  let buyBelowSourceInCard = $('<div class="text-xs text-right font-medium leading-5 text-gray-500 truncate"></div>');
  buyBelowSourceInCard.text("Source: " + stockDataForDisplay.source);

  let dividendInCard = $('<div class="text-xs text-right font-medium leading-5 text-gray-500 truncate"></div>');
  dividendInCard.text("Dividend: " + stockDataForDisplay.dividend + "%");

  if (stockDataForDisplay.percentChange > 0.0) {
    percentChangeInCard.addClass('text-[#4F9B7E]');
  }
  else if (stockDataForDisplay.percentChange < 0.0) {
    percentChangeInCard.addClass('text-[#F0412B]');
  }
  else {
    percentChangeInCard.addClass('text-gray-500');
  }


  let buyBelowPriceInCard = $('<div class="buyBelowPrice text-sm font-medium leading-5 text-gray-500 truncate"></div>');
  buyBelowPriceInCard.text("Buy Below: " + stockDataForDisplay.buyBelowPrice);


  let currentPriceInCard = $('<div class="currentPrice mt-1 text-xl font-semibold leading-9 text-gray-900"></div>');
  currentPriceInCard.text("Price: " + stockDataForDisplay.currentPrice);

  if (stockDataForDisplay.currentPrice < stockDataForDisplay.buyBelowPrice) {
    cardParent.addClass('bg-[#66ebb9]');
  }
  else {
    cardParent.addClass('bg-gray-200');
  }

  cardParent.append(companyNameInCard);
  cardParent.append(tickerCodeInCard);
  cardParent.append(buyBelowPriceInCard);
  cardParent.append(percentChangeInCard);
  cardParent.append(currentPriceInCard);
  cardParent.append(buyBelowSourceInCard);
  cardParent.append(dividendInCard);
}

const stocksUrlForApi = []

const stockDataForDisplay = [
  // new StockPick("Mem Company", "MMC", 133.2, 140.3, 190.2, 3.4),
  // new StockPick("Guo Company", "GUO", 133.2, 140.3, 190.2, 3.4),
  // new StockPick("KOJC Company", "KOJC", 133.2, 140.3, 190.2, 3.4),
  // new StockPick("LIMA Company", "LIMA", 133.2, 140.3, 190.2, 3.4),
  // new StockPick("ALPHA Company", "ALPHA", 133.2, 140.3, 190.2, 3.4),
  // new StockPick("DELTA Company", "DELTA", 133.2, 140.3, 190.2, 3.4),
];

const mainSection = $("#memCardParent");
const loadingSpinner = $("#loadingSpinner");
let cardContainerParent;


const singleStockListAndBuyBelow = {
  name: "NAME",
  buy_below: 10.0
}
var buyBelowPriceList = []
var buyBelowSourceList = []
var dividendPercentList = []

function handleResponse(csvText) {
  let sheetObjects = csvToObjects(csvText);
  stockListAndBuyBelow = sheetObjects;
  for (i = 0; i < sheetObjects.length; i++) {
    stocksUrlForApi.push(pseiApiSourceUrl + sheetObjects[i].TICKER + ".json");
    buyBelowPriceList.push(sheetObjects[i].BUY_BELOW);
    buyBelowSourceList.push(sheetObjects[i].SOURCE_1ST);
    dividendPercentList.push(sheetObjects[i].divi);
  }
  console.log(stocksUrlForApi.length);
}

function csvToObjects(csv) {
  const csvRows = csv.split("\n");
  const propertyNames = csvSplit(csvRows[0]);
  let objects = [];
  for (let i = 1, max = csvRows.length; i < max; i++) {
    let thisObject = {};
    let row = csvSplit(csvRows[i]);
    for (let j = 0, max = row.length; j < max; j++) {
      thisObject[propertyNames[j]] = row[j];
    }
    objects.push(thisObject);
  }
  return objects;
}

function csvSplit(row) {
  return row.split(",").map((val) => val.substring(1, val.length - 1));
}

async function getGoogleSheetData(sheetURL) {
  var response = await fetch(sheetURL);
  var jobj = await response.text();
  var jobj2 = await handleResponse(jobj);
  return jobj2;
}


async function getApiData(stockUrl) {
  var jobj = await abc(stockUrl).then(function (value) {
    stock1Data = value;
  });
}


(async () => {
  await getGoogleSheetData(sheetURL);
  // console.log(stocksUrlForApi.length);
  for (i = 0; i < stocksUrlForApi.length; i++) {
    await getApiData(stocksUrlForApi[i]);
    //   console.log(stock1Data.stock[0].name);
    stockDataForDisplay.push(new StockPick(stock1Data.stock[0].name, stock1Data.stock[0].symbol, stock1Data.stock[0].price.amount,
      buyBelowPriceList[i], 0.0, stock1Data.stock[0].percent_change, buyBelowSourceList[i], dividendPercentList[i]));
  }

  console.log(stock1Data.stock[0].name);
  for (i = 0; i < stockDataForDisplay.length; i++) {
    // console.log(stockDataForDisplay[i].companyName);
    cardContainerParent = createCompanyNameChild(mainSection);
    updateAndCreateCardDetails(stockDataForDisplay[i], cardContainerParent);
  }
  loadingSpinner.remove();
})();