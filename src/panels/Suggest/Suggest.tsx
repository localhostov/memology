import { panelNames } from "@shared"
import { IPanelProps } from "@types"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Group,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Title,
} from "@vkontakte/vkui"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import styles from "./styles.module.css"

export const Suggest = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const [image, setImage] = useState<string | ArrayBuffer | null>(null)
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.addEventListener("load", (e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setImage(e.target.result)
            })

            reader.readAsDataURL(file)
        })
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
    })

    return (
        <Panel id={id}>
            <PanelHeader
                before={<PanelHeaderBack onClick={() => navigator.back()} />}
            >
                {panelNames[id]}
            </PanelHeader>

            <Group>
                <div className={styles.imageContainer}>
                    <div {...getRootProps()}>
                        <input className="input-zone" {...getInputProps()} />
                        {image ? (
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            <img src={image} className={styles.image} alt="" />
                        ) : (
                            <div
                                className={`${styles.pickBlock} ${
                                    isDragActive ? styles.dragActive : undefined
                                }`}
                            >
                                <Title level="2">Картинка мема</Title>
                                <div>
                                    Нажмите или перенесите файл в эту зону,
                                    чтобы загрузить
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.imageContainerContent} />
                </div>
            </Group>
        </Panel>
    )
}
