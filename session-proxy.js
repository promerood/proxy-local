const express = require("express");
const cors = require("cors");
const axios = require("axios");
const url = require("url");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 8082;

// Function to read cookies from file
function loadCookies() {
  try {
    const cookiesPath = path.join(__dirname, 'cookies.txt');
    return fs.readFileSync(cookiesPath, 'utf8').trim();
  } catch (error) {
    console.error('Error reading cookies file:', error.message);
    return '';
  }
}

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.all("/proxy", async (req, res) => {
  try {
    const parsedUrl = url.parse(req.originalUrl, true);
    let targetUrl = parsedUrl.query.url;

    if (!targetUrl) {
      return res.status(400).json({error: "Missing url parameter"});
    }

    if (
      parsedUrl.search &&
      parsedUrl.search.includes("&") &&
      parsedUrl.search.length > parsedUrl.search.indexOf("&") + 1
    ) {
      const remainingParams = parsedUrl.search.slice(
        parsedUrl.search.indexOf("&") + 1
      );
      const separator = targetUrl.includes("?") ? "&" : "?";
      targetUrl += separator + remainingParams;
    }

    const COOKIES = loadCookies();
    console.log("Target URL:", targetUrl);
    console.log("Injecting cookies:", COOKIES.substring(0, 100) + "...");

    const headersToForward = {...req.headers};
    delete headersToForward["host"];
    delete headersToForward["content-length"];
    delete headersToForward["connection"];
    delete headersToForward["origin"];
    delete headersToForward["referer"];

    const targetOrigin = new URL(targetUrl).origin;

    const response = await axios({
      method: req.method,
      url: targetUrl,
      headers: {
        ...headersToForward,
        Cookie: COOKIES,
        Host: new URL(targetUrl).hostname,
        Referer: targetOrigin + "/",
        Origin: targetOrigin,
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
      },
      data: req.body,
      validateStatus: null,
      maxRedirects: 0,
    });

    const headersToExclude = [
      "content-encoding",
      "transfer-encoding",
      "connection",
      "keep-alive",
    ];

    Object.entries(response.headers).forEach(([key, value]) => {
      if (!headersToExclude.includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Expose-Headers", "*");

    res.status(response.status).send(response.data);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({
      error: error.message,
      details: "Proxy error - verify that the URL is valid",
    });
  }
});

app.get("/health", (req, res) => {
  res.json({status: "OK", message: "Proxy server is running"});
});

app.listen(port, () => {
  console.log(`CORS Proxy server running on port ${port}`);
  console.log(`Use: http://localhost:${port}/proxy?url=[url]`);
});