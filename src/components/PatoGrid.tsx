import React, { useState } from 'react'
import { times } from 'ramda'
import { View } from 'react-native'

/**
 * Hack to get a flex layout to behave sort of like a grid.
 *
 * It fills a flex container with a bunch of placeholder elements of the same
 * width as the first child given. This, combined with `space-evenly`, aligns
 * the elements in columns. It only tries to set the placeholder width once,
 * so it's important that elements are all of the same width and that the width
 * doesn't change.
 */
function PatoGrid({ children }: Props) {
  const [placeholderWidth, setPlaceholderWidth] = useState<number | null>(null)

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
      }}
    >
      {React.Children.map(children, (child, i) => {
        if (placeholderWidth !== null || i > 0) {
          return child
        }

        return React.cloneElement<OnLayoutElementProps>(child, {
          onLayout: ({ nativeEvent }) =>
            setPlaceholderWidth(nativeEvent.layout.width)
        })
      })}

      {placeholderWidth !== null &&
        times(i => <View key={i} style={{ width: placeholderWidth }} />, 20)}
    </View>
  )
}

type OnLayoutElementProps = {
  onLayout: React.ComponentProps<typeof View>['onLayout']
}

type ElementWithOnLayout = React.ReactElement<OnLayoutElementProps>

interface Props {
  children: ElementWithOnLayout | Array<ElementWithOnLayout>
}

export default PatoGrid
