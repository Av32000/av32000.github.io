import fs from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputPdfPath = path.join(projectRoot, "out/portfolio.pdf");
const ignoreIds = [2, 5];

async function exportToPdf() {
  const projectsPath = path.join(projectRoot, "data", "projects.js");
  const projectsCode = await fs.readFile(projectsPath, "utf-8");
  const projectIds = [...projectsCode.matchAll(/id:\s*(\d+)/g)]
    .map((match) => match[1])
    .sort((a, b) => a - b)
    .filter((id) => !ignoreIds.includes(parseInt(id)));

  console.log("Starting Vite server...");
  const server = await createServer({
    root: projectRoot,
    server: {
      port: 0,
    },
    logLevel: "silent",
  });

  await server.listen();
  const address = server.httpServer.address();
  const port = address.port;
  const url = `http://localhost:${port}`;

  console.log(`Server listening at ${url}`);

  console.log("Launching Puppeteer...");
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();
    const mergedPdf = await PDFDocument.create();

    let projectsPaths = projectIds.map(
      (id) => `/projects/details.html?id=${id}`,
    );

    const routes = [
      "/",
      `/projects.html?order=${projectIds.join(",")}&ids=${ignoreIds.map((id) => -id).join(",")}`,
      ...projectsPaths,
      "/contact.html",
    ];

    for (const route of routes) {
      const pageUrl = `${url}${route}`;
      console.log(`Navigating to ${pageUrl}...`);
      await page.goto(pageUrl, { waitUntil: "networkidle0" });

      console.log(`Generating PDF for ${route}...`);

      const pdfOptions = {
        format: "a3",
        printBackground: true,
        landscape: true,
      };

      if (route === "/") {
        pdfOptions.pageRanges = "1,3";
      }

      const pdfBuffer = await page.pdf(pdfOptions);

      const pagePdf = await PDFDocument.load(pdfBuffer);
      const copiedPages = await mergedPdf.copyPages(
        pagePdf,
        pagePdf.getPageIndices(),
      );
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    console.log("Saving merged PDF...");
    const mergedPdfBytes = await mergedPdf.save();
    await fs.mkdir(path.dirname(outputPdfPath), { recursive: true });
    await fs.writeFile(outputPdfPath, mergedPdfBytes);

    console.log("PDF exported to portfolio.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    console.log("Cleaning up...");
    await browser.close();
    await server.close();
    process.exit(0);
  }
}

exportToPdf();
