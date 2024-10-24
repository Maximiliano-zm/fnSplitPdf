import { PDFDocument } from "pdf-lib";
const SplitPdf = async (pages, base64) => {
  if (typeof pages !== "number" || typeof base64 !== "string") {
    console.error("Invalid input parameters:", { pages, base64 });
    throw new Error("Invalid input parameters");
  }
  // Decode base64 string
  const pdfBuffer = Buffer.from(base64, "base64");
  // Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  // Get the total number of pages
  const totalPages = pdfDoc.getPageCount();
  if (pages < 0 || pages >= totalPages) {
    throw new Error(
      `Invalid page index: ${pages}. It should be between 0 and ${
        totalPages - 1
      }.`
    );
  }
  const firstPart = await PDFDocument.create();
  // Copy pages to first part
  for (let i = 0; i <= pages; i++) {
    const [copiedPage] = await firstPart.copyPages(pdfDoc, [i]);
    firstPart.addPage(copiedPage);
  }
  // Save the document as PDF
  const firstPartBytes = await firstPart.save();
  // Convert buffer to base64
  const firstPartBase64 = Buffer.from(firstPartBytes).toString("base64");
  console.log(firstPartBase64);
  // Return the base64 string
  return firstPartBase64;
};
const jsonToB64 = async (json) => {
  try {
    const splitPdfReturnData = await SplitPdf(json.page, json.b64);
    return splitPdfReturnData;
  } catch (error) {
    console.error("Error en jsonToB64:", error);
    throw new Error("Error en el servicio split PDF");
  }
};
export default jsonToB64;
