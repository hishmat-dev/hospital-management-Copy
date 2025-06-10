import logo from "../../../../../shared/workwise.png";
console.log("Imported logo path:", logo); // Debug the resolved path

export const detailHelper = {
    isResultAbnormal: (abnormalFlag) => {
        return abnormalFlag && abnormalFlag.toLowerCase() !== 'normal';
    },
    downloadPDF: (test, labInfo = { name: "DRLOGY PATHOLOGY LAB", accreditation: "Accurate | Caring | Instant" }) => {
        // Ensure logoUrl is set to the imported logo if not provided
        labInfo.logoUrl = labInfo.logoUrl || logo;

        const loadScript = (src) =>
            new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.async = true;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
                document.body.appendChild(script);
            });

        Promise.all([
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.3/jspdf.plugin.autotable.min.js")
        ]).then(([_, __]) => {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) throw new Error("jsPDF is not defined");
            const doc = new jsPDF({ orientation: 'p', format: 'a4' }); // Match reference A4 portrait

            if (!doc.autoTable) throw new Error("jsPDF autoTable plugin is not loaded");

            // Add logo, name, and accreditation on the left side in the same row
            const leftStartX = 15;
            const leftStartY = 15;
            let currentX = leftStartX;
            if (labInfo.logoUrl && labInfo.logoUrl.startsWith("data:image")) {
                console.log("Adding logo to PDF with data URL:", labInfo.logoUrl.substring(0, 50) + "...");
                doc.addImage(labInfo.logoUrl, 'PNG', currentX, leftStartY, 30, 25); // Logo
                currentX += 28; // Move past logo (30 width + 5 margin)
            } else {
                console.warn("No valid logo data URL available, skipping logo addition. Logo URL:", labInfo.logoUrl);
            }
            doc.setFontSize(20);
            doc.text(labInfo.name, currentX, leftStartY + 13, { align: "left" }); // Name beside logo, vertically centered

            doc.setFontSize(10);
            doc.text(labInfo.accreditation, currentX, leftStartY + 17, { align: "left" }); // Accreditation beside name, vertically adjusted

            // Add www.lab.com on the right side
            const rightStartX = 190; // Near right edge of A4 (595 points wide)
            doc.setFontSize(10);
            doc.text("www.lab.com", rightStartX, leftStartY + 10, { align: "right" }); // Aligned with accreditation height
            doc.setFontSize(10);
            doc.text("0354-6565952", rightStartX, leftStartY + 14, { align: "right" }); // Aligned with accreditation height

            // Report title and line
            doc.setFontSize(16);
            doc.text("Laboratory Test Report", 105, 50, { align: "center" });
            doc.setLineWidth(0.5);
            doc.line(80, 52, 130, 52);

            // Patient Information
            doc.autoTable({
                startY: 70,
                theme: 'plain',
                body: [
                    [{ content: `Name: ${test.patientName || ''}`, styles: { halign: 'left' } }, { content: `Sample Collected At: ${test.sampleLocation || ''}`, styles: { halign: 'left' } }, { content: `Registered on: ${test.orderedDate || ''}`, styles: { halign: 'left' } }],
                    [{ content: `Age: ${test.patientAge || ''}`, styles: { halign: 'left' } }, { content: `Ref. By: ${test.doctorName || ''}`, styles: { halign: 'left' } }, { content: `Collected on: ${test.sampleDate || ''}`, styles: { halign: 'left' } }],
                    [{ content: `Sex: ${test.patientGender || ''}`, styles: { halign: 'left' } }, { content: `Reported on: ${test.reportDate || ''}`, styles: { halign: 'left' } }],
                    [{ content: `PID: ${test.patientId || ''}`, styles: { halign: 'left' } }]
                ],
                columnStyles: {
                    0: { cellWidth: 50 },
                    1: { cellWidth: 80 },
                    2: { cellWidth: 60 }
                },
                didDrawCell: (data) => {
                    if (data.row.index === 0 && data.column.index === 0) {
                        doc.addImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 'PNG', data.cell.x + 50, data.cell.y, 10, 10); // Placeholder QR code
                    }
                }
            });

            // Test Results Label
            doc.setFontSize(16);
            doc.text("Test Results", 105, doc.lastAutoTable.finalY + 10, { align: "center" });

            // Test Results Table
            doc.autoTable({
                startY: doc.lastAutoTable.finalY + 14,
                theme: 'grid',
                headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255], fontStyle: 'bold' },
                bodyStyles: { textColor: [31, 41, 55] },
                alternateRowStyles: { fillColor: [230, 230, 230] },
                head: [['Investigation', 'Result', 'Reference Value', 'Unit']],
                body: test.results?.map(result => {
                    const isAbnormal = detailHelper.isResultAbnormal(result.abnormalFlag);
                    return [
                        result.name || '',
                        { content: result.value || '', styles: { textColor: isAbnormal ? [255, 0, 0] : [0, 0, 0] } },
                        result.referenceRange || '',
                        result.unit || ''
                    ];
                }) || [],
                didDrawCell: (data) => {
                    if (data.section === 'body' && data.column.index === 1 && data.cell.raw[1]) {
                        const isAbnormal = detailHelper.isResultAbnormal(data.cell.raw[1].styles?.textColor?.[0] === 255 ? 'High' : 'Normal');
                        if (isAbnormal) {
                            doc.setFillColor(230, 230, 230);
                            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height, 'F');
                            doc.text('High', data.cell.x + data.cell.width - 15, data.cell.y + data.cell.height / 2 + 2, { align: 'right' });
                        }
                    }
                }
            });

            // Test Notes
            if (test.notes) {
                doc.setFontSize(10);
                doc.text("Test Notes", 14, doc.lastAutoTable.finalY + 10);
                doc.text(test.notes, 14, doc.lastAutoTable.finalY + 16, { maxWidth: 180 });
            }

            // Closing Notes
            doc.setFontSize(10);
            doc.text("Thanks for Reference", 14, (test.notes ? doc.lastAutoTable.finalY + 26 : doc.lastAutoTable.finalY + 10));
            doc.text("END OF REPORT", 14, (test.notes ? doc.lastAutoTable.finalY + 32 : doc.lastAutoTable.finalY + 16));


            const pageHeight = doc.internal.pageSize.getHeight();
            const pageWidth = doc.internal.pageSize.getWidth();
            doc.setFontSize(9);
            doc.text("By workwise", pageWidth - 15, pageHeight - 10, { align: "right" });
            
            // Save PDF
            doc.save(`lab-test-report-${test.id || ''}-${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }).replace(/,/g, "").split(" ")[0]}.pdf`);
        }).catch((err) => {
            console.error("Failed to load jsPDF, AutoTable, or logo image:", err);
        });
    }
};