const { log } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");
//blocking synchronus way
// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `this is what we know about avacado: ${textIn}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('file written');

//non-blocking Async

// fs.readFile('./txt/start.txt',"utf-8",(err,data1)=>{
// console.log(data1);
// fs.readFile(`./txt/${data1}.txt`,"utf-8",(err,data2)=>{
// console.log(data2);
// fs.readFile('./txt/append.txt',"utf-8",(err,data3)=>{
// console.log(data3);

// fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,'utf-8',err=>{
//     console.log('your file has been written');
// })
// })
// })
// })
// console.log('will read this');

////////////////
//Server

const replaceTemplate = (temp, product) => {
  let output = temp
    .replace(/{%PRODUCTNAME%}/g, product.productName)
    .replace(/{%IMAGE%}/g, product.image)
    .replace(/{%PRICE%}/g, product.price)
    .replace(/{%FROM%}/g, product.from)
    .replace(/{%NUTRIENTS%}/g, product.nutrients)
    .replace(/{%QUANTITY%}/g, product.quantity)
    .replace(/{%DESCRIPTION%}/g, product.description)
    .replace(/{%ID%}/g, product.id);
  if (!product.organic) {
    output.replace(/{NOT_ORGANIC}/g, "not-organic");
  }
  return output;
};

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

let tempOverview = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);
let tempCard = fs.readFileSync("./templates/template-card.html", "utf-8");

let tempProduct = fs.readFileSync(
  "./templates/template-overview.html",
  "utf-8"
);

const server = http.createServer((req, res) => {
  console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);
  if (pathname == "/" || pathname == "/overview") {
    const cardsHtml = dataObj
      .map((ele) => replaceTemplate(tempCard, ele))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    console.log(cardsHtml);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(output);
  } else if (pathname == "/product") {
    console.log(query);
    console.log(pathname);
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname == "/api") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to req int the port");
});
