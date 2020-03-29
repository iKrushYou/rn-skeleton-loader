import React, { useMemo, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const Types = {
  TEXT: "text",
  CIRCLE: "circle",
  RECT: "rect",
};

const Defaults = {
  type: Types.TEXT,
  textVerticalPadding: 2,
  textBorderRadius: 4,
  skeletonColor: "#9ec0c4",
  widthVariance: 20,
  heightVariance: 0,
  pulseSpeed: 1000,
  lines: 1,
};

export default function Skeleton(props) {
  const {
    children,
    loading,
    type = Defaults.type,
    color = Defaults.skeletonColor,
    width,
    widthVariance = Defaults.widthVariance,
    height,
    heightVariance = Defaults.heightVariance,
    pulseSpeed = Defaults.pulseSpeed,
    lines = Defaults.lines,
  } = props;

  const [childLayout, setChildLayout] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const [fadeAnim] = useState(new Animated.Value(1));
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: pulseSpeed,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: pulseSpeed,
        }),
      ])
    ).start();
  }, [loading, pulseSpeed]);

  const childrenArray = React.Children.toArray(children);
  const child =
    childrenArray.length > 0 ? childrenArray[0] : <React.Fragment />;

  const styles = useStyles({
    loading,
    color,
  });

  return (
    <View style={styles.container}>
      {React.cloneElement(child, {
        onLayout: (event) => setChildLayout(event.nativeEvent.layout),
        style: [child.props.style, { opacity: loading ? 0 : 1 }],
      })}
      <View style={styles.skeletonContainer}>
        {new Array(lines).fill(0).map((_, index) => {
          let calculatedWidth = calculateVariance(
            width || childLayout.width,
            widthVariance
          );
          let calculatedHeight = calculateVariance(
            height || childLayout.height,
            heightVariance
          );
          calculatedHeight /= lines;
          if (type === Types.TEXT)
            calculatedHeight -= Defaults.textVerticalPadding * 2;

          return (
            <Animated.View
              key={index}
              style={[
                styles.base,
                type === Types.TEXT && styles.text,
                type === Types.RECT && styles.rect,
                type === Types.CIRCLE && styles.circle,
                {
                  opacity: loading ? fadeAnim : 0,
                  width: calculatedWidth,
                  height: calculatedHeight,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

Skeleton.propTypes = {
  type: PropTypes.oneOf(Object.values(Types)),
  loading: PropTypes.bool.isRequired,
  color: PropTypes.string,
  width: PropTypes.number,
  widthVariance: PropTypes.number,
  height: PropTypes.number,
  heightVariance: PropTypes.number,
  pulseSpeed: PropTypes.number,
  lines: PropTypes.number,
};

const calculateVariance = (size, variance) => {
  return size - size * (Math.random() * (variance / 100.0));
};

const useStyles = (props) => {
  const { loading, color } = props;

  return StyleSheet.create({
    container: { position: "relative" },
    skeletonContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    base: {
      backgroundColor: color,
      opacity: loading ? 100 : 0,
    },
    text: {
      marginTop: Defaults.textVerticalPadding,
      marginBottom: Defaults.textVerticalPadding,
      borderRadius: Defaults.textBorderRadius,
    },
    rect: {},
    circle: {
      borderRadius: 1000,
    },
  });
};
