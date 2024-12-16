import React, { useState, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

// 设置 workerSrc 路径（必须）
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

interface PdfViewer2Props {
    pdfUrl: string;
}

const PdfViewer2: React.FC<PdfViewer2Props> = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(0); // 总页数

    // 使用 useMemo 缓存 options 对象，避免重新创建
    const options = useMemo(() => ({
        cMapUrl: "https://unpkg.com/pdfjs-dist@4.4.168/cmaps/",
        cMapPacked: true,
    }), []);

    // 加载成功时触发，获取总页数
    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        console.log("Total pages:", numPages);
        setNumPages(numPages);
    };

    return (
        <div style={{ textAlign: 'center', overflowY: 'auto', border: '1px solid black', width: '80vw', height: '100vh', backgroundColor: "#eee" }}>
            <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<div>Loading PDF...</div>} // 加载提示
                options={options} // 使用缓存的 options
            >
                {/* 遍历所有页面进行渲染 */}
                {Array.from(new Array(numPages), (el, index) => (
                    <div
                        key={`page_container_${index + 1}`}
                        style={{
                            marginBottom: '10px',
                            padding: '10px',
                            border: '1px solid #aaa',
                            borderRadius: '8px',
                            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                            display: 'inline-block',
                            backgroundColor: '#fff'
                        }}
                    >
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            scale={1.5}
                            renderTextLayer
                            renderAnnotationLayer
                        />
                    </div>
                ))}
            </Document>
        </div>
    );
};

export default PdfViewer2;
