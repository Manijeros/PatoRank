import { TouchableHighlight, StyleProp, ViewStyle } from 'react-native'
import React, { PropsWithChildren } from 'react'

type RoundedButtonProps = PropsWithChildren<{
  enabled?: boolean
  onPress?: () => any
  style: StyleProp<ViewStyle>
  underlayColor?: string
  useSaving?: [boolean, (value: boolean) => void]
}>

export default function RoundedButton({
  enabled = true,
  onPress,
  style,
  underlayColor,
  useSaving,
  children
}: RoundedButtonProps) {
  const [saving, setSaving] = useSaving || [false, () => {}]
  const waitingAction = async (action: Promise<any> | void) => {
    setSaving(true)
    await action
    setSaving(false)
  }
  return (
    <TouchableHighlight
      underlayColor={underlayColor}
      style={[
        {
          borderRadius: 5,
          margin: 10,
          marginTop: 0,
          padding: 10
        },
        style,
        !enabled && {
          backgroundColor: '#0A5B4A'
        }
      ]}
      onPress={
        enabled && onPress
          ? () => !saving && waitingAction(onPress())
          : undefined
      }
    >
      {children}
    </TouchableHighlight>
  )
}
