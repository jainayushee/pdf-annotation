import { PDFDocument } from 'pdf-lib'
import { data } from './byteArray.js'
import fs from 'fs'

// Load a PDFDocument from the existing PDF bytes
const pdfDoc = await PDFDocument.load(data);

//To remove the annotations
await pdfDoc.getPages().forEach(async (page) => {
    await page.node && page.node.Annots() && page.node.Annots().array.forEach(async (annot) => {
        await page.node.Annots().context.indirectObjects.delete(annot);
    })
})

// Serialize the PDFDocument to bytes (a Uint8Array)
const pdfBytes = await pdfDoc.save()

// Leverage the fs library to download the pdf
fs.writeFileSync('Download.pdf', pdfBytes)


