export const downloadFile = (url: string, fileName: string) => {
    const anchorElement = document.createElement("a")
    anchorElement.href = url
    anchorElement.setAttribute("download", fileName)
    anchorElement.target = "_blank"
    document.body.append(anchorElement)

    anchorElement.click()
    anchorElement.remove()
}
