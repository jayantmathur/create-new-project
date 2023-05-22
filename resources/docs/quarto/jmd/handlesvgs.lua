function Image(el)
    if FORMAT == "latex" then
        -- convert svg to pdf
        if string.sub(el.src, -4) == '.svg' then
            local pdfName = string.gsub(el.src, "svg", "pdf")
            pandoc.pipe('inkscape', { el.src, '--export-filename', pdfName}, '')
            el.src = pdfName
            return el
        end
        -- convert tif to pdf
        if string.sub(el.src, -4) == '.tif' then
            local pdfName = string.gsub(el.src, "tif", "pdf")
            pandoc.pipe('inkscape', { el.src, '--export-filename', pdfName}, '')
            el.src = pdfName
            return el
        end
    end
end