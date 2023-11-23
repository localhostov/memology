import { $vkUserData, declOfNum, GamesEffects } from "@shared"
import { TSendFunction } from "@types"
import { Icon20ChecksOutline, Icon24Play } from "@vkontakte/icons"
import { Button, Placeholder, UsersStack } from "@vkontakte/vkui"
import { useUnit } from "effector-react"

interface IProps {
    send: TSendFunction<"history">
}

export function WaitResult({ send }: IProps) {
    const users = useUnit(GamesEffects.History.$users)
    const vkUserData = useUnit($vkUserData)

    const showGameResult = () => {
        send("showDialog", { dialogId: 0 })
    }
    const roomOwner = users.find((it) => it.isOwner)

    return (
        <div>
            <Placeholder
                icon={<Icon20ChecksOutline style={{ width: 56, height: 56 }} />}
                header={
                    vkUserData?.id === roomOwner?.vkId
                        ? "Просмотр результата"
                        : "Ожидаем-с..."
                }
                action={
                    <div>
                        <UsersStack
                            photos={users.map((it) => it.vkData.photo_200)}
                            size="l"
                            direction="column"
                        >
                            {declOfNum(
                                users.length,
                                ["участник", "участника", "участников"],
                                true,
                            )}
                        </UsersStack>

                        <div style={{ height: 16 }} />

                        {vkUserData?.id === roomOwner?.vkId && (
                            <Button
                                before={<Icon24Play />}
                                onClick={showGameResult}
                            >
                                Начать
                            </Button>
                        )}
                    </div>
                }
            >
                {vkUserData?.id === roomOwner?.vkId
                    ? "Нажмите на кнопку ниже, чтобы начать просмотр результата"
                    : `Ждём, пока ${
                          roomOwner?.vkData.first_name || "создатель комнаты"
                      } запустит просмотр истории`}
            </Placeholder>
        </div>
    )
}
