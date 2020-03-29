
# React Native Skeleton Loader

This is a simple library for implementing skeleton loading in React Native (Expo-compatible). There are a handful of libraries for this, but I made this out of necessity as I was unable to find a library that allowed dynamically sized skeletons based on the content instead of specifying a static size.

## Installation

```
yarn add rn-skeleton-loader
```

## Usage

### Include the component

```
import Skeleton from "rn-skeleton-loader";
```

### Wrap some text

![text-example](https://github.com/iKrushYou/rn-skeleton-loader/blob/master/docs/text-example.gif?raw=true)

```
<Skeleton loading={loading}>
	<Text>Example Text</Text>
</Skeleton>
<Skeleton loading={isLoading} lines={6}> 
	<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
</Skeleton>
```
- Text elements can be wrapped without anything more than a `loading` prop.
- Multi-line text can be enabled by specifying a `lines` value of more than `1`.
	- `lines` count will split up the total height across all lines 

### Wrap something a little more complicated
![enter image description here](https://github.com/iKrushYou/rn-skeleton-loader/blob/master/docs/complex-example.gif?raw=true)
```javascript
// see example folder
<View style={styles.card} key={index}>
  <View style={styles.cardHeader}>
    <Skeleton loading={isLoading} type={"circle"} widthVariance={0}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>AK</Text>
      </View>
    </Skeleton>
    <View style={{ marginRight: 16 }} />
    <View>
      <Skeleton loading={isLoading} width={150}>
        <Text>Shrimp and Chorizo Paella</Text>
      </Skeleton>
      <Skeleton loading={isLoading} width={100}>
        <Text>September 14, 2016</Text>
      </Skeleton>
    </View>
  </View>
  <Skeleton loading={isLoading} type={"rect"} widthVariance={0}>
    <View style={styles.cardImage}>
      <Image source={paellaImage} style={{ flex: 1 }} />
    </View>
  </Skeleton>
  <View style={styles.cardContent}>
    <Skeleton loading={isLoading} lines={3}>
      <Text>
        This impressive paella is a perfect party dish and a fun meal
        to cook together with your guests. Add 1 cup of frozen peas
        along with the mussels, if you like.
      </Text>
    </Skeleton>
  </View>
</View>
```
- The `type` property can display either `text`, `circle`, or `rect`
- For a static shape, you most likely want `widthVariance` to be be set to `0` (default is `20`) so the width doesn't change.

## Props

| Prop        | Default | Type                         | Description                                                                                                                                     |
| ----------- | --------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `loading`   | `required`     | `boolean `                     | Should the skeleton display loading.                                                                                                                  |
| `type` | `text`     | `string  `                     | Determines the type of skeleton to display. <br/>`["text", "circle", "rect"]` |
| `color`  | `#9ec0c4`     | `hex color`                      | Color of loader.                                                                            |
| `width`     | `null`     | `number` | Static width of loader component. `null` value will default to size of child.    
| `widthVariance`     | `20`     | `number` | Random variance in loader width as a percentage.    
| `height`     | `null`     | `number` | Static height of loader component. `null` value will default to size of child.    
| `heightVariance`     | `20`     | `number` | Random variance in loader height as a percentage.    
| `pulseSpeed`     | `1000`     | `number` | Pulse speed in milliseconds.    
| `lines`     | `1`     | `number` | Number of lines to split height into.                                                                                          |
