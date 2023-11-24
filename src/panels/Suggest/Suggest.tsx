import { panelNames, setSnackbar } from "@shared"
import { IPanelProps } from "@types"
import { Icon56GalleryOutline } from "@vkontakte/icons"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import {
    Button,
    FormItem,
    Group,
    Input,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    Snackbar,
    Textarea,
    Title,
} from "@vkontakte/vkui"
import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { API } from "../../shared/api"
import styles from "./styles.module.css"

export const Suggest = ({ id }: IPanelProps) => {
    const navigator = useRouteNavigator()
    const [image, setImage] = useState<string | null>(null)
    const [imageData, setImageData] = useState<File | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        return () => (image ? URL.revokeObjectURL(image) : undefined)
    }, [])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]!

        setImageData(file)
        setImage(URL.createObjectURL(file))
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
    })

    async function suggestMeme() {
        if (!imageData) return

        await API.suggestMeme({
            title,
            description,
            image: imageData,
        })
            .then(() =>
                setSnackbar(
                    <Snackbar onClose={() => setSnackbar(null)}>
                        Мем успешно загружен! Ожидайте модерации
                    </Snackbar>,
                ),
            )
            .catch(() =>
                setSnackbar(
                    <Snackbar onClose={() => setSnackbar(null)}>
                        Произошла какая-то ошибка....
                    </Snackbar>,
                ),
            )
    }

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

                        <div
                            className={`${styles.pickBlock} ${
                                isDragActive ? styles.dragActive : undefined
                            }`}
                            style={
                                image
                                    ? {
                                          background: `url(${image})`,
                                          backgroundSize: "cover",
                                          backgroundRepeat: "no-repeat",
                                          border: "none",
                                      }
                                    : undefined
                            }
                        >
                            {!image && <Icon56GalleryOutline />}
                        </div>
                    </div>

                    <div className={styles.imageContainerContent}>
                        <Title level="2">Картинка мема</Title>
                        <div
                            style={{
                                color: "var(--vkui--color_text_secondary)",
                            }}
                        >
                            Нажмите или перенесите файл в эту зону, чтобы
                            загрузить
                        </div>

                        <div style={{ height: 16 }} />

                        <FormItem bottom="Название мема" style={{ padding: 0 }}>
                            <Input
                                placeholder="Придумайте или напишите если знаете"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormItem>
                    </div>
                </div>

                <FormItem top="Описание мема" style={{ padding: "0 16px" }}>
                    <Textarea
                        placeholder="Напишите, о чём этот мем, о его происхождении"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </FormItem>

                <div style={{ padding: 16 }}>
                    <Button
                        size="l"
                        disabled={
                            !image ||
                            title.trim().length === 0 ||
                            description.trim().length === 0
                        }
                        onClick={suggestMeme}
                        stretched
                    >
                        Отправить на рассмотрение
                    </Button>
                </div>
            </Group>
        </Panel>
    )
}
