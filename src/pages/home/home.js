const url = "https://phisix-api3.appspot.com/stocks/BPI.json"
const url2 = "https://www.yahoo.com/manifest_desktop_us.json"
const jsonData = '{"stock":[{"name":"Bank of the Philippine Islands","price":{"currency":"PHP","amount":123.40},"percent_change":0.73,"volume":616490,"symbol":"BPI"}],"as_of":"2024-09-14T00:00:00+08:00"}'
var var2

class StockPick {
  // companyName = "Mem Company";
  // tickerCode = "MMC";
  // currentPrice = 12.3;
  // buyBelowPrice = 15.0;
  // intrinsicValuePrice = 21.43;
  // percentChange = -1.3;
  constructor(companyName,
    tickerCode,
    currentPrice,
    buyBelowPrice,
    intrinsicValuePrice,
    percentChange) {
    this._companyName = companyName;
    this._tickerCode = tickerCode;
    this._currentPrice = currentPrice;
    this._buyBelowPrice = buyBelowPrice;
    this._intrinsicValuePrice = intrinsicValuePrice;
    this._percentChange = percentChange;
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

  // Can be only called on class level. StockPick.echo();
  static echo() {
    console.log("Ping");
  }
}


async function abc(url) {
  var resp = await fetch(url);
  var jobj = await resp.json();
  return jobj;
}

// var stock1Data = JSON.parse(jsonData)
// var jobj = abc(url).then((value) => stock1Data = value);
// console.log(stock1Data.stock[0].name);
// var stockData = stock1Data.stock[0];
// const stockDataForDisplay = new StockPick(stockData.name, stockData.symbol, stockData.price.amount, 140.3, 190.2, stockData.percent_change);
// $(".companyName").text(stockDataForDisplay.companyName);
// $(".tickerCode").text(stockDataForDisplay.tickerCode);
// $(".intrinsicValuePrice").text(stockDataForDisplay.intrinsicValuePrice);
// $(".buyBelowPrice").text(stockDataForDisplay.buyBelowPrice);
// $(".currentPrice").text(stockDataForDisplay.currentPrice);

// function createCardContainer() {
//   let cardContainer = $('<div class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8"></div>');
//   cardContainer = cardContainer.append('<div class="overflow-hidden shadow rounded-lg memcard bg-gray-200"></div>');
//   cardContainer = cardContainer.append('<div class="px-4 py-5 lg:p-6"></div>');
// }


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

  let intrinsicValuePriceInCard = $('<div class="intrinsicValuePrice text-sm font-medium leading-5 text-gray-500 truncate"></div>');
  intrinsicValuePriceInCard.text("Intrinsic Value: " + stockDataForDisplay.intrinsicValuePrice);

  let buyBelowPriceInCard = $('<div class="buyBelowPrice text-sm font-medium leading-5 text-gray-500 truncate"></div>');
  buyBelowPriceInCard.text("Buy Below: " + stockDataForDisplay.buyBelowPrice);

  let currentPriceInCard = $('<div class="currentPrice mt-1 text-xl font-semibold leading-9 text-gray-900"></div>');
  currentPriceInCard.text("Price: " + stockDataForDisplay.currentPrice);

  cardParent.append(companyNameInCard);
  cardParent.append(tickerCodeInCard);
  cardParent.append(intrinsicValuePriceInCard);
  cardParent.append(buyBelowPriceInCard);
  cardParent.append(currentPriceInCard);
}

const stockDataForDisplay = [
  new StockPick("Mem Company", "MMC", 133.2, 140.3, 190.2, 3.4),
  new StockPick("Guo Company", "GUO", 133.2, 140.3, 190.2, 3.4),
  new StockPick("KOJC Company", "KOJC", 133.2, 140.3, 190.2, 3.4),
  new StockPick("LIMA Company", "LIMA", 133.2, 140.3, 190.2, 3.4),
  new StockPick("ALPHA Company", "ALPHA", 133.2, 140.3, 190.2, 3.4),
  new StockPick("DELTA Company", "DELTA", 133.2, 140.3, 190.2, 3.4),
];

const mainSection = $("#memCardParent");
let cardContainerParent;

for (i = 0; i < stockDataForDisplay.length; i++) {
  console.log(stockDataForDisplay[i].companyName);
  cardContainerParent = createCompanyNameChild(mainSection);
  updateAndCreateCardDetails(stockDataForDisplay[i], cardContainerParent);
}






// cardContainerChild.append(cardContainerGrandchild);
// cardContainerParent.append(cardContainerChild);

