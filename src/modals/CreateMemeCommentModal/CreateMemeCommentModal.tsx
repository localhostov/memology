import { IModalProps } from "@types"
import { useParams, useRouteNavigator } from "@vkontakte/vk-mini-apps-router"
import { Button, FormItem, ModalCard, Textarea } from "@vkontakte/vkui"
import { useState } from "react"

export const CreateMemeCommentModal = ({ id }: IModalProps) => {
    const params = useParams<"memeId">()
    const navigator = useRouteNavigator()
    const [text, setText] = useState("")

    const createComment = () => {
        console.log(`user created comment on meme with id ${params?.memeId}`)
        navigator.hideModal()
    }

    return (
        <ModalCard id={id}>
            <FormItem
                top={`Опишите увиденное • ${
                    text.trim().length
                } / ${MAX_COMMENT_LENGTH}`}
                style={{ padding: 0 }}
            >
                <Textarea
                    value={text}
                    maxLength={MAX_COMMENT_LENGTH}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Этот мем такой классный, смеялись всем селом"
                />
            </FormItem>

            <div style={{ height: 16 }} />

            <Button
                size="l"
                mode={text.trim().length > 0 ? "primary" : "secondary"}
                disabled={text.trim().length === 0}
                onClick={createComment}
            >
                Оставить комментарий
            </Button>
        </ModalCard>
    )
}

const MAX_COMMENT_LENGTH = 256
