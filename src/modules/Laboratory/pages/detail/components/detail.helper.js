export const detailHelper = {
    // isResultAbnormal: (key, value, referenceRange) => {
    //     if (!referenceRange || !referenceRange[key]) return false;
    //     const range = referenceRange[key];
    //     // Handle qualitative results (e.g., radiology)
    //     if (!range.match(/[0-9]/)) {
    //         return value !== range;
    //     }
    //     // Handle numeric ranges (e.g., "13.5-17.5 g/dL")
    //     if (range.includes("-")) {
    //         const [min, max] = range.split("-").map((v) => parseFloat(v.replace(/[^0-9.]/g, "")));
    //         const resultValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    //         return isNaN(resultValue) || resultValue < min || resultValue > max;
    //     }
    //     // Handle less-than/greater-than ranges (e.g., "<200 mg/dL")
    //     if (range.startsWith("<")) {
    //         const max = parseFloat(range.replace(/[^0-9.]/g, ""));
    //         const resultValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    //         return isNaN(resultValue) || resultValue >= max;
    //     }
    //     if (range.startsWith(">")) {
    //         const min = parseFloat(range.replace(/[^0-9.]/g, ""));
    //         const resultValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    //         return isNaN(resultValue) || resultValue <= min;
    //     }
    //     return false;
    // },

    isResultAbnormal: (abnormalFlag) => {
        return abnormalFlag && abnormalFlag.toLowerCase() !== 'normal';
    },
    downloadPDF: (test, labInfo = { name: "Acme Labs", accreditation: "CLIA Certified" }) => {
        const loadScript = (src) =>
            new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });

        Promise.all([
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),
            loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.23/jspdf.plugin.autotable.min.js"),
        ]).then(() => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            // Header
            doc.setFontSize(20);
            doc.text(labInfo.name, 105, 20, { align: "center" });
            doc.setFontSize(10);
            doc.text(`Accreditation: ${labInfo.accreditation}`, 105, 28, { align: "center" });
            doc.setFontSize(16);
            doc.text("Laboratory Test Report", 105, 36, { align: "center" });
            doc.setLineWidth(0.5);
            doc.line(80, 38, 130, 38);

            // Defining table styles
            const tableStyles = {
                theme: 'grid',
                headStyles: { fillColor: [243, 243, 243], textColor: [55, 65, 81], fontStyle: 'bold' },
                bodyStyles: { textColor: [31, 41, 55] },
                alternateRowStyles: { fillColor: [249, 250, 251] },
                margin: { top: 50 },
                styles: { fontSize: 10 }
            };

            // Patient and Test Information
            doc.autoTable({
                ...tableStyles,
                startY: 50,
                body: [
                    [
                        { content: 'Patient Information', colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } },
                        { content: 'Test Information', colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }
                    ],
                    [
                        `Patient: ${test.patientName}`,
                        `Patient ID: ${test.patientId}`,
                        `Test Name: ${test.testName}`,
                        `Test Type: ${test.testType}`
                    ],
                    [
                        `Age: ${test.patientAge}`,
                        `Gender: ${test.patientGender}`,
                        `Category: ${test.category}`,
                        `Test Code: ${test.testCode}`
                    ],
                    [
                        '',
                        '',
                        `Priority: ${test.priority}`,
                        `Status: ${test.status}`
                    ],
                    [
                        '',
                        '',
                        `Cost: ${test.cost}`,
                        ''
                    ]
                ]
            });

            // Dates and Doctor Information
            doc.autoTable({
                ...tableStyles,
                startY: doc.lastAutoTable.finalY + 10,
                body: [
                    [
                        { content: 'Dates & Times', colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } },
                        { content: 'Doctor Information', colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }
                    ],
                    [
                        `Ordered Date: ${test.orderedDate}`,
                        `Sample Date: ${test.sampleDate || 'N/A'}`,
                        `Ordering Doctor: ${test.doctorName}`,
                        `Technician: ${test.technician}`
                    ],
                    [
                        `Expected Date: ${test.expectedDate || 'N/A'}`,
                        `Report Date: ${test.reportDate || 'N/A'}`,
                        '',
                        ''
                    ]
                ]
            });

            // Test Results
            if (test.results?.length > 0) {
                doc.setFontSize(12);
                doc.setTextColor(55, 65, 81);
                doc.text('Test Results', 14, doc.lastAutoTable.finalY + 10);
                doc.autoTable({
                    startY: doc.lastAutoTable.finalY + 14,
                    theme: 'grid',
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0], fontStyle: 'bold' },
                    columnStyles: {
                        0: { cellWidth: 40 },
                        1: { cellWidth: 40 },
                        2: { cellWidth: 60 },
                        3: { cellWidth: 25 },
                    },
                    head: [['Parameter', 'Result', 'Normal Range', 'Status']],
                    body: test.results.map(result => {
                        const isAbnormal = detailHelper.isResultAbnormal(result.abnormalFlag);
                        return [
                            result.name.replace(/([A-Z])/g, ' $1').trim(),
                            { content: result.value, styles: { textColor: isAbnormal ? [255, 0, 0] : [0, 0, 0] } },
                            result.referenceRange || 'N/A',
                            isAbnormal ? 'High' : 'Normal'
                        ];
                    })
                });
            }

            // Notes
            if (test.notes) {
                doc.text("Notes", 14, doc.lastAutoTable.finalY + 10);
                doc.setFontSize(10);
                doc.text(test.notes, 14, doc.lastAutoTable.finalY + 14, { maxWidth: 180 });
            }

            // Footer
            const finalY = test.notes
                ? doc.lastAutoTable.finalY + 20 + doc.getTextDimensions(test.notes, { maxWidth: 180 }).h
                : doc.lastAutoTable.finalY + 20;

            doc.setFontSize(10);
            doc.text(
                `Generated on: ${new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" }).replace(/,/g, "")}`,
                105,
                finalY,
                { align: "center" }
            );
            doc.text(`Test ID: ${test.id}`, 105, finalY + 6, { align: "center" });

            // Save PDF
            doc.save(`lab-test-report-${test.id}-${new Date().toISOString().split("T")[0]}.pdf`);
        }).catch((err) => {
            console.error("Failed to load jsPDF or AutoTable:", err);
        });
    }

};
