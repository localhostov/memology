export const downloadFile = async (
    link: RequestInfo,
    fileName: string,
): Promise<void> => {
    try {
        const response = await fetch(link)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(new Blob([blob]))
        const anchorElement = document.createElement("a")
        anchorElement.href = url
        anchorElement.setAttribute("download", fileName)
        anchorElement.target = "_blank"
        document.body.append(anchorElement)

        anchorElement.click()
        anchorElement.remove()
    } catch (error) {
        console.error(error)
    }
}
