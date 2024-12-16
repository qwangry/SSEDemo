import React, { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

import 'pdfjs-dist/web/pdf_viewer.css';

// 设置 pdf.worker.js 的路径
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.9.155/pdf.worker.min.mjs';

interface PdfViewerProps {
    pdfUrl: string;
}

const PdfViewer1: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderPdf = async () => {
            try {
                // 加载 PDF 文档
                const loadingTask = getDocument({
                    url: pdfUrl,
                    cMapUrl: 'https://unpkg.com/pdfjs-dist@4.9.155/cmaps/',
                    cMapPacked: true,
                });
                const pdf = await loadingTask.promise;

                const container = containerRef.current;
                if (container) container.innerHTML = ''; // 清空容器

                // 遍历所有页码并渲染到 Canvas
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    const page = await pdf.getPage(pageNum);
                    const scale = 1.5; // 缩放比例
                    const viewport = page.getViewport({ scale });

                    // 外层容器（带边框）
                    const pageContainer = document.createElement('div');
                    pageContainer.style.border = '1px solid #aaa'; // 添加边框
                    pageContainer.style.borderRadius = '8px'; // 圆角边框
                    pageContainer.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)'; // 添加阴影
                    pageContainer.style.margin = '20px auto'; // 页面之间的间隔
                    pageContainer.style.padding = '10px';
                    pageContainer.style.display = 'inline-block';
                    pageContainer.style.backgroundColor = '#fff';

                    // 创建一个新的 Canvas
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;

                    // 渲染 PDF 页面到 Canvas
                    const renderContext = {
                        canvasContext: context,
                        viewport,
                    };
                    await page.render(renderContext).promise;

                    // 将 Canvas 添加到外层容器
                    pageContainer.appendChild(canvas);

                    // 将外层容器添加到父容器
                    container?.appendChild(pageContainer);

                    // 添加分割线（除了最后一页）
                    // if (pageNum < pdf.numPages) {
                    //     const hr = document.createElement('hr');
                    //     hr.style.border = 'none';
                    //     hr.style.borderTop = '1px solid #ccc';
                    //     hr.style.margin = '20px auto';
                    //     hr.style.width = '80%';
                    //     container?.appendChild(hr);
                    // }
                }
            } catch (error) {
                console.error('Error rendering PDF:', error);
            }
        };

        renderPdf();
    }, [pdfUrl]);

    return (
        <div
            ref={containerRef}
            style={{
                textAlign: 'center',
                overflowY: 'auto',
                border: '1px solid black',
                width: '80vw',
                height: '100vh',
                margin: '0 auto',
                backgroundColor: '#f9f9f9', // 背景色（可选）
            }}
        />
    );
};

export default PdfViewer1;
